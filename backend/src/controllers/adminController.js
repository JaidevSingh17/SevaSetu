const User = require('../models/User');

// @desc    View all users
// @route   GET /api/admin/users
// @access  Private (Admin)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify an NGO
// @route   PATCH /api/admin/verify-ngo/:id
// @access  Private (Admin)
exports.verifyNGO = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'ngo') {
      return res.status(400).json({ message: 'User is not an NGO' });
    }

    user.isVerified = true;
    await user.save();

    res.json({ message: 'NGO verified successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
