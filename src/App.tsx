import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './hooks/useAuth';
import { usePosts } from './hooks/usePosts';
import { useChat } from './hooks/useChat';
import { useNotifications } from './hooks/useNotifications';
import LoadingScreen from './components/LoadingScreen';
import Login from './components/Login';
import BottomNavigation from './components/BottomNavigation';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';
import Messages from './components/Messages';
import Explore from './components/Explore';
import CinematicBackground from './components/CinematicBackground';
import NotificationSystem from './components/NotificationSystem';
import AnimatedCard from './components/AnimatedCard';
import AuthCallback from './pages/AuthCallback';
// import { Route } from 'react-router-dom';

function App() {
  const { currentUser, users, isLoading: authLoading, login, logout, updateUser, followUser, unfollowUser, incrementProfileViews } = useAuth();
  const { posts, isLoading: postsLoading, createPost, likePost, addComment } = usePosts();
  const { chats, isLoading: chatsLoading, sendMessage } = useChat();
  const { notifications, addNotification, markAsRead, clearAll, unreadCount } = useNotifications();
  const [activeTab, setActiveTab] = useState('home');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const isLoading = authLoading || postsLoading || chatsLoading;

  useEffect(() => {
    if (activeTab === 'create' && currentUser) {
      setShowCreatePost(true);
      setActiveTab('home');
    }
  }, [activeTab, currentUser]);

  const handleCreatePost = (content: string, image?: string) => {
    if (currentUser) {
      createPost(currentUser.id, content, image);
      addNotification({
        type: 'message',
        title: 'Post Created',
        message: 'Your post has been shared successfully!'
      });
    }
  };

  const handleSendMessage = (chatId: string, content: string) => {
    if (currentUser) {
      const chat = chats.find(c => c.id === chatId);
      const receiverId = chat?.participants.find(id => id !== currentUser.id);
      if (receiverId) {
        sendMessage(chatId, currentUser.id, receiverId, content);
        const receiver = users.find(u => u.id === receiverId);
        if (receiver) {
          addNotification({
            type: 'message',
            title: 'Message Sent',
            message: `Message sent to ${receiver.username}`,
            avatar: receiver.avatar
          });
        }
      }
    }
  };

  const handleNotification = (type: string, message: string) => {
    addNotification({
      type: type as any,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      message
    });
  };

  const handleProfileView = (userId: string) => {
    incrementProfileViews(userId);
    const user = users.find(u => u.id === userId);
    if (user && user.id !== currentUser?.id) {
      addNotification({
        type: 'view',
        title: 'Profile View',
        message: `Someone viewed ${user.username}'s profile`,
        avatar: user.avatar
      });
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!currentUser) {
    return (
      <>
        <CinematicBackground />
        <Login onLogin={login} />
      </>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <motion.div 
            className="max-w-2xl mx-auto space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedCard className="p-6">
              <div className="flex items-center space-x-4">
                <motion.img
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  className="w-12 h-12 rounded-full object-cover"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                />
                <motion.button
                  onClick={() => setShowCreatePost(true)}
                  className="flex-1 bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-left text-gray-400 hover:bg-gray-700 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  What's on your mind?
                </motion.button>
              </div>
            </AnimatedCard>

            {posts.map((post, index) => {
              const author = users.find(user => user.id === post.userId);
              if (!author) return null;
              
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  author={author}
                  currentUser={currentUser}
                  onLike={() => likePost(post.id, currentUser.id)}
                  onComment={(content) => addComment(post.id, currentUser.id, content)}
                  onNotification={handleNotification}
                />
              );
            })}
          </motion.div>
        );

      case 'explore':
        return (
          <Explore
            users={users}
            currentUser={currentUser}
            onFollowUser={followUser}
            onUnfollowUser={unfollowUser}
          />
        );

      case 'messages':
        return (
          <Messages
            chats={chats}
            users={users}
            currentUser={currentUser}
            onSendMessage={handleSendMessage}
          />
        );

      case 'profile':
        const profileUser = selectedUserId 
          ? users.find(u => u.id === selectedUserId) || currentUser
          : currentUser;
        
        return (
          <Profile
            user={profileUser}
            posts={posts}
            currentUser={currentUser}
            isOwnProfile={profileUser.id === currentUser.id}
            onFollow={() => followUser(profileUser.id)}
            onUnfollow={() => unfollowUser(profileUser.id)}
            onLogout={logout}
            onUpdateProfile={updateUser}
            onProfileView={handleProfileView}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <CinematicBackground />
      <div className="min-h-screen relative z-10">
        <div className="container mx-auto px-4 py-6 pb-20">
          {/* Header */}
          <motion.header 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white font-bold text-lg">NxG</span>
              </motion.div>
              <h1 className="text-2xl font-bold text-white">NextGen</h1>
            </div>
            <div className="flex items-center space-x-3">
              <motion.img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/50"
                whileHover={{ scale: 1.1 }}
              />
              <span className="text-white font-medium hidden sm:block">{currentUser.username}</span>
              {unreadCount > 0 && (
                <motion.div
                  className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {unreadCount}
                </motion.div>
              )}
            </div>
          </motion.header>

          {/* Main Content */}
          <main className="min-h-[calc(100vh-10rem)]">
            {renderContent()}
          </main>

          {/* Create Post Modal */}
          {showCreatePost && (
            <CreatePost
              currentUser={currentUser}
              onCreatePost={handleCreatePost}
              onClose={() => setShowCreatePost(false)}
            />
          )}

          {/* Bottom Navigation */}
          <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Notification System */}
          <NotificationSystem
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onClearAll={clearAll}
          />
        </div>
      </div>
    </>
  );
}

export default App;