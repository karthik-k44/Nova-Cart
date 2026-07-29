import { Link, useParams } from "react-router-dom";
import { useProduct } from "../../hooks";
import { useCartStore } from "../../store/cart-store";
import { useState } from "react";
import Container from "../../components/container";
import { ProductDetailSkeleton } from "../../components";
import ErrorState from "../../components/error-state";
import { ArrowLeft, Check, RotateCcw, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import Button from "../../components/button";
import { FormatCurrency } from "../../utils";
import Badge from "../../components/badge";
import ProductGallery from "../../components/product/product-gallery";

const Product = () => {

  const { id } = useParams<{ id: string }>();
  const productId = id ? Number(id) : undefined;
  const { data: product, isLoading, isError, refetch } = useProduct(productId as number);
  const addToCart = useCartStore((s) => s.addToCart);
  const [added, setAdded] = useState(false);

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
    <Container className="py-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} title={product.title} />

        <div className="flex flex-col">
          <Badge className="w-fit">{product.category}</Badge>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            {product.title}
          </h1>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-medium text-gray-900 dark:text-white">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-gray-300">•</span>
            <span>{product.stock} in stock</span>
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

          <div className="mt-6 flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAdd}
              variant={added ? "secondary" : "primary"}
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" />
                  Added to cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Add to cart
                </>
              )}
            </Button>
            <Link to="/cart">
              <Button size="lg" variant="outline">
                View cart
              </Button>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <Truck className="h-4 w-4 text-indigo-600" />
              <span>{product.shippingInformation || "Free shipping"}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <RotateCcw className="h-4 w-4 text-indigo-600" />
              <span>{product.returnPolicy || "30-day returns"}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
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
