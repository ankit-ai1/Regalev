'use client';
import { useCartStore } from '@/lib/store';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, total, itemCount } = useCartStore();
  const totalAmount = total();
  const count = itemCount();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 2000,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'opacity 0.3s',
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: 440,
          background: 'rgba(var(--surface-rgb),0.96)',
          zIndex: 2001,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid rgba(var(--primary-rgb),0.15)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid rgba(var(--surface-rgb),0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(var(--primary-rgb),0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ShoppingBag size={22} color="var(--primary)" />
            <div>
              <div style={{ fontFamily: 'Orbitron', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: 1 }}>
                YOUR CART
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{count} item{count !== 1 ? 's' : ''}</div>
            </div>
          </div>
          <button
            onClick={closeCart}
            style={{ background: 'rgba(var(--surface-rgb),0.05)', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', color: 'var(--text-secondary)', transition: 'all 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <ShoppingBag size={48} color="rgba(107,114,128,0.4)" style={{ margin: '0 auto 16px' }} />
              <p style={{ color: 'var(--text-secondary)', fontFamily: 'Orbitron', fontSize: 12, letterSpacing: 2 }}>CART IS EMPTY</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 8 }}>Add some scooters to get started</p>
              <button onClick={closeCart} className="btn-outline" style={{ marginTop: 24, fontSize: 11, padding: '10px 24px' }}>
                BROWSE PRODUCTS
              </button>
            </div>
          ) : (
            items.map(item => (
              <div
                key={`${item.product.id}-${item.color}`}
                style={{
                  display: 'flex',
                  gap: 16,
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(var(--surface-rgb),0.06)',
                }}
              >
                <div style={{
                  width: 80,
                  height: 70,
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: 'rgba(var(--surface-rgb),0.04)',
                  flexShrink: 0,
                  border: '1px solid rgba(var(--primary-rgb),0.1)',
                }}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Orbitron', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: 1 }}>
                    {item.product.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>Color: {item.color}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginTop: 6, fontFamily: 'Orbitron' }}>
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.color, item.quantity - 1)}
                      style={{ background: 'rgba(var(--surface-rgb),0.08)', border: 'none', borderRadius: 4, width: 26, height: 26, cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 600, minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.color, item.quantity + 1)}
                      style={{ background: 'rgba(var(--primary-rgb),0.15)', border: 'none', borderRadius: 4, width: 26, height: 26, cursor: 'pointer', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id, item.color)}
                      style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#ff4444')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '24px',
            borderTop: '1px solid rgba(var(--surface-rgb),0.08)',
            background: 'rgba(var(--primary-rgb),0.02)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Subtotal</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>GST (12%)</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>₹{Math.round(totalAmount * 0.12).toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, paddingTop: 12, borderTop: '1px solid rgba(var(--surface-rgb),0.08)' }}>
              <span style={{ fontFamily: 'Orbitron', fontSize: 13, letterSpacing: 1 }}>TOTAL</span>
              <span style={{ fontFamily: 'Orbitron', fontSize: 18, fontWeight: 700, color: 'var(--primary)' }}>
                ₹{Math.round(totalAmount * 1.12).toLocaleString('en-IN')}
              </span>
            </div>
            <Link href="/checkout" onClick={closeCart} style={{ textDecoration: 'none', display: 'block' }}>
              <button className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                PROCEED TO CHECKOUT <ArrowRight size={16} />
              </button>
            </Link>
            <button onClick={closeCart} className="btn-outline" style={{ width: '100%', marginTop: 12, fontSize: 11 }}>
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </div>
    </>
  );
}
