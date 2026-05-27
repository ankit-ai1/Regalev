"use client";
import Link from 'next/link';
import { Zap, Phone, Mail, MapPin, Globe, Link2, Star, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '72px 5% 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% + 260px)',
        height: 220,
        background: 'radial-gradient(circle at top, rgba(var(--primary-rgb),0.14), transparent 62%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(240px, 1fr))',
          gap: 36,
          marginBottom: 44,
          alignItems: 'start',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44,
                background: 'linear-gradient(135deg, rgba(var(--primary-rgb),0.95), rgba(var(--primary-rgb),0.6))',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 18px 40px rgba(var(--primary-rgb),0.16)',
              }}>
                <Zap size={20} color="var(--button-text)" />
              </div>
              <div>
                <div style={{ fontFamily: 'Orbitron', fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: 2 }}>REGAL EV</div>
                <div style={{ fontFamily: 'Orbitron', fontSize: 10, fontWeight: 700, color: 'var(--primary)', letterSpacing: 3, marginTop: 2 }}>PREMIUM ELECTRIC VEHICLES</div>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.9, maxWidth: 300 }}>
              Regal EV delivers premium electric scooters built for modern India — award-winning range, refined comfort, and connected vehicle innovation.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[Globe, Link2, Star].map((Icon, idx) => (
                <a key={idx} href="#" className="footer-icon-button" style={{
                  width: 44,
                  height: 44,
                  background: 'rgba(var(--primary-rgb),0.12)',
                  border: '1px solid rgba(var(--primary-rgb),0.18)',
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  textDecoration: 'none',
                }}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'Orbitron', fontSize: 11, fontWeight: 700, color: 'var(--primary)', letterSpacing: 3, marginBottom: 20, textTransform: 'uppercase' }}>
              Product Links
            </h4>
            {[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Compare', href: '/compare' },
              { label: 'About Us', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="footer-link" style={{
                display: 'block',
                color: 'var(--text-secondary)',
                fontSize: 14,
                textDecoration: 'none',
                padding: '10px 0',
              }}>
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: 'Orbitron', fontSize: 11, fontWeight: 700, color: 'var(--primary)', letterSpacing: 3, marginBottom: 20, textTransform: 'uppercase' }}>
              Explore Models
            </h4>
            {['Raftaar SL', 'Raftaar DL', 'Active S', 'Vega Active CS3', 'Raftaar Pro', 'Loader EV'].map(name => (
              <Link key={name} href="/products" className="footer-link" style={{
                display: 'block',
                color: 'var(--text-secondary)',
                fontSize: 14,
                textDecoration: 'none',
                padding: '10px 0',
              }}>
                {name}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ fontFamily: 'Orbitron', fontSize: 11, fontWeight: 700, color: 'var(--primary)', letterSpacing: 3, marginBottom: 16, textTransform: 'uppercase' }}>
                Newsletter
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.85, marginBottom: 16 }}>
                Join our list to get exclusive product launches, offers, and EV insights delivered to your inbox.
              </p>
              <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: 0, maxWidth: 420, borderRadius: 18, overflow: 'hidden', border: '1px solid var(--border)', background: 'rgba(var(--surface-rgb),0.92)' }}>
                <input type="email" placeholder="Enter your email" className="footer-newsletter-input" style={{ width: '100%' }} />
                <button type="submit" className="footer-newsletter-button" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Send size={16} /> Subscribe
                </button>
              </form>
            </div>

            <div style={{ display: 'grid', gap: 12, fontSize: 13, color: 'var(--text-secondary)' }}>
              <div>Founded 2024 · Premium design & performance</div>
              <div>India-first engineering, nationwide dealer network, and award-winning customer support.</div>
              <div>Secure checkout · 24/7 support · 7-day delivery guarantee</div>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          padding: '0 4px',
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
            © 2026 Regal EV. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {['Privacy', 'Terms', 'Careers'].map(link => (
              <Link key={link} href="/" className="footer-link" style={{ color: 'var(--text-secondary)', fontSize: 13, textDecoration: 'none' }}>
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
