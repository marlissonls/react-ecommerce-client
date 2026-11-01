import type { ProductPublicView } from "@/types/product";
import ProductCard from "../ProductCard";

type FeaturedProductsProps = {
  products: ProductPublicView[];
  loading?: boolean;
};

function FeaturedProducts({
  products,
  loading = false,
}: FeaturedProductsProps) {
  return (
    <section
      id="featured-products"
      className="bg-[#F3F1EA] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#747A74]">
            Seleção Urbana
          </span>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#272B28] sm:text-3xl">
            Produtos em destaque
          </h2>

          <p className="mt-2 text-sm text-[#747A74]">
            Equipamentos selecionados para sua rotina.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-square rounded-xl bg-white" />
                <div className="mt-4 h-4 w-3/4 rounded bg-white" />
                <div className="mt-3 h-4 w-1/3 rounded bg-white" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-sm text-[#747A74]">
            Nenhum produto em destaque disponível.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;