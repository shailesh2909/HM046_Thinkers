/**
 * ==============================
 * SERVER CONFIGURATION
 * ==============================
 */

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

/**
 * ==============================
 * DATABASE
 * ==============================
 */
const { sequelize, connectDB } = require('./config/database');

/**
 * ==============================
 * MODELS (IMPORT ONCE)
 * ==============================
 */
// Import models with relationships from index.js
require('./models/index');
const User = require('./models/User');
const Resume = require('./models/Resume');
const Question = require('./models/Question');
const Submission = require('./models/Submission');
const Message = require('./models/Message');

/**
 * ==============================
 * ROUTES
 * ==============================
 */
const authRoutes = require('./routes/authRoutes');
const oaRoutes = require('./routes/oaRoutes');
const chatRoutes = require('./routes/chatRoutes');

const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const educationRoutes = require('./routes/educationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const websiteRoutes = require('./routes/websiteRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const projectRoutes = require('./routes/projectRoutes');
const completeProfileRoutes = require('./routes/completeProfileRoutes');

const companyRoutes = require('./routes/companyRoutes');
const companyWebsiteRoutes = require('./routes/companyWebsiteRoutes');
const companyProjectRoutes = require('./routes/companyProjectRoutes');
const projectMilestoneRoutes = require('./routes/projectMilestoneRoutes');
const completeCompanyRoutes = require('./routes/completeCompanyRoutes');

const applicantMatchingRoutes = require('./routes/applicantMatchingRoutes');
const resumeParsingRoutes = require('./routes/resumeParsingRoutes');

/**
 * ==============================
 * APP INITIALIZATION
 * ==============================
 */
const app = express();
const server = http.createServer(app);

/**
 * ==============================
 * SOCKET.IO CONFIG
 * ==============================
 */
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

/**
 * ==============================
 * MIDDLEWARE
 * ==============================
 */
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
require('./config/passport');

/**
 * Make socket available in controllers
 */
app.set('socketio', io);

/**
 * ==============================
 * SOCKET CONNECTION LOGIC
 * ==============================
 */
io.on('connection', (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);

  socket.on('join_session', (userId) => {
    socket.join(userId);
    console.log(`👤 User ${userId} joined private room`);
  });

  socket.on('send_message', async ({ senderId, receiverId, content }) => {
    try {
      const newMessage = await Message.create({
        senderId,
        receiverId,
        content
      });

      io.to(receiverId).emit('receive_message', newMessage);
      socket.emit('message_sent', newMessage);

    } catch (err) {
      console.error('❌ Chat Error:', err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected');
  });
});

/**
 * ==============================
 * API ROUTES
 * ==============================
 */
app.use('/api/auth', authRoutes);
app.use('/api/oa', oaRoutes);
app.use('/api/chat', chatRoutes);

app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/website', websiteRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/user', completeProfileRoutes);

app.use('/api/company', companyRoutes);
app.use('/api/company-website', companyWebsiteRoutes);
app.use('/api/company-project', companyProjectRoutes);
app.use('/api/milestone', projectMilestoneRoutes);
app.use('/api/complete-company', completeCompanyRoutes);

app.use('/api/matching', applicantMatchingRoutes);
app.use('/api/resume', resumeParsingRoutes);

/**
 * ==============================
 * HEALTH CHECK
 * ==============================
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

/**
 * ==============================
 * START SERVER
 * ==============================
 */
const startApp = async () => {
  try {
    await connectDB();
    await sequelize.sync({ force: true });

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Server startup failed:', err.message);
    process.exit(1);
  }
};

startApp();
