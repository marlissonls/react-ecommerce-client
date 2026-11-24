import { Box, Typography } from '@mui/material'

export default function OrdersManagementHeader() {
  return (
    <Box className="mb-6">
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Vendas
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Consulte e gerencie os pedidos realizados na loja
      </Typography>
    </Box>
  )
}
