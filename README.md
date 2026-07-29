# NovaCart — Modern Shopping Cart Platform

A production-quality e-commerce front end built with React, TypeScript, Zustand, TanStack Query, and Zod. NovaCart demonstrates clean architecture, reusable components, validated API data, and a polished, accessible UI inspired by Shopify, Apple Store, and Nike.

## Project Overview

NovaCart is a modern shopping cart application that fetches products from a live API, validates every response with Zod, lets users search and filter products, manage a persistent cart, and complete a multi-step checkout flow. The codebase is structured for scalability and maintainability, with strict separation between UI, state, services, and business logic.

## Features

- **Product listing** — responsive grid (1 / 2 / 4 columns), category badge, price, rating, stock, add-to-cart with confirmation.
- **Product details** — dedicated detail page with image gallery, full description, shipping/return/warranty info, and add-to-cart.
- **Product sorting** — sort by featured, price (low/high), rating, or name (A–Z) via a reusable `SortFilter` component.
- **Search & filtering** — search by title, category filter, price-range filter, clear-all. Logic lives in a reusable `useFilters` hook, never in components.
- **Cart** — Zustand store with `persist` middleware (survives refresh), quantity limits (1–5) with disabled buttons, remove, clear.
- **Cart summary** — subtotal, 5% tax, 10% discount above $100, final total, $10 minimum checkout with explanation message. All math in `utils/calculateTotals.ts`.
- **Checkout** — three-step flow (Cart Review → Shipping → Payment) with a reusable stepper. Cannot advance until the current step is valid.
- **Shipping form** — React state + Zod validation with inline error messages. No React Hook Form / Formik.
- **Payment summary** — read-only review of shipping info, cart, and totals. Place Order clears the cart and routes to success.
- **Dark mode** — class-based theme with a toggle in the navbar, persisted to localStorage, respecting system preference on first load.
- **UX** — sticky navbar with cart badge, cart drawer, empty-state illustrations, loading spinner, error state with retry, skeleton loading (grid + detail page), disabled buttons, accessible inputs, keyboard navigation, hover effects, image zoom, toast notifications.
- **Performance** — `React.lazy` for checkout, success, and product detail pages, `useMemo` for filtering and totals, memoized selectors.
- **Tests** — unit tests for cart calculation logic with Vitest.

## Architecture

```
Home Page
   ↓
TanStack Query
   ↓
Product Service
   ↓
Zod Validation
   ↓
Product Grid → Product Card → Add To Cart
   ↓
Zustand Store (persist middleware)
   ↓
Cart → Checkout → Success
```

Data flows one direction: the API layer fetches, Zod validates, the store owns cart state, and components stay presentational. Business logic (totals, currency, validation, helpers) lives in `utils/`, never in components.

## Folder Structure

```
src/
  assets/
  components/
    ui/          # Button, Input, Card, Badge, Spinner
    layout/      # Navbar, Footer, Container
    common/      # EmptyState, ErrorState, Skeleton, Toast
    product/     # ProductCard, ProductGrid
    cart/        # CartItem, CartDrawer, CartSummary, QuantitySelector
    filters/     # SearchBar, CategoryFilter, PriceFilter
    checkout/    # CheckoutStepper, ShippingForm, PaymentSummary
  constants/
  hooks/         # useProducts, useFilters, useCartTotals
  pages/         # HomePage, CartPage, CheckoutPage, SuccessPage
  routes/        # AppRoutes (lazy loading)
  services/      # api.ts, productService.ts
  store/         # cartStore.ts (Zustand + persist)
  schemas/       # productSchema.ts, shippingSchema.ts
  utils/         # calculateTotals, currency, helpers, validation
  types/         # Product, CartItem, Shipping, CheckoutStep, APIResponse
  App.tsx
  main.tsx
```

## Tech Stack

- React 18 + TypeScript (strict)
- Vite
- Tailwind CSS
- React Router DOM
- Zustand (with `persist` middleware)
- TanStack Query
- Zod
- lucide-react (icons)
- localStorage (via Zustand persist)

## Installation

```bash
pnpm install
```

## Commands

```bash
pnpm dev        # start dev server
pnpm build      # production build
pnpm preview    # preview production build
pnpm lint       # eslint
pnpm typecheck  # tsc --noEmit
pnpm test       # run unit tests (vitest)
pnpm test:watch # watch mode
```

