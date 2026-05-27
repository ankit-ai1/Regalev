'use client';
import { useMemo, useState } from 'react';
import { Check, ChevronDown, Palette } from 'lucide-react';
import { ThemeDefinition, ThemeKey, themes, useTheme } from '@/components/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const selectedTheme = themes[theme];
  const themeOptions = useMemo(() => Object.entries(themes) as [ThemeKey, ThemeDefinition][], []);

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 14px',
          borderRadius: 14,
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          fontSize: 12,
          fontWeight: 700,
          minWidth: 140,
          justifyContent: 'center',
          transition: 'all 240ms ease',
          boxShadow: '0 14px 40px rgba(15,23,42,0.08)',
        }}
        aria-expanded={open}
      >
        <Palette size={18} />
        <span>{selectedTheme.name}</span>
        <ChevronDown size={18} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 180ms ease' }} />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 12px)',
            right: 0,
            width: 300,
            maxWidth: '100vw',
            borderRadius: 20,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: '0 30px 80px rgba(15,23,42,0.16)',
            padding: 16,
            zIndex: 1400,
            transition: 'opacity 300ms ease, transform 300ms ease',
            transform: 'translateY(0px)',
          }}
        >
          <div style={{ display: 'grid', gap: 12 }}>
            {themeOptions.map(([key, option]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setTheme(key);
                  setOpen(false);
                }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '46px 1fr 24px',
                  gap: 12,
                  width: '100%',
                  alignItems: 'center',
                  background: 'transparent',
                  border: '1px solid transparent',
                  padding: '12px 14px',
                  borderRadius: 16,
                  cursor: 'pointer',
                  transition: 'background 180ms ease, border-color 180ms ease',
                  backgroundColor: theme === key ? 'rgba(34,197,94,0.08)' : 'transparent',
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 16,
                    border: `1px solid ${option.border}`,
                    background: option.surface,
                    position: 'relative',
                  }}
                >
                  <div style={{ position: 'absolute', inset: 10, borderRadius: 8, background: option.primary }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14 }}>{option.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{option.background}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {theme === key && <Check size={18} color="var(--primary)" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
