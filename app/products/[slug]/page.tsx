'use client';
import { useState } from 'react';
import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Zap, Battery, Gauge, Clock, Weight, Package, ChevronRight, MessageCircle } from 'lucide-react';
import { getProductBySlug, products } from '@/lib/products';
import EmiCalculator from '@/components/EmiCalculator';
import LeadFormModal from '@/components/LeadFormModal';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: PageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeImage, setActiveImage] = useState(0);
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  const specItems = [
    { icon: Gauge, label: 'Range', value: product.specs.range },
    { icon: Zap, label: 'Top Speed', value: product.specs.topSpeed },
    { icon: Battery, label: 'Battery', value: product.specs.battery },
    { icon: Zap, label: 'Motor', value: product.specs.motor },
    { icon: Clock, label: 'Charging Time', value: product.specs.chargingTime },
    { icon: Weight, label: 'Weight', value: product.specs.weight },
    ...(product.specs.payload ? [{ icon: Package, label: 'Payload', value: product.specs.payload }] : []),
  ];

  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Breadcrumb */}
      <div style={{ padding: '20px 5%', borderBottom: '1px solid rgba(var(--surface-rgb),0.05)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/products" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 12, fontFamily: 'Orbitron', letterSpacing: 1 }}>
            <ArrowLeft size={14} /> PRODUCTS
          </Link>
          <ChevronRight size={12} color="var(--text-secondary)" />
          <span style={{ color: 'var(--primary)', fontSize: 12, fontFamily: 'Orbitron', letterSpacing: 1 }}>{product.name}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '48px 5% 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          {/* LEFT — Images */}
          <div>
            {/* Main Image */}
            <div style={{
              borderRadius: 20,
              overflow: 'hidden',
              background: 'rgba(var(--surface-rgb),0.88)',
              border: '1px solid rgba(var(--primary-rgb),0.1)',
              aspectRatio: '16/11',
              position: 'relative',
            }}>
              <img
                src={product.images[activeImage] || product.images[0]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {product.badge && (
                <div style={{
                  position: 'absolute', top: 20, left: 20,
                  background: product.badge === 'New Launch' ? 'var(--primary)' : 'linear-gradient(135deg, rgba(var(--primary-rgb),0.95), rgba(var(--primary-rgb),0.75))',
                  color: product.badge === 'New Launch' ? 'var(--button-text)' : 'var(--text-primary)',
                  fontSize: 10, fontWeight: 800, fontFamily: 'Orbitron', letterSpacing: 1,
                  padding: '6px 14px', borderRadius: 6,
                }}>{product.badge}</div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      width: 80, height: 60,
                      borderRadius: 8,
                      overflow: 'hidden',
                      border: `2px solid ${i === activeImage ? 'var(--primary)' : 'rgba(var(--surface-rgb),0.1)'}`,
                      cursor: 'pointer',
                      background: 'none',
                      padding: 0,
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Details */}
          <div>
            <div style={{ fontSize: 11, color: 'var(--primary)', letterSpacing: 3, fontFamily: 'Orbitron', marginBottom: 10 }}>
              {product.category.toUpperCase()} SERIES
            </div>
            <h1 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.1 }}>
              {product.name}
            </h1>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
              <span style={{ fontFamily: 'Orbitron', fontSize: 36, fontWeight: 800, color: 'var(--primary)' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span style={{ fontSize: 18, color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span style={{ background: 'rgba(var(--primary-rgb),0.15)', color: 'var(--primary)', padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, marginBottom: 28 }}>{product.description}</p>

            {/* Color selector */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', letterSpacing: 1, marginBottom: 12, fontFamily: 'Orbitron' }}>
                COLOR: <span style={{ color: 'var(--text-primary)' }}>{selectedColor}</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      width: 32, height: 32,
                      borderRadius: '50%',
                      background: color === 'silver' ? 'linear-gradient(135deg, #c0c0c0, #808080)' : color,
                      border: selectedColor === color ? '3px solid var(--primary)' : '3px solid transparent',
                      outline: selectedColor === color ? '1px solid rgba(var(--primary-rgb),0.5)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 36 }}>
              <button
                onClick={() => setLeadModalOpen(true)}
                className="btn-primary"
                style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 12, transition: 'all 0.3s' }}
              >
                <MessageCircle size={16} /> ENQUIRE NOW
              </button>
              <Link href="/contact" style={{ flex: '1 1 200px', textDecoration: 'none' }}>
                <button className="btn-outline" style={{ width: '100%', fontSize: 12, minHeight: 44 }}>
                  CONTACT DEALER
                </button>
              </Link>
            </div>

            <EmiCalculator initialPrice={product.price} />
            <LeadFormModal
              isOpen={leadModalOpen}
              onClose={() => setLeadModalOpen(false)}
              productName={product.name}
              productId={product.id}
              productImage={product.images[0]}
              productPrice={product.price}
            />

            {/* Key specs preview */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
              marginBottom: 28,
              padding: '20px',
              background: 'rgba(var(--primary-rgb),0.04)',
              border: '1px solid rgba(var(--primary-rgb),0.1)',
              borderRadius: 12,
            }}>
              {specItems.slice(0, 3).map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <Icon size={16} color="var(--primary)" style={{ margin: '0 auto 6px' }} />
                  <div style={{ fontSize: 9, color: 'var(--text-secondary)', letterSpacing: 1 }}>{label.toUpperCase()}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['Free Delivery', '1 Year Warranty', 'Easy EMI', '24x7 Support'].map(badge => (
                <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-secondary)' }}>
                  <Check size={12} color="var(--primary)" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Specs Table */}
        <div style={{ marginTop: 80 }}>
          <h2 style={{ fontFamily: 'Orbitron', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32 }}>
            TECHNICAL SPECIFICATIONS
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 16,
          }}>
            {specItems.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                style={{
                  background: 'rgba(var(--surface-rgb),0.88)',
                  border: '1px solid rgba(var(--primary-rgb),0.1)',
                  borderRadius: 12,
                  padding: '20px 24px',
                  display: 'flex',
                  gap: 16,
                  alignItems: 'center',
                }}
              >
                <div style={{
                  width: 44, height: 44,
                  background: 'rgba(var(--primary-rgb),0.1)',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={20} color="var(--primary)" />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)', letterSpacing: 1, fontFamily: 'Orbitron' }}>{label.toUpperCase()}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginTop: 3 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div style={{ marginTop: 60 }}>
          <h2 style={{ fontFamily: 'Orbitron', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>
            KEY FEATURES
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {product.features.map(f => (
              <div
                key={f}
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                  background: 'rgba(var(--primary-rgb),0.04)',
                  border: '1px solid rgba(var(--primary-rgb),0.1)',
                  borderRadius: 8,
                  padding: '12px 16px',
                }}
              >
                <Check size={14} color="var(--primary)" />
                <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <h2 style={{ fontFamily: 'Orbitron', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32 }}>
              RELATED MODELS
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {relatedProducts.map(rp => (
                <Link key={rp.id} href={`/products/${rp.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="card-hover gradient-border" style={{ background: 'rgba(var(--surface-rgb),0.88)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                      <img src={rp.images[0]} alt={rp.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: 20 }}>
                      <h3 style={{ fontFamily: 'Orbitron', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{rp.name}</h3>
                      <span style={{ fontFamily: 'Orbitron', fontSize: 16, color: 'var(--primary)', fontWeight: 700 }}>₹{rp.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
