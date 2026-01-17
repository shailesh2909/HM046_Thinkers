require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/database');
require('./config/passport'); // Load passport config
const models = require('./models'); // Import all models with relationships

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Sync models
// Change this:
// sequelize.sync({ alter: true });

// To this (RUN ONCE, then change it back):
sequelize.sync({ force: true }).then(() => {
  console.log("Database cleared and resynced successfully.");
// Sync Database (creates tables if they don't exist)
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced successfully');
}).catch((err) => {
  console.error('Error syncing database:', err);
});

app.use('/api/auth', require('./routes/authRoutes'));
// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/education', require('./routes/educationRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/website', require('./routes/websiteRoutes'));
app.use('/api/experience', require('./routes/experienceRoutes'));
app.use('/api/project', require('./routes/projectRoutes'));
app.use('/api/user', require('./routes/completeProfileRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(process.env.PORT || 5000, () => console.log('Server Active'));