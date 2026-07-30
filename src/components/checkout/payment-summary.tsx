import React from 'react'
import type { Shipping } from '../../types';
import { useCartTotals } from '../../hooks';

import Button from '../button';
import { CheckCircle2 } from 'lucide-react';
import { FormatCurrency } from '../../utils';

interface PaymentSummaryProps {
  shipping: Shipping;
  onPlaceOrder: () => void;
  onBack: () => void;
}

const PaymentSummary:React.FC<PaymentSummaryProps> = ({
  shipping,
  onPlaceOrder,
  onBack,
}) => {
   const { subtotal, tax, discount, total } = useCartTotals();
  return (
    <div className="flex h-full flex-col gap-6 lg:flex-row justify-center">
      <div className="flex flex-1 flex-col lg:flex-row gap-6 overflow-y-auto justify-center p-2">
        
        <div className="rounded-xl max-w-96 bg-white p-6 shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-gray-800">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Shipping Information
            </h3>
            <Button size="sm" variant="outline" onClick={onBack} type="button">
              Back
            </Button>
          </div>
          <dl className="mt-3 space-y-1.5 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Name: </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {shipping.fullName}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Email: </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {shipping.email}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Phone: </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {shipping.phone}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">
                Address:{" "}
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {shipping.address}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">City: </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {shipping.city}, {shipping.postalCode}
              </span>
            </div>
          </dl>
        </div>

        <div className="rounded-xl h-auto bg-white p-6 shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-gray-800">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Payment Summary
          </h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-400">Subtotal</dt>
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
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <dt>Discount (10%)</dt>
                <dd className="font-medium">-{FormatCurrency(discount)}</dd>
              </div>
            )}
            <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
              <div className="flex justify-between text-base">
                <dt className="font-semibold text-gray-900 dark:text-white">
                  Total
                </dt>
                <dd className="font-bold text-gray-900 dark:text-white">
                  {FormatCurrency(total)}
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-5 rounded-lg bg-indigo-50 px-4 py-3 text-xs text-indigo-700">
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              This is a demo store — no real payment will be processed.
            </p>
          </div>

          <Button className="mt-5 w-full" onClick={onPlaceOrder}>
            Place Order
          </Button>
        </div>
      </div>

    </div>
  );
}

export default PaymentSummary
