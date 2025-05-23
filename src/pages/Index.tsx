
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import BubbleGrid from '../components/BubbleGrid';
import StatsPanel from '../components/StatsPanel';
import Header from '../components/Header';

const Index = () => {
  const [poppedCount, setPoppedCount] = useState(0);
  const [sessionStartTime] = useState(Date.now());
  const [lastPopTime, setLastPopTime] = useState<number | null>(null);

  const handleBubblePop = useCallback(() => {
    setPoppedCount(prev => prev + 1);
    setLastPopTime(Date.now());
    
    // Haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }, []);

  const sessionDuration = useMemo(() => {
    return Math.floor((Date.now() - sessionStartTime) / 1000);
  }, [sessionStartTime, poppedCount]); // Update when poppedCount changes

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Virtual Bubble Wrap
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pop bubbles endlessly for the ultimate stress relief experience. 
            Each bubble regenerates automatically for infinite satisfaction!
          </p>
        </div>
        
        <StatsPanel 
          poppedCount={poppedCount}
          sessionDuration={sessionDuration}
          lastPopTime={lastPopTime}
        />
        
        <BubbleGrid onBubblePop={handleBubblePop} />
      </main>
    </div>
  );
};

export default Index;
