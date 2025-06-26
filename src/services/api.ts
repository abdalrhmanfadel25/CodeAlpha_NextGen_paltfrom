// src/services/api.js
import axios from 'axios';
  

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const authAPI = {
  login: (credentials: { email: string; password: string }) => api.post('/auth/login', credentials),
  register: (userData: { username: string; email: string; password: string }) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
};

export const postsAPI = {
  getPosts: () => api.get('/posts'),
  createPost: (postData: { content: string; image?: string | File }) => {
    if (postData.image instanceof File) {
      const formData = new FormData();
      formData.append('content', postData.content);
      formData.append('image', postData.image);
      return api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      return api.post('/posts', postData);
    }
  },
  likePost: (postId: string) => api.post(`/posts/${postId}/like`),
};

export default api;
