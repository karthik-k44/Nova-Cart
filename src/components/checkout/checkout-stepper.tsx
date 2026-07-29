import React from 'react'
import type { CheckoutStep } from '../../types';
import { CN } from '../../utils';
import { Check } from 'lucide-react';

interface CheckoutStepperProps {
  steps: { id: CheckoutStep; label: string }[];
  current: CheckoutStep;
  completed: CheckoutStep[];
}

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({
  steps,
  current,
  completed,
}) => {
   const currentIndex = steps.findIndex((s) => s.id === current);

  return (
    <nav aria-label="Checkout progress" className="w-full">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isComplete = completed.includes(step.id);
          const isCurrent = step.id === current;
          const isLast = index === steps.length - 1;
          return (
            <li
              key={step.id}
              className={CN("flex items-center", !isLast && "flex-1")}
            >
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={CN(
                    "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-200",
                    isComplete
                      ? "bg-indigo-600 text-white"
                      : isCurrent
                        ? "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300"
                        : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500",
                  )}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <span
                  className={CN(
                    "text-xs font-medium",
                    isCurrent || isComplete
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-400",
                  )}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={CN(
                    "mx-2 h-0.5 flex-1 rounded-full transition-colors duration-200",
                    index < currentIndex
                      ? "bg-indigo-600"
                      : "bg-gray-200 dark:bg-gray-700",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default CheckoutStepper;


