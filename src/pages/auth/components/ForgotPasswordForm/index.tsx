export default function ForgotPasswordForm({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    onSubmit?.({
      email: formData.get('email'),
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
          className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#202B24]"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-[#202B24] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
      >
        Recuperar senha
      </button>
    </form>
  )
}