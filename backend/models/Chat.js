const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  messages: [messageSchema],
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema); 