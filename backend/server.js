const express = require('express');
const cors = require('cors');
const passport = require('passport');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const { sequelize, connectDB } = require('./config/database');

// Import All Models
const User = require('./models/User');
const Resume = require('./models/Resume');
const Question = require('./models/Question');
const Submission = require('./models/Submission');
const Message = require('./models/Message'); // <--- ADD THIS

const authRoutes = require('./routes/authRoutes');
const oaRoutes = require('./routes/oaRoutes');
const chatRoutes = require('./routes/chatRoutes'); // <--- ADD THIS

const app = express();
const server = http.createServer(app);

// 1. Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// 2. Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
require('./config/passport');

// 3. Make 'io' accessible in controllers
app.set('socketio', io);

// 4. Socket Connection Logic (Corrected Block)
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // Real-time Chat & OA Notification Rooms
  socket.on('join_session', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their private room`);
  });

  // Chat Message Logic
  socket.on('send_message', async (data) => {
    const { senderId, receiverId, content } = data;
    try {
      // Save to DB
      const newMessage = await Message.create({ senderId, receiverId, content });

      // Send to receiver
      io.to(receiverId).emit('receive_message', newMessage);
      
      // Confirm to sender
      socket.emit('message_sent', newMessage);
    } catch (err) {
      console.error("Chat Error:", err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// 5. Routes
app.use('/api/auth', authRoutes);
app.use('/api/oa', oaRoutes);
app.use('/api/chat', chatRoutes); // <--- ADD THIS

// 6. Start App
const startApp = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true }); 
    console.log('--- Database Synced & WebSockets Ready ---');

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server + WebSockets active on: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startApp();