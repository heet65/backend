const express = require('express');
const Leave = require('../models/Leave');
const Employee = require('../models/Employee');
const router = express.Router();

// Get all leaves
router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get leaves by user
router.get('/user/:userId', async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.params.userId });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Apply leave
router.post('/', async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Approve leave
router.put('/:id/approve', async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave || leave.status !== 'Pending') {
      return res.status(400).json({ message: 'Cannot approve this leave' });
    }
    
    const employee = await Employee.findOne({ id: leave.userId });
    if (!employee || employee.leaveBalance < leave.days) {
      return res.status(400).json({ message: 'Insufficient leave balance' });
    }
    
    leave.status = 'Approved';
    employee.leaveBalance -= leave.days;
    
    await leave.save();
    await employee.save();
    
    res.json({ leave, employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reject leave
router.put('/:id/reject', async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave || leave.status !== 'Pending') {
      return res.status(400).json({ message: 'Cannot reject this leave' });
    }
    
    leave.status = 'Rejected';
    await leave.save();
    
    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel leave
router.delete('/:id', async (req, res) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);
    res.json({ message: 'Leave cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;