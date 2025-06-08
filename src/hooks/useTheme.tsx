import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BubbleTheme, DEFAULT_THEME_ID, getTheme, THEMES } from "@/lib/themes";

const STORAGE_KEY = "bubblepop:theme";

interface ThemeContextValue {
  theme: BubbleTheme;
  themes: BubbleTheme[];
  setTheme: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: BubbleTheme) {
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  root.setAttribute("data-bubble-theme", theme.id);
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeId, setThemeId] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME_ID;
    return window.localStorage.getItem(STORAGE_KEY) ?? DEFAULT_THEME_ID;
  });

  const theme = useMemo(() => getTheme(themeId), [themeId]);

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme.id);
  }, [theme]);

  const setTheme = useCallback((id: string) => setThemeId(id), []);

  const value = useMemo(
    () => ({ theme, themes: THEMES, setTheme }),
    [theme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
