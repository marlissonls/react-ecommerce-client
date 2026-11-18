
import {
  Box,
  Button,
  CircularProgress,
} from '@mui/material'

import {
  SaveOutlined,
} from '@mui/icons-material'

type Props = {
  saving: boolean
  onCancel: () => void
}

export default function ProductFormActions({
  saving,
  onCancel,
}: Props) {
  return (
    <Box className="flex justify-end gap-3 pb-6">
      <Button
        variant="outlined"
        color="inherit"
        onClick={onCancel}
        disabled={saving}
      >
        Cancelar
      </Button>

      <Button
        type="submit"
        variant="contained"
        startIcon={
          saving
            ? <CircularProgress size={18} color="inherit" />
            : <SaveOutlined />
        }
        disabled={saving}
        sx={{
          bgcolor: '#34483A',
          '&:hover': { bgcolor: '#202B24' },
          textTransform: 'none',
        }}
      >
        {saving ? 'Salvando...' : 'Salvar produto'}
      </Button>
    </Box>
  )
}
