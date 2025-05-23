
import React from 'react';

interface StatsPanelProps {
  poppedCount: number;
  sessionDuration: number;
  lastPopTime: number | null;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ 
  poppedCount, 
  sessionDuration, 
  lastPopTime 
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculatePopsPerMinute = () => {
    if (sessionDuration === 0) return 0;
    return Math.round((poppedCount / sessionDuration) * 60);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {poppedCount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Bubbles Popped</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-indigo-600 mb-1">
            {formatTime(sessionDuration)}
          </div>
          <div className="text-sm text-gray-600">Session Time</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">
            {calculatePopsPerMinute()}
          </div>
          <div className="text-sm text-gray-600">Pops/Min</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {lastPopTime ? '🎯' : '⏱️'}
          </div>
          <div className="text-sm text-gray-600">Status</div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
