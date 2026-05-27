'use client';
import { createContext, useContext } from 'react';

export type ThemeKey = 'midnight-ev' | 'clean-white' | 'sky-blue' | 'luxury-beige' | 'apple-style';

export interface ThemeDefinition {
  name: string;
  background: string;
  surface: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  surfaceRgb: string;
  textPrimaryRgb: string;
  primaryRgb: string;
  buttonText: string;
}

export const themes: Record<ThemeKey, ThemeDefinition> = {
  'midnight-ev': {
    name: 'Midnight EV',
    background: '#050816',
    surface: '#0B1220',
    primary: '#4ADE80',
    text: '#FFFFFF',
    textSecondary: '#94A3B8',
    border: 'rgba(255,255,255,0.08)',
    surfaceRgb: '11,18,32',
    textPrimaryRgb: '255,255,255',
    primaryRgb: '74,222,128',
    buttonText: '#050810',
  },
  'clean-white': {
    name: 'Clean White',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    primary: '#22C55E',
    text: '#111827',
    textSecondary: '#475569',
    border: 'rgba(15,23,42,0.08)',
    surfaceRgb: '255,255,255',
    textPrimaryRgb: '17,24,39',
    primaryRgb: '34,197,94',
    buttonText: '#111827',
  },
  'sky-blue': {
    name: 'Sky Blue',
    background: '#EFF6FF',
    surface: '#FFFFFF',
    primary: '#0EA5E9',
    text: '#0F172A',
    textSecondary: '#475569',
    border: 'rgba(15,23,42,0.08)',
    surfaceRgb: '255,255,255',
    textPrimaryRgb: '15,23,42',
    primaryRgb: '14,165,233',
    buttonText: '#111827',
  },
  'luxury-beige': {
    name: 'Luxury Beige',
    background: '#FAF7F2',
    surface: '#FFFFFF',
    primary: '#C08457',
    text: '#1F2937',
    textSecondary: '#4B5563',
    border: 'rgba(15,23,42,0.08)',
    surfaceRgb: '255,255,255',
    textPrimaryRgb: '31,41,55',
    primaryRgb: '192,132,87',
    buttonText: '#111827',
  },
  'apple-style': {
    name: 'Apple Style',
    background: '#FFFFFF',
    surface: '#F5F5F7',
    primary: '#0071E3',
    text: '#1D1D1F',
    textSecondary: '#4B5563',
    border: 'rgba(15,23,42,0.08)',
    surfaceRgb: '245,245,247',
    textPrimaryRgb: '29,29,31',
    primaryRgb: '0,113,227',
    buttonText: '#111827',
  },
};

export interface ThemeContextValue {
  theme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export default ThemeContext;
