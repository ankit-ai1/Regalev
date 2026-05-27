"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '@/lib/products';

const AUTO_MS = 4800;

export default function Hero() {
  const [idx, setIdx] = useState(0);

  /* auto-advance */
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % products.length), AUTO_MS);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIdx(i => (i - 1 + products.length) % products.length);
  const next = () => setIdx(i => (i + 1) % products.length);
  const p = products[idx];

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'var(--bg)',
      paddingTop: 0,
    }}>

      {/* ── Atmospheric background ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.45 }} />
        <div style={{ position: 'absolute', width: 820, height: 820, borderRadius: '50%', background: 'rgba(var(--primary-rgb),0.07)', filter: 'blur(150px)', top: '-30%', right: '-18%' }} />
        <div style={{ position: 'absolute', width: 540, height: 540, borderRadius: '50%', background: 'rgba(var(--primary-rgb),0.04)', filter: 'blur(110px)', bottom: '-18%', left: '3%' }} />
        <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: 'rgba(var(--primary-rgb),0.03)', filter: 'blur(80px)', top: '55%', left: '38%' }} />
      </div>

      {/* ── Main grid ── */}
      <div className="hero-grid" style={{
        maxWidth: 1440,
        margin: '0 auto',
        padding: '20px 5% 40px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* ══════════ LEFT: copy ══════════ */}
        <div>

          {/* Pill badge */}
          <motion.div initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(var(--primary-rgb),0.1)',
              border: '1px solid rgba(var(--primary-rgb),0.22)',
              color: 'var(--primary)', padding: '8px 20px', borderRadius: 999,
              fontSize: 11, fontWeight: 700, letterSpacing: 2.5,
              fontFamily: 'Orbitron, sans-serif', marginBottom: 30,
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: 'var(--primary)',
                boxShadow: '0 0 10px rgba(var(--primary-rgb),0.9)',
                display: 'inline-block',
                animation: 'heroPulse 2s ease-in-out infinite',
              }} />
              RIDE THE FUTURE
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.12 }}
            style={{
              fontFamily: 'Orbitron, sans-serif', fontWeight: 900,
              fontSize: 'clamp(36px, 5.4vw, 68px)', lineHeight: 1.02,
              color: 'var(--text-primary)', margin: '0 0 22px', letterSpacing: -1,
            }}
          >
            Smart Electric<br />
            <span style={{
              background: 'linear-gradient(90deg, var(--primary) 0%, #16a34a 60%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Vehicles</span> For<br />
            A Better Tomorrow
          </motion.h1>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.85, maxWidth: 520, marginBottom: 36 }}
          >
            Premium electric mobility for modern riders. Explore range-topping models,
            instant charging compatibility, and software-first vehicle experiences built for the future.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
            className="hero-cta-row"
          >
            <Link href="/products" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '15px 28px', borderRadius: 16,
              background: 'var(--primary)', color: 'var(--button-text)',
              fontWeight: 800, textDecoration: 'none', fontSize: 13,
              boxShadow: '0 14px 44px rgba(var(--primary-rgb),0.32)',
              fontFamily: 'Orbitron, sans-serif', letterSpacing: 1,
            }}>
              Explore EVs <ArrowRight size={15} />
            </Link>
            <Link href="/compare" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '15px 28px', borderRadius: 16,
              background: 'transparent', border: '1.5px solid rgba(34,197,94,0.3)',
              color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 13,
              fontFamily: 'Orbitron, sans-serif', letterSpacing: 1,
            }}>
              Compare EVs
            </Link>
          </motion.div>
        </div>

        {/* ══════════ RIGHT: vehicle showcase ══════════ */}
        <div className="hero-showcase">
          <div style={{ position: 'relative' }}>

            {/* Glow orb behind card */}
            <div style={{
              position: 'absolute', inset: '8%', borderRadius: '50%',
              background: 'rgba(var(--primary-rgb),0.22)', filter: 'blur(90px)',
              pointerEvents: 'none', zIndex: 0,
            }} />

            {/* ── Main image card ── */}
            <div style={{
              position: 'relative', zIndex: 1,
              borderRadius: 40, overflow: 'hidden',
              aspectRatio: '3/4',
              boxShadow: '0 60px 130px rgba(0,0,0,0.24), 0 0 0 1px rgba(var(--primary-rgb),0.12)',
              background: '#050505',
            }}>

              {/* Rotating vehicle photo */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={idx}
                  src={p.images[0]}
                  alt={p.name}
                  initial={{ opacity: 0, scale: 1.07 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </AnimatePresence>

              {/* Bottom gradient scrim */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(0deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 42%, transparent 72%)',
              }} />

              {/* ── Product info overlay ── */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 26px 20px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`info-${idx}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.32 }}
                  >
                    {p.badge && (
                      <div style={{
                        display: 'inline-block',
                        background: 'var(--primary)', color: '#000',
                        padding: '4px 12px', borderRadius: 999,
                        fontSize: 9, fontWeight: 900, letterSpacing: 2.5,
                        marginBottom: 10, fontFamily: 'Orbitron, sans-serif',
                      }}>{p.badge}</div>
                    )}
                    <div style={{
                      fontFamily: 'Orbitron, sans-serif', fontWeight: 900,
                      color: '#fff', fontSize: 24, lineHeight: 1.1, marginBottom: 8,
                    }}>{p.name}</div>
                    <div style={{ display: 'flex', gap: 14, color: 'rgba(255,255,255,0.62)', fontSize: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                      <span>⚡ {p.specs.range}</span>
                      <span>🏎 {p.specs.topSpeed}</span>
                      <span>🔋 {p.specs.chargingTime}</span>
                    </div>
                    <div style={{ fontFamily: 'Orbitron', color: 'var(--primary)', fontSize: 22, fontWeight: 800 }}>
                      ₹{p.price.toLocaleString('en-IN')}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Prev / Next arrows */}
              <button onClick={prev} style={{
                position: 'absolute', top: '42%', left: 14, transform: 'translateY(-50%)',
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.18)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff',
              }}><ChevronLeft size={18} /></button>
              <button onClick={next} style={{
                position: 'absolute', top: '42%', right: 14, transform: 'translateY(-50%)',
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.18)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff',
              }}><ChevronRight size={18} /></button>

              {/* Auto-play progress bar (CSS-animated, resets on key change) */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.1)' }}>
                <div
                  key={`pb-${idx}`}
                  style={{
                    height: '100%', background: 'var(--primary)',
                    animation: `heroProgress ${AUTO_MS}ms linear forwards`,
                  }}
                />
              </div>
            </div>

            {/* ── Dot navigation ── */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 18 }}>
              {products.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} style={{
                  width: i === idx ? 28 : 8, height: 8, borderRadius: 4,
                  background: i === idx ? 'var(--primary)' : 'rgba(0,0,0,0.16)',
                  border: 'none', cursor: 'pointer',
                  transition: 'all 0.35s ease', padding: 0,
                }} />
              ))}
            </div>

            {/* ── Thumbnail strip ── */}
            <div style={{ display: 'flex', gap: 10, marginTop: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              {products.slice(0, 6).map((pp, i) => (
                <button
                  key={pp.id}
                  onClick={() => setIdx(i)}
                  style={{
                    width: 58, height: 58, borderRadius: 13, overflow: 'hidden',
                    border: `2px solid ${i === idx ? 'var(--primary)' : 'transparent'}`,
                    cursor: 'pointer', padding: 0, flexShrink: 0,
                    opacity: i === idx ? 1 : 0.48,
                    boxShadow: i === idx
                      ? '0 0 20px rgba(var(--primary-rgb),0.5), 0 6px 18px rgba(0,0,0,0.16)'
                      : '0 3px 10px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    background: '#050505',
                  }}
                >
                  <img
                    src={pp.images[0]}
                    alt={pp.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes heroProgress {
          from { width: 0% }
          to   { width: 100% }
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.85); }
        }
        @media (max-width: 480px) {
          .hero-cta-row { flex-direction: column; }
          .hero-cta-row a { width: 100% !important; justify-content: center !important; }
        }
      `}</style>
    </section>
  );
}
