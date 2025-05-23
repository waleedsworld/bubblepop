
import React, { useState, useEffect, useCallback } from 'react';
import Bubble from './Bubble';

interface BubbleGridProps {
  onBubblePop: () => void;
}

interface BubbleData {
  id: string;
  x: number;
  y: number;
  size: number;
  isPopped: boolean;
  regenerateTime?: number;
}

const BubbleGrid: React.FC<BubbleGridProps> = ({ onBubblePop }) => {
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);
  const [gridDimensions, setGridDimensions] = useState({ rows: 0, cols: 0 });

  // Generate initial bubble grid
  const generateBubbles = useCallback(() => {
    const containerWidth = Math.min(window.innerWidth - 32, 800);
    const containerHeight = Math.min(window.innerHeight - 300, 600);
    const bubbleSize = 45;
    const spacing = 55;
    
    const cols = Math.floor(containerWidth / spacing);
    const rows = Math.floor(containerHeight / spacing);
    
    setGridDimensions({ rows, cols });
    
    const newBubbles: BubbleData[] = [];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * spacing + spacing / 2;
        const y = row * spacing + spacing / 2;
        const sizeVariation = Math.random() * 8 - 4; // ±4px variation
        
        newBubbles.push({
          id: `bubble-${row}-${col}`,
          x,
          y,
          size: bubbleSize + sizeVariation,
          isPopped: false,
        });
      }
    }
    
    setBubbles(newBubbles);
  }, []);

  useEffect(() => {
    generateBubbles();
    
    const handleResize = () => {
      generateBubbles();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [generateBubbles]);

  // Handle bubble regeneration
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles(prev => 
        prev.map(bubble => {
          if (bubble.isPopped && bubble.regenerateTime && Date.now() >= bubble.regenerateTime) {
            return {
              ...bubble,
              isPopped: false,
              regenerateTime: undefined
            };
          }
          return bubble;
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleBubbleClick = useCallback((bubbleId: string) => {
    setBubbles(prev =>
      prev.map(bubble => {
        if (bubble.id === bubbleId && !bubble.isPopped) {
          onBubblePop();
          return {
            ...bubble,
            isPopped: true,
            regenerateTime: Date.now() + 2000 + Math.random() * 3000 // 2-5 seconds
          };
        }
        return bubble;
      })
    );
  }, [onBubblePop]);

  const containerWidth = gridDimensions.cols * 55;
  const containerHeight = gridDimensions.rows * 55;

  return (
    <div className="flex justify-center">
      <div 
        className="relative bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-3xl p-6 shadow-2xl border border-white/50"
        style={{
          width: containerWidth + 48,
          height: containerHeight + 48,
        }}
      >
        <div className="absolute inset-6 overflow-hidden">
          {bubbles.map((bubble) => (
            <Bubble
              key={bubble.id}
              id={bubble.id}
              x={bubble.x}
              y={bubble.y}
              size={bubble.size}
              isPopped={bubble.isPopped}
              onClick={handleBubbleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BubbleGrid;
