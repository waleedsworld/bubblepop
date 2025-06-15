import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const STORAGE_KEY = "bubblepop:muted";

interface SoundContextValue {
  muted: boolean;
  toggleMuted: () => void;
  /** Play a short synthesized "pop". `intensity` (0..1) brightens higher combos. */
  playPop: (intensity?: number) => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  });
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
  }, [muted]);

  const playPop = useCallback(
    (intensity = 0) => {
      if (muted || typeof window === "undefined") return;
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      if (!ctxRef.current) ctxRef.current = new AudioCtx();
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") void ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Higher combos = brighter, snappier pop.
      const base = 420 + Math.min(intensity, 12) * 55;
      osc.type = "sine";
      osc.frequency.setValueAtTime(base, now);
      osc.frequency.exponentialRampToValueAtTime(base * 0.45, now + 0.12);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.28, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    },
    [muted],
  );

  const toggleMuted = useCallback(() => setMuted((m) => !m), []);

  const value = useMemo(
    () => ({ muted, toggleMuted, playPop }),
    [muted, toggleMuted, playPop],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
};

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within a SoundProvider");
  return ctx;
}
