const Requirement = require('../models/Requirement');
const Donation = require('../models/Donation');
const User = require('../models/User');

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const buildLastSixMonths = () => {
  const months = [];
  const cursor = new Date();
  cursor.setDate(1);
  cursor.setHours(0, 0, 0, 0);
  cursor.setMonth(cursor.getMonth() - 5);

  for (let i = 0; i < 6; i += 1) {
    months.push({
      year: cursor.getFullYear(),
      month: cursor.getMonth() + 1,
      label: MONTH_NAMES[cursor.getMonth()],
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return months;
};

exports.getImpactSummary = async (req, res) => {
  try {
    const [
      totalRequests,
      fulfilledRequests,
      openRequests,
      verifiedNgos,
      totalNgos,
      totalDonors,
      recurringDonorsAgg,
      avgResponseAgg,
      urgencyAgg,
      requestsByMonthAgg,
      fulfilledByMonthAgg,
      regionAgg,
      recentStoriesRaw,
      totalFulfilledQtyAgg,
    ] = await Promise.all([
      Requirement.countDocuments(),
      Requirement.countDocuments({ status: 'Fulfilled' }),
      Requirement.countDocuments({ status: 'Open' }),
      User.countDocuments({ role: 'ngo', isVerified: true }),
      User.countDocuments({ role: 'ngo' }),
      User.countDocuments({ role: 'donor' }),
      Donation.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
          },
        },
        { $group: { _id: '$donorId' } },
        { $count: 'count' },
      ]),
      Requirement.aggregate([
        {
          $lookup: {
            from: 'donations',
            localField: '_id',
            foreignField: 'requirementId',
            as: 'donations',
          },
        },
        { $addFields: { firstDonationAt: { $min: '$donations.createdAt' } } },
        { $match: { firstDonationAt: { $ne: null } } },
        {
          $project: {
            responseHours: {
              $divide: [{ $subtract: ['$firstDonationAt', '$createdAt'] }, 1000 * 60 * 60],
            },
          },
        },
        { $group: { _id: null, avgResponseHours: { $avg: '$responseHours' } } },
      ]),
      Requirement.aggregate([
        {
          $group: {
            _id: '$urgency',
            requests: { $sum: 1 },
            requiredQty: { $sum: '$quantity_required' },
            fulfilledQty: { $sum: '$quantity_fulfilled' },
          },
        },
      ]),
      Requirement.aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            requests: { $sum: 1 },
          },
        },
      ]),
      Requirement.aggregate([
        { $match: { status: 'Fulfilled' } },
        {
          $group: {
            _id: {
              year: { $year: '$updatedAt' },
              month: { $month: '$updatedAt' },
            },
            fulfilled: { $sum: 1 },
          },
        },
      ]),
      Requirement.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'ngoId',
            foreignField: '_id',
            as: 'ngo',
          },
        },
        {
          $unwind: {
            path: '$ngo',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            region: {
              $ifNull: [{ $arrayElemAt: [{ $split: ['$ngo.address', ','] }, 0] }, 'Unknown'],
            },
          },
        },
        {
          $group: {
            _id: '$region',
            fulfilled: {
              $sum: {
                $cond: [{ $eq: ['$status', 'Fulfilled'] }, 1, 0],
              },
            },
            ngosSet: { $addToSet: '$ngoId' },
          },
        },
        {
          $project: {
            _id: 0,
            region: '$_id',
            fulfilled: 1,
            ngos: { $size: '$ngosSet' },
          },
        },
        { $sort: { fulfilled: -1 } },
        { $limit: 4 },
      ]),
      Requirement.find({ status: 'Fulfilled' })
        .sort({ updatedAt: -1 })
        .limit(2)
        .populate('ngoId', 'name')
        .select('item quantity_required quantity_fulfilled updatedAt'),
      Requirement.aggregate([
        { $group: { _id: null, total: { $sum: '$quantity_fulfilled' } } },
      ]),
    ]);

    const fulfillmentRate = totalRequests > 0 ? Number(((fulfilledRequests / totalRequests) * 100).toFixed(1)) : 0;
    const avgResponseHours = avgResponseAgg[0]?.avgResponseHours ? Number(avgResponseAgg[0].avgResponseHours.toFixed(1)) : 0;
    const recurringDonors = recurringDonorsAgg[0]?.count || 0;
    const totalFulfilledQty = totalFulfilledQtyAgg[0]?.total || 0;

    const urgencyOrder = ['High', 'Medium', 'Low'];
    const urgencyMap = new Map(urgencyAgg.map((row) => [row._id, row]));
    const urgencyBreakdown = urgencyOrder.map((urgency) => {
      const row = urgencyMap.get(urgency);
      const requiredQty = row?.requiredQty || 0;
      const fulfilledQty = row?.fulfilledQty || 0;
      const progress = requiredQty > 0 ? Math.min(100, Math.round((fulfilledQty / requiredQty) * 100)) : 0;

      return {
        name: `${urgency} Urgency`,
        progress,
        total: `${row?.requests || 0} requests`,
      };
    });

    const requestMap = new Map(requestsByMonthAgg.map((row) => [`${row._id.year}-${row._id.month}`, row.requests]));
    const fulfilledMap = new Map(fulfilledByMonthAgg.map((row) => [`${row._id.year}-${row._id.month}`, row.fulfilled]));

    const monthlyTrend = buildLastSixMonths().map((monthItem) => {
      const key = `${monthItem.year}-${monthItem.month}`;
      return {
        month: monthItem.label,
        requests: requestMap.get(key) || 0,
        fulfilled: fulfilledMap.get(key) || 0,
      };
    });

    const regionalImpact = regionAgg.map((row) => ({
      region: (row.region || 'Unknown').trim() || 'Unknown',
      ngos: row.ngos || 0,
      fulfilled: String(row.fulfilled || 0),
    }));

    const stories = recentStoriesRaw.map((story) => ({
      title: `${story.item} Support Drive`,
      ngo: story.ngoId?.name || 'Partner NGO',
      summary: `Requested ${story.quantity_required} units and fulfilled ${story.quantity_fulfilled} through donor pledges.`,
      result: `Updated ${new Date(story.updatedAt).toLocaleDateString()} with verified completion.`,
    }));

    res.json({
      summary: {
        totalRequests,
        fulfilledRequests,
        fulfillmentRate,
        avgResponseHours,
        openRequests,
        verifiedNgos,
        totalNgos,
        totalDonors,
        recurringDonors,
        totalFulfilledQty,
      },
      urgencyBreakdown,
      monthlyTrend,
      regionalImpact,
      stories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to load impact summary' });
  }
};
