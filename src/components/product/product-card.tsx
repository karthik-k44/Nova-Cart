import { useState } from "react";
import { useCartStore } from "../../store/cart-store";
import { StockConditionValue, type Product } from "../../types";
import { Link } from "react-router-dom";
import { Check, Minus, PackageCheck, Plus, ShoppingCart, Star } from "lucide-react";
import Button from "../button";
import Card from "../card";
import { CN, FormatCurrency } from "../../utils";
// import Badge from "../badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
}) => {
  const {
    items,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const [added, setAdded] = useState(false);
  const [zoom, setZoom] = useState(false);

  const cartItem = items.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity ?? 0;
  const isOutOfStock =
    product.stock === 0 || product.availabilityStatus == StockConditionValue.OUT_OF_STOCK;

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
        {/* <div className="absolute left-3 top-3">
          <Badge>{product.category}</Badge>
        </div> */}
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
          {product?.availabilityStatus === StockConditionValue.IN_STOCK && (
            <span>{product?.stock} in stock</span>
          )}
          {product?.availabilityStatus === StockConditionValue.LOW_STOCK && (
            <>
              <span className="text-amber-500 hidden md:block">Hurry up Only {product?.stock} left</span>
              <span className="text-amber-500  md:hidden">Only {product?.stock} left</span>
            </>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {FormatCurrency(product.price)}
          </span>
        </div>

        <div>
          {isOutOfStock ? (
            <Button
              disabled
              className="mt-4 w-full"
              variant="primary"
              size="sm"
            >
              <PackageCheck className="h-4 w-4" />
              Out of Stock
            </Button>
          ) : quantity === 0 ? (
            <Button
              size="sm"
              className="mt-4 w-full"
              onClick={handleAdd}
              variant={added ? "secondary" : "primary"}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to cart
            </Button>
          ) : (
            <div className="flex items-center justify-between mt-4 w-full">
              <Button
                size="sm"
                variant="outline"
                onClick={() => decreaseQuantity(product.id)}
              >
                <Minus className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />

                <span className="font-semibold dark:text-white">
                  {quantity}
                </span>
              </div>

              <Button
                size="sm"
                variant="outline"
                disabled={quantity >= product.stock}
                onClick={() => increaseQuantity(product.id)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;

