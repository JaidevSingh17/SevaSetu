const express = require('express');
const router = express.Router();
const { getUsers, verifyNGO } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Apply protect and authorize('admin') to all routes in this file
router.use(protect, authorize('admin'));

router.get('/users', getUsers);
router.patch('/verify-ngo/:id', verifyNGO);

module.exports = router;
