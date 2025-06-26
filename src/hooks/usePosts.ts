import { useState, useEffect } from 'react';
import { Post, Comment } from '../types';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: '2',
    content: 'Just finished this amazing digital art piece! What do you think? 🎨✨',
    image: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: ['1', '3'],
    comments: [
      {
        id: '1',
        userId: '1',
        postId: '1',
        content: 'This is absolutely stunning! 🔥',
        createdAt: new Date('2024-12-10T10:30:00')
      }
    ],
    createdAt: new Date('2024-12-10T10:00:00')
  },
  {
    id: '2',
    userId: '3',
    content: 'Golden hour magic 📸 Sometimes the best moments happen when you least expect them.',
    image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: ['1', '2'],
    comments: [],
    createdAt: new Date('2024-12-10T08:45:00')
  },
  {
    id: '3',
    userId: '1',
    content: 'Working on some exciting new projects! Can\'t wait to share what I\'ve been building 🚀💻',
    likes: ['2'],
    comments: [
      {
        id: '2',
        userId: '2',
        postId: '3',
        content: 'Can\'t wait to see it!',
        createdAt: new Date('2024-12-10T09:15:00')
      }
    ],
    createdAt: new Date('2024-12-10T09:00:00')
  }
];

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedPosts = localStorage.getItem('posts');
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      } else {
        setPosts(MOCK_POSTS);
        localStorage.setItem('posts', JSON.stringify(MOCK_POSTS));
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const createPost = (userId: string, content: string, image?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      userId,
      content,
      image,
      likes: [],
      comments: [],
      createdAt: new Date()
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const likePost = (postId: string, userId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(userId);
        return {
          ...post,
          likes: isLiked 
            ? post.likes.filter(id => id !== userId)
            : [...post.likes, userId]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const addComment = (postId: string, userId: string, content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      userId,
      postId,
      content,
      createdAt: new Date()
    };

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const deletePost = (postId: string) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  return {
    posts,
    isLoading,
    createPost,
    likePost,
    addComment,
    deletePost
  };
};