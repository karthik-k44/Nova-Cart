export const TAX_RATE = 0.05;
export const DISCOUNT_RATE = 0.1;
export const DISCOUNT_THRESHOLD = 100;
export const MIN_CHECKOUT_VALUE = 10;
export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 10;

export const API_BASE_URL = 'https://dummyjson.com';

export const NAV_LINKS = [
  { label: 'Shop', path: '/' },
  { label: 'Cart', path: '/cart' },
  { label: 'Checkout', path: '/checkout' },
] as const;
