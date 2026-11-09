import { useEffect, useState, type SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import {
  Search,
  UserRound,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react'

import api from '@/api'
import type { CategoryListPublicView } from '@/types'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'

type HeaderProps = {
  variant?: 'store' | 'panel'
}

export default function Header({ variant = 'store' }: HeaderProps) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { items } = useCart()

  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [categories, setCategories] = useState<CategoryListPublicView>([])
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)

  const handleLogout = () => {
    setAccountMenuOpen(false)
    closeMenu()
    logout()
  }

  const canAccessPanel = user?.roles.some((role) =>
    ['ROLE_MANAGER', 'ROLE_ADMIN'].includes(role)
  )

  useEffect(() => {
    let active = true

    async function loadCategories() {
      try {
        const response = await api.get<CategoryListPublicView>('/categories')

        if (active) {
          setCategories(response.data)
        }
      } catch (error) {
        console.error('Erro ao carregar categorias', error)
      }
    }

    loadCategories()

    return () => {
      active = false
    }
  }, [])

  function handleSearch(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
  
    const query = search.trim()

    if (!query) return

    navigate(`/catalogo?search=${encodeURIComponent(query)}`)
    setSearch('')
    closeMenu()
  }

  function closeMenu() {
    setMenuOpen(false)
    setCategoriesOpen(false)
  }

  return (
    <header
      className={`w-full border-b border-[#34483A] bg-[#202B24] font-['Inter',sans-serif] text-[#FCFCFA] ${
        variant === 'panel' ? 'fixed left-0 top-0 z-50' : 'relative'
      }`}
    >
      {/* Cabeçalho principal */}
      <div className="mx-auto flex min-h-[84px] w-[calc(100%-64px)] max-w-[1280px] items-center justify-between gap-8 max-[1024px]:gap-5 max-[640px]:min-h-[68px] max-[640px]:w-[calc(100%-32px)] max-[640px]:flex-wrap max-[640px]:gap-3 max-[640px]:py-3">

        {/* Menu mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          className="hidden shrink-0 p-2 text-[#FCFCFA] max-[640px]:grid max-[640px]:place-items-center"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="shrink-0 text-[25px] font-bold leading-normal tracking-[0.12em] text-[#FCFCFA] no-underline max-[640px]:mr-auto max-[640px]:text-[21px]"
        >
          URBANA
        </Link>

        {/* Busca */}
        <form
          onSubmit={handleSearch}
          className="flex h-[46px] w-full max-w-[480px] items-center overflow-hidden rounded-lg border border-[#465448] bg-[#2C382F] transition-[border-color,box-shadow] duration-200 focus-within:border-[#A9B9A9] focus-within:shadow-[0_0_0_3px_rgb(169_185_169_/_15%)] max-[640px]:order-last max-[640px]:max-w-none max-[640px]:basis-full"
        >
          <input
            type="search"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Buscar produtos"
            className="h-full w-full min-w-0 border-0 bg-transparent px-4 text-sm text-[#FCFCFA] outline-none placeholder:text-[#B6BDB6]"
          />

          <button
            type="submit"
            aria-label="Pesquisar"
            className="grid h-full w-12 shrink-0 place-items-center bg-[#34483A] text-[#FCFCFA] transition-colors hover:bg-[#465C4B]"
          >
            <Search size={20} />
          </button>
        </form>

        {/* Ações */}
        <div className="flex shrink-0 items-center gap-6 max-[1024px]:gap-4 max-[640px]:gap-[14px]">

          <div className="relative">
            {user.authenticated ? (
              <button
                type="button"
                onClick={() => setAccountMenuOpen((open) => !open)}
                aria-expanded={accountMenuOpen}
                aria-label="Menu da conta"
                className="flex min-h-11 items-center gap-2 text-[13px] font-medium text-[#E8EBE6] transition-colors hover:text-[#A9B9A9]"
              >
                <UserRound size={21} />
                <span className="max-[1024px]:hidden">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${accountMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>
            ) : (
              <Link
                to="/meus-dados"
                onClick={closeMenu}
                className="flex min-h-11 items-center gap-2 text-[13px] font-medium text-[#E8EBE6] no-underline transition-colors hover:text-[#A9B9A9]"
              >
                <UserRound size={21} />
                <span className="max-[1024px]:hidden">Minha conta</span>
              </Link>
            )}

            {user.authenticated && accountMenuOpen && (
              <div className="absolute right-0 top-full z-50 mt-3 w-52 overflow-hidden rounded-lg border border-[#E2E3DD] bg-white py-2 text-[#272B28] shadow-xl">
                <Link
                  to="/meus-dados"
                  onClick={() => setAccountMenuOpen(false)}
                  className="block px-4 py-3 text-sm no-underline transition-colors hover:bg-[#F3F1EA]"
                >
                  Meus dados
                </Link>

                <Link
                  to="/meus-pedidos"
                  onClick={() => setAccountMenuOpen(false)}
                  className="block px-4 py-3 text-sm no-underline transition-colors hover:bg-[#F3F1EA]"
                >
                  Minhas compras
                </Link>

                {canAccessPanel && (<Link
                    to="/painel"
                    onClick={() => setAccountMenuOpen(false)}
                    className="block px-4 py-3 text-sm no-underline transition-colors hover:bg-[#F3F1EA]"
                  >
                    Painel
                  </Link>
                )}

                <div className="my-1 border-t border-[#E2E3DD]" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-sm text-red-700 transition-colors hover:bg-[#F3F1EA]"
                >
                  Sair
                </button>
              </div>
            )}
          </div>

          <Link
            to="/favorites"
            onClick={closeMenu}
            className="flex min-h-11 items-center gap-2 text-[13px] font-medium text-[#E8EBE6] no-underline transition-colors hover:text-[#A9B9A9] max-[1024px]:[&>span]:hidden max-[640px]:min-h-10"
            aria-label="Favoritos"
          >
            <Heart size={21} />
            <span>Favoritos</span>
          </Link>

          <Link
            to="/cart"
            onClick={closeMenu}
            className="flex min-h-11 items-center gap-2 text-[13px] font-medium text-[#E8EBE6] no-underline transition-colors hover:text-[#A9B9A9] max-[1024px]:[&>span:not(.header-cart-icon)]:hidden max-[640px]:min-h-10"
            aria-label="Carrinho"
          >
            <span className="relative inline-flex">
              <ShoppingCart size={21} />

              {items.length > 0 && (
                <span className="absolute -right-[9px] -top-2 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-[#A9B9A9] px-1 text-[10px] font-bold text-[#202B24]">
                  {items.length}
                </span>
              )}
            </span>
            <span>Carrinho</span>
          </Link>
        </div>
      </div>

      {/* Navegação desktop */}
      <nav className="flex min-h-12 items-center justify-center gap-10 border-t border-[#34483A] max-[640px]:hidden">

        <Link
          to="/"
          className="py-[14px] text-sm font-medium text-[#A9B9A9] no-underline transition-colors hover:text-[#A9B9A9]"
        >
          Início
        </Link>

        {/* Dropdown de categorias */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setCategoriesOpen((open) => !open)}
            aria-expanded={categoriesOpen}
            className="flex items-center gap-1 py-[14px] text-sm font-medium text-[#D8DED7] transition-colors hover:text-[#A9B9A9]"
          >
            Categorias
            <ChevronDown
              size={16}
              className={`transition-transform ${categoriesOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {categoriesOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 max-h-80 min-w-56 overflow-y-auto rounded-lg border border-[#34483A] bg-[#202B24] py-2 shadow-xl">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/categoria/${category.slug}`}
                    onClick={closeMenu}
                    className="block px-4 py-2.5 text-sm text-[#D8DED7] no-underline transition-colors hover:bg-[#34483A] hover:text-[#FCFCFA]"
                  >
                    {category.title}
                  </Link>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-[#B6BDB6]">
                  Nenhuma categoria disponível
                </p>
              )}
            </div>
          )}
        </div>

        <Link
          to="/catalogo"
          className="py-[14px] text-sm font-medium text-[#D8DED7] no-underline transition-colors hover:text-[#A9B9A9]"
        >
          Catálogo
        </Link>

        <Link
          to="/catalogo?onSale=true"
          className="py-[14px] text-sm font-medium text-[#D8DED7] no-underline transition-colors hover:text-[#A9B9A9]"
        >
          Ofertas
        </Link>
      </nav>

      {/* Navegação mobile */}
      {menuOpen && (
        <nav className="hidden flex-col gap-0 border-t border-[#34483A] px-4 py-2 max-[640px]:flex">

          <Link
            to="/"
            onClick={closeMenu}
            className="border-b border-[#34483A] px-1 py-[14px] text-sm font-medium text-[#A9B9A9] no-underline"
          >
            Início
          </Link>

          <div className="border-b border-[#34483A]">
            <button
              type="button"
              onClick={() => setCategoriesOpen((open) => !open)}
              aria-expanded={categoriesOpen}
              className="flex w-full items-center justify-between px-1 py-[14px] text-sm font-medium text-[#D8DED7]"
            >
              Categorias
              <ChevronDown
                size={16}
                className={`transition-transform ${categoriesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {categoriesOpen && (
              <div className="border-l-2 border-[#A9B9A9] py-1 pl-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/categoria/${category.slug}`}
                    onClick={closeMenu}
                    className="block px-2 py-2.5 text-sm text-[#B6BDB6] no-underline transition-colors hover:text-[#FCFCFA]"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/catalogo"
            onClick={closeMenu}
            className="border-b border-[#34483A] px-1 py-[14px] text-sm font-medium text-[#D8DED7] no-underline"
          >
            Catálogo
          </Link>

          <Link
            to="/catalogo?onSale=true"
            onClick={closeMenu}
            className="px-1 py-[14px] text-sm font-medium text-[#D8DED7] no-underline"
          >
            Ofertas
          </Link>
        </nav>
      )}
    </header>
  )
}
