import React from 'react'
import { useCartStore } from '../../store/cart-store';
import { useCartTotals } from '../../hooks';
import { DISCOUNT_THRESHOLD, MIN_CHECKOUT_VALUE } from '../../constants';
import Button from '../button';
import { Link } from 'react-router-dom';
import { FormatCurrency } from '../../utils';

interface CartSummaryProps {
  showCheckout?: boolean;
}

const CartSummary:React.FC<CartSummaryProps> = ({
  showCheckout = true,
}) => {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const { subtotal, tax, discount, total } = useCartTotals();

  const belowMinimum = subtotal > 0 && subtotal < MIN_CHECKOUT_VALUE;
  const qualifiesDiscount = subtotal > DISCOUNT_THRESHOLD;
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-gray-800">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
        Order Summary
      </h3>

      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-600 dark:text-gray-400">
            Subtotal ({items.length} items)
          </dt>
          <dd className="font-medium text-gray-900 dark:text-white">
            {FormatCurrency(subtotal)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600 dark:text-gray-400">Tax (5%)</dt>
          <dd className="font-medium text-gray-900 dark:text-white">
            {FormatCurrency(tax)}
          </dd>
        </div>
        {qualifiesDiscount ? (
          <div className="flex justify-between text-green-600">
            <dt>Discount (10%)</dt>
            <dd className="font-medium">-{FormatCurrency(discount)}</dd>
          </div>
        ) : (
          <p className="text-xs text-gray-400">
            Add $
            {DISCOUNT_THRESHOLD - subtotal > 0
              ? (DISCOUNT_THRESHOLD - subtotal).toFixed(2)
              : 0}{" "}
            more to unlock 10% discount.
          </p>
        )}
        <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
          <div className="flex justify-between text-base">
            <dt className="font-semibold text-gray-900">Total</dt>
            <dd className="font-bold text-gray-900">{FormatCurrency(total)}</dd>
          </div>
        </div>
      </dl>

      {belowMinimum && (
        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          Minimum checkout value is ${MIN_CHECKOUT_VALUE}. Add more items to
          continue.
        </p>
      )}

      {showCheckout && (
        <div className="mt-5 space-y-2">
          <Link to="/checkout">
            <Button
              className="w-full"
              disabled={belowMinimum || items.length === 0}
            >
              Checkout
            </Button>
          </Link>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={clearCart}
            >
              Clear cart
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default CartSummary;
