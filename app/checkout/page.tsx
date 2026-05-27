'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, CreditCard, Smartphone, Building2, Lock, Shield, Truck, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';

type Step = 'details' | 'payment' | 'confirm';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod';
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  upiId: string;
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>('details');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '',
    paymentMethod: 'upi', cardNumber: '', cardExpiry: '', cardCvv: '', upiId: '',
  });

  const subtotal = total();
  const gst = Math.round(subtotal * 0.12);
  const shipping = subtotal > 0 ? 0 : 0;
  const grandTotal = subtotal + gst;

  const update = (field: keyof FormData, value: string) => setForm(f => ({ ...f, [field]: value }));

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
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
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block',
    fontSize: 11,
    color: 'var(--text-secondary)',
    fontFamily: 'Orbitron',
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase' as const,
  };

  if (orderPlaced) {
    return (
      <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '0 5%', maxWidth: 500 }}>
          <div style={{
            width: 100, height: 100,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(var(--primary-rgb),0.2), rgba(var(--primary-rgb),0.1))',
            border: '2px solid var(--primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 32px',
            boxShadow: '0 0 50px rgba(var(--primary-rgb),0.3)',
          }}>
            <Check size={48} color="var(--primary)" />
          </div>
          <h1 style={{ fontFamily: 'Orbitron', fontSize: 32, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16 }}>
            ORDER CONFIRMED!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, marginBottom: 12 }}>
            Your Regal EV order has been placed successfully.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 40 }}>
            Order ID: <span style={{ color: 'var(--primary)', fontFamily: 'Orbitron' }}>REV-{Date.now().toString().slice(-8)}</span>
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 40 }}>
            We'll send a confirmation to your email. Your vehicle will be delivered within 7-10 business days.
          </p>
          <Link href="/products" style={{ textDecoration: 'none' }}>
            <button className="btn-primary">CONTINUE SHOPPING</button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '0 5%' }}>
          <h2 style={{ fontFamily: 'Orbitron', fontSize: 24, color: 'var(--text-primary)', marginBottom: 16 }}>YOUR CART IS EMPTY</h2>
          <Link href="/products" style={{ textDecoration: 'none' }}>
            <button className="btn-primary">BROWSE PRODUCTS</button>
          </Link>
        </div>
      </div>
    );
  }

  const steps: { key: Step; label: string }[] = [
    { key: 'details', label: 'Details' },
    { key: 'payment', label: 'Payment' },
    { key: 'confirm', label: 'Confirm' },
  ];

  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 5% 80px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 48 }}>
          <Link href="/products" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 12, fontFamily: 'Orbitron' }}>
            <ArrowLeft size={14} /> BACK
          </Link>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 0 }}>
            {steps.map((s, i) => (
              <div key={s.key} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'unset' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: step === s.key ? 'linear-gradient(135deg, rgba(var(--primary-rgb),0.95), rgba(var(--primary-rgb),0.75))' : steps.indexOf({ key: step, label: '' }) > i || (step === 'payment' && s.key === 'details') || (step === 'confirm' && s.key !== 'confirm') ? 'rgba(var(--primary-rgb),0.2)' : 'rgba(var(--surface-rgb),0.05)',
                    border: `2px solid ${step === s.key ? 'var(--primary)' : 'rgba(var(--surface-rgb),0.1)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700,
                    color: step === s.key ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontFamily: 'Orbitron',
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: 11, fontFamily: 'Orbitron', color: step === s.key ? 'var(--text-primary)' : 'var(--text-secondary)', letterSpacing: 1 }}>
                    {s.label.toUpperCase()}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ flex: 1, height: 1, background: 'rgba(var(--surface-rgb),0.08)', margin: '0 16px' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' }}>
          {/* Main Form */}
          <div>
            {/* STEP 1: Details */}
            {step === 'details' && (
              <div>
                <h2 style={{ fontFamily: 'Orbitron', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32 }}>
                  DELIVERY DETAILS
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Full Name</label>
                    <input style={inputStyle} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input style={inputStyle} type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="email@example.com" />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input style={inputStyle} type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Delivery Address</label>
                    <textarea style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} value={form.address} onChange={e => update('address', e.target.value)} placeholder="House no., Street, Area" />
                  </div>
                  <div>
                    <label style={labelStyle}>City</label>
                    <input style={inputStyle} value={form.city} onChange={e => update('city', e.target.value)} placeholder="City" />
                  </div>
                  <div>
                    <label style={labelStyle}>State</label>
                    <input style={inputStyle} value={form.state} onChange={e => update('state', e.target.value)} placeholder="State" />
                  </div>
                  <div>
                    <label style={labelStyle}>PIN Code</label>
                    <input style={inputStyle} value={form.pincode} onChange={e => update('pincode', e.target.value)} placeholder="PIN Code" />
                  </div>
                </div>
                <button
                  onClick={() => setStep('payment')}
                  className="btn-primary"
                  style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}
                  disabled={!form.name || !form.email || !form.phone || !form.address}
                >
                  CONTINUE TO PAYMENT <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* STEP 2: Payment */}
            {step === 'payment' && (
              <div>
                <h2 style={{ fontFamily: 'Orbitron', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32 }}>
                  PAYMENT METHOD
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                  {[
                    { value: 'upi' as const, label: 'UPI Payment', icon: Smartphone, desc: 'Pay via Google Pay, PhonePe, Paytm' },
                    { value: 'card' as const, label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
                    { value: 'netbanking' as const, label: 'Net Banking', icon: Building2, desc: 'All major banks supported' },
                    { value: 'cod' as const, label: 'Cash on Delivery', icon: Truck, desc: 'Pay when vehicle arrives' },
                  ].map(opt => (
                    <div
                      key={opt.value}
                      onClick={() => update('paymentMethod', opt.value)}
                      style={{
                        background: form.paymentMethod === opt.value ? 'rgba(var(--primary-rgb),0.08)' : 'rgba(var(--surface-rgb),0.8)',
                        border: `1px solid ${form.paymentMethod === opt.value ? 'var(--primary)' : 'rgba(var(--surface-rgb),0.08)'}`,
                        borderRadius: 12,
                        padding: '18px 20px',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: 16,
                        alignItems: 'center',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{
                        width: 44, height: 44,
                        borderRadius: 10,
                        background: form.paymentMethod === opt.value ? 'rgba(var(--primary-rgb),0.15)' : 'rgba(var(--surface-rgb),0.05)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <opt.icon size={20} color={form.paymentMethod === opt.value ? 'var(--primary)' : 'var(--text-secondary)'} />
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Orbitron', fontSize: 13, fontWeight: 700, color: form.paymentMethod === opt.value ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                          {opt.label}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{opt.desc}</div>
                      </div>
                      <div style={{ marginLeft: 'auto' }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: '50%',
                          border: `2px solid ${form.paymentMethod === opt.value ? 'var(--primary)' : 'rgba(var(--surface-rgb),0.2)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {form.paymentMethod === opt.value && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--primary)' }} />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* UPI Input */}
                {form.paymentMethod === 'upi' && (
                  <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle}>UPI ID</label>
                    <input style={inputStyle} value={form.upiId} onChange={e => update('upiId', e.target.value)} placeholder="yourname@paytm / yourname@ybl" />
                  </div>
                )}

                {/* Card Inputs */}
                {form.paymentMethod === 'card' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 24 }}>
                    <div>
                      <label style={labelStyle}>Card Number</label>
                      <input style={inputStyle} value={form.cardNumber} onChange={e => update('cardNumber', e.target.value)} placeholder="1234 5678 9012 3456" maxLength={19} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label style={labelStyle}>Expiry Date</label>
                        <input style={inputStyle} value={form.cardExpiry} onChange={e => update('cardExpiry', e.target.value)} placeholder="MM / YY" />
                      </div>
                      <div>
                        <label style={labelStyle}>CVV</label>
                        <input style={inputStyle} value={form.cardCvv} onChange={e => update('cardCvv', e.target.value)} placeholder="•••" maxLength={4} type="password" />
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep('details')} className="btn-outline" style={{ fontSize: 12 }}>BACK</button>
                  <button
                    onClick={() => setStep('confirm')}
                    className="btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}
                  >
                    REVIEW ORDER <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Confirm */}
            {step === 'confirm' && (
              <div>
                <h2 style={{ fontFamily: 'Orbitron', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32 }}>
                  REVIEW ORDER
                </h2>

                {/* Delivery Summary */}
                <div style={{
                  background: 'rgba(var(--surface-rgb),0.88)',
                  border: '1px solid rgba(var(--primary-rgb),0.1)',
                  borderRadius: 12,
                  padding: '20px 24px',
                  marginBottom: 20,
                }}>
                  <div style={{ fontFamily: 'Orbitron', fontSize: 11, color: 'var(--primary)', letterSpacing: 2, marginBottom: 12 }}>DELIVERY TO</div>
                  <p style={{ color: 'var(--text-primary)', fontSize: 14, marginBottom: 4 }}>{form.name}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{form.address}, {form.city}, {form.state} - {form.pincode}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{form.phone} | {form.email}</p>
                </div>

                <div style={{
                  background: 'rgba(var(--surface-rgb),0.88)',
                  border: '1px solid rgba(var(--primary-rgb),0.1)',
                  borderRadius: 12,
                  padding: '20px 24px',
                  marginBottom: 32,
                }}>
                  <div style={{ fontFamily: 'Orbitron', fontSize: 11, color: 'var(--primary)', letterSpacing: 2, marginBottom: 12 }}>PAYMENT</div>
                  <p style={{ color: 'var(--text-primary)', fontSize: 14 }}>
                    {form.paymentMethod === 'upi' ? `UPI: ${form.upiId}` :
                      form.paymentMethod === 'card' ? `Card ending •••• ${form.cardNumber.slice(-4)}` :
                        form.paymentMethod === 'netbanking' ? 'Net Banking' : 'Cash on Delivery'}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 0', color: 'var(--text-secondary)', fontSize: 12, marginBottom: 24 }}>
                  <Lock size={14} color="var(--primary)" />
                  Your payment is secured with 256-bit SSL encryption
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep('payment')} className="btn-outline" style={{ fontSize: 12 }}>BACK</button>
                  <button
                    onClick={handlePlaceOrder}
                    className="btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, flex: 1, justifyContent: 'center' }}
                  >
                    <Lock size={16} /> PLACE ORDER — ₹{grandTotal.toLocaleString('en-IN')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div style={{
            background: 'rgba(var(--surface-rgb),0.88)',
            border: '1px solid rgba(var(--primary-rgb),0.1)',
            borderRadius: 16,
            padding: 28,
            position: 'sticky',
            top: 100,
          }}>
            <div style={{ fontFamily: 'Orbitron', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: 2, marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(var(--surface-rgb),0.07)' }}>
              ORDER SUMMARY
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
              {items.map(item => (
                <div key={`${item.product.id}-${item.color}`} style={{ display: 'flex', gap: 12 }}>
                  <div style={{
                    width: 64, height: 50, borderRadius: 8, overflow: 'hidden',
                    background: 'rgba(var(--surface-rgb),0.04)', flexShrink: 0,
                    border: '1px solid rgba(var(--primary-rgb),0.1)',
                  }}>
                    <img src={item.product.images[0]} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Orbitron', fontSize: 11, fontWeight: 700, color: 'var(--text-primary)' }}>{item.product.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>Qty: {item.quantity}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginTop: 2, fontFamily: 'Orbitron' }}>
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(var(--surface-rgb),0.07)', paddingTop: 16 }}>
              {[
                { label: 'Subtotal', value: `₹${subtotal.toLocaleString('en-IN')}` },
                { label: 'GST (12%)', value: `₹${gst.toLocaleString('en-IN')}` },
                { label: 'Shipping', value: 'FREE' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{row.label}</span>
                  <span style={{ color: row.value === 'FREE' ? 'var(--primary)' : 'var(--text-secondary)', fontSize: 13, fontWeight: 500 }}>{row.value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(var(--surface-rgb),0.07)', marginTop: 4 }}>
                <span style={{ fontFamily: 'Orbitron', fontSize: 12, color: 'var(--text-primary)' }}>TOTAL</span>
                <span style={{ fontFamily: 'Orbitron', fontSize: 18, fontWeight: 800, color: 'var(--primary)' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ marginTop: 20, padding: '12px 16px', background: 'rgba(var(--primary-rgb),0.05)', borderRadius: 8, border: '1px solid rgba(var(--primary-rgb),0.1)', display: 'flex', gap: 8, alignItems: 'center' }}>
              <Shield size={14} color="var(--primary)" />
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Secured by Regal EV Payment Gateway</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 380px"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
