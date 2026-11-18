
import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

import api from '@/api'

import type {
  ProductManagerView,
  ProductImageView,
  CategoryPublicView,
  BrandPublicView,
} from '@/types'

import ProductGeneralForm from './components/ProductGeneralForm'
import ProductIdentificationForm from './components/ProductIdentificationForm'
import ProductCommercialForm from './components/ProductCommercialForm'
import ProductImagesForm from './components/ProductImagesForm'
import ProductFormActions from './components/ProductFormActions'

// Types

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
  initialStock: string
  minimumStock: string
}

type ProductCreateRequest = {
  title: string
  description: string
  price: number
  salePrice: number | null
  costPrice: number | null
  barcode: string | null
  sku: string | null
  categoryId: string
  brandId: string
  initialStock: number
  minimumStock: number
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

// Constants

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
  initialStock: '',
  minimumStock: '',
}

// Page

export default function ProductManagementDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const isEditing = Boolean(id)

  // Form state

  const [form, setForm] = useState<ProductForm>(INITIAL_FORM)

  const [product, setProduct] = useState<ProductManagerView | null>(null)
  const [categories, setCategories] = useState<CategoryPublicView[]>([])
  const [brands, setBrands] = useState<BrandPublicView[]>([])

  // Images state

  const [images, setImages] = useState<ProductImageView[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [mainIndex, setMainIndex] = useState(0)

  // Submission state

  const [createdProductId, setCreatedProductId] = useState<string | null>(null)
  const [pendingImages, setPendingImages] = useState<UploadedImage[] | null>(null)

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Effects

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
          api.get<CategoryPublicView[]>('/categories/manager'),
          api.get<BrandPublicView[]>('/brands/manager'),
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
            initialStock: '',
            minimumStock: '',
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

  // Form handlers

  function updateForm<K extends keyof ProductForm>(
    field: K,
    value: ProductForm[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  // Image handlers

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

  // Submission

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const productData = {
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

      const createPayload: ProductCreateRequest = {
        ...productData,
        initialStock:
          form.initialStock === '' ? 0 : Number(form.initialStock),
        minimumStock:
          form.minimumStock === '' ? 5 : Number(form.minimumStock),
      }

      let productId = id ?? createdProductId
      let productSlug = product?.slug ?? ''

      // 1. Create or update product

      if (!productId) {
        const response = await api.post<ProductManagerView>(
          '/products/manager',
          createPayload
        )

        productId = response.data.id
        productSlug = response.data.slug

        setCreatedProductId(productId)
        setProduct(response.data)
      } else {
        await api.put(
          `/products/manager/${productId}`,
          productData
        )
      }

      // 2. Upload and register images

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

        await api.post(
          `/products/manager/${productId}/images`,
          uploadedImages
        )

        setPendingImages(null)
        setFiles([])
        setMainIndex(0)
      }

      setSuccess('Produto salvo com sucesso.')

      if (!isEditing) {
        navigate(`/painel/produtos/${productId}`, {
          replace: true,
        })
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

  // Loading

  if (loading) {
    return (
      <Box className="flex justify-center py-16">
        <CircularProgress />
      </Box>
    )
  }

  // Render

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

          <ProductGeneralForm
            title={form.title}
            description={form.description}
            product={product}
            isEditing={isEditing}
            onChange={updateForm}
          />

          <ProductIdentificationForm
            sku={form.sku}
            barcode={form.barcode}
            categoryId={form.categoryId}
            brandId={form.brandId}
            categories={categories}
            brands={brands}
            onChange={updateForm}
          />

          <ProductCommercialForm
            price={form.price}
            salePrice={form.salePrice}
            costPrice={form.costPrice}
            onChange={updateForm}
          />

          {/* Stock */}

          <Card variant="outlined">
            <CardContent className="flex flex-col gap-4">
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Estoque
              </Typography>

              {isEditing ? (
                <Alert severity="info">
                  Estoque atual: {product?.stock ?? 0} unidades ·
                  Reservado: {product?.reservedStock ?? 0} ·
                  Mínimo: {product?.minimumStock ?? 0}. Alterações são
                  feitas na página de estoque.
                </Alert>
              ) : (
                <Box className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextField
                    label="Quantidade inicial"
                    type="number"
                    value={form.initialStock}
                    onChange={(event) =>
                      updateForm('initialStock', event.target.value)
                    }
                    slotProps={{
                      htmlInput: { min: 0, step: 1 },
                    }}
                    fullWidth
                  />

                  <TextField
                    label="Estoque mínimo"
                    type="number"
                    value={form.minimumStock}
                    onChange={(event) =>
                      updateForm('minimumStock', event.target.value)
                    }
                    slotProps={{
                      htmlInput: { min: 0, step: 1 },
                    }}
                    fullWidth
                  />
                </Box>
              )}
            </CardContent>
          </Card>

          <ProductImagesForm
            images={images}
            previews={previews}
            mainIndex={mainIndex}
            onFilesChange={handleFilesChange}
            onRemoveExisting={removeExistingImage}
            onRemoveFile={removeFile}
            onMainChange={setMainIndex}
          />

          {isEditing && product && (
            <Typography variant="caption" color="text.secondary">
              Criado em: {new Date(product.createdAt).toLocaleString('pt-BR')}
              {' · '}
              Atualizado em: {new Date(product.updatedAt).toLocaleString('pt-BR')}
            </Typography>
          )}

          <ProductFormActions
            saving={saving}
            onCancel={() => navigate('/painel/produtos')}
          />

        </Box>
      </form>
    </Box>
  )
}
