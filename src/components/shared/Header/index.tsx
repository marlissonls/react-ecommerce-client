
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import {
  Search,
  UserRound,
  Heart,
  ShoppingCart,
  Menu,
  X,
} from 'lucide-react'
import './styles.css'

type HeaderProps = {
  cartCount?: number
}

export default function Header({ cartCount = 0 }: HeaderProps) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const query = search.trim()

    if (!query) return

    navigate(`/search?q=${encodeURIComponent(query)}`)
    setSearch('')
    setMenuOpen(false)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="store-header">
      <div className="header-main">
        <button
          className="header-menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="header-logo" onClick={closeMenu}>
          URBANA
        </Link>

        <form className="header-search" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Buscar produtos"
          />

          <button type="submit" aria-label="Pesquisar">
            <Search size={20} />
          </button>
        </form>

        <div className="header-actions">
          <Link to="/auth" className="header-action">
            <UserRound size={21} />
            <span>Minha conta</span>
          </Link>

          <Link to="/favorites" className="header-action">
            <Heart size={21} />
            <span>Favoritos</span>
          </Link>

          <Link to="/cart" className="header-action">
            <span className="header-cart-icon">
              <ShoppingCart size={21} />
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </span>
            <span>Carrinho</span>
          </Link>
        </div>
      </div>

      <nav className={`header-nav ${menuOpen ? 'is-open' : ''}`}>
        <Link to="/" onClick={closeMenu}>Início</Link>
        <Link to="/catalog" onClick={closeMenu}>Catálogo</Link>
        <Link to="/catalog?filter=offers" onClick={closeMenu}>Ofertas</Link>
      </nav>
    </header>
  )
}
