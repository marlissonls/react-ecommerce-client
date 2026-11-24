export const orderStatusStyles: Record<string, { bg: string; color: string }> = {
  PENDING_PAYMENT: { bg: '#FFFBEB', color: '#B45309' },
  PAYMENT_PROCESSING: { bg: '#FEFCE8', color: '#A16207' },
  PAID: { bg: '#F0FDF4', color: '#15803D' },
  PICKING: { bg: '#EFF6FF', color: '#1D4ED8' },
  PACKING: { bg: '#EEF2FF', color: '#4338CA' },
  READY_FOR_SHIPMENT: { bg: '#ECFEFF', color: '#0E7490' },
  SHIPPED: { bg: '#FAF5FF', color: '#7E22CE' },
  OUT_FOR_DELIVERY: { bg: '#FFF7ED', color: '#C2410C' },
  DELIVERED: { bg: '#ECFDF5', color: '#047857' },
  CANCELLED: { bg: '#FEF2F2', color: '#B91C1C' },
}

export const statusLabels: Record<string, string> = {
  PENDING_PAYMENT: 'Aguardando pagamento',
  PAYMENT_PROCESSING: 'Pagamento em processamento',
  PAID: 'Pagamento aprovado',
  PICKING: 'Separando produtos',
  PACKING: 'Em embalagem',
  READY_FOR_SHIPMENT: 'Pronto para envio',
  SHIPPED: 'Enviado',
  OUT_FOR_DELIVERY: 'Saiu para entrega',
  DELIVERED: 'Entregue',
  CANCELLED: 'Cancelado',
}