import { ShoppingBag } from 'lucide-react';
import Container from '../../components/container';
import EmptyState from '../../components/empty-state';
import { useCartStore } from '../../store/cart-store';
import { Link } from 'react-router-dom';
import Button from '../../components/button';
import CartItems from '../../components/cart/cart-item';
import CartSummary from '../../components/cart/cart-summary';

const CartPage = () => {
    const items = useCartStore((s) => s.items);
  if (items.length === 0) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={<ShoppingBag className="h-7 w-7" />}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet."
          action={
            <Link to="/">
              <Button>Start shopping</Button>
            </Link>
          }
        />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Your Cart
      </h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-gray-100 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200/60 dark:divide-gray-800 dark:bg-gray-900 dark:ring-gray-800">
          {items.map((item) => (
            <CartItems key={item.product.id} item={item} />
          ))}
        </div>
        <div className="lg:sticky lg:top-20 lg:self-start">
          <CartSummary />
        </div>
      </div>
    </Container>
  );
}

export default CartPage
