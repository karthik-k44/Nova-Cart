import { useFilters } from "../../hooks";
import Container from "../../components/container";
import SearchBar from "../../components/searchbar";
import Button from "../../components/button";
import { PackageOpen } from "lucide-react";
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

  return (
    <div className="">
      <Container className="py-4">
        {/* <div className="mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Discover products
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Curated essentials, delivered with care.
          </p>
        </div> */}

        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md flex-1">
            <SearchBar value={filters.search} onChange={setSearch} />
          </div>
          <div className="flex items-center gap-3 hover:cursor-pointer">
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden lg:block">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </p>
            <SortFilter value={filters.sort} onChange={setSort} />
            <p className="text-xs text-gray-500 dark:text-gray-400 lg:hidden">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </p>
          </div>
        </div>

        <aside className="space-y-6 lg:block mb-4">
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-gray-800">
            <div className="space-y-4">
              <CategoryFilter
                categories={categories}
                value={filters.category}
                onChange={setCategory}
                onClick={clearFilters}
              />
              <PriceFilter value={filters.maxPrice} onChange={setMaxPrice} />
            </div>
          </div>
        </aside>

        <div className="grid grid-cols-1 gap-8">
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
                <ProductGrid products={filtered} />
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
