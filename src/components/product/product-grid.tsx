import React from 'react'
import type { Product } from '../../types';
import ProductCard from './product-card';

interface ProductGridProps {
  products: Product[];
}  

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
}) => {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid
