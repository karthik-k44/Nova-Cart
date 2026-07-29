import { useState } from "react";
import { useFilters } from "../../hooks";
import Container from "../../components/container";
import SearchBar from "../../components/searchbar";
import Button from "../../components/button";
import { PackageOpen, SlidersHorizontal, X } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import SortFilter from "../../components/filters/sort-filter";
import PriceFilter from "../../components/filters/price-filter";
import CategoryFilter from "../../components/filters/category-filter";
import { ProductGridSkeleton } from "../../components";
import ErrorState from "../../components/error-state";
import EmptyState from "../../components/empty-state";
import ProductGrid from "../../components/product/product-grid";

const HomePage = () => {
   const { data, isLoading, isError, refetch } = useProducts();
   const {
     filters,
     filtered,
     categories,
     setSearch,
     setCategory,
     setMaxPrice,
     setSort,
     clearFilters,
   } = useFilters(data?.products || []);

   const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="">
      <Container className="py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Discover products
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Curated essentials, delivered with care.
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md flex-1">
            <SearchBar value={filters.search} onChange={setSearch} />
          </div>
          <div className="flex items-center gap-3">
            <SortFilter value={filters.sort} onChange={setSort} />
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setShowFilters((s) => !s)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
          <aside
            className={`${showFilters ? "block" : "hidden"} space-y-6 lg:block`}
          >
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-gray-800">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-5">
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    Category
                  </h3>
                  <CategoryFilter
                    categories={categories}
                    value={filters.category}
                    onChange={setCategory}
                  />
                </div>
                <PriceFilter value={filters.maxPrice} onChange={setMaxPrice} />
              </div>
            </div>
          </aside>

          <div>
            {isLoading ? (
              <ProductGridSkeleton />
            ) : isError ? (
              <ErrorState
                message="We couldn't load products right now."
                onRetry={() => refetch()}
              />
            ) : !isLoading && filtered.length === 0 ? (
              <EmptyState
                icon={<PackageOpen className="h-7 w-7" />}
                title="No products found"
                description="Try adjusting your search or filters."
                action={
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear filters
                  </Button>
                }
              />
            ) : (
              <>
                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  {filtered.length}{" "}
                  {filtered.length === 1 ? "product" : "products"}
                </p>
                <ProductGrid products={filtered} />
              </>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 flex justify-end lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(false)}
            >
              <X className="h-4 w-4" />
              Close filters
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default HomePage;
