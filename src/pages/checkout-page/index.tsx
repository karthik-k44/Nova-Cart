import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cart-store';
import type { CheckoutStep, Shipping } from '../../types';
import Container from '../../components/container';
import EmptyState from '../../components/empty-state';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Button from '../../components/button';
import CheckoutStepper from '../../components/checkout/checkout-stepper';
import CartItems from '../../components/cart/cart-item';
import CartSummary from '../../components/cart/cart-summary';
import ShippingForm from '../../components/checkout/shipping-form';
import PaymentSummary from '../../components/checkout/payment-summary';


const STEPS: { id: CheckoutStep; label: string }[] = [
  { id: "cart", label: "Cart Review" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
];

const CheckOutPage = () => {

  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const [step, setStep] = useState<CheckoutStep>("cart");
  const [completed, setCompleted] = useState<CheckoutStep[]>([]);
  const [shipping, setShipping] = useState<Shipping | null>(null);

  if (items.length === 0) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={<ShoppingBag className="h-7 w-7" />}
          title="Nothing to check out"
          description="Your cart is empty. Add products first."
          action={
            <Button onClick={() => navigate("/")}>Browse products</Button>
          }
        />
      </Container>
    );
  }

  const goToShipping = () => {
    setCompleted((c) => Array.from(new Set([...c, "cart"])));
    setStep("shipping");
  };

  const goToPayment = (data: Shipping) => {
    setShipping(data);
    setCompleted((c) => Array.from(new Set([...c, "shipping"])));
    setStep("payment");
  };

  const placeOrder = () => {
    clearCart();
    navigate("/success");
  };

  return (
    <Container className="py-4">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          One Last Step
        </h1>
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to cart
        </Link>
      </div>

      <div className=" mb-4 flex justify-center items-center">
        <div className="w-full max-w-6xl">
          <CheckoutStepper steps={STEPS} current={step} completed={completed} />
        </div>
      </div>

      {step === "cart" && (
        <div className="flex h-[calc(100vh-10rem)] flex-col gap-8 lg:flex-row">
          <div className="flex-1 divide-y divide-gray-100 overflow-y-auto rounded-xl bg-white px-6 py-2 shadow-sm ring-1 ring-gray-200/60 scrollbar-none dark:divide-gray-800 dark:bg-gray-900 dark:ring-gray-800">
            {items.map((item) => (
              <CartItems key={item.product.id} item={item} />
            ))}
          </div>
          <div className="w-full lg:w-[360px] lg:sticky lg:top-20 lg:self-start">
            <CartSummary showCheckout={false} />
            <Button className="mt-3 w-full" onClick={goToShipping}>
              Continue to shipping
            </Button>
          </div>
        </div>
      )}

      {step === "shipping" && (
        <div className='w-full flex justify-center'>
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-gray-800">
            <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
              Shipping Details
            </h2>
            <ShippingForm
              initial={shipping || undefined}
              onSubmit={goToPayment}
              onBack={() => setStep("cart")}
            />
          </div>
        </div>
      )}

      {step === "payment" && shipping && (
        <PaymentSummary shipping={shipping} onPlaceOrder={placeOrder} onBack={()=>setStep("shipping")}/>
      )}
    </Container>
  );
}

export default CheckOutPage
