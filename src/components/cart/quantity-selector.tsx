import { Minus, Plus } from "lucide-react";
import { CN } from "../../utils";

interface QuantitySelectorProps {
  quantity: number;
  min?: number;
  max?: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'sm' | 'md';
}

const QuantitySelector:React.FC<QuantitySelectorProps> = ({
  quantity,
  min = 1,
  max = 10,
  onIncrease,
  onDecrease,
  size = 'md',
}) => {
  const btn = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const atMin = quantity <= min;
  const atMax = quantity >= max;
  return (
    <div className="inline-flex items-center rounded-xl border border-gray-200 bg-white">
      <button
        onClick={onDecrease}
        disabled={atMin}
        aria-label="Decrease quantity"
        className={CN(
          "flex items-center justify-center rounded-l-xl text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40",
          btn,
        )}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span
        className={CN(
          "min-w-[2.5rem] text-center text-sm font-semibold text-gray-900",
          size === "sm" && "min-w-[2rem]",
        )}
      >
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={atMax}
        aria-label="Increase quantity"
        className={CN(
          "flex items-center justify-center rounded-r-xl text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40",
          btn,
        )}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

export default QuantitySelector;
