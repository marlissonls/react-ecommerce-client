
import { Box, Button, MenuItem, Paper, TextField } from '@mui/material'

export const orderStatuses = [
  { label: 'Todos os pedidos', value: 'ALL' },
  { label: 'Aguardando pagamento', value: 'PENDING_PAYMENT' },
  { label: 'Pagamento em processamento', value: 'PAYMENT_PROCESSING' },
  { label: 'Pagamento aprovado', value: 'PAID' },
  { label: 'Separando produtos', value: 'PICKING' },
  { label: 'Em embalagem', value: 'PACKING' },
  { label: 'Pronto para envio', value: 'READY_FOR_SHIPMENT' },
  { label: 'Enviado', value: 'SHIPPED' },
  { label: 'Saiu para entrega', value: 'OUT_FOR_DELIVERY' },
  { label: 'Entregue', value: 'DELIVERED' },
  { label: 'Cancelado', value: 'CANCELLED' },
]

export interface OrderFilters {
  customerId: string
  status: string
  minTotal: string
  maxTotal: string
  createdFrom: string
  createdTo: string
}

interface OrdersFiltersProps {
  filters: OrderFilters
  onChange: (filters: OrderFilters) => void
  onApply: () => void
  onClear: () => void
}

export default function OrdersFilters({
  filters,
  onChange,
  onApply,
  onClear,
}: OrdersFiltersProps) {
  const handleChange = (field: keyof OrderFilters, value: string) => {
    onChange({
      ...filters,
      [field]: value,
    })
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        border: '1px solid #E2E3DD',
        borderRadius: 2,
      }}
    >
      <Box className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextField
          fullWidth
          size="small"
          label="ID do cliente"
          placeholder="UUID do cliente"
          value={filters.customerId}
          onChange={(e) => handleChange('customerId', e.target.value)}
        />

        <TextField
          select
          fullWidth
          size="small"
          label="Status"
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
        >
          {orderStatuses.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          size="small"
          type="number"
          label="Valor mínimo"
          value={filters.minTotal}
          onChange={(e) => handleChange('minTotal', e.target.value)}
          slotProps={{
            htmlInput: { min: 0, step: '0.01' },
          }}
        />

        <TextField
          fullWidth
          size="small"
          type="number"
          label="Valor máximo"
          value={filters.maxTotal}
          onChange={(e) => handleChange('maxTotal', e.target.value)}
          slotProps={{
            htmlInput: { min: 0, step: '0.01' },
          }}
        />

        <TextField
          fullWidth
          size="small"
          type="date"
          label="Criado a partir de"
          value={filters.createdFrom}
          onChange={(e) => handleChange('createdFrom', e.target.value)}
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />

        <TextField
          fullWidth
          size="small"
          type="date"
          label="Criado até"
          value={filters.createdTo}
          onChange={(e) => handleChange('createdTo', e.target.value)}
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />
      </Box>

      <Box className="mt-4 flex justify-end gap-2">
        <Button
          variant="outlined"
          onClick={onClear}
          sx={{
            borderColor: '#D5D8D1',
            color: '#34483A',
            textTransform: 'none',
          }}
        >
          Limpar filtros
        </Button>

        <Button
          variant="contained"
          onClick={onApply}
          sx={{
            bgcolor: '#34483A',
            '&:hover': { bgcolor: '#202B24' },
            textTransform: 'none',
          }}
        >
          Filtrar
        </Button>
      </Box>
    </Paper>
  )
}
