
import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'

import {
  Add,
  EditOutlined,
  Search,
} from '@mui/icons-material'

import { useNavigate } from 'react-router'
import api from '@/api'

type BrandManagerView = {
  id: string
  title: string
  slug: string
  description: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export default function BrandManagement() {
  const navigate = useNavigate()

  const [brands, setBrands] = useState<BrandManagerView[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await api.get<BrandManagerView[]>(
          '/brands/manager',
        )

        setBrands(response.data)
      } catch (error) {
        console.error('Erro ao carregar marcas', error)
        setError('Não foi possível carregar as marcas.')
      } finally {
        setLoading(false)
      }
    }

    fetchBrands()
  }, [])

  const filteredBrands = brands.filter((brand) => {
    const normalizedSearch = search.toLowerCase().trim()

    return (
      brand.title.toLowerCase().includes(normalizedSearch) ||
      brand.slug.toLowerCase().includes(normalizedSearch) ||
      brand.description.toLowerCase().includes(normalizedSearch)
    )
  })

  return (
    <Box>
      <Box className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Marcas
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Gerencie as marcas da loja
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/painel/marcas/nova')}
          sx={{
            bgcolor: '#34483A',
            '&:hover': { bgcolor: '#202B24' },
            textTransform: 'none',
          }}
        >
          Nova marca
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          border: '1px solid #E2E3DD',
          borderRadius: 2,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Buscar por nome, slug ou descrição"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Paper>

      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

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
              <TableCell>Marca</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                  Carregando marcas...
                </TableCell>
              </TableRow>
            ) : filteredBrands.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                  {search
                    ? 'Nenhuma marca encontrada'
                    : 'Nenhuma marca cadastrada'}
                </TableCell>
              </TableRow>
            ) : (
              filteredBrands.map((brand) => (
                <TableRow key={brand.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {brand.title}
                    </Typography>
                  </TableCell>

                  <TableCell>{brand.slug}</TableCell>

                  <TableCell>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        maxWidth: 320,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {brand.description}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      size="small"
                      label={brand.active ? 'Ativa' : 'Inativa'}
                      color={brand.active ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      size="small"
                      aria-label="Editar marca"
                      onClick={() =>
                        navigate(`/painel/marcas/${brand.id}`)
                      }
                    >
                      <EditOutlined fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
