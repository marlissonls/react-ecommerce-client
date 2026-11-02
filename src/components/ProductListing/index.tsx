
import type { ProductPublicView } from "@/types/product"
import ProductFilters, {
  type ProductFiltersValue,
} from "@/components/ProductFilters"
import ProductSort from "@/components/ProductSort"
import ProductGrid from "@/components/ProductGrid"
import Pagination from "@/components/Pagination"

type FilterOption = {
  id: string
  title: string
}

type ProductListingProps = {
  products: ProductPublicView[]
  loading: boolean

  categories: FilterOption[]
  brands: FilterOption[]

  filters: ProductFiltersValue
  onFiltersChange: (filters: ProductFiltersValue) => void
  onResetFilters: () => void

  sort: string
  onSortChange: (sort: string) => void

  page: number
  totalPages: number
  onPageChange: (page: number) => void

  showCategoryFilter?: boolean
}

function ProductListing({
  products,
  loading,
  categories,
  brands,
  filters,
  onFiltersChange,
  onResetFilters,
  sort,
  onSortChange,
  page,
  totalPages,
  onPageChange,
  showCategoryFilter
}: ProductListingProps) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
      <ProductFilters
        value={filters}
        categories={categories}
        brands={brands}
        onChange={onFiltersChange}
        onReset={onResetFilters}
        showCategoryFilter={showCategoryFilter}
      />

      <div className="min-w-0">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#747A74]">
            {loading
              ? "Carregando produtos..."
              : `${products.length} produtos nesta página`}
          </p>

          <ProductSort
            value={sort}
            onChange={onSortChange}
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-square rounded-xl bg-[#F3F1EA]" />
                <div className="mt-4 h-4 w-3/4 rounded bg-[#F3F1EA]" />
                <div className="mt-3 h-4 w-1/3 rounded bg-[#F3F1EA]" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="py-8 text-sm text-[#747A74]">
            Nenhum produto encontrado.
          </p>
        ) : (
          <ProductGrid products={products} />
        )}

        {!loading && products.length > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={onPageChange}
          />
        )}
      </div>
    </div>
  )
}

export default ProductListing
