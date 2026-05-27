'use client';

import Link from 'next/link';
import { useCompareStore } from '@/lib/store';
import CompareTable from '@/components/CompareTable';

export default function ComparePage() {
  const selected = useCompareStore(state => state.selected);
  const removeCompare = useCompareStore(state => state.removeCompare);
  const clearCompare = useCompareStore(state => state.clearCompare);

  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ padding: '60px 5% 40px', background: 'rgba(var(--primary-rgb),0.08)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div className="bg-grid" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'Orbitron', fontSize: 11, color: 'var(--primary)', letterSpacing: 4, marginBottom: 12 }}>
            COMPARISON DASHBOARD
          </div>
          <h1 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 10 }}>
            Compare Electric Vehicles
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 660 }}>
            Select up to three Regal EV models to compare performance, battery, speed, and charging specs side-by-side.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 5% 100px' }}>
        {selected.length === 0 ? (
          <div style={{ display: 'grid', justifyItems: 'center', gap: 24, padding: '100px 20px', textAlign: 'center', borderRadius: 24, background: 'rgba(var(--surface-rgb),0.08)', border: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'Orbitron', fontSize: 13, color: 'var(--primary)', letterSpacing: 2 }}>NO COMPARISONS READY</div>
            <h2 style={{ fontSize: 28, color: 'var(--text-primary)', maxWidth: 520 }}>Choose up to three electric scooters on the products page to get a side-by-side view.</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 640, fontSize: 14 }}>The compare panel lets you quickly review pricing, battery capacity, range, top speed, charging time, and motor power in a single glance.</p>
            <Link href="/products" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ fontSize: 12, padding: '14px 28px' }}>Browse Products</button>
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--primary)', letterSpacing: 2, fontFamily: 'Orbitron' }}>SELECTED FOR COMPARISON</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginTop: 6 }}>{selected.length} model{selected.length === 1 ? '' : 's'} ready to compare</div>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="btn-outline" onClick={clearCompare}>Clear Selection</button>
                <Link href="/products" style={{ textDecoration: 'none' }}>
                  <button className="btn-primary" style={{ fontSize: 12, padding: '14px 28px' }}>Add More Models</button>
                </Link>
              </div>
            </div>

            <div style={{ display: 'grid', gap: 16, marginBottom: 32, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              {selected.map(product => (
                <div key={product.id} style={{ borderRadius: 20, border: '1px solid var(--border)', background: 'rgba(var(--surface-rgb),0.95)', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 16, alignItems: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: 16, overflow: 'hidden', background: 'rgba(var(--surface-rgb),0.08)' }}>
                      <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, color: 'var(--primary)', letterSpacing: 1.5, fontFamily: 'Orbitron' }}>{product.category}</div>
                      <div style={{ fontFamily: 'Orbitron', fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginTop: 4 }}>{product.name}</div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Price:</span> ₹{product.price.toLocaleString('en-IN')}</div>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Battery:</span> {product.specs.battery}</div>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Range:</span> {product.specs.range}</div>
                  </div>
                  <button className="btn-outline" onClick={() => removeCompare(product.id)} style={{ width: '100%', marginTop: 'auto' }}>Remove</button>
                </div>
              ))}
            </div>

            <CompareTable products={selected} />
          </>
        )}
      </div>
    </div>
  );
}
