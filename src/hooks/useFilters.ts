import { useMemo, useState } from "react";
import type { Product, SortOption } from "../types";
import { SortProducts } from "../utils";

export interface FilterState {
  search : string;
  category: string;
  maxPrice: number;
  sort : SortOption
}
const initialState : FilterState = {
  search : '',
  category : 'all',
  maxPrice : 2000,
  sort : 'featured'
}

export const useFilters= (products: Product[]) => {
  const [filters, setFilters] = useState<FilterState>(initialState);
  const categories = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map((p) => p.category))).sort();
  }, [products]);

  const filtered = useMemo(() => {
    if (!products) return [];
    const matched = products.filter((product) => {
      const matchesSearch =
        filters.search === '' ||
        product.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory =
        filters.category === 'all' || product.category === filters.category;
      const matchesPrice = product.price <= filters.maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
    return SortProducts(matched, filters.sort);
  }, [products, filters]);

  const setSearch = (search: string) => setFilters((f) => ({ ...f, search }));
  const setCategory = (category: string) => setFilters((f) => ({ ...f, category }));
  const setMaxPrice = (maxPrice: number) => setFilters((f) => ({ ...f, maxPrice }));
  const setSort = (sort: SortOption) => setFilters((f) => ({ ...f, sort }));
  const clearFilters = () => setFilters(initialState);

  return {
    filters,
    filtered,
    categories,
    setSearch,
    setCategory,
    setMaxPrice,
    setSort,
    clearFilters,
  };
}