const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema({
  ngoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  quantity_required: {
    type: Number,
    required: true,
    min: 1,
  },
  quantity_fulfilled: {
    type: Number,
    default: 0,
  },
  urgency: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium',
  },
  status: {
    type: String,
    enum: ['Open', 'Fulfilled'],
    default: 'Open',
  },
}, { timestamps: true });

module.exports = mongoose.model('Requirement', requirementSchema);
