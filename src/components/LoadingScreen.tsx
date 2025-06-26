import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-purple-500/30 rounded-full animate-spin border-t-purple-500"></div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-cyan-500/30 rounded-full animate-spin border-t-cyan-500 animation-delay-150"></div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">NextGen</h2>
        <p className="text-gray-400">Loading your universe...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;