import { useState, useEffect } from 'react';
import { Chat, Message } from '../types';

const MOCK_CHATS: Chat[] = [
  {
    id: '1',
    participants: ['1', '2'],
    messages: [
      {
        id: '1',
        senderId: '2',
        receiverId: '1',
        content: 'Hey! Love your latest project 🚀',
        createdAt: new Date('2024-12-10T11:00:00'),
        read: true
      },
      {
        id: '2',
        senderId: '1',
        receiverId: '2',
        content: 'Thanks! Your art piece was incredible too ✨',
        createdAt: new Date('2024-12-10T11:05:00'),
        read: true
      },
      {
        id: '3',
        senderId: '2',
        receiverId: '1',
        content: 'We should collaborate sometime!',
        createdAt: new Date('2024-12-10T11:10:00'),
        read: false
      }
    ],
    lastMessage: {
      id: '3',
      senderId: '2',
      receiverId: '1',
      content: 'We should collaborate sometime!',
      createdAt: new Date('2024-12-10T11:10:00'),
      read: false
    }
  }
];

export const useChat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedChats = localStorage.getItem('chats');
      if (savedChats) {
        setChats(JSON.parse(savedChats));
      } else {
        setChats(MOCK_CHATS);
        localStorage.setItem('chats', JSON.stringify(MOCK_CHATS));
      }
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const sendMessage = (chatId: string, senderId: string, receiverId: string, content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId,
      receiverId,
      content,
      createdAt: new Date(),
      read: false
    };

    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: newMessage
        };
      }
      return chat;
    });

    setChats(updatedChats);
    localStorage.setItem('chats', JSON.stringify(updatedChats));
  };

  const createChat = (userId: string, otherUserId: string) => {
    const existingChat = chats.find(chat => 
      chat.participants.includes(userId) && chat.participants.includes(otherUserId)
    );

    if (existingChat) {
      return existingChat.id;
    }

    const newChat: Chat = {
      id: Date.now().toString(),
      participants: [userId, otherUserId],
      messages: []
    };

    const updatedChats = [...chats, newChat];
    setChats(updatedChats);
    localStorage.setItem('chats', JSON.stringify(updatedChats));
    
    return newChat.id;
  };

  return {
    chats,
    isLoading,
    sendMessage,
    createChat
  };
};