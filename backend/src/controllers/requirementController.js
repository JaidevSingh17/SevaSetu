const Requirement = require('../models/Requirement');
const Notification = require('../models/Notification'); // Will be used later

// @desc    Get all active requirements
// @route   GET /api/requirements
// @access  Public
exports.getRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.find({ status: 'Open' }).populate('ngoId', 'name address');
    res.json(requirements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new requirement
// @route   POST /api/requirements
// @access  Private (NGO)
exports.createRequirement = async (req, res) => {
  try {
    const { item, quantity_required, urgency } = req.body;

    const requirement = await Requirement.create({
      ngoId: req.user._id,
      item,
      quantity_required,
      urgency,
    });

    // We can trigger notifications here later
    res.status(201).json(requirement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a requirement
// @route   PUT /api/requirements/:id
// @access  Private (NGO)
exports.updateRequirement = async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id);

    if (!requirement) {
      return res.status(404).json({ message: 'Requirement not found' });
    }

    // Check if user is the owner
    if (requirement.ngoId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this requirement' });
    }

    const updatedRequirement = await Requirement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedRequirement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a requirement
// @route   DELETE /api/requirements/:id
// @access  Private (NGO)
exports.deleteRequirement = async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id);

    if (!requirement) {
      return res.status(404).json({ message: 'Requirement not found' });
    }

    if (requirement.ngoId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this requirement' });
    }

    await requirement.deleteOne();
    res.json({ message: 'Requirement removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
