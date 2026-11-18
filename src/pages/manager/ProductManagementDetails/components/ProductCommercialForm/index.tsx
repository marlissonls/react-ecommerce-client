import {
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material'

type Props = {
  price: string
  salePrice: string
  costPrice: string
  onChange: (
    field: 'price' | 'salePrice' | 'costPrice',
    value: string
  ) => void
}

export default function ProductCommercialForm({
  price,
  salePrice,
  costPrice,
  onChange,
}: Props) {
  return (
    <Card variant="outlined">
      <CardContent className="flex flex-col gap-4">
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Informações comerciais
        </Typography>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <TextField
            label="Preço de venda"
            type="number"
            value={price}
            onChange={(event) => onChange('price', event.target.value)}
            slotProps={{
              htmlInput: { min: 0.01, step: 0.01 },
            }}
            required
            fullWidth
          />

          <TextField
            label="Preço promocional"
            type="number"
            value={salePrice}
            onChange={(event) => onChange('salePrice', event.target.value)}
            slotProps={{
              htmlInput: { min: 0, step: 0.01 },
            }}
            fullWidth
          />

          <TextField
            label="Preço de custo"
            type="number"
            value={costPrice}
            onChange={(event) => onChange('costPrice', event.target.value)}
            slotProps={{
              htmlInput: { min: 0, step: 0.01 },
            }}
            fullWidth
          />
        </div>
      </CardContent>
    </Card>
  )
}