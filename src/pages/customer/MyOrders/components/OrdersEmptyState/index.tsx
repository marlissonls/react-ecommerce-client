import { Link } from "react-router"
import { PackageOpen } from "lucide-react"

type OrdersEmptyStateProps = {
  activeFilter: string
  onClearFilter: () => void
}

const emptyMessages: Record<
  string,
  { title: string; description: string }
> = {
  PENDING_PAYMENT: {
    title: "Nenhum pagamento pendente",
    description: "Você não possui pedidos aguardando pagamento.",
  },
  PAYMENT_PROCESSING: {
    title: "Nenhum pagamento em processamento",
    description: "Não há pagamentos sendo processados no momento.",
  },
  PAID: {
    title: "Nenhum pagamento aprovado",
    description: "Seus pedidos com pagamento aprovado aparecerão aqui.",
  },
  PICKING: {
    title: "Nenhum pedido em separação",
    description: "Você não possui produtos sendo separados.",
  },
  PACKING: {
    title: "Nenhum pedido em embalagem",
    description: "Não há pedidos sendo preparados para envio.",
  },
  READY_FOR_SHIPMENT: {
    title: "Nenhum pedido pronto para envio",
    description: "Seus pedidos aguardando envio aparecerão aqui.",
  },
  SHIPPED: {
    title: "Nenhum pedido enviado",
    description: "Quando seus pedidos forem enviados, aparecerão aqui.",
  },
  OUT_FOR_DELIVERY: {
    title: "Nenhum pedido em rota de entrega",
    description: "Você não possui pedidos em rota de entrega.",
  },
  DELIVERED: {
    title: "Nenhum pedido entregue",
    description: "Seus pedidos entregues aparecerão aqui.",
  },
  CANCELLED: {
    title: "Nenhum pedido cancelado",
    description: "Você não possui pedidos cancelados.",
  },
}

function OrdersEmptyState({
  activeFilter,
  onClearFilter,
}: OrdersEmptyStateProps) {
  const isFiltered = activeFilter !== "ALL"

  const message = emptyMessages[activeFilter] ?? {
    title: "Você ainda não tem pedidos",
    description:
      "Quando você fizer uma compra, seus pedidos aparecerão aqui para acompanhar e consultar os detalhes.",
  }

  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <PackageOpen size={30} />
      </div>

      <h2 className="text-lg font-semibold text-gray-900">
        {message.title}
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
        {message.description}
      </p>

      {isFiltered ? (
        <button
          type="button"
          onClick={onClearFilter}
          className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Ver todos os pedidos
        </button>
      ) : (
        <Link
          to="/catalogo"
          className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium !text-white transition-colors hover:bg-gray-700"
        >
          Explorar produtos
        </Link>
      )}
    </div>
  )
}

export default OrdersEmptyState