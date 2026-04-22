// src/pages/Home.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiSearch, FiStar } from 'react-icons/fi'
import { GiWheat, GiMortar } from 'react-icons/gi'
import { FaLeaf, FaBolt, FaTruck, FaWhatsapp } from 'react-icons/fa'
import { PRODUCTS, WHATSAPP_NUMBER } from '../utils/products'
import styles from './Home.module.css'

const SHOWCASE_DATA = [
  { pos: '15% center', name: 'Arraw de Mil',  tag: 'Grains ronds précuits · 100% Bio'  },
  { pos: '50% center', name: 'Thiéré de Mil', tag: 'Couscous de mil · Le plus vendu'   },
  { pos: '85% center', name: 'Thiakry de Mil',tag: 'Dessert traditionnel sénégalais'   },
]

const VALUES = [
  { icon: <FaLeaf />, title: '100% Bio', color: 'green', text: 'Cultivées sans pesticides. Certifiées biologiques du champ à votre table.' },
  { icon: <GiWheat />, title: 'Tradition', color: 'gold', text: 'Recettes ancestrales. Cuisson au sable filtré transmise de génération en génération.' },
  { icon: <FaBolt />, title: 'Précuit', color: 'earth', text: 'Chaque produit est précuit pour une préparation rapide sans sacrifier l\'authenticité.' },
  { icon: <FaTruck />, title: 'Local & Livré', color: 'green2', text: 'Cultivé au Sénégal, livré partout. Chaque achat soutient les agriculteurs locaux.' },
]

const REVIEWS = [
  { initials: 'FD', name: 'Fatou Diallo',    city: 'Dakar, Médina',  stars: 5, text: 'Le meilleur Thiéré que j\'ai goûté ! La qualité est au rendez-vous, les grains sont parfaits. Ma famille l\'adore !' },
  { initials: 'AN', name: 'Aissatou Ndiaye', city: 'Thiès',          stars: 5, text: 'Exactement le goût de mon enfance ! Le Thiakry de Bio Sén est authentique et délicieux. La livraison était rapide.' },
  { initials: 'MS', name: 'Moussa Sow',      city: 'Dakar, Plateau', stars: 5, text: 'Commandé plusieurs fois. Qualité constante. L\'Arraw de Mil précuit est parfait pour le thiéré du vendredi.' },
]

