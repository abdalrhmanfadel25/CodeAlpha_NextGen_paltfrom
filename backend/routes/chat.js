const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Chat = require('../models/Chat');

// Get user's chats
router.get('/', auth, async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.user.id })
      .populate('participants', ['username', 'avatar'])
      .sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Send a message
router.post('/send', auth, async (req, res) => {
  const { receiverId, content } = req.body;
  try {
    let chat = await Chat.findOne({
      participants: { $all: [req.user.id, receiverId] },
    });
    if (!chat) {
      chat = new Chat({ participants: [req.user.id, receiverId] });
    }
    const message = {
      sender: req.user.id,
      receiver: receiverId,
      content,
    };
    chat.messages.push(message);
    await chat.save();
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 