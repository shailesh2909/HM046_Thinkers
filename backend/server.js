require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/database');
// require('./config/passport'); // Temporarily disabled - needs User model fields
const models = require('./models'); // Import all models with relationships

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Sync Database (creates tables if they don't exist)
console.log('Starting database sync...');
sequelize.sync({ force: true }).then(() => {
  console.log('✅ Database synced successfully - All tables created');
  console.log('Tables:', Object.keys(sequelize.models));
}).catch((err) => {
  console.error('❌ Error syncing database:', err.message);
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

// Company Management Routes
app.use('/api/company', require('./routes/companyRoutes'));
app.use('/api/company-website', require('./routes/companyWebsiteRoutes'));
app.use('/api/company-project', require('./routes/companyProjectRoutes'));
app.use('/api/milestone', require('./routes/projectMilestoneRoutes'));
app.use('/api/complete-company', require('./routes/completeCompanyRoutes'));

// AI Applicant Matching Routes
app.use('/api/matching', require('./routes/applicantMatchingRoutes'));

// Resume Parsing Routes
app.use('/api/resume', require('./routes/resumeParsingRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(process.env.PORT || 5000, () => console.log('Server Active'));