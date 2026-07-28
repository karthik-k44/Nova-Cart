import { productsResponseSchema, type ProductsResponse } from '../schemas/product-schema';
import { apiClient } from './api';


export async function fetchProducts(): Promise<ProductsResponse> {
  const raw = await apiClient<unknown>('/products?limit=100');
  const parsed = productsResponseSchema.parse(raw);
  return parsed;
}
