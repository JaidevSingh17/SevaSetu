const Donation = require('../models/Donation');
const Requirement = require('../models/Requirement');
const Notification = require('../models/Notification');

// @desc    Pledge a donation
// @route   POST /api/donations
// @access  Private (Donor)
exports.createDonation = async (req, res) => {
  try {
    const { requirementId, quantity_pledged } = req.body;

    const requirement = await Requirement.findById(requirementId);
    if (!requirement) {
      return res.status(404).json({ message: 'Requirement not found' });
    }

    if (requirement.status === 'Fulfilled') {
      return res.status(400).json({ message: 'Requirement is already fulfilled' });
    }

    const remainingToFulfill = requirement.quantity_required - requirement.quantity_fulfilled;
    
    // Smart Matching Logic: Prevent oversupply
    let finalPledge = quantity_pledged;
    if (quantity_pledged > remainingToFulfill) {
      finalPledge = remainingToFulfill;
    }

    const donation = await Donation.create({
      donorId: req.user._id,
      requirementId,
      quantity_pledged: finalPledge,
    });

    // Update requirement fulfillment
    requirement.quantity_fulfilled += finalPledge;
    if (requirement.quantity_fulfilled >= requirement.quantity_required) {
      requirement.status = 'Fulfilled';
    }
    await requirement.save();

    // Create Notification for the NGO
    await Notification.create({
      userId: requirement.ngoId,
      message: `A new donation of ${finalPledge} ${requirement.item} was pledged!`,
    });

    res.status(201).json({
      message: `Successfully pledged ${finalPledge} items.`,
      donation,
      requirementStatus: requirement.status
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    View donor history
// @route   GET /api/donations/donor
// @access  Private (Donor)
exports.getDonorHistory = async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.user._id }).populate('requirementId');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update donation status (Mark as Delivered)
// @route   PATCH /api/donations/:id/status
// @access  Private (NGO)
exports.updateDonationStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'Delivered'
    const donation = await Donation.findById(req.params.id).populate('requirementId');

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.requirementId.ngoId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    donation.status = status;
    await donation.save();

    // Notify donor
    await Notification.create({
      userId: donation.donorId,
      message: `Your donation for ${donation.requirementId.item} was marked as ${status}. Thank you!`,
    });

    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    View donations for an NGO
// @route   GET /api/donations/ngo
// @access  Private (NGO)
exports.getNGODonations = async (req, res) => {
  try {
    // Find requirements for this NGO
    const requirements = await Requirement.find({ ngoId: req.user._id });
    const requirementIds = requirements.map(r => r._id);

    // Find donations for these requirements
    const donations = await Donation.find({ requirementId: { $in: requirementIds } })
      .populate('donorId', 'name email phone')
      .populate('requirementId', 'item')
      .sort({ createdAt: -1 });
    
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
