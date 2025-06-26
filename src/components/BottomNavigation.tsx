import React from 'react';
import { Home, Search, PlusCircle, MessageCircle, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'explore', icon: Search, label: 'Explore' },
    { id: 'create', icon: PlusCircle, label: 'Create' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 py-2 z-40">
      <div className="flex justify-around">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
              activeTab === id
                ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon 
              className={`w-6 h-6 mb-1 transition-all ${
                activeTab === id ? 'scale-110' : 'scale-100'
              }`} 
            />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;