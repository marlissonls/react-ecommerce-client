import { Link, useLocation } from "react-router";

import type { Order } from "@/types";

import OrderConfirmationHeader from "./components/OrderConfirmationHeader";
import OrderDetails from "./components/OrderDetails";
import OrderItemList from "./components/OrderItemList";
import OrderSummary from "./components/OrderSummary";

type LocationState = {
  order?: Order;
};

function OrderConfirmation() {
  const location = useLocation();
  const { order } = (location.state as LocationState | null) ?? {};

  if (!order) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#272B28]">
          Pedido não encontrado
        </h1>

        <p className="mt-3 text-sm text-[#747A74]">
          Não foi possível recuperar os dados da confirmação.
        </p>

        <Link
          to="/catalogo"
          className="mt-6 inline-flex text-sm font-semibold text-[#34483A] hover:text-[#293B2F]"
        >
          Voltar à loja
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <OrderConfirmationHeader
        orderId={order.id}
        status={order.status}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-6">
          <OrderDetails order={order} />

          <OrderItemList items={order.items} />

          <div className="rounded-xl border border-[#E2E3DD] bg-[#F9F9F6] p-5">
            <h2 className="text-sm font-semibold text-[#272B28]">
              O que acontece agora?
            </h2>

            <p className="mt-2 text-xs leading-relaxed text-[#747A74]">
              Seu pedido foi registrado no sistema e permanece pendente.
              Nesta versão da loja, ainda não há processamento de pagamento.
            </p>
          </div>
        </div>

        <OrderSummary order={order} />
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          to="/catalogo"
          className="flex h-12 items-center justify-center rounded-lg bg-[#34483A] px-8 text-sm font-semibold !text-white transition-colors hover:bg-[#293B2F]"
        >
          Continuar comprando
        </Link>
      </div>
    </main>
  );
}

export default OrderConfirmation;
