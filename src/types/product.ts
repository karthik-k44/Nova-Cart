export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  images: string[];
  thumbnail: string;
}

export const StockConditionValue = {
  IN_STOCK: 'In Stock',
  OUT_OF_STOCK: 'Out of Stock',
  LOW_STOCK: 'Low Stock',
} as const;
export type StockConditionType = (typeof StockConditionValue)[keyof typeof StockConditionValue]

