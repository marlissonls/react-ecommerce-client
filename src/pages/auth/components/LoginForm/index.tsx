import { Link } from 'react-router'

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void
  loading?: boolean
  error?: string
}

export default function LoginForm({
  onSubmit,
  loading = false,
  error = '',
}: LoginFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    onSubmit({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-[#202B24]">
          E-mail
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="seu@email.com"
          required
          disabled={loading}
          className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#202B24] disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium text-[#202B24]">
            Senha
          </label>

          <Link
            to="/forgot-password"
            className="text-xs font-medium text-gray-500 hover:text-[#202B24]"
          >
            Esqueceu a senha?
          </Link>
        </div>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Sua senha"
          required
          disabled={loading}
          className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#202B24] disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-[#202B24] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}