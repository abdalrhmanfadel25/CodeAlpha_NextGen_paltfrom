import React, { useState } from 'react';
import { Search, TrendingUp, Users, Hash, MapPin } from 'lucide-react';
import { User } from '../types';

interface ExploreProps {
  users: User[];
  currentUser: User;
  onFollowUser: (userId: string) => void;
  onUnfollowUser: (userId: string) => void;
}

const Explore: React.FC<ExploreProps> = ({ users, currentUser, onFollowUser, onUnfollowUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('users');

  const categories = [
    { id: 'users', icon: Users, label: 'People' },
    { id: 'trending', icon: TrendingUp, label: 'Trending' },
    { id: 'hashtags', icon: Hash, label: 'Hashtags' },
    { id: 'places', icon: MapPin, label: 'Places' },
  ];

  const filteredUsers = users.filter(user => 
    user.id !== currentUser.id && 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trendingTopics = [
    { tag: '#DigitalArt', posts: '12.5K posts' },
    { tag: '#Photography', posts: '8.3K posts' },
    { tag: '#TechNews', posts: '6.7K posts' },
    { tag: '#UI/UX', posts: '4.2K posts' },
    { tag: '#WebDev', posts: '3.8K posts' },
  ];

  const suggestedPlaces = [
    { name: 'San Francisco, CA', posts: '45K posts' },
    { name: 'New York, NY', posts: '78K posts' },
    { name: 'Los Angeles, CA', posts: '52K posts' },
    { name: 'Seattle, WA', posts: '23K posts' },
  ];

  const renderContent = () => {
    switch (activeCategory) {
      case 'users':
        return (
          <div className="space-y-4">
            {filteredUsers.map((user) => {
              const isFollowing = currentUser.following.includes(user.id);
              return (
                <div key={user.id} className="bg-gray-700/50 rounded-xl p-4 hover:bg-gray-700/70 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <h3 className="font-semibold text-white">{user.username}</h3>
                        <p className="text-gray-400 text-sm">{user.bio}</p>
                        <p className="text-gray-500 text-xs">
                          {user.followers.length} followers • {user.following.length} following
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => isFollowing ? onUnfollowUser(user.id) : onFollowUser(user.id)}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                        isFollowing
                          ? 'bg-gray-600 text-white hover:bg-gray-700'
                          : 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-600 hover:to-cyan-600'
                      }`}
                    >
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 'trending':
        return (
          <div className="space-y-4">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="bg-gray-700/50 rounded-xl p-4 hover:bg-gray-700/70 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-purple-400 text-lg">{topic.tag}</h3>
                    <p className="text-gray-400 text-sm">{topic.posts}</p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
            ))}
          </div>
        );

      case 'hashtags':
        return (
          <div className="grid grid-cols-2 gap-4">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-xl p-6 hover:from-purple-600/30 hover:to-cyan-600/30 transition-all cursor-pointer">
                <Hash className="w-8 h-8 text-purple-400 mb-2" />
                <h3 className="font-semibold text-white">{topic.tag.replace('#', '')}</h3>
                <p className="text-gray-400 text-sm">{topic.posts}</p>
              </div>
            ))}
          </div>
        );

      case 'places':
        return (
          <div className="space-y-4">
            {suggestedPlaces.map((place, index) => (
              <div key={index} className="bg-gray-700/50 rounded-xl p-4 hover:bg-gray-700/70 transition-all cursor-pointer">
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-cyan-400 mr-3" />
                  <div>
                    <h3 className="font-semibold text-white">{place.name}</h3>
                    <p className="text-gray-400 text-sm">{place.posts}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-white mb-4">Explore</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for people, hashtags, or places..."
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl mb-6">
        <div className="flex overflow-x-auto">
          {categories.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex items-center space-x-2 px-6 py-4 font-semibold whitespace-nowrap transition-all ${
                activeCategory === id
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Explore;