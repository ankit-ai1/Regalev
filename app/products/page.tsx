'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, Zap, Gauge, BatteryCharging } from 'lucide-react';
import { products, categories } from '@/lib/products';
import type { Product } from '@/lib/store';
import { useCompareStore } from '@/lib/store';
import LeadFormModal from '@/components/LeadFormModal';
import CompareButton from '@/components/CompareButton';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null);
  const selected = useCompareStore(state => state.selected);
  const toggleCompare = useCompareStore(state => state.toggleCompare);
  const clearCompare = useCompareStore(state => state.clearCompare);

  const filtered = products
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'range') return parseInt(b.specs.range) - parseInt(a.specs.range);
      return 0;
    });

  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{
        padding: '60px 5% 40px',
        background: 'rgba(var(--primary-rgb),0.02)',
        borderBottom: '1px solid rgba(var(--primary-rgb),0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="bg-grid" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'Orbitron', fontSize: 11, color: 'var(--primary)', letterSpacing: 4, marginBottom: 12 }}>
            OUR COMPLETE RANGE
          </div>
          <h1 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 8 }}>
            ALL ELECTRIC MODELS
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{filtered.length} vehicles available</p>
        </div>
      </div>

      {/* Filters Bar - Premium marketplace filter experience */}
      <div className="filters-container" style={{ position: 'sticky', top: 72, zIndex: 100 }}>
        <div className="filters-inner">
          <div className="filters-left">
            <div className="search-box">
              <Search size={22} className="search-icon" />
              <input
                className="search-input"
                type="text"
                placeholder="Search electric vehicles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search electric vehicles"
                style={{ minWidth: 450 }}
              />
            </div>

            <div className="pill-container" role="tablist" aria-label="Categories">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filters-right">
            <select
              className="sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              aria-label="Sort models"
            >
              <option value="default">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="range">Best Range</option>
            </select>
          </div>
        </div>
      </div>

      {selected.length > 0 && (
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '26px 5%', display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(var(--surface-rgb),0.06)', background: 'rgba(var(--surface-rgb),0.75)' }}>
          <div>
            <div style={{ fontSize: 12, fontFamily: 'Orbitron', letterSpacing: 2, color: 'var(--primary)' }}>COMPARE READY</div>
            <div style={{ fontSize: 14, color: 'var(--text-primary)', marginTop: 6 }}>Selected {selected.length} of 3 vehicles</div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn-outline" onClick={clearCompare} style={{ fontSize: 11, padding: '12px 18px' }}>Clear Selection</button>
            <Link href="/compare" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ fontSize: 11, padding: '12px 18px' }}>Open Compare</button>
            </Link>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 5% 80px' }}>
        <div className="grid-4-col">
          {filtered.map(product => (
            <div key={product.id} className="marketplace-card">
              <div className="marketplace-card__image">
                <img src={product.images[0]} alt={product.name} />
              </div>
              <div className="marketplace-card__content">
                <div className="marketplace-card__badge">{product.category}</div>
                <h3 className="marketplace-card__title">{product.name}</h3>
                <p className="marketplace-card__description">{product.description}</p>

                <div className="marketplace-card__specs">
                  {[
                    { icon: Zap, label: 'Range', value: product.specs.range },
                    { icon: Gauge, label: 'Top Speed', value: product.specs.topSpeed },
                    { icon: BatteryCharging, label: 'Battery', value: product.specs.battery },
                  ].map(spec => (
                    <div key={spec.label} className="marketplace-card__spec">
                      <spec.icon size={16} className="marketplace-card__spec-icon" />
                      <div className="marketplace-card__spec-value">{spec.value}</div>
                      <div className="marketplace-card__spec-label">{spec.label}</div>
                    </div>
                  ))}
                </div>

                <div className="marketplace-card__pricing">
                  <div>
                    <div className="marketplace-card__price">₹{product.price.toLocaleString('en-IN')}</div>
                    {product.originalPrice && <div className="marketplace-card__old-price">₹{product.originalPrice.toLocaleString('en-IN')}</div>}
                  </div>
                  <div style={{ minWidth: 120 }}>
                    <CompareButton 
                      selected={selected.some(item => item.id === product.id)}
                      disabled={selected.length >= 3 && !selected.some(item => item.id === product.id)}
                      onToggle={() => toggleCompare(product)}
                    />
                  </div>
                </div>

                <div className="marketplace-card__actions">
                  <Link href={`/products/${product.slug}`} className="marketplace-card__button marketplace-card__button--secondary">View Details</Link>
                  <button className="marketplace-card__button marketplace-card__button--primary" onClick={() => setEnquiryProduct(product)}>Enquire Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ color: 'var(--text-secondary)', fontFamily: 'Orbitron', fontSize: 13, letterSpacing: 2 }}>NO MODELS FOUND</p>
          </div>
        )}
      </div>

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
    </div>
  );
}
