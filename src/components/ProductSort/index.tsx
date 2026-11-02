type ProductSortProps = {
  value: string
  onChange: (value: string) => void
}

function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="product-sort"
        className="whitespace-nowrap text-sm text-[#747A74]"
      >
        Ordenar por
      </label>

      <select
        id="product-sort"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-[#E2E3DD] bg-[#FCFCFA] px-3 py-2 text-sm text-[#272B28] outline-none transition-colors focus:border-[#34483A]"
      >
        <option value="relevance">Relevância</option>
        <option value="price-asc">Menor preço</option>
        <option value="price-desc">Maior preço</option>
        <option value="newest">Mais recentes</option>
      </select>
    </div>
  )
}

export default ProductSort