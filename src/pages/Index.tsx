import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BubbleGrid from '../components/BubbleGrid';
import StatsPanel from '../components/StatsPanel';
import Header from '../components/Header';
import { useSound } from '@/hooks/useSound';

// How long (ms) you have after a pop before your combo streak resets.
const COMBO_WINDOW = 1200;
const BEST_COMBO_KEY = 'bubblepop:bestCombo';
const TOTAL_KEY = 'bubblepop:totalPopped';

const readNumber = (key: string) => {
  if (typeof window === 'undefined') return 0;
  return Number(window.localStorage.getItem(key)) || 0;
};

const Index = () => {
  const { playPop } = useSound();

  const [poppedCount, setPoppedCount] = useState(0);
  const [sessionStartTime] = useState(Date.now());
  const [lastPopTime, setLastPopTime] = useState<number | null>(null);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(() => readNumber(BEST_COMBO_KEY));
  const [totalPopped, setTotalPopped] = useState(() => readNumber(TOTAL_KEY));

  const lastPopRef = useRef<number>(0);

  const handleBubblePop = useCallback(() => {
    const now = Date.now();
    const withinWindow = now - lastPopRef.current <= COMBO_WINDOW;
    lastPopRef.current = now;

    setCombo((prev) => {
      const next = withinWindow ? prev + 1 : 1;
      setBestCombo((best) => {
        if (next > best) {
          window.localStorage.setItem(BEST_COMBO_KEY, String(next));
          return next;
        }
        return best;
      });
      playPop(next);
      return next;
    });

    setPoppedCount((prev) => prev + 1);
    setTotalPopped((prev) => {
      const next = prev + 1;
      window.localStorage.setItem(TOTAL_KEY, String(next));
      return next;
    });
    setLastPopTime(now);

    // Haptic feedback for mobile devices.
    if ('vibrate' in navigator) navigator.vibrate(30);
  }, [playPop]);

  // Decay the combo back to 0 once the window lapses, so the UI reflects the break.
  useEffect(() => {
    if (combo === 0) return;
    const timer = setTimeout(() => setCombo(0), COMBO_WINDOW);
    return () => clearTimeout(timer);
  }, [combo, lastPopTime]);

  const sessionDuration = useMemo(
    () => Math.floor((Date.now() - sessionStartTime) / 1000),
    [sessionStartTime, poppedCount],
  );

  return (
    <div
      className="min-h-screen transition-[background] duration-500"
      style={{
        background:
          'linear-gradient(to bottom right, var(--bg-from), var(--bg-via), var(--bg-to))',
      }}
    >
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent mb-4"
            style={{
              backgroundImage:
                'linear-gradient(to right, var(--accent), var(--bubble-2))',
            }}
          >
            Virtual Bubble Wrap
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pop bubbles endlessly for the ultimate stress relief. Keep the rhythm
            going to build a <span className="font-semibold">combo streak</span> —
            each bubble regenerates on its own for infinite satisfaction.
          </p>
        </div>

        <StatsPanel
          poppedCount={poppedCount}
          sessionDuration={sessionDuration}
          combo={combo}
          bestCombo={bestCombo}
          totalPopped={totalPopped}
        />

        <BubbleGrid onBubblePop={handleBubblePop} />
      </main>
    </div>
  );
};

export default Index;
