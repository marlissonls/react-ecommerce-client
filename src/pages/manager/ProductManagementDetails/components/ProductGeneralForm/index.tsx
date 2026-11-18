import {
  Card,
  CardContent,
  Chip,
  TextField,
  Typography,
} from '@mui/material'

import type { ProductManagerView } from '@/types'

type Props = {
  title: string
  description: string
  product: ProductManagerView | null
  isEditing: boolean
  onChange: (field: 'title' | 'description', value: string) => void
}

export default function ProductGeneralForm({
  title,
  description,
  product,
  isEditing,
  onChange,
}: Props) {
  return (
    <Card variant="outlined">
      <CardContent className="flex flex-col gap-4">
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Informações gerais
        </Typography>

        <TextField
          label="Nome do produto"
          value={title}
          onChange={(event) => onChange('title', event.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Descrição"
          value={description}
          onChange={(event) => onChange('description', event.target.value)}
          required
          multiline
          minRows={4}
          fullWidth
        />

        {isEditing && (
          <div className="flex flex-wrap gap-2">
            <Chip label={`Slug: ${product?.slug}`} variant="outlined" />

            <Chip
              label={`Avaliação: ${product?.rating ?? '—'}`}
              variant="outlined"
            />

            <Chip
              label={`${product?.ratingCount ?? 0} avaliações`}
              variant="outlined"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}