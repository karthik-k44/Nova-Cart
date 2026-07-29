import { useMemo } from "react";
import { useCartStore } from "../store/cart-store";
import { calculateTotals } from "../utils";

export const useCartTotals = () =>{
  const items = useCartStore((state) => state.items);

  return useMemo(() => calculateTotals(items), [items]);
}