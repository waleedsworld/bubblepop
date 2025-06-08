import React from 'react';
import { Palette, Check } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useTheme } from '@/hooks/useTheme';

const Header = () => {
  const { theme, themes, setTheme } = useTheme();

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background:
                  'linear-gradient(135deg, var(--bubble-2), var(--accent))',
              }}
            >
              <span className="text-white text-sm font-bold">🫧</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">
              Bubble<span style={{ color: 'var(--accent)' }}>Pop</span>
            </span>
          </div>

          <nav className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:text-gray-900"
                  aria-label="Change theme"
                >
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">{theme.name}</span>
                  <span
                    className="h-4 w-4 rounded-full border border-white shadow"
                    style={{ backgroundImage: theme.swatch }}
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Bubble theme
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`flex items-center gap-2 rounded-lg border px-2 py-2 text-sm transition-colors ${
                        t.id === theme.id
                          ? 'border-gray-800 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span
                        className="h-5 w-5 shrink-0 rounded-full border border-white shadow"
                        style={{ backgroundImage: t.swatch }}
                      />
                      <span className="truncate">{t.emoji} {t.name}</span>
                      {t.id === theme.id && (
                        <Check className="ml-auto h-3.5 w-3.5 text-gray-700" />
                      )}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
