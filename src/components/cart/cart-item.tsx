import React from 'react'
import { useCartStore } from '../../store/cart-store';
import type { CartItem } from '../../types';
import { Trash2 } from 'lucide-react';
import QuantitySelector from './quantity-selector';
import { FormatCurrency } from '../../utils';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItem;
}
const CartItems:React.FC<CartItemProps> = ({
  item,
}) => {
  const increase = useCartStore((s) => s.increaseQuantity);
  const decrease = useCartStore((s) => s.decreaseQuantity);
  const remove = useCartStore((s) => s.removeItem);
  return (
    <div className="flex gap-4 py-4">
      <Link
        to={`/product/${item.product.id}`}
        className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 hover:cursor-pointer">
        <img
          src={item.product.thumbnail}
          alt={item.product.title}
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between gap-2">
          <div>
            <h4 className="line-clamp-1 text-sm font-semibold text-gray-900 dark:text-white">
              {item.product.title}
            </h4>
            <p className="mt-0.5 text-xs capitalize text-gray-500 dark:text-gray-400">
              {item.product.category}
            </p>
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {FormatCurrency(item.product.price * item.quantity)}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => increase(item.product.id)}
            onDecrease={() => decrease(item.product.id)}
            max={item.product.stock}
          />
          <button
            onClick={() => remove(item.product.id)}
            className="flex items-center gap-1 text-xs font-medium text-red-800 transition-colors hover:text-red-600 hover:cursor-pointer"
            aria-label={`Remove ${item.product.title}`}
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
