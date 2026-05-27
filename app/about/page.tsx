'use client';
import Link from 'next/link';
import { Zap, Target, Eye, CheckCircle, Users, Award, Leaf, Wrench } from 'lucide-react';

const mission = [
  'To promote eco-friendly transportation through electric vehicles.',
  'To develop reliable and practical EV scooters for everyday use.',
  'To build a strong dealer network across India.',
  'To provide quality products with dependable after-sales support.',
];

const whyChoose = [
  { icon: Award,  title: 'Experienced Leadership',    desc: 'Led by Mr. Vaibhav Singh with 12+ years of EV industry experience.' },
  { icon: Zap,    title: 'Future-Ready Technology',   desc: 'Focus on modern electric mobility solutions built for tomorrow.' },
  { icon: Users,  title: 'Dealer Growth Opportunity', desc: 'Strong support for dealer network expansion across India.' },
  { icon: Leaf,   title: 'Eco-Friendly Mobility',     desc: 'Contributing to a greener and cleaner India with zero emissions.' },
  { icon: Wrench, title: 'Customer-Centric Approach', desc: 'Commitment to quality products and dependable after-sales support.' },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Hero Banner ── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        padding: '80px 5% 72px',
        background: 'rgba(var(--primary-rgb),0.03)',
        borderBottom: '1px solid rgba(var(--primary-rgb),0.08)',
      }}>
        <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'rgba(var(--primary-rgb),0.06)', filter: 'blur(120px)', top: '-30%', right: '-10%', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(var(--primary-rgb),0.1)', border: '1px solid rgba(var(--primary-rgb),0.2)', borderRadius: 999, padding: '6px 18px', marginBottom: 24 }}>
            <Zap size={12} color="var(--primary)" />
            <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 10, color: 'var(--primary)', letterSpacing: 2.5, fontWeight: 700 }}>ABOUT US</span>
          </div>
          <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.08, marginBottom: 24 }}>
            About{' '}
            <span style={{ background: 'linear-gradient(90deg, var(--primary), #16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Regal EV
            </span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.9, maxWidth: 720, margin: '0 auto' }}>
            A new and emerging electric mobility brand dedicated to providing reliable and sustainable
            transportation solutions in India — driven by innovation, quality, and a vision to make
            electric mobility accessible for everyone.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 5% 100px' }}>

        {/* ── Our Story ── */}
        <div style={{ display: 'grid', gap: 64, alignItems: 'center', marginBottom: 96 }} className="about-two-col">
          <div>
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 10, letterSpacing: 3, color: 'var(--primary)', marginBottom: 14 }}>OUR STORY</div>
            <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--text-primary)', marginBottom: 20, lineHeight: 1.15 }}>
              Built on Experience,<br />Driven by Purpose
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.95, marginBottom: 20 }}>
              Although Regal EV is a newly established brand, it is led by{' '}
              <strong style={{ color: 'var(--text-primary)' }}>Director Mr. Vaibhav Singh</strong>, who brings over{' '}
              <strong style={{ color: 'var(--primary)' }}>12 years of experience</strong> in the electric vehicle industry.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.95 }}>
              His deep understanding of EV technology, market needs, and customer expectations forms the strong
              foundation of Regal EV. With this expertise and a forward-thinking approach, Regal EV aims to deliver
              high-quality electric scooters designed for performance, efficiency, and everyday practicality.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { value: '12+',  label: 'Years of EV Experience', color: '#22c55e' },
              { value: '14+',  label: 'EV Models Available',    color: '#3b82f6' },
              { value: '10K+', label: 'Happy Riders',           color: '#f59e0b' },
              { value: '500+', label: 'Dealers Pan India',      color: '#8b5cf6' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(var(--surface-rgb),0.9)',
                border: `1px solid ${s.color}22`,
                borderRadius: 20, padding: '28px 20px', textAlign: 'center',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
              }}>
                <div style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: 34, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Vision & Mission ── */}
        <div style={{ display: 'grid', gap: 28, marginBottom: 96 }} className="about-two-col">

          {/* Vision */}
          <div style={{ background: 'rgba(var(--surface-rgb),0.9)', border: '1px solid rgba(var(--primary-rgb),0.15)', borderRadius: 24, padding: '40px 36px', boxShadow: '0 8px 40px rgba(0,0,0,0.05)' }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(var(--primary-rgb),0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <Eye size={24} color="var(--primary)" />
            </div>
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 10, letterSpacing: 3, color: 'var(--primary)', marginBottom: 10 }}>VISION</div>
            <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: 20, color: 'var(--text-primary)', marginBottom: 16, lineHeight: 1.3 }}>Our Long-Term Goal</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.85, margin: 0 }}>
              To become a <strong style={{ color: 'var(--text-primary)' }}>trusted and fast-growing electric vehicle brand</strong> in India
              by delivering innovative and sustainable mobility solutions.
            </p>
          </div>

          {/* Mission */}
          <div style={{ background: 'rgba(var(--surface-rgb),0.9)', border: '1px solid rgba(var(--primary-rgb),0.15)', borderRadius: 24, padding: '40px 36px', boxShadow: '0 8px 40px rgba(0,0,0,0.05)' }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(var(--primary-rgb),0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <Target size={24} color="var(--primary)" />
            </div>
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 10, letterSpacing: 3, color: 'var(--primary)', marginBottom: 10 }}>MISSION</div>
            <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: 20, color: 'var(--text-primary)', marginBottom: 20, lineHeight: 1.3 }}>What We Stand For</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {mission.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <CheckCircle size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Why Choose Regal EV ── */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 10, letterSpacing: 3, color: 'var(--primary)', marginBottom: 14 }}>OUR STRENGTHS</div>
            <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 38px)', color: 'var(--text-primary)', margin: 0 }}>
              Why Choose Regal EV?
            </h2>
          </div>

          <div className="why-grid">
            {whyChoose.map((item, i) => (
              <div key={i} style={{
                background: 'rgba(var(--surface-rgb),0.9)',
                border: '1px solid rgba(var(--primary-rgb),0.1)',
                borderRadius: 20, padding: '32px 28px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                transition: 'transform 200ms, box-shadow 200ms',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)'; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 13, background: 'rgba(var(--primary-rgb),0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <item.icon size={22} color="var(--primary)" />
                </div>
                <h4 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: 14, color: 'var(--text-primary)', marginBottom: 10, lineHeight: 1.3 }}>
                  {item.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{
          borderRadius: 24, background: 'rgba(var(--primary-rgb),0.06)',
          border: '1px solid rgba(var(--primary-rgb),0.15)',
          padding: '52px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(var(--primary-rgb),0.07)', filter: 'blur(90px)', top: '-50%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--text-primary)', marginBottom: 14 }}>
              Ready to Ride Electric?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.8 }}>
              Explore our range of high-performance electric scooters and find the perfect EV for your lifestyle.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/products" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ padding: '14px 28px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Zap size={15} /> Explore Products
                </button>
              </Link>
              <Link href="/contact" style={{ textDecoration: 'none' }}>
                <button className="btn-outline" style={{ padding: '14px 28px', fontSize: 13 }}>
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-two-col { grid-template-columns: 1fr 1fr; }
        .why-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .bg-grid {
          background-image:
            linear-gradient(rgba(var(--primary-rgb),0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--primary-rgb),0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        @media (max-width: 860px) {
          .about-two-col { grid-template-columns: 1fr !important; gap: 36px !important; }
          .why-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
