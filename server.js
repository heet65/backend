const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(cors({
  origin: '*', // Allows all origins
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://kalantriheet:eIdO5RAm5JpBvOXY@cluster0.z0yq8rs.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/leaves', require('./routes/leaves'));

app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`);
});