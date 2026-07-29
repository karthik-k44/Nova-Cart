import { ArrowUpDown } from "lucide-react";
import type { SortOption } from "../../types";
import { CN, SortOptionsValue } from "../../utils";

interface SortFilterProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}

const SortFilter: React.FC<SortFilterProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div
      className={CN(
        "relative inline-flex items-center hover:cursor-pointer",
        className,
      )}
    >
      <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        aria-label="Sort products"
        className="h-11 w-full appearance-none rounded-xl hover:cursor-pointer border border-gray-300 bg-white py-2 pl-10 pr-8 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        {SortOptionsValue.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}

export default SortFilter;
