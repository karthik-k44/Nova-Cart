import { productSchema, productsResponseSchema, type Product, type ProductsResponse } from '../schemas/product-schema';
import { apiClient } from './api';


export const fetchProducts = async (): Promise<ProductsResponse> => {
  const raw = await apiClient<unknown>('/products?limit=200');
  const parsed = productsResponseSchema.parse(raw);
  return parsed;
}


export const fetchProduct = async (id: number): Promise<Product> => {
  const raw = await apiClient<unknown>(`/products/${id}`);
  return productSchema.parse(raw);
};