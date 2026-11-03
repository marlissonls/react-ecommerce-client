import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="w-full bg-[#202B24] font-['Inter',sans-serif] text-[#E8EBE6]">
      <div className="mx-auto grid w-[calc(100%-64px)] max-w-[1280px] grid-cols-[2fr_1fr_1fr] gap-16 py-14 pb-12 max-[640px]:w-[calc(100%-32px)] max-[640px]:grid-cols-2 max-[640px]:gap-x-6 max-[640px]:gap-y-9 max-[640px]:py-10">
        <div className="max-w-[340px] max-[640px]:col-span-2">
          <Link
            to="/"
            className="mb-4 inline-block text-[25px] font-bold tracking-[0.12em] text-[#FCFCFA] no-underline"
          >
            URBANA
          </Link>

          <p className="m-0 text-sm leading-[1.7] text-[#B6BDB6]">
            Equipamentos e acessórios para quem busca funcionalidade,
            qualidade e estilo.
          </p>
        </div>

        <div className="flex flex-col items-start gap-[14px]">
          <h3 className="mb-1.5 text-sm font-semibold text-[#FCFCFA]">
            Explore
          </h3>

          <Link
            to="/"
            className="text-sm text-[#B6BDB6] no-underline transition-colors duration-200 hover:text-[#A9B9A9]"
          >
            Início
          </Link>

          <Link
            to="/catalogo"
            className="text-sm text-[#B6BDB6] no-underline transition-colors duration-200 hover:text-[#A9B9A9]"
          >
            Catálogo
          </Link>

          <Link
            to="/catalogo?onSale=true"
            className="text-sm text-[#B6BDB6] no-underline transition-colors duration-200 hover:text-[#A9B9A9]"
          >
            Ofertas
          </Link>
        </div>

        <div className="flex flex-col items-start gap-[14px]">
          <h3 className="mb-1.5 text-sm font-semibold text-[#FCFCFA]">
            Minha conta
          </h3>

          <Link
            to="/auth"
            className="text-sm text-[#B6BDB6] no-underline transition-colors duration-200 hover:text-[#A9B9A9]"
          >
            Entrar
          </Link>

          <Link
            to="/favorites"
            className="text-sm text-[#B6BDB6] no-underline transition-colors duration-200 hover:text-[#A9B9A9]"
          >
            Favoritos
          </Link>

          <Link
            to="/cart"
            className="text-sm text-[#B6BDB6] no-underline transition-colors duration-200 hover:text-[#A9B9A9]"
          >
            Carrinho
          </Link>
        </div>
      </div>

      <div className="mx-auto flex min-h-16 w-[calc(100%-64px)] max-w-[1280px] items-center justify-between gap-4 border-t border-[#34483A] text-xs text-[#AEB6AE] max-[640px]:w-[calc(100%-32px)] max-[640px]:flex-col max-[640px]:items-start max-[640px]:py-5">
        <span>
          © {new Date().getFullYear()} Urbana. Todos os direitos reservados.
        </span>

        <span className="text-[11px] font-semibold tracking-[0.12em] text-[#A9B9A9]">
          TACTICAL PREMIUM
        </span>
      </div>
    </footer>
  )
}
