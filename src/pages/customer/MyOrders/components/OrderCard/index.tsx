import { Link } from "react-router"
import { ChevronRight, Package } from "lucide-react"

import type { Order } from "@/types"
import { formatPrice } from "@/utils/formatPrice"

type OrderCardProps = {
  order: Order
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700",
  CONFIRMED: "bg-blue-50 text-blue-700",
  COMPLETED: "bg-green-50 text-green-700",
  CANCELLED: "bg-red-50 text-red-700",
}

const statusLabels: Record<string, string> = {
  PENDING_PAYMENT: "Aguardando pagamento",
  PAYMENT_PROCESSING: "Pagamento em processamento",
  PAID: "Pagamento aprovado",
  PICKING: "Separando produtos",
  PACKING: "Em embalagem",
  READY_FOR_SHIPMENT: "Pronto para envio",
  SHIPPED: "Enviado",
  OUT_FOR_DELIVERY: "Saiu para entrega",
  DELIVERED: "Entregue",
  CANCELLED: "Cancelado",
}

function OrderCard({ order }: OrderCardProps) {
  const statusStyle =
    statusStyles[order.status] ?? "bg-gray-100 text-gray-600"

  const statusLabel = statusLabels[order.status] ?? order.status

  const createdAt = new Date(order.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  return (
    <article className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
          <Package size={23} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900">
            Pedido #{order.id.slice(0, 8).toUpperCase()}
          </p>

          <div className="flex gap-1">
            <p className="mt-1 text-xs text-gray-500">
              Comprado em {createdAt} |
            </p>

            <p className="mt-1 text-xs text-gray-500">
              <span>
                {formatPrice(order.totalAmount)}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-6 border-t border-gray-100 pt-4 sm:border-0 sm:pt-0">
        <span
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle}`}
        >
          {statusLabel}
        </span>

        <Link
          to={`/meus-pedidos/${order.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors hover:text-black"
        >
          Ver detalhes
          <ChevronRight size={16} />
        </Link>
      </div>
    </article>
  )
}

export default OrderCard