import { describe, it, expect } from 'vitest';
import type { CartItem, Product } from "../types";
import { calculateTotals } from "./calculate-totals";

const makeProduct = (overrides: Partial<Product> = {}): Product => {
  return {
    id: 1,
    title: 'Test Product',
    description: '',
    category: 'test',
    price: 50,
    discountPercentage: 0,
    rating: 4.5,
    stock: 10,
    tags: [],
    images: [],
    thumbnail: '',
    ...overrides,
  };
}

const makeItem = (price: number, quantity: number): CartItem => {
  return {
    product: makeProduct({ id: price, price }),
    quantity,
  };
}

describe('calculateTotals', () => {
  it('returns zero totals for an empty cart', () => {
    const result = calculateTotals([]);
    expect(result.subtotal).toBe(0);
    expect(result.tax).toBe(0);
    expect(result.discount).toBe(0);
    expect(result.total).toBe(0);
    expect(result.itemCount).toBe(0);
  });

  it('calculates subtotal and tax correctly without discount', () => {
    const items = [makeItem(40, 2), makeItem(10, 1)];
    const result = calculateTotals(items);
    expect(result.subtotal).toBe(90);
    expect(result.tax).toBe(4.5);
    expect(result.discount).toBe(0);
    expect(result.total).toBe(94.5);
    expect(result.itemCount).toBe(3);
  });

  it('applies 10% discount when subtotal exceeds $100', () => {
    const items = [makeItem(60, 2)];
    const result = calculateTotals(items);
    expect(result.subtotal).toBe(120);
    expect(result.discount).toBe(12);
    expect(result.total).toBe(120 + 6 - 12);
  });

  it('does not apply discount when subtotal is exactly $100', () => {
    const items = [makeItem(50, 2)];
    const result = calculateTotals(items);
    expect(result.subtotal).toBe(100);
    expect(result.discount).toBe(0);
  });

  it('counts total item quantity', () => {
    const items = [makeItem(10, 3), makeItem(20, 2)];
    const result = calculateTotals(items);
    expect(result.itemCount).toBe(5);
  });
});
