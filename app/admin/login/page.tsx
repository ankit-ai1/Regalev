'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError('❌ Wrong password. Try again.');
      }
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      zIndex: 9999,
      overflowY: 'auto',
    }}>
      {/* Glow effect background */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(var(--primary-rgb),0.08) 0%, transparent 70%)',
      }} />

      <div style={{
        width: '100%', maxWidth: 420,
        background: 'rgba(var(--surface-rgb),0.95)',
        border: '1px solid rgba(var(--primary-rgb),0.18)',
        borderRadius: 28,
        padding: '44px 40px',
        boxShadow: '0 40px 100px rgba(0,0,0,0.25)',
        position: 'relative',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 16,
            background: 'var(--primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 32px rgba(var(--primary-rgb),0.35)',
          }}>
            <Zap size={28} color="#000" />
          </div>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: 20, color: 'var(--text-primary)', letterSpacing: 2 }}>
            REGAL EV
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, letterSpacing: 1 }}>
            Admin Dashboard
          </div>
        </div>

        {/* Lock icon */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'rgba(var(--primary-rgb),0.1)',
            border: '1px solid rgba(var(--primary-rgb),0.2)',
            borderRadius: 999, padding: '6px 16px',
            fontSize: 11, color: 'var(--primary)',
            fontFamily: 'Orbitron, sans-serif', letterSpacing: 1.5,
          }}>
            <Lock size={11} /> SECURE LOGIN
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{
              display: 'block', fontSize: 11, fontWeight: 700,
              color: 'var(--text-secondary)', letterSpacing: 1.5,
              marginBottom: 8, fontFamily: 'Orbitron, sans-serif',
            }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{
                position: 'absolute', left: 14, top: '50%',
                transform: 'translateY(-50%)',
                color: error ? '#ef4444' : 'var(--primary)',
                pointerEvents: 'none',
              }} />
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter admin password"
                autoFocus
                style={{
                  width: '100%',
                  padding: '13px 44px 13px 42px',
                  borderRadius: 12,
                  border: `1.5px solid ${error ? '#ef4444' : 'rgba(var(--primary-rgb),0.2)'}`,
                  background: 'rgba(var(--surface-rgb),0.5)',
                  color: 'var(--text-primary)',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 200ms',
                  fontFamily: 'inherit',
                }}
                onFocus={e => { if (!error) e.currentTarget.style.borderColor = 'var(--primary)'; }}
                onBlur={e => { if (!error) e.currentTarget.style.borderColor = 'rgba(var(--primary-rgb),0.2)'; }}
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                style={{
                  position: 'absolute', right: 12, top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none',
                  cursor: 'pointer', padding: 4,
                  color: 'var(--text-secondary)',
                }}
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && (
              <p style={{ fontSize: 12, color: '#ef4444', marginTop: 6, marginLeft: 2 }}>{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="btn-primary"
            style={{
              width: '100%', padding: '14px',
              fontSize: 13, fontFamily: 'Orbitron, sans-serif',
              letterSpacing: 1.5, marginTop: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: !password ? 0.6 : 1,
            }}
          >
            {loading ? (
              <>
                <span style={{ width: 16, height: 16, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                Verifying...
              </>
            ) : (
              'LOGIN'
            )}
          </button>
        </form>

      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
