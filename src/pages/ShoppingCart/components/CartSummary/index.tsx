type CartSummaryProps = {
  itemCount: number;
  subTotalAmount: number;
  onCheckout: () => void;
  mutating: boolean;
};

function CartSummary({
  itemCount,
  subTotalAmount,
  onCheckout,
  mutating=false
}: CartSummaryProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);

  return (
    <aside className="h-fit rounded-xl border border-[#E2E3DD] p-6">
      <h2 className="text-lg font-bold text-[#272B28]">
        Resumo do pedido
      </h2>

      <div className="mt-6 space-y-4 border-b border-[#E2E3DD] pb-6">
        <div className="flex justify-between gap-4 text-sm">
          <span className="text-[#747A74]">
            Produtos ({itemCount})
          </span>

          <span className="font-medium text-[#272B28]">
            {formatPrice(subTotalAmount)}
          </span>
        </div>

        <div className="flex justify-between gap-4 text-sm">
          <span className="text-[#747A74]">Frete</span>

          <span className="text-[#747A74]">
            Calculado posteriormente
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-[#272B28]">
          Subtotal
        </span>

        <span className="text-xl font-bold text-[#34483A]">
          {formatPrice(subTotalAmount)}
        </span>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        disabled={mutating}
        className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-[#34483A] text-sm font-semibold text-white transition-colors hover:bg-[#293B2F]"
      >
        Finalizar pedido
      </button>
    </aside>
  );
}

export default CartSummary;