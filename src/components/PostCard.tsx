import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share, MoreHorizontal, User } from 'lucide-react';
import { Post, User as UserType } from '../types';
import AnimatedCard from './AnimatedCard';
import { showNotification } from './NotificationSystem';

interface PostCardProps {
  post: Post;
  author: UserType;
  currentUser: UserType;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onNotification?: (type: string, message: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  author, 
  currentUser, 
  onLike, 
  onComment,
  onNotification 
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser.id));

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(post.id);
    
    if (!isLiked && author.id !== currentUser.id) {
      showNotification.like(currentUser.username);
      onNotification?.('like', `${currentUser.username} liked your post`);
    }
  };

  const handleComment = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
      
      if (author.id !== currentUser.id) {
        showNotification.comment(currentUser.username);
        onNotification?.('comment', `${currentUser.username} commented on your post`);
      }
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return 'now';
  };

  return (
    <AnimatedCard className="p-6 mb-6 hover:border-purple-500/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <motion.img
            src={author.avatar}
            alt={author.username}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-gradient-to-r from-purple-500 to-cyan-500 p-0.5"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <div className="ml-3">
            <h3 className="font-semibold text-white">{author.username}</h3>
            <p className="text-gray-400 text-sm">{formatTimeAgo(post.createdAt)} ago</p>
          </div>
        </motion.div>
        <motion.button 
          className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700/50 transition-all"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <MoreHorizontal className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Content */}
      <motion.div 
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-gray-100 leading-relaxed">{post.content}</p>
        {post.image && (
          <motion.div 
            className="mt-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-80 object-cover rounded-xl"
            />
          </motion.div>
        )}
      </motion.div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
        <div className="flex items-center space-x-6">
          <motion.button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-all duration-200 ${
              isLiked
                ? 'text-red-500 hover:text-red-400'
                : 'text-gray-400 hover:text-red-500'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
            <span className="font-medium">{post.likes.length}</span>
          </motion.button>
          
          <motion.button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="font-medium">{post.comments.length}</span>
          </motion.button>
          
          <motion.button 
            className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-all duration-200"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <motion.div 
          className="mt-6 pt-6 border-t border-gray-700/50"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-4 mb-4">
            {post.comments.map((comment, index) => (
              <motion.div 
                key={comment.id} 
                className="flex space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <User className="w-8 h-8 text-gray-400 bg-gray-700 rounded-full p-1" />
                <div className="flex-1">
                  <div className="bg-gray-700/50 rounded-xl p-3">
                    <p className="text-gray-100 text-sm">{comment.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(comment.createdAt)} ago</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex space-x-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 flex space-x-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleComment()}
              />
              <motion.button
                onClick={handleComment}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-2 rounded-xl font-medium hover:from-purple-600 hover:to-cyan-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Post
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatedCard>
  );
};

export default PostCard;