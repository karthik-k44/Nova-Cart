import { useState } from "react";
import { useCartStore } from "../../store/cart-store";
import type { Product } from "../../types";
import { Link } from "react-router-dom";
import { Check, ShoppingCart, Star } from "lucide-react";
import Button from "../button";
import Card from "../card";
import { CN, FormatCurrency } from "../../utils";
import Badge from "../badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
}) => {
  const addToCart = useCartStore((s) => s.addToCart);
  const [added, setAdded] = useState(false);
  const [zoom, setZoom] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  return (
    <Card className="group flex flex-col overflow-hidden hover:shadow-lg dark:bg-gray-900 dark:ring-gray-800">
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className={CN(
            "h-full w-full object-cover transition-transform duration-300",
            zoom && "scale-110",
          )}
        />
        <div className="absolute left-3 top-3">
          <Badge>{product.category}</Badge>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">
            {product.title}
          </h3>
        </Link>

        <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating.toFixed(1)}</span>
          <span className="text-gray-300">•</span>
          <span>{product.stock} in stock</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {FormatCurrency(product.price)}
          </span>
        </div>

        <Button
          size="sm"
          className="mt-4 w-full"
          onClick={handleAdd}
          variant={added ? "secondary" : "primary"}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" />
              Added
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Add to cart
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;

