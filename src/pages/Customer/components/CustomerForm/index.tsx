import type { FormEvent } from 'react'

export type CustomerFormData = {
  name: string
  cpf: string
  birthDate: string
  phone: string
}

type CustomerFormProps = {
  initialData?: CustomerFormData
  onSubmit: (data: CustomerFormData) => void
  loading?: boolean
  error?: string | null
}

export default function CustomerForm({
  initialData,
  onSubmit,
  loading = false,
  error,
}: CustomerFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    onSubmit({
      name: String(formData.get('name')),
      cpf: String(formData.get('cpf')),
      birthDate: String(formData.get('birthDate')),
      phone: String(formData.get('phone')),
    })
  }

  const inputClassName =
    'w-full rounded-lg border border-[#E2E3DD] bg-white px-4 py-3 text-sm text-[#272B28] outline-none transition focus:border-[#34483A] disabled:bg-gray-100'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#272B28]">
          Nome completo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={3}
          maxLength={100}
          autoComplete="name"
          defaultValue={initialData?.name ?? ''}
          placeholder="Digite seu nome completo"
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="cpf" className="mb-2 block text-sm font-medium text-[#272B28]">
          CPF
        </label>
        <input
          id="cpf"
          name="cpf"
          type="text"
          required
          inputMode="numeric"
          pattern="[0-9]{11}"
          maxLength={11}
          defaultValue={initialData?.cpf ?? ''}
          disabled={Boolean(initialData)}
          placeholder="Somente números"
          title="Informe os 11 dígitos do CPF."
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="birthDate" className="mb-2 block text-sm font-medium text-[#272B28]">
          Data de nascimento
        </label>
        <input
          id="birthDate"
          name="birthDate"
          type="date"
          required
          max={new Date().toISOString().split('T')[0]}
          autoComplete="bday"
          defaultValue={initialData?.birthDate ?? ''}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#272B28]">
          Telefone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          inputMode="numeric"
          pattern="[0-9]{10,13}"
          maxLength={13}
          autoComplete="tel"
          defaultValue={initialData?.phone ?? ''}
          placeholder="Somente números, com DDD"
          title="Informe entre 10 e 13 dígitos."
          className={inputClassName}
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
        className="w-full rounded-lg bg-[#34483A] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#293B2F] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Salvando...' : 'Salvar dados'}
      </button>
    </form>
  )
}