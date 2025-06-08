// Bubble Pop theme palettes.
// Each theme is just a bag of CSS custom properties we paint onto <html>, so the
// whole app (bubbles, background, accents, particles) re-skins from one place.

export interface BubbleTheme {
  id: string;
  name: string;
  emoji: string;
  /** Preview swatch for the theme picker button. */
  swatch: string;
  vars: Record<string, string>;
}

export const THEMES: BubbleTheme[] = [
  {
    id: "ocean",
    name: "Ocean",
    emoji: "🌊",
    swatch: "linear-gradient(135deg,#93c5fd,#2563eb)",
    vars: {
      "--bubble-1": "rgba(147,197,253,0.85)",
      "--bubble-2": "rgba(59,130,246,0.65)",
      "--bubble-3": "rgba(37,99,235,0.45)",
      "--bubble-4": "rgba(29,78,216,0.35)",
      "--bg-from": "#eff6ff",
      "--bg-via": "#ffffff",
      "--bg-to": "#eef2ff",
      "--accent": "#2563eb",
      "--particle": "#60a5fa",
    },
  },
  {
    id: "sunset",
    name: "Sunset",
    emoji: "🌅",
    swatch: "linear-gradient(135deg,#fda4af,#f97316)",
    vars: {
      "--bubble-1": "rgba(253,164,175,0.85)",
      "--bubble-2": "rgba(251,113,133,0.65)",
      "--bubble-3": "rgba(249,115,22,0.5)",
      "--bubble-4": "rgba(234,88,12,0.4)",
      "--bg-from": "#fff1f2",
      "--bg-via": "#fff7ed",
      "--bg-to": "#ffedd5",
      "--accent": "#f97316",
      "--particle": "#fb923c",
    },
  },
  {
    id: "neon",
    name: "Neon",
    emoji: "⚡",
    swatch: "linear-gradient(135deg,#22d3ee,#a855f7)",
    vars: {
      "--bubble-1": "rgba(34,211,238,0.85)",
      "--bubble-2": "rgba(168,85,247,0.6)",
      "--bubble-3": "rgba(217,70,239,0.45)",
      "--bubble-4": "rgba(139,92,246,0.4)",
      "--bg-from": "#ecfeff",
      "--bg-via": "#faf5ff",
      "--bg-to": "#fdf4ff",
      "--accent": "#a855f7",
      "--particle": "#e879f9",
    },
  },
  {
    id: "forest",
    name: "Forest",
    emoji: "🌿",
    swatch: "linear-gradient(135deg,#86efac,#16a34a)",
    vars: {
      "--bubble-1": "rgba(134,239,172,0.85)",
      "--bubble-2": "rgba(34,197,94,0.6)",
      "--bubble-3": "rgba(22,163,74,0.45)",
      "--bubble-4": "rgba(21,128,61,0.4)",
      "--bg-from": "#f0fdf4",
      "--bg-via": "#ffffff",
      "--bg-to": "#ecfdf5",
      "--accent": "#16a34a",
      "--particle": "#4ade80",
    },
  },
  {
    id: "candy",
    name: "Candy",
    emoji: "🍬",
    swatch: "linear-gradient(135deg,#f9a8d4,#ec4899)",
    vars: {
      "--bubble-1": "rgba(249,168,212,0.85)",
      "--bubble-2": "rgba(236,72,153,0.6)",
      "--bubble-3": "rgba(219,39,119,0.45)",
      "--bubble-4": "rgba(190,24,93,0.4)",
      "--bg-from": "#fdf2f8",
      "--bg-via": "#ffffff",
      "--bg-to": "#fce7f3",
      "--accent": "#ec4899",
      "--particle": "#f472b6",
    },
  },
  {
    id: "midnight",
    name: "Midnight",
    emoji: "🌙",
    swatch: "linear-gradient(135deg,#818cf8,#1e1b4b)",
    vars: {
      "--bubble-1": "rgba(129,140,248,0.85)",
      "--bubble-2": "rgba(99,102,241,0.6)",
      "--bubble-3": "rgba(79,70,229,0.5)",
      "--bubble-4": "rgba(49,46,129,0.45)",
      "--bg-from": "#1e1b4b",
      "--bg-via": "#312e81",
      "--bg-to": "#0f172a",
      "--accent": "#818cf8",
      "--particle": "#a5b4fc",
    },
  },
];

export const DEFAULT_THEME_ID = "ocean";

export function getTheme(id: string): BubbleTheme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