## Environment

No environment variables are required. The app calls the public DummyJSON API directly.

## API

- Endpoint: `https://dummyjson.com/products`
- Products are fetched via TanStack Query in `useProducts`.
- The raw response is parsed with `productsResponseSchema` (Zod) before reaching the UI. Unvalidated data is never rendered.

## Design Decisions

- **Zustand over Redux** — minimal boilerplate, first-class `persist` middleware, selector-based subscriptions to limit re-renders.
- **TanStack Query** — caching, loading/error states, and retries handled declaratively; no manual effect-based fetching in components.
- **Zod at the boundary** — the API response and the shipping form are both validated with Zod. Components trust already-validated data.
- **Logic outside components** — totals, currency, validation, and filtering are pure functions/hooks, keeping components presentational and testable.
- **Reusable UI primitives** — Button, Input, Card, Badge, and Spinner are the only styled atoms; feature components compose them.
- **Lazy checkout** — checkout and success pages are code-split to keep the initial bundle lean.

## State Management

The cart is the only persistent client state. `cartStore.ts` exposes `items` and actions (`addToCart`, `removeItem`, `increaseQuantity`, `decreaseQuantity`, `setQuantity`, `clearCart`). Quantity is clamped to 1–5. The store is persisted to `localStorage` under `novacart-cart`. Derived totals come from `useCartTotals`, which memoizes `calculateTotals` over the items.

## Validation

- **API**: `productsResponseSchema` validates the full response shape; `productSchema` validates each item.
- **Shipping form**: `shippingSchema` validates each field with inline messages surfaced through `validateShipping`.

## Deployment

The app is a static SPA and deploys to Vercel (or any static host) with no configuration beyond the build output. Set the build command to `pnpm build` and the output directory to `dist`.

## Future Improvements

- Product detail pages with related products
- Server-side pagination / infinite scroll
- Real payment integration (Stripe)
- Wishlist and recently viewed
- Unit and integration tests (Vitest + Testing Library)
- i18n and dark mode

## Screenshots

> Add screenshots of the home, cart, checkout, and success pages here.
# NovaCart — Modern Shopping Cart Platform

A production-quality e-commerce front end built with React, TypeScript, Zustand, TanStack Query, and Zod. NovaCart demonstrates clean architecture, reusable components, validated API data, and a polished, accessible UI inspired by Shopify, Apple Store, and Nike.

## Project Overview

NovaCart is a modern shopping cart application that fetches products from a live API, validates every response with Zod, lets users search and filter products, manage a persistent cart, and complete a multi-step checkout flow. The codebase is structured for scalability and maintainability, with strict separation between UI, state, services, and business logic.

## Features

- **Product listing** — responsive grid (1 / 2 / 4 columns), category badge, price, rating, stock, add-to-cart with confirmation.
- **Product details** — dedicated detail page with image gallery, full description, shipping/return/warranty info, and add-to-cart.
- **Product sorting** — sort by featured, price (low/high), rating, or name (A–Z) via a reusable `SortFilter` component.
- **Search & filtering** — search by title, category filter, price-range filter, clear-all. Logic lives in a reusable `useFilters` hook, never in components.
- **Cart** — Zustand store with `persist` middleware (survives refresh), quantity limits (1–5) with disabled buttons, remove, clear.
- **Cart summary** — subtotal, 5% tax, 10% discount above $100, final total, $10 minimum checkout with explanation message. All math in `utils/calculateTotals.ts`.
- **Checkout** — three-step flow (Cart Review → Shipping → Payment) with a reusable stepper. Cannot advance until the current step is valid.
- **Shipping form** — React state + Zod validation with inline error messages. No React Hook Form / Formik.
- **Payment summary** — read-only review of shipping info, cart, and totals. Place Order clears the cart and routes to success.
- **Dark mode** — class-based theme with a toggle in the navbar, persisted to localStorage, respecting system preference on first load.
- **UX** — sticky navbar with cart badge, cart drawer, empty-state illustrations, loading spinner, error state with retry, skeleton loading (grid + detail page), disabled buttons, accessible inputs, keyboard navigation, hover effects, image zoom, toast notifications.
- **Performance** — `React.lazy` for checkout, success, and product detail pages, `useMemo` for filtering and totals, memoized selectors.
- **Tests** — unit tests for cart calculation logic with Vitest.

