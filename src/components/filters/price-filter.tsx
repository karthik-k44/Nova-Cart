interface PriceFilterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  value,
  onChange,
  min = 0,
  max = 2000,
}) => {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <label
          htmlFor="price-range"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Max price
        </label>
        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          ${value.toFixed(0)}
        </span>
      </div>
      <input
        id="price-range"
        type="range"
        min={min}
        max={max}
        step={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-indigo-600 dark:bg-gray-700"
      />
    </div>
  );
}

export default PriceFilter
