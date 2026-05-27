'use client';
import { useEffect, useMemo, useState } from 'react';
import ThemeContext, { ThemeDefinition, ThemeKey, themes } from '@/components/ThemeContext';

const STORAGE_KEY = 'regalev-theme';
const DEFAULT_THEME: ThemeKey = 'clean-white';

function applyTheme(theme: ThemeDefinition) {
  const root = document.documentElement;
  root.style.setProperty('--bg', theme.background);
  root.style.setProperty('--surface', theme.surface);
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--text-primary', theme.text);
  root.style.setProperty('--text-secondary', theme.textSecondary);
  root.style.setProperty('--border', theme.border);
  root.style.setProperty('--surface-rgb', theme.surfaceRgb);
  root.style.setProperty('--text-primary-rgb', theme.textPrimaryRgb);
  root.style.setProperty('--primary-rgb', theme.primaryRgb);
  root.style.setProperty('--button-text', theme.buttonText);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey>(DEFAULT_THEME);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY) as ThemeKey | null;
    if (storedTheme && themes[storedTheme]) {
      setThemeState(storedTheme);
    } else {
      setThemeState(DEFAULT_THEME);
    }
  }, []);

  useEffect(() => {
    const selectedTheme = themes[theme] || themes[DEFAULT_THEME];
    applyTheme(selectedTheme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme: setThemeState }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
