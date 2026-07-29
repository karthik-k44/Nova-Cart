import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}


import React from 'react'
import { CN } from "../../utils";

const EmptyState: React.FC<EmptyStateProps>= ({
  icon,
  title,
  description,
  action,
  className
}) => {
  return (
    <div
      className={CN(
        'flex flex-col items-center justify-center gap-4 px-6 py-16 text-center',
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}

export default EmptyState;

