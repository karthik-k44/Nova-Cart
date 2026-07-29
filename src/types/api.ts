export interface APIResponse<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface Totals {
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  itemCount: number;
}
