import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

import api from '@/api'
import { useAuth } from '@/hooks/useAuth'

import CustomerForm, {
  type CustomerFormData,
} from './components/CustomerForm'

type Customer = CustomerFormData & {
  id: string
}

export default function Customer() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const loadCustomer = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get<Customer>('/customers/me')

      setCustomer(response.data)
    } catch (err: any) {
      if (err.response?.status === 404) {
        setCustomer(null)
      } else {
        setError('Não foi possível carregar seus dados.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    loadCustomer()
  }, [user, navigate, loadCustomer])

  const handleSubmit = async (data: CustomerFormData) => {
    try {
      setSaving(true)
      setError(null)
      setSuccess(null)

      if (customer) {
        await api.put(`/customers/${customer.id}`, {
          id: customer.id,
          name: data.name,
          phone: data.phone,
          birthDate: data.birthDate,
        })

        setCustomer((current) =>
          current ? { ...current, ...data } : current,
        )

        setSuccess('Seus dados foram atualizados.')
      } else {
        const response = await api.post<Customer>('/customers', data)

        setCustomer(response.data)
        setSuccess('Cadastro realizado com sucesso.')
      }
    } catch {
      setError('Não foi possível salvar seus dados.')
    } finally {
      setSaving(false)
    }
  }

  if (!user) return null

  return (
    <Box className="min-w-0 flex-1 p-6">
      <Box className="mb-6 flex items-center gap-3">
        <Button
          color="inherit"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
        >
          Voltar
        </Button>

        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Meus dados
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Gerencie suas informações pessoais
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

      {loading ? (
        <Box className="flex justify-center py-12">
          <CircularProgress />
        </Box>
      ) : (
        <Card variant="outlined">
          <CardContent className="flex flex-col gap-4">
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Informações pessoais
            </Typography>

            <CustomerForm
              key={customer?.id ?? 'new'}
              initialData={customer ?? undefined}
              onSubmit={handleSubmit}
              loading={saving}
            />
          </CardContent>
        </Card>
      )}
    </Box>
  )
}