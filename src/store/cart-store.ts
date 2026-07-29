import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../schemas/product-schema';
import type { CartItem } from '../types';
import { MAX_QUANTITY, MIN_QUANTITY } from '../constants';

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? {
                      ...i,
                      quantity: Math.min(i.quantity + quantity, MAX_QUANTITY),
                    }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),
      increaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId
              ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QUANTITY) }
              : i
          ),
        })),
      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.flatMap((item) => {
            if (item.product.id !== productId) return item;

            if (item.quantity === 1) {
              return [];
            }
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }),
        })),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId
              ? {
                  ...i,
                  quantity: Math.max(MIN_QUANTITY, Math.min(quantity, MAX_QUANTITY)),
                }
              : i
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'novacart-cart' }
  )
);
