"use client";
import Link from 'next/link';
import type { Product } from '@/lib/store';
// using inline emoji icons for the homepage-only spec row

interface HomepageFeaturedCardProps {
  product: Product;
  onEnquire: () => void;
}

export default function HomepageFeaturedCard({ product, onEnquire }: HomepageFeaturedCardProps) {
  return (
    <div className="homepage-featured-card">
      <div className="homepage-featured-card__image">
        <img src={product.images[0]} alt={product.name} />
      </div>

      <div className="homepage-featured-card__body">
        <div>
          <div className="homepage-featured-card__meta">{product.category}</div>
          <h3 className="homepage-featured-card__title">{product.name}</h3>
          <div className="homepage-featured-card__price-block">
            <div className="homepage-featured-card__price">₹{product.price.toLocaleString('en-IN')}</div>
            {product.originalPrice && (
              <div className="homepage-featured-card__old-price">₹{product.originalPrice.toLocaleString('en-IN')}</div>
            )}
          </div>
          <p className="homepage-featured-card__description">{product.description}</p>
        </div>

        <div className="homepage-featured-card__specs">
          <div className="homepage-featured-card__spec">
            <span className="homepage-featured-card__spec-icon">⚡</span>
            <span>{product.specs.range}</span>
          </div>
          <div className="homepage-featured-card__spec">
            <span className="homepage-featured-card__spec-icon">🏍</span>
            <span>{product.specs.topSpeed}</span>
          </div>
          <div className="homepage-featured-card__spec">
            <span className="homepage-featured-card__spec-icon">🔋</span>
            <span>{product.specs.battery}</span>
          </div>
        </div>

        <div className="homepage-featured-card__actions">
          <Link href={`/products/${product.slug}`} className="homepage-featured-card__button homepage-featured-card__button--secondary">
            View Details
          </Link>
          <button type="button" className="homepage-featured-card__button homepage-featured-card__button--primary" onClick={onEnquire}>
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
}
