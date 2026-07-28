import React from 'react'
import { cn } from '../../utils/helpers';

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

const Container:React.FC<ContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}

export default Container;
