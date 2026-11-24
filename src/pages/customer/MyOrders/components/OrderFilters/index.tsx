type OrderFiltersProps = {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

const filters = [
  { label: "Todos os pedidos", value: "ALL" },
  { label: "Aguardando pagamento", value: "PENDING_PAYMENT" },
  { label: "Pagamento em processamento", value: "PAYMENT_PROCESSING" },
  { label: "Pagamento aprovado", value: "PAID" },
  { label: "Separando produtos", value: "PICKING" },
  { label: "Em embalagem", value: "PACKING" },
  { label: "Pronto para envio", value: "READY_FOR_SHIPMENT" },
  { label: "Enviado", value: "SHIPPED" },
  { label: "Saiu para entrega", value: "OUT_FOR_DELIVERY" },
  { label: "Entregue", value: "DELIVERED" },
  { label: "Cancelado", value: "CANCELLED" },
]

function OrderFilters({
  activeFilter,
  onFilterChange,
}: OrderFiltersProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <label
        htmlFor="order-status-filter"
        className="text-sm font-medium text-gray-700"
      >
        Filtrar pedidos
      </label>

      <select
        id="order-status-filter"
        value={activeFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="w-full max-w-xs rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
      >
        {filters.map((filter) => (
          <option key={filter.value} value={filter.value}>
            {filter.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default OrderFilters