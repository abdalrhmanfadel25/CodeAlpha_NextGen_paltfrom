import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Settings, Users, Grid, LogOut, Camera, Heart, Eye } from 'lucide-react';
import { User, Post } from '../types';
import AnimatedCard from './AnimatedCard';

interface ProfileProps {
  user: User;
  posts: Post[];
  currentUser: User;
  isOwnProfile: boolean;
  onFollow?: () => void;
  onUnfollow?: () => void;
  onLogout?: () => void;
  onUpdateProfile?: (updatedUser: User) => void;
  onProfileView?: (userId: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ 
  user, 
  posts, 
  currentUser, 
  isOwnProfile, 
  onFollow, 
  onUnfollow, 
  onLogout,
  onUpdateProfile,
  onProfileView
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [activeTab, setActiveTab] = useState('posts');

  const userPosts = posts.filter(post => post.userId === user.id);
  const isFollowing = currentUser.following.includes(user.id);

  useEffect(() => {
    if (!isOwnProfile && onProfileView) {
      onProfileView(user.id);
    }
  }, [user.id, isOwnProfile, onProfileView]);

  const handleSaveProfile = () => {
    if (onUpdateProfile) {
      onUpdateProfile(editedUser);
    }
    setIsEditing(false);
  };

  const avatarOptions = [
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <AnimatedCard className="p-8 mb-6 bg-gradient-to-r from-purple-600/20 to-cyan-600/20">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={editedUser.avatar}
              alt={editedUser.username}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-gradient-to-r from-purple-500 to-cyan-500 p-1"
            />
            {isEditing && (
              <motion.div 
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.1 }}
              >
                <Camera className="w-8 h-8 text-white" />
              </motion.div>
            )}
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <input
                  type="text"
                  value={editedUser.username}
                  onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                  className="text-2xl font-bold bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white w-full md:w-auto"
                />
                <textarea
                  value={editedUser.bio}
                  onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-300 resize-none"
                  rows={3}
                />
                <div className="grid grid-cols-5 gap-2">
                  {avatarOptions.map((avatar, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setEditedUser({ ...editedUser, avatar })}
                      className={`w-12 h-12 rounded-full overflow-hidden border-2 ${
                        editedUser.avatar === avatar ? 'border-purple-500' : 'border-gray-600'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-3xl font-bold text-white mb-2">{user.username}</h1>
                <p className="text-gray-300 mb-4 max-w-md">{user.bio}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <motion.div 
                    className="text-center bg-gray-800/50 rounded-xl p-3"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(147, 51, 234, 0.2)' }}
                  >
                    <div className="text-2xl font-bold text-white">{userPosts.length}</div>
                    <div className="text-gray-400 text-sm">Posts</div>
                  </motion.div>
                  <motion.div 
                    className="text-center bg-gray-800/50 rounded-xl p-3"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(147, 51, 234, 0.2)' }}
                  >
                    <div className="text-2xl font-bold text-white">{user.followers.length}</div>
                    <div className="text-gray-400 text-sm">Followers</div>
                  </motion.div>
                  <motion.div 
                    className="text-center bg-gray-800/50 rounded-xl p-3"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(147, 51, 234, 0.2)' }}
                  >
                    <div className="text-2xl font-bold text-white">{user.following.length}</div>
                    <div className="text-gray-400 text-sm">Following</div>
                  </motion.div>
                  <motion.div 
                    className="text-center bg-gray-800/50 rounded-xl p-3"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(147, 51, 234, 0.2)' }}
                  >
                    <div className="flex items-center justify-center text-2xl font-bold text-white">
                      <Heart className="w-5 h-5 mr-1 text-red-500" />
                      {user.totalLikes}
                    </div>
                    <div className="text-gray-400 text-sm">Total Likes</div>
                  </motion.div>
                  <motion.div 
                    className="text-center bg-gray-800/50 rounded-xl p-3"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(147, 51, 234, 0.2)' }}
                  >
                    <div className="flex items-center justify-center text-2xl font-bold text-white">
                      <Eye className="w-5 h-5 mr-1 text-cyan-500" />
                      {user.profileViews}
                    </div>
                    <div className="text-gray-400 text-sm">Profile Views</div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            <div className="flex justify-center md:justify-start space-x-3">
              {isOwnProfile ? (
                <>
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={handleSaveProfile}
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-purple-600 hover:to-cyan-600 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Save
                      </motion.button>
                      <motion.button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancel
                      </motion.button>
                    </div>
                  ) : (
                    <>
                      <motion.button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-600 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </motion.button>
                      <motion.button
                        onClick={onLogout}
                        className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </motion.button>
                    </>
                  )}
                </>
              ) : (
                <motion.button
                  onClick={isFollowing ? onUnfollow : onFollow}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-xl font-semibold transition-all ${
                    isFollowing
                      ? 'bg-gray-600 text-white hover:bg-gray-700'
                      : 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-600 hover:to-cyan-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Users className="w-4 h-4" />
                  <span>{isFollowing ? 'Unfollow' : 'Follow'}</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Content Tabs */}
      <AnimatedCard>
        <div className="border-b border-gray-700/50">
          <div className="flex">
            <motion.button
              onClick={() => setActiveTab('posts')}
              className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-all ${
                activeTab === 'posts'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <Grid className="w-5 h-5" />
              <span>Posts</span>
            </motion.button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'posts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userPosts.map((post, index) => (
                <motion.div 
                  key={post.id} 
                  className="aspect-square bg-gray-700 rounded-xl overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt="Post" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-4">
                      <p className="text-gray-300 text-center text-sm">{post.content}</p>
                    </div>
                  )}
                </motion.div>
              ))}
              {userPosts.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400">No posts yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Profile;