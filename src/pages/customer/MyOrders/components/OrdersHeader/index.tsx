import {
  Box,
  Button,
  Typography,
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router'

function OrdersHeader() {
  const navigate = useNavigate()
  return (
    <Box className="mb-6 flex items-center gap-3">
      <Button
        color="inherit"
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
      >
        Voltar
      </Button>

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Meus pedidos
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Acompanhe seus pedidos e consulte o histórico das suas compras.
        </Typography>
      </Box>
    </Box>
  );
}


export default OrdersHeader;
