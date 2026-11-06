import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import {
  AddPhotoAlternateOutlined,
  ArrowBack,
  DeleteOutlined,
  SaveOutlined,
} from '@mui/icons-material'

import api from '@/api'
import type {
  ProductManagerView,
  ProductImageView,
  CategoryPublicView,
  BrandPublicView,
} from '@/types'

type ProductForm = {
  title: string
  description: string
  price: string
  salePrice: string
  costPrice: string
  barcode: string
  sku: string
  categoryId: string
  brandId: string
}

type StockForm = {
  availableQuantity: string
  minimumQuantity: string
}

type CloudinaryUploadResponse = {
  public_id: string
  secure_url: string
}

type UploadedImage = {
  publicId: string
  url: string
  main: boolean
  position: number
}

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

const INITIAL_FORM: ProductForm = {
  title: '',
  description: '',
  price: '',
  salePrice: '',
  costPrice: '',
  barcode: '',
  sku: '',
  categoryId: '',
  brandId: '',
}

const INITIAL_STOCK: StockForm = {
  availableQuantity: '1',
  minimumQuantity: '1',
}

export default function ProductManagementDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [form, setForm] = useState<ProductForm>(INITIAL_FORM)
  const [stock, setStock] = useState<StockForm>(INITIAL_STOCK)

  const [product, setProduct] = useState<ProductManagerView | null>(null)
  const [categories, setCategories] = useState<CategoryPublicView[]>([])
  const [brands, setBrands] = useState<BrandPublicView[]>([])

  const [images, setImages] = useState<ProductImageView[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [mainIndex, setMainIndex] = useState(0)

  const [createdProductId, setCreatedProductId] = useState<string | null>(null)
  const [stockCreated, setStockCreated] = useState(false)
  const [pendingImages, setPendingImages] = useState<UploadedImage[] | null>(null)

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file))
    setPreviews(urls)

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [files])

  useEffect(() => {
    async function loadFormData() {
      try {
        const [categoriesResponse, brandsResponse] = await Promise.all([
          api.get<CategoryPublicView[]>('/categories'),
          api.get<BrandPublicView[]>('/brands'),
        ])

        setCategories(categoriesResponse.data)
        setBrands(brandsResponse.data)

        if (id) {
          const response = await api.get<ProductManagerView>(
            `/products/manager/${id}`
          )

          const data = response.data

          setProduct(data)
          setImages(data.images ?? (data.image ? [data.image] : []))

          setForm({
            title: data.title,
            description: data.description,
            price: String(data.price),
            salePrice: data.salePrice == null ? '' : String(data.salePrice),
            costPrice: data.costPrice == null ? '' : String(data.costPrice),
            barcode: data.barcode ?? '',
            sku: data.sku ?? '',
            categoryId: data.categoryId,
            brandId: data.brandId,
          })
        }
      } catch (error) {
        console.error('Erro ao carregar formulário', error)
        setError('Não foi possível carregar os dados.')
      } finally {
        setLoading(false)
      }
    }

    loadFormData()
  }, [id])

  function updateForm<K extends keyof ProductForm>(
    field: K,
    value: ProductForm[K]
  ) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function updateStock<K extends keyof StockForm>(
    field: K,
    value: StockForm[K]
  ) {
    setStock((current) => ({ ...current, [field]: value }))
  }

  function handleFilesChange(fileList: FileList | null) {
    if (!fileList) return

    const selectedFiles = Array.from(fileList)
    const validFiles = selectedFiles.filter((file) =>
      ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
    )

    setFiles((current) => [...current, ...validFiles])
    setError('')

    if (validFiles.length !== selectedFiles.length) {
      setError('Alguns arquivos foram ignorados. Use JPG, PNG ou WEBP.')
    }
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, i) => i !== index))

    if (mainIndex === index) {
      setMainIndex(0)
    } else if (mainIndex > index) {
      setMainIndex((current) => current - 1)
    }
  }

  async function removeExistingImage(image: ProductImageView) {
    if (!id) return

    try {
      await api.delete(
        `/products/manager/${id}/images/${encodeURIComponent(image.publicId)}`
      )

      setImages((current) =>
        current.filter((item) => item.publicId !== image.publicId)
      )
    } catch (error) {
      console.error('Erro ao remover imagem', error)
      setError('Não foi possível remover a imagem.')
    }
  }

  async function uploadToCloudinary(
    productId: string,
    productSlug: string,
    filesToUpload: File[]
  ): Promise<UploadedImage[]> {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error('Configure as variáveis de ambiente do Cloudinary.')
    }

    const uploaded = await Promise.all(
      filesToUpload.map(async (file) => {
        const formData = new FormData()

        formData.append('file', file)
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        formData.append('folder', `products/${productSlug || productId}`)

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        )

        if (!response.ok) {
          throw new Error('Falha no upload para o Cloudinary.')
        }

        return response.json() as Promise<CloudinaryUploadResponse>
      })
    )

    return uploaded.map((image, index) => ({
      publicId: image.public_id,
      url: image.secure_url,
      position: images.length + index,
      main: images.length === 0 && index === mainIndex,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        salePrice: form.salePrice === '' ? null : Number(form.salePrice),
        costPrice: form.costPrice === '' ? null : Number(form.costPrice),
        barcode: form.barcode.trim() || null,
        sku: form.sku.trim() || null,
        categoryId: form.categoryId,
        brandId: form.brandId,
      }

      let productId = id ?? createdProductId
      let productSlug = product?.slug ?? ''

      // 1. Criação ou atualização do produto
      if (!productId) {
        const response = await api.post<ProductManagerView>(
          '/products/manager',
          payload
        )

        productId = response.data.id
        productSlug = response.data.slug

        setCreatedProductId(productId)
        setProduct(response.data)
      } else {
        await api.put(`/products/manager/${productId}`, payload)
      }

      // 2. Cadastro do estoque inicial
      if (!isEditing && !stockCreated) {
        await api.post('/stocks', {
          productId,
          availableQuantity: Number(stock.availableQuantity),
          minimumQuantity: Number(stock.minimumQuantity),
        })

        setStockCreated(true)
      }

      // 3. Upload e cadastro das imagens
      if (files.length > 0 || pendingImages) {
        let uploadedImages = pendingImages

        if (!uploadedImages) {
          uploadedImages = await uploadToCloudinary(
            productId,
            productSlug,
            files
          )

          setPendingImages(uploadedImages)
        }

        await api.post(`/products/manager/${productId}/images`, uploadedImages)

        setPendingImages(null)
        setFiles([])
        setMainIndex(0)
      }

      setSuccess('Produto salvo com sucesso.')

      if (!isEditing) {
        navigate(`/painel/produtos/${productId}`, { replace: true })
      }
    } catch (error) {
      console.error('Erro ao salvar produto', error)
      setError(
        error instanceof Error
          ? error.message
          : 'Não foi possível concluir a operação. Verifique as etapas pendentes e tente novamente.'
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Box className="flex justify-center py-16">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Box className="mb-6 flex items-center gap-3">
        <Button
          color="inherit"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/painel/produtos')}
        >
          Voltar
        </Button>

        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {isEditing ? 'Editar produto' : 'Novo produto'}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {isEditing
              ? product?.title
              : 'Preencha as informações para cadastrar um produto'}
          </Typography>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box className="flex flex-col gap-5">
          <Card variant="outlined">
            <CardContent className="flex flex-col gap-4">
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Informações gerais
              </Typography>

              <TextField
                label="Nome do produto"
                value={form.title}
                onChange={(event) => updateForm('title', event.target.value)}
                required
                fullWidth
              />

              <TextField
                label="Descrição"
                value={form.description}
                onChange={(event) =>
                  updateForm('description', event.target.value)
                }
                required
                multiline
                minRows={4}
                fullWidth
              />

              {isEditing && (
                <Box className="flex flex-wrap gap-2">
                  <Chip label={`Slug: ${product?.slug}`} variant="outlined" />
                  <Chip
                    label={`Avaliação: ${product?.rating ?? '—'}`}
                    variant="outlined"
                  />
                  <Chip
                    label={`${product?.ratingCount ?? 0} avaliações`}
                    variant="outlined"
                  />
                </Box>
              )}
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent className="flex flex-col gap-4">
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Identificação e classificação
              </Typography>

              <Box className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextField
                  label="SKU"
                  value={form.sku}
                  onChange={(event) => updateForm('sku', event.target.value)}
                  slotProps={{ htmlInput: { maxLength: 100 } }}
                  fullWidth
                />

                <TextField
                  label="Código de barras"
                  value={form.barcode}
                  onChange={(event) =>
                    updateForm('barcode', event.target.value)
                  }
                  slotProps={{ htmlInput: { maxLength: 50 } }}
                  fullWidth
                />

                <TextField
                  select
                  label="Categoria"
                  value={form.categoryId}
                  onChange={(event) =>
                    updateForm('categoryId', event.target.value)
                  }
                  required
                  fullWidth
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.title}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Marca"
                  value={form.brandId}
                  onChange={(event) =>
                    updateForm('brandId', event.target.value)
                  }
                  required
                  fullWidth
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent className="flex flex-col gap-4">
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Informações comerciais
              </Typography>

              <Box className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <TextField
                  label="Preço de venda"
                  type="number"
                  value={form.price}
                  onChange={(event) => updateForm('price', event.target.value)}
                  slotProps={{
                    htmlInput: { min: 0.01, step: 0.01 },
                  }}
                  required
                  fullWidth
                />

                <TextField
                  label="Preço promocional"
                  type="number"
                  value={form.salePrice}
                  onChange={(event) =>
                    updateForm('salePrice', event.target.value)
                  }
                  slotProps={{
                    htmlInput: { min: 0, step: 0.01 },
                  }}
                  fullWidth
                />

                <TextField
                  label="Preço de custo"
                  type="number"
                  value={form.costPrice}
                  onChange={(event) =>
                    updateForm('costPrice', event.target.value)
                  }
                  slotProps={{
                    htmlInput: { min: 0, step: 0.01 },
                  }}
                  fullWidth
                />
              </Box>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent className="flex flex-col gap-4">
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Estoque
              </Typography>

              {isEditing ? (
                <Alert severity="info">
                  Estoque atual: {product?.stock ?? 0} unidades · Reservado:{' '}
                  {product?.reservedStock ?? 0} · Mínimo:{' '}
                  {product?.minimumStock ?? 0}. Alterações são feitas na página
                  de estoque.
                </Alert>
              ) : (
                <Box className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextField
                    label="Quantidade inicial"
                    type="number"
                    value={stock.availableQuantity}
                    onChange={(event) =>
                      updateStock('availableQuantity', event.target.value)
                    }
                    slotProps={{
                      htmlInput: { min: 1, step: 1 },
                    }}
                    required
                    fullWidth
                  />

                  <TextField
                    label="Estoque mínimo"
                    type="number"
                    value={stock.minimumQuantity}
                    onChange={(event) =>
                      updateStock('minimumQuantity', event.target.value)
                    }
                    slotProps={{
                      htmlInput: { min: 1, step: 1 },
                    }}
                    required
                    fullWidth
                  />
                </Box>
              )}
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent className="flex flex-col gap-4">
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Imagens do produto
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Adicione imagens JPG, PNG ou WEBP e escolha a imagem principal.
                </Typography>
              </Box>

              {images.length > 0 && (
                <Box className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {images.map((image) => (
                    <Box
                      key={image.publicId}
                      className="relative overflow-hidden rounded-lg border border-[#E2E3DD]"
                    >
                      <Box
                        component="img"
                        src={image.url}
                        alt="Imagem do produto"
                        className="h-36 w-full object-cover"
                      />

                      {image.main && (
                        <Chip
                          label="Principal"
                          size="small"
                          color="success"
                          className="absolute left-2 top-2"
                        />
                      )}

                      <Button
                        color="error"
                        size="small"
                        fullWidth
                        startIcon={<DeleteOutlined />}
                        onClick={() => removeExistingImage(image)}
                      >
                        Remover
                      </Button>
                    </Box>
                  ))}
                </Box>
              )}

              <Button
                component="label"
                variant="outlined"
                startIcon={<AddPhotoAlternateOutlined />}
                sx={{ alignSelf: 'flex-start' }}
              >
                Adicionar imagens
                <input
                  hidden
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={(event) => {
                    handleFilesChange(event.target.files)
                    event.target.value = ''
                  }}
                />
              </Button>

              {previews.length > 0 && (
                <Box className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {previews.map((preview, index) => (
                    <Box
                      key={`${preview}-${index}`}
                      className="relative overflow-hidden rounded-lg border border-[#E2E3DD]"
                    >
                      <Box
                        component="img"
                        src={preview}
                        alt={`Nova imagem ${index + 1}`}
                        className="h-36 w-full object-cover"
                      />

                      <Box className="flex items-center justify-between px-2">
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              checked={mainIndex === index}
                              onChange={() => setMainIndex(index)}
                            />
                          }
                          label={
                            <Typography variant="caption">
                              Principal
                            </Typography>
                          }
                        />

                        <Button
                          color="error"
                          size="small"
                          onClick={() => removeFile(index)}
                        >
                          <DeleteOutlined fontSize="small" />
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>

          {isEditing && product && (
            <Typography variant="caption" color="text.secondary">
              Criado em: {new Date(product.createdAt).toLocaleString('pt-BR')}
              {' · '}
              Atualizado em:{' '}
              {new Date(product.updatedAt).toLocaleString('pt-BR')}
            </Typography>
          )}

          <Box className="flex justify-end gap-3 pb-6">
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate('/painel/produtos')}
              disabled={saving}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              variant="contained"
              startIcon={
                saving ? <CircularProgress size={18} color="inherit" /> : <SaveOutlined />
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
        </Box>
      </form>
    </Box>
  )
}