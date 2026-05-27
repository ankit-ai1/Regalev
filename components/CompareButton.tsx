'use client';

import type { Product } from '@/lib/store';

interface CompareButtonProps {
  product?: Product;
  selected: boolean;
  disabled: boolean;
  onToggle: () => void;
}

export default function CompareButton({ selected, disabled, onToggle }: CompareButtonProps) {
  return (
    <button
      type="button"
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      disabled={disabled && !selected}
      style={{
        width: '100%',
        padding: '12px 14px',
        borderRadius: 10,
        border: selected ? '1px solid var(--primary)' : '1px solid rgba(var(--surface-rgb),0.12)',
        background: selected ? 'rgba(var(--primary-rgb),0.12)' : 'rgba(var(--surface-rgb),0.04)',
        color: selected ? 'var(--primary)' : '#cbd5e1',
        fontFamily: 'Orbitron',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 1,
        cursor: disabled && !selected ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        if (!disabled || selected) {
          (e.currentTarget as HTMLButtonElement).style.background = selected ? 'rgba(var(--primary-rgb),0.18)' : 'rgba(var(--primary-rgb),0.08)';
        }
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = selected ? 'rgba(var(--primary-rgb),0.12)' : 'rgba(var(--surface-rgb),0.04)';
      }}
    >
      {selected ? 'REMOVE FROM COMPARE' : disabled ? 'MAX 3 SELECTED' : 'COMPARE'}
    </button>
  );
}
