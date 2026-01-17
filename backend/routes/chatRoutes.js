const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Message = require('../models/Message');
const User = require('../models/User');
// Assuming you have an auth middleware
const auth = require('../middleware/auth'); 

// Get history between two users
router.get('/history/:otherUserId', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUserId } = req.params;

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId }
        ]
      },
      order: [['createdAt', 'ASC']]
    });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Error fetching chat history" });
  }
});

module.exports = router;