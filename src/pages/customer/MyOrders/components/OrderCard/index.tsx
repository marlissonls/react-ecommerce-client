
import { Link } from 'react-router'
import {
  Box,
  Chip,
  Typography,
} from '@mui/material'

import { ChevronRight, Package } from 'lucide-react'

import type { Order } from '@/types'
import { formatPrice } from '@/utils/formatPrice'
import { orderStatusStyles, statusLabels } from '@/utils/orderStatus'

type OrderCardProps = {
  order: Order
}

function OrderCard({ order }: OrderCardProps) {
  const statusStyle = orderStatusStyles[order.status] ?? {
    bg: '#F3F4F6',
    color: '#4B5563',
  }

  const statusLabel = statusLabels[order.status] ?? order.status

  const createdAt = new Date(order.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <Box
      component="article"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { sm: 'center' },
        justifyContent: 'space-between',
        gap: 3,
        p: 2.5,
        px: { sm: 3 },
        bgcolor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            flexShrink: 0,
            bgcolor: '#F3F4F6',
            color: '#6B7280',
            borderRadius: 2,
          }}
        >
          <Package size={23} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: '#111827' }}
          >
            Pedido #{order.id.slice(0, 8).toUpperCase()}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Comprado em {createdAt} |
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {formatPrice(order.totalAmount)}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 3,
          pt: { xs: 2, sm: 0 },
          borderTop: { xs: '1px solid #F3F4F6', sm: 'none' },
          flexShrink: 0,
        }}
      >
        <Chip
          size="small"
          label={statusLabel}
          sx={{
            bgcolor: statusStyle.bg,
            color: statusStyle.color,
            fontWeight: 600,
            fontSize: '0.75rem',
            borderRadius: 5,
          }}
        />

        <Box
          component={Link}
          to={`/meus-pedidos/${order.id}`}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            color: '#374151',
            fontSize: '0.875rem',
            fontWeight: 500,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'color 150ms',
            '&:hover': {
              color: '#000000',
            },
          }}
        >
          Ver detalhes
          <ChevronRight size={16} />
        </Box>
      </Box>
    </Box>
  )
}

export default OrderCard
