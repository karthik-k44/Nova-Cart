import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/homepage";
import CartPage from "../pages/cartpage";
import CheckOutPage from "../pages/checkout-page";
import SuccessPage from "../pages/checkout-page/success-page";
import Product from "../pages/product";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckOutPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="*" element={<HomePage />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  );
}

export default AppRoutes;
