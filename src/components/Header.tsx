
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">🫧</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">BubbleWrap</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              Themes
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              Leaderboard
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              Settings
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
