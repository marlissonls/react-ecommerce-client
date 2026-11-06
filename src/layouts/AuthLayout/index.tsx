import { Outlet } from 'react-router'
import AuthBrand from '@/pages/auth/components/AuthBrand'

export default function AuthLayout() {
  return (
    <main className="grid min-h-screen bg-[#FCFCFA] md:grid-cols-2">
      {/* Apresentação da marca */}
      <section className="relative hidden flex-col justify-between bg-[#202B24] p-12 md:flex lg:p-16">
        <AuthBrand />

        <div className="max-w-md space-y-5">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
            Urbana
          </span>

          <h2 className="text-4xl font-semibold leading-tight text-white lg:text-5xl">
            Equipamentos para acompanhar seu ritmo.
          </h2>

          <p className="max-w-sm text-sm leading-relaxed text-gray-400">
            Explore produtos pensados para fazer parte da sua rotina,
            com funcionalidade, qualidade e estilo.
          </p>
        </div>

        <span className="text-xs text-gray-500">
          © {new Date().getFullYear()} Urbana. Todos os direitos reservados.
        </span>
      </section>

      {/* Conteúdo das páginas */}
      <section className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between p-6 md:hidden">
          <AuthBrand />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>

        <footer className="px-6 pb-6 text-center text-xs text-gray-400 md:hidden">
          © {new Date().getFullYear()} Urbana.
        </footer>
      </section>
    </main>
  )
}