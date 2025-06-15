import React from 'react';

interface StatsPanelProps {
  poppedCount: number;
  sessionDuration: number;
  combo: number;
  bestCombo: number;
  totalPopped: number;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const StatsPanel: React.FC<StatsPanelProps> = ({
  poppedCount,
  sessionDuration,
  combo,
  bestCombo,
  totalPopped,
}) => {
  const popsPerMinute =
    sessionDuration === 0 ? 0 : Math.round((poppedCount / sessionDuration) * 60);

  const comboActive = combo > 1;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        <div className="text-center">
          <div
            className="text-3xl font-bold mb-1"
            style={{ color: 'var(--accent, #2563eb)' }}
          >
            {poppedCount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Bubbles Popped</div>
        </div>

        <div className="text-center">
          <div
            className={`text-3xl font-bold mb-1 transition-transform ${
              comboActive ? 'scale-110' : ''
            }`}
            style={{ color: comboActive ? 'var(--accent, #2563eb)' : '#9ca3af' }}
          >
            {comboActive ? `${combo}×` : '—'}
          </div>
          <div className="text-sm text-gray-600">Combo</div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-amber-500 mb-1">
            {bestCombo}×
          </div>
          <div className="text-sm text-gray-600">Best Combo</div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">
            {popsPerMinute}
          </div>
          <div className="text-sm text-gray-600">Pops/Min</div>
        </div>

        <div className="text-center col-span-2 md:col-span-1">
          <div className="text-3xl font-bold text-emerald-600 mb-1">
            {totalPopped.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">All-Time Pops</div>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-gray-400">
        Session time {formatTime(sessionDuration)}
      </div>
    </div>
  );
};

export default StatsPanel;
