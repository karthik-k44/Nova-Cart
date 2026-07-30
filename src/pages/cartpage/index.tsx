import { ArrowLeft, ShoppingBag } from 'lucide-react';
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
    <Container className="py-4">
      <div className='w-full flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Almost Yours
        </h1>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to shopping
        </Link>
      </div>
      <div className="flex h-[calc(100vh-8rem)] flex-col gap-8 lg:h-auto lg:flex-row lg:items-start">
        <div className="flex-1 divide-y divide-gray-100 overflow-y-auto rounded-xl bg-white px-6 py-2 shadow-sm ring-1 ring-gray-200/60 scrollbar-none dark:divide-gray-800 dark:bg-gray-900 dark:ring-gray-800 lg:h-[calc(100vh-15rem)]">
          {items.map((item) => (
            <CartItems key={item.product.id} item={item} />
          ))}
        </div>
        <div className="w-full lg:w-[360px] lg:sticky lg:top-20 lg:self-start">
          <CartSummary />
        </div>
      </div>
    </Container>
  );
}

export default CartPage
