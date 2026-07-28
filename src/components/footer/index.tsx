import { ShoppingBag } from "lucide-react";
import Container from "../container";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <ShoppingBag className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-gray-900">NovaCart</span>
        </div>
        <p className="text-sm text-gray-500">
          Built with React, Zustand & TanStack Query.
        </p>
      </Container>
    </footer>
  );
}

export default Footer
