
import type { Order } from "@/types";
import { formatPrice } from "@/utils/formatPrice";

type OrderSummaryProps = {
  order: Order;
};

function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <aside className="h-fit rounded-xl border border-[#E2E3DD] bg-white p-6">
      <h2 className="text-base font-bold text-[#272B28]">
        Resumo financeiro
      </h2>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between gap-4 text-sm text-[#747A74]">
          <span>Subtotal</span>
          <span>{formatPrice(order.subTotalAmount)}</span>
        </div>

        <div className="flex justify-between gap-4 text-sm text-[#747A74]">
          <span>Desconto</span>
          <span>{formatPrice(order.discountAmount)}</span>
        </div>

        <div className="flex justify-between gap-4 text-sm text-[#747A74]">
          <span>Frete</span>
          <span>{formatPrice(order.shippingAmount)}</span>
        </div>

        <div className="border-t border-[#E2E3DD] pt-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-[#272B28]">
              Total do pedido
            </span>

            <span className="text-xl font-bold text-[#34483A]">
              {formatPrice(order.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-6 rounded-lg bg-[#F9F9F6] p-4 text-xs leading-relaxed text-[#747A74]">
        Este pedido foi registrado como pendente. Nenhum pagamento foi
        realizado.
      </p>
    </aside>
  );
}

export default OrderSummary;
