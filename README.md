# Regal EV — Full-Stack E-Commerce Website

A complete Next.js 16 + TypeScript e-commerce website for Regal EV electric scooters.

## 🚀 Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + inline styles
- **State Management**: Zustand (cart store)
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Orbitron + Exo 2)

## 📦 Features
- ✅ Full product catalog with filtering & sorting
- ✅ Individual product pages with specs, features, color selector
- ✅ Persistent cart with drawer (add/remove/update qty)
- ✅ Multi-step checkout (Details → Payment → Confirm)
- ✅ Order confirmation flow
- ✅ About page with company story & timeline
- ✅ Contact page with inquiry form
- ✅ Responsive design (mobile-first)
- ✅ Dark luxury EV aesthetic
- ✅ Animated hero with product carousel
- ✅ Sticky navbar with cart count badge

## 🏃 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📄 Pages
| Route | Description |
|---|---|
| `/` | Homepage — Hero, Products, Features, CTA |
| `/products` | All products with filter + sort |
| `/products/[slug]` | Product detail page |
| `/checkout` | Multi-step checkout |
| `/about` | Company story & milestones |
| `/contact` | Contact form + info |

## 🗂️ Project Structure
```
app/
  page.tsx              # Homepage
  products/page.tsx     # Product listing
  products/[slug]/      # Product detail
  checkout/page.tsx     # Checkout flow
  about/page.tsx        # About
  contact/page.tsx      # Contact
components/
  Navbar.tsx            # Sticky navbar + cart icon
  Footer.tsx            # Footer
  CartDrawer.tsx        # Slide-in cart
lib/
  store.ts              # Zustand cart store
  products.ts           # Product data
```

## 🎨 Design
- Dark luxury EV theme (`#050810` background)
- Cyan accent (`#00e5ff`) with orange highlights (`#ff6b35`)
- Orbitron font for headings (futuristic)
- Exo 2 for body text
- Grid background pattern, glowing borders, card hover effects

## 🔧 Customization
- Add real product images in `lib/products.ts`
- Connect to a real payment gateway (Razorpay/PayU) in `app/checkout/page.tsx`
- Add a backend/CMS for dynamic products
- Enable ISR for product pages
