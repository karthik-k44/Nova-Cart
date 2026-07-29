import React, { type ReactNode } from 'react'
import { CN } from '../../utils';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}
const Badge: React.FC<BadgeProps>= ({
  children,
  className,
}) => {
  return (
    <span
      className={CN(
        "inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium capitalize text-indigo-700",
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
