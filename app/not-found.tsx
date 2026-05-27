import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '0 5%' }}>
        <div style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '20vw',
          fontWeight: 900,
          color: 'rgba(var(--primary-rgb),0.12)',
          lineHeight: 1,
          marginBottom: -40,
          userSelect: 'none',
        }}>404</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Zap size={48} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
            PAGE NOT FOUND
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 32 }}>The page you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="btn-primary" style={{ display: 'inline-block', padding: '14px 32px', fontFamily: 'Orbitron, sans-serif', fontSize: 13, letterSpacing: 2, fontWeight: 700, background: 'var(--primary)', color: 'var(--button-text)', borderRadius: 4, textDecoration: 'none', textTransform: 'uppercase' }}>
            GO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
