import type { CartItem } from "@/types";

type CartItemCardProps = {
  item: CartItem;
  onRemove: (productId: string) => void;
  removing?: boolean;
};

function CartItemCard({
  item,
  onRemove,
  removing = false,
}: CartItemCardProps) {
  const isAvailable = item.availability === "AVAILABLE";

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);

  return (
    <article className="flex gap-5 border-b border-[#E2E3DD] py-6">
      <div className="relative aspect-square h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#F3F1EA] sm:h-36 sm:w-36">
        {item.productImage ? (
          <img
            src={item.productImage}
            alt={item.productTitle}
            className={`h-full w-full object-cover ${
              isAvailable ? "grayscale" : ""
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-xs font-medium uppercase tracking-widest text-[#A0A49D]">
              Urbana
            </span>
          </div>
        )}

        {!isAvailable && (
          <div className="absolute inset-x-0 bottom-0 bg-[#202020] px-2 pb-0.5 text-center">
            <span className="text-[10px] font-semibold tracking-widest text-white">
              ESGOTADO
            </span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h3
            className={`line-clamp-2 text-sm font-semibold ${
              isAvailable
                ? "text-[#272B28]"
                : "text-[#92958F]"
            }`}
          >
            {item.productTitle}
          </h3>

          <p
            className={`mt-2 text-sm ${
              isAvailable
                ? "text-[#747A74]"
                : "text-[#A0A49D]"
            }`}
          >
            {formatPrice(item.price)} / unidade
          </p>

          <p
            className={`mt-2 text-sm ${
              isAvailable
                ? "text-[#747A74]"
                : "text-[#A0A49D]"
            }`}
          >
            Quantidade: {item.quantity}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <span
            className={`text-base font-bold ${
              isAvailable
                ? "text-[#34483A]"
                : "text-[#92958F]"
            }`}
          >
            {formatPrice(item.totalPrice)}
          </span>

          <button
            type="button"
            onClick={() => onRemove(item.productId)}
            disabled={removing}
            className="text-xs font-medium text-[#747A74] transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Remover
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartItemCard;