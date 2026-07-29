import { type InputHTMLAttributes, type ReactNode } from 'react'
import { CN } from '../../utils/helper.ts';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}
const Input:React.FC<InputProps> = ({
  label,
  error,
  icon,
  className,
  ...props
}) => {
  const inputId = props.id || props.name
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={CN(
            "h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500",
            icon ? "pl-10" : "",
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 dark:border-gray-700 dark:focus:border-indigo-400 dark:focus:ring-indigo-900",
            className,
          )}
          aria-invalid={!!error}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default Input;
