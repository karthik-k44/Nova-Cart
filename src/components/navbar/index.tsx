import Container from '../container';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { NAV_LINKS } from '../../constants';
import { cn } from '../../utils/helpers';

const Navbar = () => {
   const itemCount = 0
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            NovaCart
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-gray-900",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/cart"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition-colors duration-200 hover:bg-gray-100"
          aria-label={`Cart with ${itemCount} items`}
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-indigo-600 px-1 text-xs font-semibold text-white">
              {itemCount}
            </span>
          )}
        </Link>
      </Container>
    </header>
  );
}

export default Navbar
