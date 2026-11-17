import type { CartItem } from "@/types";

import CartItemCard from "../CartItemCard";

type CartItemListProps = {
  items: CartItem[];
  onRemove: (productId: string) => void;
  removingProductId?: string | null;
};

function CartItemList({
  items,
  onRemove,
  removingProductId = null,
}: CartItemListProps) {
  return (
    <section className="min-w-0">
      <div className="border-b border-[#E2E3DD] pb-4">
        <h2 className="text-sm font-semibold text-[#272B28]">
          Produtos selecionados
        </h2>
      </div>

      <div>
        {items.map((item) => (
          <CartItemCard
            key={item.productId}
            item={item}
            onRemove={onRemove}
            removing={removingProductId === item.productId}
          />
        ))}
      </div>
    </section>
  );
}

export default CartItemList;