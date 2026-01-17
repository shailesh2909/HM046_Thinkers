const express = require('express');
const { connectDB, sequelize } = require('./config/database');
const User = require('../backend_v2/models/User'); // Import models here

const app = express();
app.use(express.json());

// Connect to Database
connectDB();

// Sync Database (creates tables if they don't exist)
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
});

// Example Route using a Controller
app.use('/users', require('../backend_v2/routes/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));