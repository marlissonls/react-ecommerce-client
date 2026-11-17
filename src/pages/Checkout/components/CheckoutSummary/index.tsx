
import { formatPrice } from "@/utils/formatPrice";

type CheckoutSummaryProps = {
  itemCount: number;
  subTotalAmount: number;
  onConfirm: () => void;
  loading?: boolean;
};

function CheckoutSummary({
  itemCount,
  subTotalAmount,
  onConfirm,
  loading = false,
}: CheckoutSummaryProps) {
  return (
    <aside className="h-fit rounded-xl border border-[#E2E3DD] bg-white p-6">
      <h2 className="text-base font-bold text-[#272B28]">
        Resumo do pedido
      </h2>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-sm text-[#747A74]">
          <span>Produtos ({itemCount})</span>
          <span>{formatPrice(subTotalAmount)}</span>
        </div>

        <div className="flex justify-between text-sm text-[#747A74]">
          <span>Frete</span>
          <span className="text-[#92958F]">Não disponível</span>
        </div>

        <div className="border-t border-[#E2E3DD] pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#272B28]">
              Subtotal
            </span>

            <span className="text-xl font-bold text-[#34483A]">
              {formatPrice(subTotalAmount)}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onConfirm}
        disabled={loading || itemCount === 0}
        className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-[#34483A] text-sm font-semibold text-white transition-colors hover:bg-[#293B2F] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Criando pedido..." : "Confirmar pedido"}
      </button>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-[#92958F]">
        A confirmação criará um pedido com status pendente.
        Nenhum pagamento será realizado.
      </p>
    </aside>
  );
}

export default CheckoutSummary;
