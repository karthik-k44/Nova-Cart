import { useQuery } from "@tanstack/react-query"
import { fetchProduct, fetchProducts } from "../services/product-service"

export const useProducts = () =>{
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000*60*5,
  })
} 

export const useProduct = (id: number) =>{
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => fetchProduct(id as number),
    staleTime: 1000*60*5,
  })
}