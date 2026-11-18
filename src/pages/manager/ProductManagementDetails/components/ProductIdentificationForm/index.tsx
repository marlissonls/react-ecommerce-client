import {
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'

import type {
  CategoryPublicView,
  BrandPublicView,
} from '@/types'

type Props = {
  sku: string
  barcode: string
  categoryId: string
  brandId: string
  categories: CategoryPublicView[]
  brands: BrandPublicView[]
  onChange: (
    field: 'sku' | 'barcode' | 'categoryId' | 'brandId',
    value: string
  ) => void
}

export default function ProductIdentificationForm({
  sku,
  barcode,
  categoryId,
  brandId,
  categories,
  brands,
  onChange,
}: Props) {
  return (
    <Card variant="outlined">
      <CardContent className="flex flex-col gap-4">
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Identificação e classificação
        </Typography>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label="SKU"
            value={sku}
            onChange={(event) => onChange('sku', event.target.value)}
            slotProps={{ htmlInput: { maxLength: 100 } }}
            fullWidth
          />

          <TextField
            label="Código de barras"
            value={barcode}
            onChange={(event) => onChange('barcode', event.target.value)}
            slotProps={{ htmlInput: { maxLength: 50 } }}
            fullWidth
          />

          <TextField
            select
            label="Categoria"
            value={categoryId}
            onChange={(event) => onChange('categoryId', event.target.value)}
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
            value={brandId}
            onChange={(event) => onChange('brandId', event.target.value)}
            required
            fullWidth
          >
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.title}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </CardContent>
    </Card>
  )
}