export default function Home() {
  const navigate = useNavigate()
  const [activeShowcase, setActiveShowcase] = useState(0)
  const [nlPhone, setNlPhone] = useState('')

  const handleNL = () => {
    if (!nlPhone.trim()) return
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour ! Je souhaite recevoir vos promotions. Mon numéro : ' + nlPhone)}`,
      '_blank'
    )
    setNlPhone('')
  }

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLogo}>
            <div className={styles.heroBioCircle}>
              BIO<br /><em>SÉN</em>
            </div>
          </div>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}><FaLeaf size={10}/> Origine Sénégal · 100% Bio</div>
            <h1 className={styles.heroH1}>BIO<br /><em>SÉN</em></h1>
            <p className={styles.heroSub}>L'essence du Sénégal, naturellement</p>
            <p className={styles.heroP}>
              Arraw, Thiéré, Thiakry — céréales ancestrales sénégalaises précuites au sable filtré.
              Certifiées 100% biologiques, sans additifs, livrées chez vous.
            </p>
            <div className={styles.heroBtns}>
              <button className={styles.heroBtnPrimary} onClick={() => navigate('/boutique')}>
                Commander maintenant <FiArrowRight size={13}/>
              </button>
              <button className={styles.heroBtnSec} onClick={() => navigate('/suivi')}>
                <FiSearch size={12}/> Suivre une commande
              </button>
            </div>
            <div className={styles.heroStats}>
              <div><div className={styles.statN}>100%</div><div className={styles.statL}>Bio certifié</div></div>
              <div><div className={styles.statN}>3</div><div className={styles.statL}>Produits</div></div>
              <div><div className={styles.statN}>0</div><div className={styles.statL}>Additif</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHOWCASE ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>Nos produits phares</div>
          <h2 className={styles.sectionTitle}>Trois <em>trésors</em> du terroir</h2>
          <div className={styles.divider}></div>

          <div className={styles.showcase}>
            {/* Image */}
            <div className={styles.showcaseImgWrap}>
              <div
                className={styles.showcaseImg}
                style={{ objectPosition: SHOWCASE_DATA[activeShowcase].pos }}
              >
                <div className={styles.imgPlaceholder}>
                  {activeShowcase === 0 && <GiWheat size={80} opacity={.3} color="#fff"/>}
                  {activeShowcase === 1 && <GiWheat size={80} opacity={.3} color="#fff"/>}
                  {activeShowcase === 2 && <GiMortar size={80} opacity={.3} color="#fff"/>}
                  <p className={styles.imgHint}>📸 Photo du sachet</p>
                </div>
              </div>
              <div className={styles.showcaseOverlay}>
                <div>
                  <div className={styles.sovName}>{SHOWCASE_DATA[activeShowcase].name}</div>
                  <div className={styles.sovTag}>{SHOWCASE_DATA[activeShowcase].tag}</div>
                </div>
                <button className={styles.sovBtn} onClick={() => navigate('/boutique')}>
                  Commander <FiArrowRight size={11}/>
                </button>
              </div>
              <div className={styles.dots}>
                {SHOWCASE_DATA.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === activeShowcase ? styles.dotActive : ''}`}
                    onClick={() => setActiveShowcase(i)}
                    aria-label={`Produit ${i+1}`}
                  />
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className={styles.stabs}>
              {PRODUCTS.map((p, i) => (
                <div
                  key={p.id}
                  className={`${styles.stab} ${i === activeShowcase ? styles.stabActive : ''} ${styles[`stab${i}`]}`}
                  onClick={() => setActiveShowcase(i)}
                >
                  <div className={`${styles.stabIcon} ${styles[`icon${i}`]}`}>
                    {i === 0 && <FaLeaf />}
                    {i === 1 && <FiStar />}
                    {i === 2 && <GiMortar />}
                  </div>
                  <div className={styles.stabInfo}>
                    <div className={styles.stabName}>{p.name}</div>
                    <div className={styles.stabDesc}>{p.shortDesc.slice(0, 55)}…</div>
                  </div>
                  <div className={styles.stabPrice} style={{ color: p.color }}>
                    800 F / 500g
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className={styles.valuesGrid}>
            {VALUES.map((v, i) => (
              <div key={i} className={`${styles.valCard} ${styles[`val${i}`]}`}>
                <div className={`${styles.valIcon} ${styles[`valIcon${i}`]}`}>{v.icon}</div>
                <h3 className={styles.valTitle}>{v.title}</h3>
                <p className={styles.valText}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className={styles.reviewsSection}>
        <div className={styles.reviewsInner}>
          <div className={styles.revLabel}>Ils nous font confiance</div>
          <h2 className={styles.revTitle}>Ce que disent <em>nos clients</em></h2>
          <div className={styles.revDivider}></div>
          <div className={styles.reviewsGrid}>
            {REVIEWS.map((r, i) => (
              <div key={i} className={styles.revCard}>
                <div className={styles.revStars}>{'★'.repeat(r.stars)}</div>
                <p className={styles.revText}>"{r.text}"</p>
                <div className={styles.revAuthor}>
                  <div className={styles.revAvatar}>{r.initials}</div>
                  <div>
                    <div className={styles.revName}>{r.name}</div>
                    <div className={styles.revCity}>📍 {r.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className={styles.newsletter}>
        <div className={styles.nlInner}>
          <div className={styles.nlTitle}>🌾 Restez informé</div>
          <p className={styles.nlSub}>Recevez nos promotions et recettes exclusives directement par WhatsApp</p>
          <div className={styles.nlForm}>
            <input
              className={styles.nlInp}
              type="tel"
              placeholder="Votre numéro WhatsApp..."
              value={nlPhone}
              onChange={e => setNlPhone(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleNL()}
            />
            <button className={styles.nlBtn} onClick={handleNL}>
              <FaWhatsapp size={14}/> S'inscrire
            </button>
          </div>
          <p className={styles.nlNote}>🔒 Données confidentielles · Désinscription à tout moment</p>
        </div>
      </section>
    </div>
  )
}
