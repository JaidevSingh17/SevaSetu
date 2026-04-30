const express = require('express');
const router = express.Router();
const {
  createDonation,
  getDonorHistory,
  updateDonationStatus,
  getNGODonations,
} = require('../controllers/donationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, authorize('donor'), createDonation);

router.get('/donor', protect, authorize('donor'), getDonorHistory);
router.get('/ngo', protect, authorize('ngo'), getNGODonations);

router.patch('/:id/status', protect, authorize('ngo', 'admin'), updateDonationStatus);

module.exports = router;
