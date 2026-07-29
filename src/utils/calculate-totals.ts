import { DISCOUNT_RATE, DISCOUNT_THRESHOLD, TAX_RATE } from "../constants";
import type { CartItem } from "../types";


export const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const discount =
    subtotal > DISCOUNT_THRESHOLD
      ? Math.round(subtotal * DISCOUNT_RATE * 100) / 100
      : 0;
  const total = Math.round((subtotal + tax - discount) * 100) / 100;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { subtotal, tax, discount, total, itemCount };
}
