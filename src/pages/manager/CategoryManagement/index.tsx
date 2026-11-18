
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

type CategoryManagerView = {
  id: string
  title: string
  slug: string
  description: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export default function CategoryManagement() {
  const navigate = useNavigate()

  const [categories, setCategories] = useState<CategoryManagerView[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await api.get<CategoryManagerView[]>(
          '/categories/manager',
        )

        setCategories(response.data)
      } catch (error) {
        console.error('Erro ao carregar categorias', error)
        setError('Não foi possível carregar as categorias.')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const filteredCategories = categories.filter((category) => {
    const normalizedSearch = search.toLowerCase().trim()

    return (
      category.title.toLowerCase().includes(normalizedSearch) ||
      category.slug.toLowerCase().includes(normalizedSearch) ||
      category.description.toLowerCase().includes(normalizedSearch)
    )
  })

  return (
    <Box>
      <Box className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Categorias
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Gerencie as categorias da loja
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/painel/categorias/nova')}
          sx={{
            bgcolor: '#34483A',
            '&:hover': { bgcolor: '#202B24' },
            textTransform: 'none',
          }}
        >
          Nova categoria
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
              <TableCell>Categoria</TableCell>
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
                  Carregando categorias...
                </TableCell>
              </TableRow>
            ) : filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                  {search
                    ? 'Nenhuma categoria encontrada'
                    : 'Nenhuma categoria cadastrada'}
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {category.title}
                    </Typography>
                  </TableCell>

                  <TableCell>{category.slug}</TableCell>

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
                      {category.description}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      size="small"
                      label={category.active ? 'Ativa' : 'Inativa'}
                      color={category.active ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      size="small"
                      aria-label="Editar categoria"
                      onClick={() =>
                        navigate(`/painel/categorias/${category.id}`)
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
