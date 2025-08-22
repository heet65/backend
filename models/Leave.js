const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  days: { type: Number, required: true },
  type: { type: String, enum: ['Casual', 'Sick'], required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  resumed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);