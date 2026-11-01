import type { ProductPublicView } from "@/types/product";

type ProductCardProps = {
  product: ProductPublicView;
};

function ProductCard({ product }: ProductCardProps) {
  const hasSale =
    product.salePrice !== null &&
    product.salePrice < product.price;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);

  return (
    <article className="group min-w-0">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#F3F1EA]">
        <span className="text-xs font-medium uppercase tracking-widest text-[#A0A49D]">
          Urbana
        </span>

        {hasSale && (
          <span className="absolute left-3 top-3 rounded-md bg-[#34483A] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Oferta
          </span>
        )}

        {product.stock <= 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#202B24]/50">
            <span className="rounded-md bg-white px-3 py-2 text-xs font-semibold text-[#272B28]">
              Indisponível
            </span>
          </div>
        )}
      </div>

      <div className="pt-4">
        <h3 className="line-clamp-2 min-h-10 text-sm font-medium leading-5 text-[#272B28] transition-colors group-hover:text-[#34483A]">
          {product.title}
        </h3>

        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          {hasSale ? (
            <>
              <span className="text-base font-bold text-[#34483A]">
                {formatPrice(product.salePrice!)}
              </span>

              <span className="text-xs text-[#747A74] line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-[#272B28]">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;