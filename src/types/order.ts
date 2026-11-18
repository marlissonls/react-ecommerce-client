export type OrderItem = {
  productId: string;
  productTitle: string;
  productImage: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

export type Order = {
  id: string;
  customerId: string;
  subTotalAmount: number;
  discountAmount: number;
  shippingAmount: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};