import React from 'react'
import { CN } from '../../utils/helper.ts';

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

const Container:React.FC<ContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div className={CN('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}

export default Container;
