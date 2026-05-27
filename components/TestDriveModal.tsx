'use client';

import { useEffect, useState } from 'react';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

const initialFormState = {
  fullName: '',
  phone: '',
  email: '',
  city: '',
  preferredDate: '',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10,15}$/;

export default function TestDriveModal({ isOpen, onClose, productName }: TestDriveModalProps) {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setForm(initialFormState);
      setErrors({});
      setSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required';
    if (!phoneRegex.test(form.phone.replace(/\D/g, ''))) nextErrors.phone = 'Enter a valid phone number';
    if (!emailRegex.test(form.email.trim())) nextErrors.email = 'Enter a valid email address';
    if (!form.city.trim()) nextErrors.city = 'City is required';
    if (!form.preferredDate.trim()) nextErrors.preferredDate = 'Date is required';
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(0,0,0,0.72)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 560, borderRadius: 24, background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 30px 80px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: 'Orbitron', fontSize: 13, letterSpacing: 1.5, color: 'var(--primary)', marginBottom: 8 }}>TEST DRIVE BOOKING</div>
              <h2 style={{ fontFamily: 'Orbitron', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Book a test drive for {productName}</h2>
            </div>
            <button onClick={onClose} style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 16, padding: 8 }}>✕</button>
          </div>
        </div>

        <div style={{ padding: '24px 28px' }}>
          {submitted ? (
            <div style={{ display: 'grid', gap: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)' }}>Booking request received</div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>Thank you! We have received your request and will contact you shortly to confirm your test drive appointment.</p>
              <button onClick={onClose} className="btn-primary" style={{ width: '100%', padding: '14px 0' }}>Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
              {[
                { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter full name' },
                { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter phone number' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email address' },
                { name: 'city', label: 'City', type: 'text', placeholder: 'Enter city' },
                { name: 'preferredDate', label: 'Preferred Date', type: 'date', placeholder: '' },
              ].map(field => (
                <label key={field.name} style={{ display: 'grid', gap: 8, color: 'var(--text-primary)', fontSize: 13 }}>
                  <span style={{ fontFamily: 'Orbitron', letterSpacing: 1 }}>{field.label}</span>
                  <input
                    type={field.type}
                    value={form[field.name as keyof typeof form]}
                    placeholder={field.placeholder}
                    onChange={e => handleChange(field.name as keyof typeof form, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: 14,
                      border: errors[field.name] ? '1px solid #ff6b35' : '1px solid var(--border)',
                      background: 'rgba(var(--surface-rgb),0.08)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: 14,
                      fontFamily: 'Exo 2, sans-serif',
                    }}
                  />
                  {errors[field.name] && <span style={{ color: '#ff6b35', fontSize: 12 }}>{errors[field.name]}</span>}
                </label>
              ))}

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px 0', fontSize: 13 }}>Submit Request</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
