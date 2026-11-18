
import type { Order } from "@/types";

type OrderDetailsProps = {
  order: Order;
};

const statusLabels: Record<string, string> = {
  PENDING: "Pendente",
  CONFIRMED: "Confirmado",
  CANCELLED: "Cancelado",
  COMPLETED: "Concluído",
};

function OrderDetails({ order }: OrderDetailsProps) {
  const createdAt = new Date(order.createdAt).toLocaleString("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <section className="rounded-xl border border-[#E2E3DD] bg-white p-6">
      <h2 className="text-sm font-semibold text-[#272B28]">
        Detalhes do pedido
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <p className="text-xs text-[#92958F]">Identificador</p>
          <p className="mt-1 break-all font-mono text-xs font-medium text-[#34483A]">
            {order.id}
          </p>
        </div>

        <div>
          <p className="text-xs text-[#92958F]">Data do pedido</p>
          <p className="mt-1 text-sm font-medium text-[#272B28]">
            {createdAt}
          </p>
        </div>

        <div>
          <p className="text-xs text-[#92958F]">Status</p>
          <span className="mt-2 inline-flex rounded-full bg-[#F3F1EA] px-3 py-1 text-xs font-semibold text-[#8A7546]">
            {statusLabels[order.status] ?? order.status}
          </span>
        </div>
      </div>
    </section>
  );
}

export default OrderDetails;
