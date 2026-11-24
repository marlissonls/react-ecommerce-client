
import { useEffect, useState } from 'react'
import { Box, Paper } from '@mui/material'
import { useNavigate } from 'react-router'

import api from '@/api'

import OrdersManagementHeader from './OrdersManagementHeader'
import OrdersFilters, {
  type OrderFilters,
} from './OrdersFilters'
import OrdersTable from './OrdersTable'
import OrdersPagination from './OrdersPagination'

import type { Order } from '@/types'

const PAGE_SIZE = 10

const EMPTY_FILTERS: OrderFilters = {
  customerId: '',
  status: 'ALL',
  minTotal: '',
  maxTotal: '',
  createdFrom: '',
  createdTo: '',
}

export default function OrdersManagement() {
  const navigate = useNavigate()

  const [orders, setOrders] = useState<Order[]>([])
  const [filters, setFilters] = useState<OrderFilters>(EMPTY_FILTERS)
  const [appliedFilters, setAppliedFilters] =
    useState<OrderFilters>(EMPTY_FILTERS)

  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await api.get('/orders/manager', {
          params: {
            customerId: appliedFilters.customerId || undefined,
            status:
              appliedFilters.status === 'ALL'
                ? undefined
                : appliedFilters.status,
            minTotal: appliedFilters.minTotal || undefined,
            maxTotal: appliedFilters.maxTotal || undefined,
            createdFrom: appliedFilters.createdFrom
              ? `${appliedFilters.createdFrom}T00:00:00`
              : undefined,
            createdTo: appliedFilters.createdTo
              ? `${appliedFilters.createdTo}T23:59:59`
              : undefined,
            page,
            size: PAGE_SIZE,
          },
        })

        setOrders(response.data.items)
        setTotal(response.data.total)
      } catch (error) {
        console.error('Erro ao carregar pedidos', error)
        setError('Não foi possível carregar os pedidos.')
        setOrders([])
        setTotal(0)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [appliedFilters, page])

  const handleApplyFilters = () => {
    setPage(0)
    setAppliedFilters({ ...filters })
  }

  const handleClearFilters = () => {
    setFilters({ ...EMPTY_FILTERS })
    setAppliedFilters({ ...EMPTY_FILTERS })
    setPage(0)
  }

  const handleViewOrder = (orderId: string) => {
    navigate(`/painel/pedidos/${orderId}`)
  }

  return (
    <Box>
      <OrdersManagementHeader />

      <OrdersFilters
        filters={filters}
        onChange={setFilters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      {error && (
        <Box className="mb-4">
          <Paper
            elevation={0}
            sx={{
              p: 2,
              border: '1px solid #FECACA',
              borderRadius: 2,
              color: '#DC2626',
              bgcolor: '#FEF2F2',
            }}
          >
            {error}
          </Paper>
        </Box>
      )}

      <OrdersTable
        orders={orders}
        loading={loading}
        onView={handleViewOrder}
      />

      <OrdersPagination
        total={total}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </Box>
  )
}
