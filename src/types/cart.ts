import type { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Shipping {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export type CheckoutStep = 'cart' | 'shipping' | 'payment';