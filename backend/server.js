require('dotenv').config();
const express = require('express');
const passport = require('passport');
const { connectDB, sequelize } = require('./config/database');
require('./config/passport'); // Load passport config

const app = express();
app.use(express.json());
app.use(passport.initialize());

connectDB();

// Sync models
// Change this:
// sequelize.sync({ alter: true });

// To this (RUN ONCE, then change it back):
sequelize.sync({ force: true }).then(() => {
  console.log("Database cleared and resynced successfully.");
});

app.use('/api/auth', require('./routes/authRoutes'));

app.listen(process.env.PORT || 5000, () => console.log('Server Active'));