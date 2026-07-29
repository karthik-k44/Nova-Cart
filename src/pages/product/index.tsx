import { Link, useParams } from "react-router-dom";
import { useProduct } from "../../hooks";
import { useCartStore } from "../../store/cart-store";
import { useState } from "react";
import Container from "../../components/container";
import { ProductDetailSkeleton } from "../../components";
import ErrorState from "../../components/error-state";
import { ArrowLeft, Check, Minus, PackageCheck, Plus, RotateCcw, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import Button from "../../components/button";
import { FormatCurrency } from "../../utils";
import Badge from "../../components/badge";
import ProductGallery from "../../components/product/product-gallery";
import { StockConditionValue } from "../../types";

const Product = () => {

  const { id } = useParams<{ id: string }>();
  const productId = id ? Number(id) : undefined;
  const { data: product, isLoading, isError, refetch } = useProduct(productId as number);
  const { items, addToCart, increaseQuantity, decreaseQuantity } = useCartStore();
  const [added, setAdded] = useState(false);
  const cartItem = items.find((item) => item.product.id === product?.id);
  const quantity = cartItem?.quantity ?? 0;
  const isOutOfStock =
      product?.stock === 0 || product?.availabilityStatus == StockConditionValue.OUT_OF_STOCK;

  console.log(product);

  const handleAdd = () => {
    if (!product) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  if (isLoading) {
    return (
      <Container className="py-8">
        <ProductDetailSkeleton />
      </Container>
    );
  }

   if (isError || !product) {
     return (
       <Container className="py-8">
         <ErrorState
           message="We couldn't load this product."
           onRetry={() => refetch()}
         />
       </Container>
     );
   }

  return (
    <Container className="lg:max-h-screen py-4 lg:px-20 lg:py-0">
      <div className="grid lg:py-8 grid-cols-1 gap-8 lg:grid-cols-[35%_65%]">
        <ProductGallery images={product.images} title={product.title} />

        <div className="flex flex-col lg:px-8">
          <div className="flex items-center justify-between gap-2">
            <Badge className="w-fit">{product.category}</Badge>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to shop
            </Link>
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            {product.title}
          </h1>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-medium text-gray-900 dark:text-white">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-gray-300">•</span>
            {product?.availabilityStatus === StockConditionValue.IN_STOCK && (
              <span>{product?.stock} in stock</span>
            )}
            {product?.availabilityStatus === StockConditionValue.LOW_STOCK && (
              <span className="text-amber-500">
                Hurry up Only {product?.stock} left
              </span>
            )}
            {product.brand && (
              <>
                <span className="text-gray-300">•</span>
                <span>{product.brand}</span>
              </>
            )}
          </div>

          <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            {FormatCurrency(product.price)}
            {product.discountPercentage > 0 && (
              <span className="ml-2 text-sm font-medium text-green-600">
                {product.discountPercentage.toFixed(0)}% off
              </span>
            )}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {product.description}
          </p>

          <div className="mt-6 flex gap-4">
            <div>
              {isOutOfStock ? (
                <Button disabled className="w-full" variant="primary" size="md">
                  <PackageCheck className="h-4 w-4" />
                  Out of Stock
                </Button>
              ) : quantity === 0 ? (
                <Button
                  size="md"
                  className="w-full"
                  onClick={handleAdd}
                  variant={added ? "secondary" : "primary"}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to cart
                </Button>
              ) : (
                <div className="flex gap-4 items-center justify-between w-full">
                  <Button
                    size="md"
                    variant="outline"
                    onClick={() => decreaseQuantity(product.id)}
                  >
                    <Minus className="h-4 w-4 text-indigo-600" />
                  </Button>

                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />

                    <span className="font-semibold dark:text-white">
                      {quantity}
                    </span>
                  </div>

                  <Button
                    size="md"
                    variant="outline"
                    disabled={quantity >= product.stock}
                    onClick={() => increaseQuantity(product.id)}
                  >
                    <Plus className="h-4 w-4 text-indigo-600" />
                  </Button>
                </div>
              )}
            </div>
            <Link to="/cart">
              <Button size="md" variant="outline">
                View cart
              </Button>
            </Link>
          </div>

          <div className="mt-4 lg:mt-8 flex flex-col gap-1 lg:flex-row justify-between">
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-2 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <Truck className="h-4 w-4 text-indigo-600" />
              <span>{product.shippingInformation || "Free shipping"}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-2 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <RotateCcw className="h-4 w-4 text-indigo-600" />
              <span>{product.returnPolicy || "30-day returns"}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-2 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <ShieldCheck className="h-4 w-4 text-indigo-600" />
              <span>{product.warrantyInformation || "Warranty included"}</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Product;
