// src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiShoppingBasket, FiSearch } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { count } = useCart()
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path

  return (
    <nav className={styles.nav}>
      {/* Logo */}
      <Link to="/" className={styles.logo}>
        <div className={styles.logoCircle}>
          <span className={styles.logoText}>BIO<em>SÉN</em></span>
        </div>
        <span className={styles.brand}>BIO <em>SÉN</em></span>
      </Link>

      {/* Tabs */}
      <div className={styles.tabs}>
        <Link to="/"        className={`${styles.tab} ${isActive('/')        ? styles.active : ''}`}>Accueil</Link>
        <Link to="/boutique" className={`${styles.tab} ${isActive('/boutique') ? styles.active : ''}`}>Boutique</Link>
        <Link to="/suivi"   className={`${styles.tab} ${isActive('/suivi')   ? styles.active : ''}`}>Suivi commande</Link>
        <Link to="/admin"   className={`${styles.tab} ${isActive('/admin') || location.pathname.startsWith('/admin') ? styles.active : ''}`}>Admin</Link>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.trackPill} onClick={() => navigate('/suivi')}>
          <FiSearch size={12} /> Suivre ma commande
        </button>
        <button className={styles.cartPill} onClick={() => navigate('/boutique')}>
          <FiShoppingBasket size={14} />
          {count > 0 && <span className={styles.cartCount}>{count}</span>}
        </button>
      </div>
    </nav>
  )
}
