const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/database');
const models = require('./models'); // Import all models with relationships

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// Sync Database (creates tables if they don't exist)
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced successfully');
}).catch((err) => {
  console.error('Error syncing database:', err);
});

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));