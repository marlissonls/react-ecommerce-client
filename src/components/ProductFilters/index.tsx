type FilterOption = {
  id: string
  title: string
}

export type ProductFiltersValue = {
  category: string
  brand: string
  minPrice: string
  maxPrice: string
  onSale: boolean
}

type ProductFiltersProps = {
  value: ProductFiltersValue
  categories: FilterOption[]
  brands: FilterOption[]
  onChange: (value: ProductFiltersValue) => void
  onReset: () => void
  showCategoryFilter?: boolean
}

function ProductFilters({
  value,
  categories,
  brands,
  onChange,
  onReset,
  showCategoryFilter = true,
}: ProductFiltersProps) {
  function updateFilter<K extends keyof ProductFiltersValue>(
    key: K,
    newValue: ProductFiltersValue[K]
  ) {
    onChange({
      ...value,
      [key]: newValue,
    })
  }

  return (
    <aside className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#272B28]">
          Filtros
        </h3>

        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-[#34483A] transition-colors hover:underline"
        >
          Limpar filtros
        </button>
      </div>

      {showCategoryFilter && (
        <div className="space-y-2">
          <label
            htmlFor="filter-category"
            className="text-sm font-medium text-[#272B28]"
          >
            Categoria
          </label>

          <select
            id="filter-category"
            value={value.category}
            onChange={(event) => updateFilter('category', event.target.value)}
            className="w-full rounded-lg border border-[#E2E3DD] bg-[#FCFCFA] px-3 py-2.5 text-sm text-[#272B28] outline-none focus:border-[#34483A]"
          >
            <option value="">Todas as categorias</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="filter-brand"
          className="text-sm font-medium text-[#272B28]"
        >
          Marca
        </label>

        <select
          id="filter-brand"
          value={value.brand}
          onChange={(event) => updateFilter('brand', event.target.value)}
          className="w-full rounded-lg border border-[#E2E3DD] bg-[#FCFCFA] px-3 py-2.5 text-sm text-[#272B28] outline-none focus:border-[#34483A]"
        >
          <option value="">Todas as marcas</option>

          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <span className="text-sm font-medium text-[#272B28]">
          Faixa de preço
        </span>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            min="0"
            placeholder="Mínimo"
            aria-label="Preço mínimo"
            value={value.minPrice}
            onChange={(event) => updateFilter('minPrice', event.target.value)}
            className="min-w-0 rounded-lg border border-[#E2E3DD] bg-[#FCFCFA] px-3 py-2.5 text-sm text-[#272B28] outline-none focus:border-[#34483A]"
          />

          <input
            type="number"
            min="0"
            placeholder="Máximo"
            aria-label="Preço máximo"
            value={value.maxPrice}
            onChange={(event) => updateFilter('maxPrice', event.target.value)}
            className="min-w-0 rounded-lg border border-[#E2E3DD] bg-[#FCFCFA] px-3 py-2.5 text-sm text-[#272B28] outline-none focus:border-[#34483A]"
          />
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-[#272B28]">
        <input
          type="checkbox"
          checked={value.onSale}
          onChange={(event) => updateFilter('onSale', event.target.checked)}
          className="h-4 w-4 accent-[#34483A]"
        />
        Somente ofertas
      </label>
    </aside>
  )
}

export default ProductFilters