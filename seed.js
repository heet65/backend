const mongoose = require('mongoose');
const Employee = require('./models/Employee');
const Leave = require('./models/Leave');

mongoose.connect('mongodb://localhost:27017/leavemanagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    await Employee.deleteMany({});
    await Leave.deleteMany({});

    const employees = [
      { id: '000', name: 'Ashvini Boss', password: '000', role: 'admin', leaveBalance: 20 },
      { id: '001', name: 'Heet', password: '001', role: 'employee', leaveBalance: 15 },
      { id: '002', name: 'Nandini', password: '002', role: 'employee', leaveBalance: 14 },
      { id: '003', name: 'Ruturaj', password: '003', role: 'employee', leaveBalance: 12 }
    ];

    const leaves = [
      { userId: '001', userName: 'Heet', startDate: '2024-01-15', endDate: '2024-01-17', days: 3, type: 'Casual', reason: 'Personal work', status: 'Approved' },
      { userId: '001', userName: 'Heet', startDate: '2024-02-10', endDate: '2024-02-12', days: 3, type: 'Sick', reason: 'Fever', status: 'Pending' },
      { userId: '002', userName: 'Nandini', startDate: '2024-01-20', endDate: '2024-01-22', days: 3, type: 'Casual', reason: 'Family function', status: 'Pending' }
    ];

    await Employee.insertMany(employees);
    await Leave.insertMany(leaves);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();