'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Zap, Shield, Leaf, Clock, Star } from 'lucide-react';
import { products } from '@/lib/products';
import type { Product } from '@/lib/store';
import Hero from '@/components/Hero';
import HomepageFeaturedCard from '@/components/HomepageFeaturedCard';
import LeadFormModal from '@/components/LeadFormModal';

const stats = [
  { value: '20+', label: 'Years Experience' },
  { value: '14+', label: 'EV Models' },
  { value: '10K+', label: 'Happy Riders' },
  { value: '500+', label: 'Dealers Pan India' },
];

const features = [
  { icon: Zap, title: 'Advanced Technology', desc: 'Modern BLDC motors with smart power management for smooth, reliable performance.' },
  { icon: Clock, title: 'Long Range & Quick Charge', desc: 'Ride up to 180km on a single charge with fast-charging support for daily convenience.' },
  { icon: Shield, title: 'Built for India', desc: 'High-tensile steel frames, rugged suspension, and engineering tuned for Indian roads.' },
  { icon: Leaf, title: 'Zero Emissions', desc: 'Clean mobility that reduces your carbon footprint without compromising on power.' },
];

const reviews = [
  { name: 'Ananya S.', role: 'Urban Commuter', text: 'The smooth acceleration and premium finish make every ride feel luxurious. My daily commute has completely transformed.', rating: 5 },
  { name: 'Rohit K.', role: 'Startup Founder', text: 'Regal EV offered a perfect blend of range and comfort. The service experience was prompt and professional.', rating: 5 },
  { name: 'Priya M.', role: 'Delivery Partner', text: 'Strong motor, great handling, and low running costs. It handles city traffic and long shifts effortlessly.', rating: 5 },
];

export default function Home() {
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => products.slice(0, 8), []);
  const bestSellers = useMemo(() => products.filter(p => ['Best Seller', 'Popular', 'Flagship', 'Pro Series'].includes(p.badge ?? '')).slice(0, 4), []);

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
      <Hero />

      <section id="products-section" style={{ padding: '48px 5% 92px' }}>
        <div style={{ maxWidth: 1540, margin: '0 auto' }} className="grid-4-col">
          {filteredProducts.slice(0, 4).map(product => (
            <HomepageFeaturedCard key={product.id} product={product} onEnquire={() => setEnquiryProduct(product)} />
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 5%', background: 'rgba(var(--primary-rgb),0.08)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontFamily: 'Orbitron', fontSize: 11, letterSpacing: 4, color: 'var(--primary)', marginBottom: 14 }}>BEST SELLERS</div>
            <h2 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(28px, 3.6vw, 40px)', color: 'var(--text-primary)', margin: 0 }}>Our Most Loved EVs</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.85, marginTop: 14, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>Top-rated Regal EV models that riders choose again and again for comfort, durability, and premium features.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4" style={{ gap: 24 }}>
            {bestSellers.map(product => (
              <div key={product.id} className="mini-ev-card">
                <div className="mini-ev-card__image">
                  <img src={product.images[0]} alt={product.name} />
                </div>
                <div className="mini-ev-card__body">
                  <div className="mini-ev-card__title">{product.name}</div>
                  <div className="mini-ev-card__desc">{product.description}</div>
                  <div className="mini-ev-card__price">₹{product.price.toLocaleString('en-IN')}</div>
                  <button onClick={() => setEnquiryProduct(product)} className="btn-outline mini-ev-card__button">Enquire Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }} className="section-2-col">
          <div>
            <div style={{ fontFamily: 'Orbitron', fontSize: 11, letterSpacing: 4, color: 'var(--primary)', marginBottom: 14 }}>COMPARE SECTION</div>
            <h2 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(32px, 4vw, 44px)', color: 'var(--text-primary)', margin: 0 }}>Make confident decisions with comparative insight.</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.85, marginTop: 18, maxWidth: 560 }}>Compare price, battery, range, speed, charging time and motor power across models to choose the perfect EV for your lifestyle.</p>
            <Link href="/compare" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ marginTop: 24, padding: '14px 24px', fontSize: 12 }}>Open Compare Workspace</button>
            </Link>
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            {['Price', 'Battery Capacity', 'Range', 'Top Speed', 'Charging Time', 'Motor Power'].map(label => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '18px 22px', borderRadius: 18, background: 'rgba(var(--primary-rgb),0.04)', border: '1px solid rgba(var(--surface-rgb),0.08)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{label}</span>
                <span style={{ color: 'var(--text-primary)', fontFamily: 'Orbitron', fontSize: 13 }}>Compare with ease</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 5%', background: 'rgba(var(--primary-rgb),0.08)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: 'Orbitron', fontSize: 11, letterSpacing: 4, color: 'var(--primary)', marginBottom: 14 }}>CUSTOMER REVIEWS</div>
            <h2 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(32px, 4vw, 44px)', color: 'var(--text-primary)', margin: 0 }}>Riders trust Regal EV.</h2>
          </div>
          <div className="reviews-grid">
            {reviews.map(review => (
              <div key={review.name} className="testimonial-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div className="testimonial-avatar">{review.name.split(' ').map(name => name[0]).slice(0, 2).join('')}</div>
                  <div>
                    <div style={{ fontFamily: 'Orbitron', fontSize: 18, color: 'var(--text-primary)', marginBottom: 6 }}>{review.name}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{review.role}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18, color: 'var(--primary)' }}>
                  {Array.from({ length: review.rating }).map((_, index) => <Star key={index} size={16} />)}
                  <span style={{ color: 'var(--text-secondary)', fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase' }}>{review.rating}.0 rating</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.9, marginTop: 20 }}>{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', borderRadius: 28, background: 'rgba(var(--surface-rgb),0.96)', border: '1px solid rgba(var(--primary-rgb),0.18)', position: 'relative', overflow: 'hidden' }} className="cta-box" >
          <div style={{ position: 'absolute', top: -40, right: -40, width: 260, height: 260, borderRadius: '50%', background: 'rgba(var(--primary-rgb),0.08)', filter: 'blur(70px)', pointerEvents: 'none' }} />
          <div style={{ padding: '64px 56px', position: 'relative', zIndex: 1 }} className="cta-inner-grid">
            <div>
              <div style={{ fontFamily: 'Orbitron', fontSize: 11, letterSpacing: 4, color: 'var(--primary)', marginBottom: 12 }}>TAKE ACTION</div>
              <h2 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(36px, 4vw, 52px)', color: 'var(--text-primary)', margin: 0, lineHeight: 1.05 }}>Elevate your commute with a premium Regal EV today.</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.85, marginTop: 20, maxWidth: 620 }}>Choose from India&apos;s finest electric scooters, backed by industry-leading range and premium ride comforts.</p>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/products" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ padding: '16px 28px', fontSize: 13 }}>Browse Products</button>
              </Link>
              <Link href="/contact" style={{ textDecoration: 'none' }}>
                <button className="btn-outline" style={{ padding: '16px 28px', fontSize: 13 }}>Contact Sales</button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {enquiryProduct && (
        <LeadFormModal
          isOpen={!!enquiryProduct}
          onClose={() => setEnquiryProduct(null)}
          productName={enquiryProduct.name}
          productId={enquiryProduct.id}
          productImage={enquiryProduct.images[0]}
          productPrice={enquiryProduct.price}
        />
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        @media (max-width: 860px) {
          .cta-box { padding: 0 !important; }
          .cta-inner-grid { padding: 36px 24px !important; }
        }
        @media (max-width: 480px) {
          .cta-inner-grid { padding: 28px 18px !important; }
        }
      `}</style>
    </div>
  );
}
