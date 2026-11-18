import type { Order } from "@/types"

import OrderCard from "../OrderCard"
import OrdersEmptyState from "../OrdersEmptyState"

type OrderListProps = {
  orders: Order[]
}

function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return <OrdersEmptyState />
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}

export default OrderList