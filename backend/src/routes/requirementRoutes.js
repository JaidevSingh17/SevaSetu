const express = require('express');
const router = express.Router();
const {
  getRequirements,
  createRequirement,
  updateRequirement,
  deleteRequirement,
} = require('../controllers/requirementController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(getRequirements)
  .post(protect, authorize('ngo'), createRequirement);

router.route('/:id')
  .put(protect, authorize('ngo'), updateRequirement)
  .delete(protect, authorize('ngo'), deleteRequirement);

module.exports = router;
