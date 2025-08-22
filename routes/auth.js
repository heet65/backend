const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  try {
    const { empId, password } = req.body;
    const employee = await Employee.findOne({ id: empId, password });
    
    if (!employee) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.json({
      success: true,
      employee: {
        id: employee.id,
        name: employee.name,
        role: employee.role,
        leaveBalance: employee.leaveBalance
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;