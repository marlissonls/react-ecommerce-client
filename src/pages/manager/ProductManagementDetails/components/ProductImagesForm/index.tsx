
import {
  Card,
  CardContent,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Typography,
} from '@mui/material'

import {
  AddPhotoAlternateOutlined,
  DeleteOutlined,
} from '@mui/icons-material'

import type { ProductImageView } from '@/types'

type Props = {
  images: ProductImageView[]
  previews: string[]
  mainIndex: number
  onFilesChange: (files: FileList | null) => void
  onRemoveExisting: (image: ProductImageView) => void
  onRemoveFile: (index: number) => void
  onMainChange: (index: number) => void
}

export default function ProductImagesForm({
  images,
  previews,
  mainIndex,
  onFilesChange,
  onRemoveExisting,
  onRemoveFile,
  onMainChange,
}: Props) {
  return (
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
                  onClick={() => onRemoveExisting(image)}
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
              onFilesChange(event.target.files)
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
                        onChange={() => onMainChange(index)}
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
                    onClick={() => onRemoveFile(index)}
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
  )
}
