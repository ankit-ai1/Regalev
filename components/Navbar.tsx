'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Zap, MessageCircle } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/compare', label: 'Compare' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        padding: '10px 5%',
        backdropFilter: 'saturate(140%) blur(12px)',
        WebkitBackdropFilter: 'saturate(140%) blur(12px)',
        background: scrolled ? 'rgba(var(--surface-rgb),0.9)' : 'rgba(var(--surface-rgb),0.78)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,0.12)' : 'none',
        transition: 'all 240ms ease',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', height: 64, position: 'relative' }}>
        {/* Logo left */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)', boxShadow: '0 6px 24px rgba(var(--primary-rgb),0.18)' }}>
            <Zap size={20} color="var(--button-text)" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: 'var(--text-primary)', fontSize: 16, letterSpacing: 1 }}>REGAL</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--text-secondary)', marginTop: -2 }}>Electric Vehicles</div>
          </div>
        </Link>

        {/* Center nav */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 18, alignItems: 'center' }} className="hidden-mobile">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div style={{ padding: '8px 12px', borderRadius: 12, fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--text-secondary)', transition: 'all 180ms', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--button-text)'; (e.currentTarget as HTMLElement).style.background = 'var(--primary)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 18px rgba(var(--primary-rgb),0.18)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                {link.label}
              </div>
            </Link>
          ))}
        </div>

        {/* Right icons */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <ThemeToggle />

          <Link href="/products" style={{ textDecoration: 'none' }} className="hidden-mobile">
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 18px', fontSize: 13, borderRadius: 12 }}>
              <MessageCircle size={14} /> Enquire Now
            </button>
          </Link>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-menu-btn" style={{ border: 'none', background: 'transparent', padding: 8, display: 'none', cursor: 'pointer' }}>
            {mobileOpen ? <X size={22} color="var(--text-primary)" /> : <Menu size={22} color="var(--text-primary)" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: 'absolute', top: 72, left: 0, right: 0, background: 'rgba(var(--surface-rgb),0.98)', borderTop: '1px solid var(--border)', padding: '18px 5%' }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '12px 0', color: 'var(--text-primary)', textDecoration: 'none', fontFamily: 'Inter, sans-serif' }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`\n        @media (max-width: 860px) {\n          .hidden-mobile { display: none !important; }\n          .mobile-menu-btn { display: inline-flex !important; }\n        }\n      `}</style>
    </motion.nav>
  );
}
