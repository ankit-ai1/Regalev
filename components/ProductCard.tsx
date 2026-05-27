"use client";
import React from 'react';
import Link from 'next/link';
import { Heart, Zap, Gauge, BatteryCharging } from 'lucide-react';

type Product = any;

export default function ProductCard({ product, onAdd }: { product: Product; onAdd?: () => void }) {
  return (
    <div className="product-card">
      <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="product-card__image">
          <img src={product.images[0]} alt={product.name} />
          <button
            aria-label="Add to wishlist"
            style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(var(--surface-rgb),0.08)', border: '1px solid rgba(var(--surface-rgb),0.16)', padding: 10, borderRadius: 14 }}
          >
            <Heart size={18} color="var(--text-secondary)" />
          </button>
        </div>
      </Link>

      <div className="product-card__content">
        <div className="product-card__badge">{product.category}</div>
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>

        <div className="product-card__specs">
          {[
            { icon: Zap, label: 'Range', value: product.specs.range },
            { icon: Gauge, label: 'Top Speed', value: product.specs.topSpeed },
            { icon: BatteryCharging, label: 'Battery', value: product.specs.battery },
          ].map(spec => (
            <div key={spec.label} className="product-card__spec">
              <spec.icon size={16} className="product-card__spec-icon" />
              <div className="product-card__spec-value">{spec.value}</div>
              <div className="product-card__spec-label">{spec.label}</div>
            </div>
          ))}
        </div>

        <div className="product-card__pricing">
          <div>
            <div className="product-card__price">₹{product.price.toLocaleString('en-IN')}</div>
            {product.originalPrice && <div className="product-card__old-price">₹{product.originalPrice.toLocaleString('en-IN')}</div>}
          </div>
        </div>

        <div className="product-card__actions">
          <Link href={`/products/${product.slug}`} className="product-card__button product-card__button--secondary">View Details</Link>
          <button className="product-card__button product-card__button--primary" onClick={onAdd}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
