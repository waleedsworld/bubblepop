
import React, { useState, useEffect } from 'react';

interface BubbleProps {
  id: string;
  x: number;
  y: number;
  size: number;
  isPopped: boolean;
  onClick: (id: string) => void;
}

const Bubble: React.FC<BubbleProps> = ({ 
  id, 
  x, 
  y, 
  size, 
  isPopped, 
  onClick 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([]);

  const handleClick = () => {
    if (!isPopped && !isAnimating) {
      setIsAnimating(true);
      onClick(id);
      
      // Create particle explosion effect
      const newParticles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 100,
        vy: (Math.random() - 0.5) * 100,
      }));
      setParticles(newParticles);
      
      // Clear particles after animation
      setTimeout(() => {
        setParticles([]);
      }, 500);
    }
  };

  useEffect(() => {
    if (!isPopped) {
      setIsAnimating(false);
    }
  }, [isPopped]);

  const bubbleStyle: React.CSSProperties = {
    position: 'absolute',
    left: x - size / 2,
    top: y - size / 2,
    width: size,
    height: size,
    borderRadius: '50%',
    cursor: isPopped ? 'default' : 'pointer',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    transform: isAnimating ? 'scale(1.3)' : isPopped ? 'scale(0)' : 'scale(1)',
    opacity: isPopped ? 0 : 1,
  };

  if (isPopped && !isAnimating) {
    return null;
  }

  return (
    <>
      <div
        style={bubbleStyle}
        onClick={handleClick}
        className={`
          bubble-gradient shadow-lg hover:shadow-xl
          ${!isPopped ? 'hover:scale-110' : ''}
          ${isAnimating ? 'animate-pulse' : ''}
        `}
      >
        {/* Bubble highlight */}
        <div 
          className="absolute top-1 left-1 w-2 h-2 bg-white/60 rounded-full"
          style={{
            width: size * 0.15,
            height: size * 0.15,
          }}
        />
        
        {/* Inner shine */}
        <div 
          className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-full"
        />
      </div>
      
      {/* Particle effects */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-blue-400 rounded-full pointer-events-none animate-ping"
          style={{
            left: x + particle.x,
            top: y + particle.y,
            animationDuration: '0.5s',
          }}
        />
      ))}
    </>
  );
};

export default Bubble;
