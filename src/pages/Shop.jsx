// src/pages/Shop.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiCheck, FiLock, FiShield, FiInfo } from 'react-icons/fi'
import { FaLeaf, FaStar, FaWhatsapp } from 'react-icons/fa'
import { GiMortar } from 'react-icons/gi'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartContext'
import { PRODUCTS, PRICES, PROMO_CODES, WHATSAPP_NUMBER } from '../utils/products'
import Checkout from '../components/Checkout'
import styles from './Shop.module.css'

const TAG_ICONS = [<FaLeaf size={8}/>, <FaStar size={8}/>, <GiMortar size={8}/>]

export default function Shop() {
  const { items, subtotal, shipping, discount, total, count, addItem, updateQty, removeItem, clear, applyPromo, promo } = useCart()
  const [selSize, setSelSize] = useState({ 1: '500g', 2: '500g', 3: '500g' })
  const [qty, setQty]         = useState({ 1: 1, 2: 1, 3: 1 })
  const [added, setAdded]     = useState({})
  const [promoInput, setPromoInput] = useState('')
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const navigate = useNavigate()

  const handleAdd = (product) => {
    const size = selSize[product.id]
    const price = PRICES[size]
    const stockKey = `${PRODUCTS.find(p=>p.id===product.id).name.split(' ')[0]}-${size}`
    addItem(product, size, price, qty[product.id], product.color, stockKey)
    setQty(q => ({ ...q, [product.id]: 1 }))
    setAdded(a => ({ ...a, [product.id]: true }))
    setTimeout(() => setAdded(a => ({ ...a, [product.id]: false })), 1400)
    toast.success(`${product.name} (${size}) ajouté au panier !`)
  }

  const handlePromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (PROMO_CODES[code]) {
      applyPromo({ code, pct: PROMO_CODES[code].pct, label: PROMO_CODES[code].label })
      toast.success(`🎉 Code ${code} appliqué — ${PROMO_CODES[code].label}`)
    } else {
      toast.error('Code promo invalide')
    }
  }

  const getColorClass = (id) => {
    if (id === 1) return styles.green
    if (id === 2) return styles.gold
    return styles.earth
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.eyebrow}>Boutique en ligne</div>
        <h1 className={styles.title}>Commander</h1>
        <p className={styles.subtitle}>Livraison disponible · Paiement sécurisé · Stock limité</p>
      </div>

      <div className={styles.layout}>
        {/* Products */}
        <div className={styles.products}>
          {PRODUCTS.map((product, idx) => (
            <div key={product.id} className={styles.card}>
              {/* Image */}
              <div className={`${styles.cardImg} ${styles[`bg${idx}`]}`}>
                <div className={styles.imgPlaceholder}>
                  {TAG_ICONS[idx]}
                  <span className={styles.imgLabel}>{product.name}</span>
                </div>
                <span className={`${styles.badge} ${styles[`badge${idx}`]}`}>{product.badge}</span>
                <button className={styles.detailLink} onClick={() => navigate(`/boutique/${product.slug}`)}>
                  <FiInfo size={9}/> Fiche détaillée
                </button>
              </div>

              {/* Body */}
              <div className={styles.cardBody}>
                <div>
                  <div className={`${styles.tag} ${styles[`tag${idx}`]}`}>
                    {TAG_ICONS[idx]} {product.tag}
                  </div>
                  <h2 className={styles.prodName}>{product.name}</h2>
                  <p className={styles.prodDesc}>{product.shortDesc}</p>

                  {/* Format selector */}
                  <div className={styles.fmtLabel}>Choisissez votre format :</div>
                  <div className={styles.fmtBtns}>
                    {Object.entries(PRICES).map(([size, price]) => (
                      <label
                        key={size}
                        className={`${styles.fmtBtn} ${selSize[product.id] === size ? styles.fmtBtnActive : ''} ${selSize[product.id] === size ? styles[`fmtActive${idx}`] : ''}`}
                        onClick={() => setSelSize(s => ({ ...s, [product.id]: size }))}
                      >
                        <div className={styles.radio}>
                          <div className={`${styles.radioDot} ${selSize[product.id] === size ? styles[`dot${idx}`] : ''}`}/>
                        </div>
                        <span className={styles.fmtSize}>{size}</span>
                        <span className={`${styles.fmtPrice} ${getColorClass(product.id)}`}>
                          {price.toLocaleString('fr-FR')} F
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className={styles.stockRow}>
                    <span className={styles.inStock}>● En stock</span>
                  </div>
                </div>

                {/* Add to cart */}
                <div className={styles.addRow}>
                  <div className={styles.qtyCtrl}>
                    <button className={styles.qtyBtn} onClick={() => setQty(q => ({ ...q, [product.id]: Math.max(1, q[product.id]-1) }))}>−</button>
                    <span className={styles.qtyVal}>{qty[product.id]}</span>
                    <button className={styles.qtyBtn} onClick={() => setQty(q => ({ ...q, [product.id]: Math.min(99, q[product.id]+1) }))}>+</button>
                  </div>
                  <button
                    className={`${styles.addBtn} ${styles[`addBtn${idx}`]} ${added[product.id] ? styles.addBtnAdded : ''}`}
                    onClick={() => handleAdd(product)}
                  >
                    {added[product.id]
                      ? <><FiCheck size={10}/> Ajouté !</>
                      : <><FiPlus size={10}/> Ajouter au panier</>
                    }
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart sidebar */}
        <div className={styles.cartSide}>
          <div className={styles.cartHeader}>
            <span className={styles.cartTitle}>🛒 Panier</span>
            <button className={styles.clearBtn} onClick={clear}>Vider</button>
          </div>

          <div className={styles.cartItems}>
            {items.length === 0
              ? <p className={styles.cartEmpty}>Votre panier est vide</p>
              : items.map((item, i) => (
                <div key={item.key} className={styles.cartItem}>
                  <div className={styles.itemDot} style={{ background: item.color }}/>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemSize}>{item.size}</div>
                  </div>
                  <div className={styles.itemQty}>
                    <button className={styles.iqBtn} onClick={() => updateQty(i, -1)}>−</button>
                    <span className={styles.iqVal}>{item.qty}</span>
                    <button className={styles.iqBtn} onClick={() => updateQty(i, 1)}>+</button>
                  </div>
                  <div className={styles.itemPrice}>{item.total.toLocaleString('fr-FR')} F</div>
                  <button className={styles.removeBtn} onClick={() => removeItem(i)}>✕</button>
                </div>
              ))
            }
          </div>

          {/* Promo */}
          <div className={styles.promoRow}>
            <input
              className={styles.promoInput}
              placeholder="Code promo..."
              value={promoInput}
              onChange={e => setPromoInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handlePromo()}
            />
            <button className={styles.promoBtn} onClick={handlePromo}>Appliquer</button>
          </div>

          {/* Totals */}
          <div className={styles.totals}>
            <div className={styles.totRow}><span>Sous-total</span><span>{subtotal.toLocaleString('fr-FR')} FCFA</span></div>
            <div className={styles.totRow}><span>Livraison</span><span>{items.length === 0 ? '—' : shipping === 0 ? 'Gratuite ✓' : `${shipping.toLocaleString('fr-FR')} FCFA`}</span></div>
            {promo && <div className={`${styles.totRow} ${styles.totPromo}`}><span>Promo ({promo.code})</span><span>−{discount.toLocaleString('fr-FR')} FCFA</span></div>}
            <div className={`${styles.totRow} ${styles.totGrand}`}><span>Total</span><span className={styles.totVal}>{total.toLocaleString('fr-FR')} FCFA</span></div>
          </div>

          <button className={styles.checkoutBtn} onClick={() => { if (!items.length) { toast.error('Votre panier est vide !'); return; } setCheckoutOpen(true) }}>
            <FiLock size={11}/> Commander maintenant
          </button>
          <div className={styles.secureNote}>
            <FiShield size={11} color="var(--green)"/> Orange Money · Wave · Carte
          </div>

          {/* WA alternative */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%20Bio%20S%C3%A9n%2C%20je%20voudrais%20commander%20!`}
            target="_blank" rel="noreferrer"
            className={styles.waAlt}
          >
            <FaWhatsapp size={13}/> Commander via WhatsApp
          </a>
        </div>
      </div>

      {/* Checkout modal */}
      {checkoutOpen && <Checkout onClose={() => setCheckoutOpen(false)} />}
    </div>
  )
}
