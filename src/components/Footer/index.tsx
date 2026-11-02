
import { Link } from 'react-router'
import './styles.css'

export default function Footer() {
  return (
    <footer className="store-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            URBANA
          </Link>

          <p>
            Equipamentos e acessórios para quem busca funcionalidade,
            qualidade e estilo.
          </p>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <Link to="/">Início</Link>
          <Link to="/catalog">Catálogo</Link>
          <Link to="/catalog?filter=offers">Ofertas</Link>
        </div>

        <div className="footer-column">
          <h3>Minha conta</h3>
          <Link to="/auth">Entrar</Link>
          <Link to="/favorites">Favoritos</Link>
          <Link to="/cart">Carrinho</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Urbana. Todos os direitos reservados.
        </span>
        <span className="footer-signature">
          TACTICAL PREMIUM
        </span>
      </div>
    </footer>
  )
}
