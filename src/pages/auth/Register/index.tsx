import { useState } from 'react'
import { useNavigate } from 'react-router'
import api from '@/api'

import AuthFormHeader from '@/pages/auth/components/AuthFormHeader'
import AuthFooter from '@/pages/auth/components/AuthFooter'
import RegisterForm from '@/pages/auth/components/RegisterForm'

interface RegisterData {
  name: string
  email: string
  password: string
}

export default function Register() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (data: RegisterData) => {
    try {
      setLoading(true)
      setError('')

      await api.post('/users', data)

      navigate('/login')
    } catch {
      setError('Não foi possível criar sua conta. Verifique os dados e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AuthFormHeader
        title="Crie sua conta"
        description="Faça parte da Urbana e tenha uma experiência de compra ainda melhor."
      />

      <RegisterForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />

      <AuthFooter
        text="Já possui uma conta?"
        linkText="Entrar"
        to="/login"
      />
    </>
  )
}