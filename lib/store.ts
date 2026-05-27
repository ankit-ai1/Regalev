import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  badge?: string;
  specs: {
    range: string;
    topSpeed: string;
    motor: string;
    battery: string;
    chargingTime: string;
    weight: string;
    payload?: string;
  };
  colors: string[];
  description: string;
  features: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, color: string) => void;
  removeItem: (productId: string, color: string) => void;
  updateQuantity: (productId: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (product, color) => {
    const items = get().items;
    const existing = items.find(i => i.product.id === product.id && i.color === color);
    if (existing) {
      set({ items: items.map(i => i.product.id === product.id && i.color === color ? { ...i, quantity: i.quantity + 1 } : i) });
    } else {
      set({ items: [...items, { product, quantity: 1, color }] });
    }
    set({ isOpen: true });
  },
  removeItem: (productId, color) => set({ items: get().items.filter(i => !(i.product.id === productId && i.color === color)) }),
  updateQuantity: (productId, color, quantity) => {
    if (quantity <= 0) { get().removeItem(productId, color); return; }
    set({ items: get().items.map(i => i.product.id === productId && i.color === color ? { ...i, quantity } : i) });
  },
  clearCart: () => set({ items: [] }),
  toggleCart: () => set({ isOpen: !get().isOpen }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  total: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));

export interface CompareStore {
  selected: Product[];
  addCompare: (product: Product) => void;
  removeCompare: (productId: string) => void;
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareStore>((set, get) => ({
  selected: [],
  addCompare: product => {
    set(state => {
      if (state.selected.some(item => item.id === product.id)) return state;
      if (state.selected.length >= 3) return state;
      return { selected: [...state.selected, product] };
    });
  },
  removeCompare: productId => set(state => ({ selected: state.selected.filter(item => item.id !== productId) })),
  toggleCompare: product => {
    const state = get();
    if (state.selected.some(item => item.id === product.id)) {
      state.removeCompare(product.id);
    } else {
      state.addCompare(product);
    }
  },
  clearCompare: () => set({ selected: [] }),
}));