## Architecture

```
Home Page
   ↓
TanStack Query
   ↓
Product Service
   ↓
Zod Validation
   ↓
Product Grid → Product Card → Add To Cart
   ↓
Zustand Store (persist middleware)
   ↓
Cart → Checkout → Success
```

Data flows one direction: the API layer fetches, Zod validates, the store owns cart state, and components stay presentational. Business logic (totals, currency, validation, helpers) lives in `utils/`, never in components.

## Folder Structure

```
src/
  assets/
  components/
    ui/          # Button, Input, Card, Badge, Spinner
    layout/      # Navbar, Footer, Container
    common/      # EmptyState, ErrorState, Skeleton, Toast
    product/     # ProductCard, ProductGrid
    cart/        # CartItem, CartDrawer, CartSummary, QuantitySelector
    filters/     # SearchBar, CategoryFilter, PriceFilter
    checkout/    # CheckoutStepper, ShippingForm, PaymentSummary
  constants/
  hooks/         # useProducts, useFilters, useCartTotals
  pages/         # HomePage, CartPage, CheckoutPage, SuccessPage
  routes/        # AppRoutes (lazy loading)
  services/      # api.ts, productService.ts
  store/         # cartStore.ts (Zustand + persist)
  schemas/       # productSchema.ts, shippingSchema.ts
  utils/         # calculateTotals, currency, helpers, validation
  types/         # Product, CartItem, Shipping, CheckoutStep, APIResponse
  App.tsx
  main.tsx
```

## Tech Stack

- React 18 + TypeScript (strict)
- Vite
- Tailwind CSS
- React Router DOM
- Zustand (with `persist` middleware)
- TanStack Query
- Zod
- lucide-react (icons)
- localStorage (via Zustand persist)

## Installation

```bash
pnpm install
```

## Commands

```bash
pnpm dev        # start dev server
pnpm build      # production build
pnpm preview    # preview production build
pnpm lint       # eslint
pnpm typecheck  # tsc --noEmit
pnpm test       # run unit tests (vitest)
pnpm test:watch # watch mode
```

## Environment

No environment variables are required. The app calls the public DummyJSON API directly.

## API

- Endpoint: `https://dummyjson.com/products`
- Products are fetched via TanStack Query in `useProducts`.
- The raw response is parsed with `productsResponseSchema` (Zod) before reaching the UI. Unvalidated data is never rendered.

## Design Decisions

- **Zustand over Redux** — minimal boilerplate, first-class `persist` middleware, selector-based subscriptions to limit re-renders.
- **TanStack Query** — caching, loading/error states, and retries handled declaratively; no manual effect-based fetching in components.
- **Zod at the boundary** — the API response and the shipping form are both validated with Zod. Components trust already-validated data.
- **Logic outside components** — totals, currency, validation, and filtering are pure functions/hooks, keeping components presentational and testable.
- **Reusable UI primitives** — Button, Input, Card, Badge, and Spinner are the only styled atoms; feature components compose them.
- **Lazy checkout** — checkout and success pages are code-split to keep the initial bundle lean.

## State Management

The cart is the only persistent client state. `cartStore.ts` exposes `items` and actions (`addToCart`, `removeItem`, `increaseQuantity`, `decreaseQuantity`, `setQuantity`, `clearCart`). Quantity is clamped to 1–5. The store is persisted to `localStorage` under `novacart-cart`. Derived totals come from `useCartTotals`, which memoizes `calculateTotals` over the items.

## Validation

- **API**: `productsResponseSchema` validates the full response shape; `productSchema` validates each item.
- **Shipping form**: `shippingSchema` validates each field with inline messages surfaced through `validateShipping`.

## Deployment

The app is a static SPA and deploys to Vercel (or any static host) with no configuration beyond the build output. Set the build command to `pnpm build` and the output directory to `dist`.

## Future Improvements

- Product detail pages with related products
- Server-side pagination / infinite scroll
- Real payment integration (Stripe)
- Wishlist and recently viewed
- Unit and integration tests (Vitest + Testing Library)
- i18n and dark mode

## Screenshots

> Add screenshots of the home, cart, checkout, and success pages here.
