interface RegisterFormProps {
  onSubmit: (data: {
    name: string
    cpf: string
    email: string
    password: string
  }) => void
  loading?: boolean
  error?: string
}

export default function RegisterForm({
  onSubmit,
  loading = false,
  error = '',
}: RegisterFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      const confirmPasswordInput = form.elements.namedItem(
        'confirmPassword',
      ) as HTMLInputElement

      confirmPasswordInput.setCustomValidity('As senhas não coincidem.')
      form.reportValidity()
      return
    }

    onSubmit({
      name: formData.get('name') as string,
      cpf: formData.get('cpf') as string,
      email: formData.get('email') as string,
      password,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-[#202B24]">
          Nome completo
        </label>

        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Seu nome"
          required
          minLength={3}
          disabled={loading}
          className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#202B24] disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="cpf" className="text-sm font-medium text-[#202B24]">
          CPF
        </label>

        <input
          id="cpf"
          name="cpf"
          type="cpf"
          autoComplete="cpf"
          placeholder="123.456.789-10"
          required
          disabled={loading}
          className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#202B24] disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

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
        <label htmlFor="password" className="text-sm font-medium text-[#202B24]">
          Senha
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Crie uma senha"
          required
          minLength={8}
          disabled={loading}
          className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#202B24] disabled:cursor-not-allowed disabled:opacity-60"
        />

        <p className="text-xs text-gray-400">
          Mínimo de 8 caracteres.
        </p>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-[#202B24]"
        >
          Confirmar senha
        </label>

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Repita sua senha"
          required
          minLength={8}
          disabled={loading}
          onChange={(event) => event.target.setCustomValidity('')}
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
        {loading ? 'Criando conta...' : 'Criar conta'}
      </button>
    </form>
  )
}