import { Link } from "react-router"
import { PackageOpen } from "lucide-react"

function OrdersEmptyState() {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <PackageOpen size={30} />
      </div>

      <h2 className="text-lg font-semibold text-gray-900">
        Você ainda não tem pedidos
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
        Quando você fizer uma compra, seus pedidos aparecerão aqui para
        acompanhar e consultar os detalhes.
      </p>

      <Link
        to="/catalogo"
        className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium !text-white transition-colors hover:bg-gray-700"
      >
        Explorar produtos
      </Link>
    </div>
  )
}

export default OrdersEmptyState