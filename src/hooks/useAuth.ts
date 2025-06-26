import { useState, useEffect } from 'react';
import { User } from '../types';

const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    bio: 'Digital creator & tech enthusiast 🚀',
    followers: ['2', '3'],
    following: ['2'],
    createdAt: new Date('2024-01-01'),
    totalLikes: 245,
    profileViews: 1250
  },
  {
    id: '2',
    username: 'sarahwilson',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    bio: 'Artist & Designer ✨ Creating beautiful things',
    followers: ['1', '3'],
    following: ['1', '3'],
    createdAt: new Date('2024-01-15'),
    totalLikes: 189,
    profileViews: 890
  },
  {
    id: '3',
    username: 'mikejones',
    email: 'mike@example.com',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    bio: 'Photographer 📸 Capturing moments',
    followers: ['1', '2'],
    following: ['2'],
    createdAt: new Date('2024-02-01'),
    totalLikes: 312,
    profileViews: 1450
  }
];

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const login = (email: string, password: string) => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const followUser = (userId: string) => {
    if (!currentUser) return;
    
    const updatedUser = {
      ...currentUser,
      following: [...currentUser.following, userId]
    };
    
    const targetUser = users.find(u => u.id === userId);
    if (targetUser) {
      const updatedTargetUser = {
        ...targetUser,
        followers: [...targetUser.followers, currentUser.id]
      };
      setUsers(prev => prev.map(u => 
        u.id === userId ? updatedTargetUser : 
        u.id === currentUser.id ? updatedUser : u
      ));
    }
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const unfollowUser = (userId: string) => {
    if (!currentUser) return;
    
    const updatedUser = {
      ...currentUser,
      following: currentUser.following.filter(id => id !== userId)
    };
    
    const targetUser = users.find(u => u.id === userId);
    if (targetUser) {
      const updatedTargetUser = {
        ...targetUser,
        followers: targetUser.followers.filter(id => id !== currentUser.id)
      };
      setUsers(prev => prev.map(u => 
        u.id === userId ? updatedTargetUser : 
        u.id === currentUser.id ? updatedUser : u
      ));
    }
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const incrementProfileViews = (userId: string) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, profileViews: u.profileViews + 1 } : u
    ));
  };

  return {
    currentUser,
    users,
    isLoading,
    login,
    logout,
    updateUser,
    followUser,
    unfollowUser,
    incrementProfileViews
  };
};