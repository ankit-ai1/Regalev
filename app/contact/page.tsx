'use client';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(var(--surface-rgb),0.05)',
    border: '1px solid rgba(var(--surface-rgb),0.1)',
    borderRadius: 8,
    padding: '13px 16px',
    color: 'var(--text-primary)',
    fontSize: 14,
    outline: 'none',
    fontFamily: 'Exo 2',
  };

  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <section style={{ padding: '60px 5% 80px', borderBottom: '1px solid rgba(var(--primary-rgb),0.06)', position: 'relative', overflow: 'hidden' }}>
        <div className="bg-grid" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontFamily: 'Orbitron', fontSize: 11, color: 'var(--primary)', letterSpacing: 4, marginBottom: 16 }}>GET IN TOUCH</div>
          <h1 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16 }}>CONTACT US</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 500, margin: '0 auto' }}>
            Have questions about our EVs, dealership, or support? We're here to help.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64 }}>
          {/* Left - Info */}
          <div>
            <h2 style={{ fontFamily: 'Orbitron', fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32 }}>REACH US</h2>
            
            {[
              { icon: Phone, label: 'Phone', value: '+91-9953081270', sub: 'Mon–Sat 9AM–6PM' },
              { icon: Mail, label: 'Email', value: 'info@regalev.com', sub: 'We reply within 24 hours' },
              { icon: MapPin, label: 'Address', value: 'Bahadurgarh, Haryana, 124507', sub: 'India' },
              { icon: Clock, label: 'Business Hours', value: 'Mon–Sat: 9AM to 6PM', sub: 'Sunday: Closed' },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} style={{
                display: 'flex',
                gap: 20,
                marginBottom: 28,
                padding: '20px 24px',
                background: 'rgba(var(--surface-rgb),0.88)',
                border: '1px solid rgba(var(--primary-rgb),0.08)',
                borderRadius: 12,
                transition: 'border-color 0.3s',
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(var(--primary-rgb),0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(var(--primary-rgb),0.08)')}
              >
                <div style={{
                  width: 48, height: 48,
                  background: 'rgba(var(--primary-rgb),0.08)',
                  border: '1px solid rgba(var(--primary-rgb),0.2)',
                  borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={20} color="var(--primary)" />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)', letterSpacing: 2, fontFamily: 'Orbitron', marginBottom: 4 }}>{label.toUpperCase()}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{value}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{sub}</div>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div style={{
              borderRadius: 12,
              overflow: 'hidden',
              background: 'rgba(var(--primary-rgb),0.04)',
              border: '1px solid rgba(var(--primary-rgb),0.1)',
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 8,
            }}>
              <div style={{ textAlign: 'center' }}>
                <MapPin size={32} color="rgba(var(--primary-rgb),0.4)" style={{ margin: '0 auto 8px' }} />
                <p style={{ color: 'var(--text-secondary)', fontSize: 12, fontFamily: 'Orbitron', letterSpacing: 1 }}>
                  BAHADURGARH, HARYANA
                </p>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div>
            <div style={{
              background: 'rgba(var(--surface-rgb),0.88)',
              border: '1px solid rgba(var(--primary-rgb),0.1)',
              borderRadius: 20,
              padding: 40,
            }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'rgba(var(--primary-rgb),0.1)',
                    border: '2px solid var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                  }}>
                    <Check size={36} color="var(--primary)" />
                  </div>
                  <h3 style={{ fontFamily: 'Orbitron', fontSize: 20, color: 'var(--text-primary)', marginBottom: 12 }}>MESSAGE SENT!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline" style={{ marginTop: 24, fontSize: 11 }}>SEND ANOTHER</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ fontFamily: 'Orbitron', fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 28 }}>
                    SEND A MESSAGE
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'Orbitron', letterSpacing: 1, marginBottom: 8 }}>NAME</label>
                      <input style={inputStyle} required value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'Orbitron', letterSpacing: 1, marginBottom: 8 }}>PHONE</label>
                      <input style={inputStyle} type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'Orbitron', letterSpacing: 1, marginBottom: 8 }}>EMAIL</label>
                    <input style={inputStyle} type="email" required value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@email.com" />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'Orbitron', letterSpacing: 1, marginBottom: 8 }}>SUBJECT</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.subject} onChange={e => update('subject', e.target.value)}>
                      {['General Inquiry', 'Product Information', 'Dealership Inquiry', 'After-Sales Support', 'Bulk/Fleet Order', 'Other'].map(o => (
                        <option key={o} style={{ background: 'rgba(var(--surface-rgb),0.96)' }}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ display: 'block', fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'Orbitron', letterSpacing: 1, marginBottom: 8 }}>MESSAGE</label>
                    <textarea
                      style={{ ...inputStyle, minHeight: 140, resize: 'vertical' }}
                      required
                      value={form.message}
                      onChange={e => update('message', e.target.value)}
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 12 }}>
                    <Send size={16} /> SEND MESSAGE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 1.4fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
