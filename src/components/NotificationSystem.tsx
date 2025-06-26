import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageCircle, UserPlus, Eye } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'message' | 'view';
  title: string;
  message: string;
  avatar?: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
  onMarkAsRead,
  onClearAll
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment': return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow': return <UserPlus className="w-5 h-5 text-green-500" />;
      case 'message': return <MessageCircle className="w-5 h-5 text-purple-500" />;
      case 'view': return <Eye className="w-5 h-5 text-cyan-500" />;
      default: return null;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return date.toLocaleDateString();
  };

  return (
    <div className="fixed top-20 right-4 z-50 w-80 max-h-96 overflow-hidden">
      <AnimatePresence>
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold">Notifications</h3>
              <button
                onClick={onClearAll}
                className="text-gray-400 hover:text-white text-sm"
              >
                Clear all
              </button>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {notifications.slice(0, 5).map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    notification.read 
                      ? 'bg-gray-800/50' 
                      : 'bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30'
                  }`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {notification.avatar ? (
                        <img
                          src={notification.avatar}
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        getIcon(notification.type)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">
                        {notification.title}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {notification.message}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {formatTime(notification.timestamp)}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            backdropFilter: 'blur(20px)',
          },
        }}
      />
    </div>
  );
};

export default NotificationSystem;

// Toast notification helpers
export const showNotification = {
  like: (username: string) => toast.success(`${username} liked your post! ❤️`),
  comment: (username: string) => toast.success(`${username} commented on your post! 💬`),
  follow: (username: string) => toast.success(`${username} started following you! 👥`),
  message: (username: string) => toast.success(`New message from ${username}! 📩`),
  view: (count: number) => toast.success(`Your profile was viewed ${count} times! 👀`),
};