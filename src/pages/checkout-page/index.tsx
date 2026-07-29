import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cart-store';
import type { CheckoutStep, Shipping } from '../../types';
import Container from '../../components/container';
import EmptyState from '../../components/empty-state';
import { ShoppingBag } from 'lucide-react';
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
    <Container className="py-8">
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Checkout
      </h1>

      <div className="mb-10 max-w-2xl">
        <CheckoutStepper steps={STEPS} current={step} completed={completed} />
      </div>

      {step === "cart" && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <div className="divide-y divide-gray-100 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200/60 dark:divide-gray-800 dark:bg-gray-900 dark:ring-gray-800">
            {items.map((item) => (
              <CartItems key={item.product.id} item={item} />
            ))}
          </div>
          <div className="lg:sticky lg:top-20 lg:self-start">
            <CartSummary showCheckout={false} />
            <Button className="mt-3 w-full" onClick={goToShipping}>
              Continue to shipping
            </Button>
          </div>
        </div>
      )}

      {step === "shipping" && (
        <div className="max-w-2xl rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-gray-800">
          <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
            Shipping Details
          </h2>
          <ShippingForm
            initial={shipping || undefined}
            onSubmit={goToPayment}
            onBack={() => setStep("cart")}
          />
        </div>
      )}

      {step === "payment" && shipping && (
        <PaymentSummary shipping={shipping} onPlaceOrder={placeOrder} />
      )}
    </Container>
  );
}

export default CheckOutPage
