import React, { useState } from 'react';
import { Send, ArrowLeft, Search, Phone, Video } from 'lucide-react';
import { Chat, User } from '../types';

interface MessagesProps {
  chats: Chat[];
  users: User[];
  currentUser: User;
  onSendMessage: (chatId: string, content: string) => void;
}

const Messages: React.FC<MessagesProps> = ({ chats, users, currentUser, onSendMessage }) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const selectedChatData = chats.find(chat => chat.id === selectedChat);
  const otherParticipant = selectedChatData 
    ? users.find(user => 
        selectedChatData.participants.includes(user.id) && user.id !== currentUser.id
      )
    : null;

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const receiverId = selectedChatData?.participants.find(id => id !== currentUser.id);
      if (receiverId) {
        onSendMessage(selectedChat, newMessage);
        setNewMessage('');
      }
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredChats = chats.filter(chat => {
    const otherUser = users.find(user => 
      chat.participants.includes(user.id) && user.id !== currentUser.id
    );
    return otherUser?.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50">
      {/* Chat List */}
      <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-gray-700/50`}>
        <div className="p-4 border-b border-gray-700/50">
          <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => {
            const otherUser = users.find(user => 
              chat.participants.includes(user.id) && user.id !== currentUser.id
            );
            
            if (!otherUser) return null;

            return (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`flex items-center p-4 cursor-pointer transition-all hover:bg-gray-700/50 ${
                  selectedChat === chat.id ? 'bg-gray-700/50' : ''
                }`}
              >
                <img
                  src={otherUser.avatar}
                  alt={otherUser.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{otherUser.username}</h3>
                    {chat.lastMessage && (
                      <span className="text-xs text-gray-400">
                        {formatTime(chat.lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  {chat.lastMessage && (
                    <p className="text-sm text-gray-400 truncate">
                      {chat.lastMessage.content}
                    </p>
                  )}
                </div>
                {chat.lastMessage && !chat.lastMessage.read && chat.lastMessage.senderId !== currentUser.id && (
                  <div className="w-3 h-3 bg-purple-500 rounded-full ml-2"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Interface */}
      {selectedChat && selectedChatData && otherParticipant ? (
        <div className="flex flex-col flex-1">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
            <div className="flex items-center">
              <button
                onClick={() => setSelectedChat(null)}
                className="md:hidden mr-3 text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <img
                src={otherParticipant.avatar}
                alt={otherParticipant.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <h3 className="font-semibold text-white">{otherParticipant.username}</h3>
                <p className="text-sm text-green-400">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-all">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-all">
                <Video className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedChatData.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.senderId === currentUser.id
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderId === currentUser.id ? 'text-purple-100' : 'text-gray-400'
                  }`}>
                    {formatTime(message.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-700/50">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white p-2 rounded-xl hover:from-purple-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Send className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Your Messages</h3>
            <p className="text-gray-400">Select a conversation to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;