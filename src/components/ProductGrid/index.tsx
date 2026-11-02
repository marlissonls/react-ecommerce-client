import type { ProductPublicView } from "@/types/product"
import ProductCard from "@/components/ProductCard"

type ProductGridProps = {
  products: ProductPublicView[]
}

function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid