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
  TablePagination,
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
import type { ProductManagerView } from '@/types'

export default function ProductManagement() {
  const navigate = useNavigate()

  const [products, setProducts] = useState<ProductManagerView[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const PAGE_SIZE = 10

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)

        const response = await api.get('/products/manager', {
          params: {
            search: search || undefined,
            page,
            size: PAGE_SIZE,
          },
        })

        setProducts(response.data.items)
        setTotal(response.data.total)
      } catch (error) {
        console.error('Erro ao carregar produtos', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [search, page])

  const formatCurrency = (value: number | null) => {
    if (value === null) return '—'

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <Box>
      <Box className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Produtos
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Gerencie os produtos da loja
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/painel/produtos/novo')}
          sx={{
            bgcolor: '#34483A',
            '&:hover': { bgcolor: '#202B24' },
            textTransform: 'none',
          }}
        >
          Novo produto
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
          placeholder="Buscar por nome, SKU ou código de barras"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value)
            setPage(0)
          }}
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
              <TableCell>Produto</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Estoque</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                  Carregando produtos...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                  Nenhum produto encontrado
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>
                    <Box className="flex items-center gap-3">
                      {product.image?.url ? (
                        <Box
                          component="img"
                          src={product.image.url}
                          alt={product.title}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                      ) : (
                        <Box className="flex h-12 w-12 items-center justify-center rounded-md bg-[#F3F1EA] text-xs text-[#747A74]">
                          Sem imagem
                        </Box>
                      )}

                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {product.title}
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                          {product.barcode || 'Sem código de barras'}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>{product.sku || '—'}</TableCell>

                  <TableCell>
                    <Box>
                      <Typography variant="body2">
                        {formatCurrency(product.salePrice ?? product.price)}
                      </Typography>

                      {product.salePrice !== null && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ textDecoration: 'line-through' }}
                        >
                          {formatCurrency(product.price)}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>

                  <TableCell>{product.stock ?? '—'}</TableCell>

                  <TableCell>
                    <Chip
                      size="small"
                      label={product.active ? 'Ativo' : 'Inativo'}
                      color={product.active ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      size="small"
                      aria-label="Editar produto"
                      onClick={() => navigate(`/painel/produtos/${product.id}`)}
                    >
                      <EditOutlined fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={PAGE_SIZE}
          rowsPerPageOptions={[PAGE_SIZE]}
          labelRowsPerPage="Itens por página"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} de ${count}`
          }
        />
      </TableContainer>
    </Box>
  )
}