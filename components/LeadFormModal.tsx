'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Mail, MapPin, MessageSquare, CheckCircle, Zap, Send } from 'lucide-react';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productId: string;
  productImage?: string;
  productPrice?: number;
}

const INITIAL = { name: '', phone: '', email: '', city: '', message: '' };

/* ── Field must be OUTSIDE the modal component so React doesn't remount it on every keystroke ── */
interface FieldProps {
  icon: React.ElementType;
  name: keyof typeof INITIAL;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (name: keyof typeof INITIAL, value: string) => void;
}

function Field({ icon: Icon, name, label, type = 'text', placeholder, required = false, value, error, onChange }: FieldProps) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: 1.2, marginBottom: 7, fontFamily: 'Orbitron, sans-serif' }}>
        {label}{required && <span style={{ color: '#ef4444', marginLeft: 3 }}>*</span>}
      </label>
      <div style={{ position: 'relative' }}>
        <Icon size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: error ? '#ef4444' : 'var(--primary)', pointerEvents: 'none' }} />
        <input
          type={type}
          value={value}
          onChange={e => onChange(name, e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '12px 14px 12px 40px',
            borderRadius: 12,
            border: `1.5px solid ${error ? '#ef4444' : 'rgba(var(--primary-rgb),0.18)'}`,
            background: 'rgba(var(--surface-rgb),0.6)',
            color: 'var(--text-primary)',
            fontSize: 14,
            outline: 'none',
            transition: 'border-color 200ms ease',
            boxSizing: 'border-box',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'var(--primary)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = error ? '#ef4444' : 'rgba(var(--primary-rgb),0.18)'; }}
        />
      </div>
      {error && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4, marginLeft: 4 }}>{error}</p>}
    </div>
  );
}

export default function LeadFormModal({
  isOpen,
  onClose,
  productName,
  productId,
  productImage,
  productPrice,
}: LeadFormModalProps) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState<Partial<typeof INITIAL>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* lock body scroll when open */
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* reset on open */
  useEffect(() => {
    if (isOpen) { setForm(INITIAL); setErrors({}); setSuccess(false); }
  }, [isOpen]);

  const validate = () => {
    const e: Partial<typeof INITIAL> = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Valid 10-digit phone required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, product: productName, productId }),
      });
      setSuccess(true);
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: keyof typeof INITIAL, value: string) => {
    setForm(f => ({ ...f, [name]: value }));
    setErrors(e => ({ ...e, [name]: undefined }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — also acts as centering container */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(6px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
          >
          {/* Modal — stop click from closing when clicking inside */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 520,
              maxHeight: 'calc(100vh - 32px)',
              background: 'var(--bg)',
              borderRadius: 28,
              overflow: 'hidden',
              zIndex: 2001,
              boxShadow: '0 40px 120px rgba(0,0,0,0.35)',
              border: '1px solid rgba(var(--primary-rgb),0.15)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* ── Header ── */}
            <div style={{
              padding: '22px 24px 18px',
              background: 'linear-gradient(135deg, rgba(var(--primary-rgb),0.12), rgba(var(--primary-rgb),0.04))',
              borderBottom: '1px solid rgba(var(--primary-rgb),0.12)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  {productImage && (
                    <div style={{ width: 56, height: 56, borderRadius: 12, overflow: 'hidden', border: '2px solid rgba(var(--primary-rgb),0.2)', flexShrink: 0 }}>
                      <img src={productImage} alt={productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <Zap size={13} color="var(--primary)" />
                      <span style={{ fontSize: 10, color: 'var(--primary)', fontFamily: 'Orbitron, sans-serif', letterSpacing: 2, fontWeight: 700 }}>
                        ENQUIRE NOW
                      </span>
                    </div>
                    <div style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, color: 'var(--text-primary)', fontSize: 18, lineHeight: 1.2 }}>
                      {productName}
                    </div>
                    {productPrice && (
                      <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 15, marginTop: 2 }}>
                        ₹{productPrice.toLocaleString('en-IN')}
                      </div>
                    )}
                  </div>
                </div>
                <button onClick={onClose} style={{ background: 'rgba(var(--surface-rgb),0.1)', border: '1px solid rgba(var(--surface-rgb),0.15)', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <X size={16} color="var(--text-secondary)" />
                </button>
              </div>
            </div>

            {/* ── Body ── */}
            <div style={{ overflowY: 'auto', padding: '24px', flex: 1 }}>
              <AnimatePresence mode="wait">
                {success ? (
                  /* Success State */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '32px 16px' }}
                  >
                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(var(--primary-rgb),0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <CheckCircle size={36} color="var(--primary)" />
                    </div>
                    <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, color: 'var(--text-primary)', fontSize: 22, marginBottom: 10 }}>
                      Request Received!
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, marginBottom: 28, maxWidth: 340, margin: '0 auto 28px' }}>
                      Thank you <strong style={{ color: 'var(--text-primary)' }}>{form.name}</strong>! Our team will contact you within <strong style={{ color: 'var(--primary)' }}>24 hours</strong> regarding the <strong style={{ color: 'var(--text-primary)' }}>{productName}</strong>.
                    </p>
                    <button onClick={onClose} className="btn-primary" style={{ padding: '12px 32px', fontSize: 12 }}>
                      Close
                    </button>
                  </motion.div>
                ) : (
                  /* Form State */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                  >
                    <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7, margin: '0 0 4px' }}>
                      Fill in your details and our team will get back to you with the best offer.
                    </p>

                    <div className="form-2-col">
                      <Field icon={User} name="name" label="Full Name" placeholder="Rahul Sharma" required value={form.name} error={errors.name} onChange={handleChange} />
                      <Field icon={Phone} name="phone" label="Phone" type="tel" placeholder="98XXXXXXXX" required value={form.phone} error={errors.phone} onChange={handleChange} />
                    </div>

                    <Field icon={Mail} name="email" label="Email" type="email" placeholder="you@email.com" required value={form.email} error={errors.email} onChange={handleChange} />
                    <Field icon={MapPin} name="city" label="City" placeholder="Delhi, Mumbai..." value={form.city} onChange={handleChange} />

                    {/* Message */}
                    <div>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: 1.2, marginBottom: 7, fontFamily: 'Orbitron, sans-serif' }}>
                        MESSAGE
                      </label>
                      <div style={{ position: 'relative' }}>
                        <MessageSquare size={15} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--primary)', pointerEvents: 'none' }} />
                        <textarea
                          rows={3}
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          placeholder="Any specific requirements or questions..."
                          style={{
                            width: '100%',
                            padding: '12px 14px 12px 40px',
                            borderRadius: 12,
                            border: '1.5px solid rgba(var(--primary-rgb),0.18)',
                            background: 'rgba(var(--surface-rgb),0.6)',
                            color: 'var(--text-primary)',
                            fontSize: 14,
                            outline: 'none',
                            resize: 'none',
                            fontFamily: 'inherit',
                            boxSizing: 'border-box',
                          }}
                          onFocus={e => { e.currentTarget.style.borderColor = 'var(--primary)'; }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(var(--primary-rgb),0.18)'; }}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
                      style={{ width: '100%', padding: '14px', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 4 }}
                    >
                      {loading ? (
                        <>
                          <span style={{ width: 16, height: 16, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                          Sending...
                        </>
                      ) : (
                        <><Send size={15} /> Send Enquiry</>
                      )}
                    </button>

                    <p style={{ fontSize: 11, color: 'var(--text-secondary)', textAlign: 'center' }}>
                      🔒 Your details are safe and will never be shared.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          </motion.div>{/* end backdrop */}

          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
