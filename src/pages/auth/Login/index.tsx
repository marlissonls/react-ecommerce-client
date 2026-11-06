import { useState } from 'react'
import { useNavigate } from 'react-router'

import api from '@/api'
import { useAuth } from '@/hooks/useAuth'

import AuthFormHeader from '@/pages/auth/components/AuthFormHeader'
import AuthFooter from '@/pages/auth/components/AuthFooter'
import LoginForm from '@/pages/auth/components/LoginForm'

export default function Login() {
  const navigate = useNavigate()

  const auth = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: {
    email: string
    password: string
  }) => {
    try {
      setLoading(true)
      setError('')

      const result = await api.post('/auth/signin', data)

      auth.saveSession(result.data)

      navigate("/")
    } catch (error) {
      setError('E-mail ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AuthFormHeader
        title="Bem-vindo de volta"
        description="Entre na sua conta para continuar explorando a Urbana."
      />

      <LoginForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />

      <AuthFooter
        text="Ainda não tem uma conta?"
        linkText="Cadastre-se"
        to="/register"
      />
    </>
  )
}