import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip
} from '@mui/material'

import { VisibilityOutlined } from '@mui/icons-material'

import type { Order } from '@/types'

import { orderStatusStyles, statusLabels } from '@/utils/orderStatus'

interface OrdersTableProps {
  orders: Order[]
  loading: boolean
  onView: (orderId: string) => void
}

export default function OrdersTable({
  orders,
  loading,
  onView,
}: OrdersTableProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('pt-BR')

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: '1px solid #E2E3DD',
        borderRadius: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#F3F1EA' }}>
            <TableCell>Pedido</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                Carregando pedidos...
              </TableCell>
            </TableRow>
          ) : orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                Nenhum pedido encontrado
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    #{order.id}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Box>
                    {/* <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {order.customerName}
                    </Typography> */}
                    <Typography variant="caption" color="text.secondary">
                      {order.customerId}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>{formatCurrency(order.totalAmount)}</TableCell>

                <TableCell>{formatDate(order.createdAt)}</TableCell>

                <TableCell>
                  <Chip
                    size="small"
                    label={statusLabels[order.status] ?? order.status}
                    sx={{
                      bgcolor: orderStatusStyles[order.status].bg ?? '#F3F4F6',
                      color: orderStatusStyles[order.status].color ?? '#4B5563',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      borderRadius: 5,
                    }}
                  />
                </TableCell>

                <TableCell align="right">
                  <IconButton
                    size="small"
                    aria-label="Visualizar pedido"
                    onClick={() => onView(order.id)}
                  >
                    <VisibilityOutlined fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
