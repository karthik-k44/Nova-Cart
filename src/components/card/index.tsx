import type { HTMLAttributes, ReactNode } from 'react';
import { CN } from '../../utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
const Card: React.FC<CardProps>= ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={CN(
        "rounded-xl bg-white shadow-sm ring-1 ring-gray-200/60 transition-shadow duration-200 dark:bg-gray-900 dark:ring-gray-800",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
export default Card
