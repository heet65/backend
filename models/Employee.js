const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin','HR', 'employee'], default: 'employee' },
  leaveBalance: { type: Number, default: 15 }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);