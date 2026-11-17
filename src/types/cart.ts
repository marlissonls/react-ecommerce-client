export type CartItem = {
  productId: string
  productTitle: string
  productImage: string
  price: number
  quantity: number
  totalPrice: number
  availability: string
}

export type Cart = {
  id: string
  customerId: string
  subTotalAmount: number
  items: CartItem[]
}