import type { CartItem } from "@/types";

type UnavailableProductsModalProps = {
  items: CartItem[];
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
};

const formatPrice = (price: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);

function UnavailableProductsModal({
  items,
  onCancel,
  onConfirm,
  loading = false,
}: UnavailableProductsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="unavailable-modal-title"
        className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl"
      >
        <div className="border-b border-[#E2E3DD] px-6 py-5">
          <h2
            id="unavailable-modal-title"
            className="text-lg font-bold text-[#272B28]"
          >
            Produtos indisponíveis
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-[#747A74]">
            Alguns produtos do seu carrinho não estão mais disponíveis.
            Se continuar, eles serão removidos do seu carrinho.
          </p>
        </div>

        <div className="max-h-72 divide-y divide-[#E2E3DD] overflow-y-auto px-6">
          {items.map((item) => (
            <article
              key={item.productId}
              className="flex items-center gap-4 py-4"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#F3F1EA]">
                {item.productImage ? (
                  <img
                    src={item.productImage}
                    alt={item.productTitle}
                    className="h-full w-full object-cover grayscale"
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
                <h3 className="line-clamp-2 text-sm font-semibold text-[#92958F]">
                  {item.productTitle}
                </h3>

                <p className="mt-1 text-xs text-[#A0A49D]">
                  Quantidade: {item.quantity}
                </p>
              </div>

              <span className="shrink-0 text-sm font-semibold text-[#92958F]">
                {formatPrice(item.totalPrice)}
              </span>
            </article>
          ))}
        </div>

        <div className="border-t border-[#E2E3DD] bg-[#F9F9F6] px-6 py-5">
          <p className="text-xs leading-relaxed text-[#747A74]">
            Os demais produtos disponíveis serão mantidos no carrinho e
            estarão disponíveis para finalizar sua compra.
          </p>

          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="h-11 rounded-lg border border-[#D5D8D0] px-5 text-sm font-semibold text-[#34483A] transition-colors hover:bg-[#F3F1EA] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Voltar ao carrinho
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="h-11 rounded-lg bg-[#34483A] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#293B2F] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Aguarde..." : "Continuar"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UnavailableProductsModal;
