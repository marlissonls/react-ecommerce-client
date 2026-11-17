
import type { CartItem } from "@/types";
import { formatPrice } from "@/utils/formatPrice";

type CheckoutItemListProps = {
  items: CartItem[];
};


function CheckoutItemList({ items }: CheckoutItemListProps) {
  return (
    <section className="min-w-0">
      <div className="flex items-center justify-between border-b border-[#E2E3DD] pb-4">
        <h2 className="text-sm font-semibold text-[#272B28]">
          Produtos do pedido
        </h2>

        <span className="text-xs text-[#92958F]">
          {items.length} {items.length === 1 ? "produto" : "produtos"}
        </span>
      </div>

      <div className="divide-y divide-[#E2E3DD]">
        {items.map((item) => (
          <article
            key={item.productId}
            className="flex items-center gap-4 py-5"
          >
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#F3F1EA]">
              {item.productImage ? (
                <img
                  src={item.productImage}
                  alt={item.productTitle}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-[9px] font-medium uppercase tracking-widest text-[#A0A49D]">
                    Urbana
                  </span>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 text-sm font-semibold text-[#272B28]">
                {item.productTitle}
              </h3>

              <p className="mt-1 text-xs text-[#92958F]">
                Quantidade: {item.quantity}
              </p>

              <p className="mt-2 text-sm font-medium text-[#34483A]">
                {formatPrice(item.price)} / unidade
              </p>
            </div>

            <span className="shrink-0 text-sm font-semibold text-[#272B28]">
              {formatPrice(item.totalPrice)}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CheckoutItemList;
