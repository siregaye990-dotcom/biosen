// src/pages/Home.jsx — with real images + visit tracking
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiSearch } from 'react-icons/fi'
import { FaLeaf, FaTruck, FaWhatsapp } from 'react-icons/fa'
import { GiWheat } from 'react-icons/gi'
import { MdBolt } from 'react-icons/md'
import { WHATSAPP_NUMBER } from '../utils/products'
import { visitsApi } from '../lib/supabase'
import styles from './Home.module.css'

const VALS = [
  { icon:<FaLeaf/>,  title:'100% Bio',      i:0, text:'Cultivées sans pesticides. Certifiées biologiques du champ à votre table.' },
  { icon:<GiWheat/>, title:'Tradition',     i:1, text:'Recettes ancestrales. Cuisson au sable filtré transmise de génération en génération.' },
  { icon:<MdBolt/>,  title:'Précuit',       i:2, text:'Préparation rapide sans sacrifier l\'authenticité du goût.' },
  { icon:<FaTruck/>, title:'Local & Livré', i:3, text:'Cultivé au Sénégal, livré partout. Chaque achat soutient les agriculteurs locaux.' },
]
const REVS = [
  { initials:'FD', name:'Fatou Diallo',    city:'Dakar, Médina',  stars:5, text:'Le meilleur Thiéré ! La qualité est au rendez-vous, les grains sont parfaits. Ma famille adore !' },
  { initials:'AN', name:'Aissatou Ndiaye', city:'Thiès',          stars:5, text:'Exactement le goût de mon enfance ! Le Thiakry de SweetBio est authentique et délicieux.' },
  { initials:'MS', name:'Moussa Sow',      city:'Dakar, Plateau', stars:5, text:'Commandé plusieurs fois. Qualité constante. Parfait pour le thiéré du vendredi.' },
]

export default function Home() {
  const navigate = useNavigate()
  const [nlPhone, setNlPhone] = useState('')
  useEffect(() => { visitsApi.track().catch(()=>{}) }, [])
  const goShop = () => navigate('/boutique')
  const handleNL = () => {
    if (!nlPhone.trim()) return
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour SweetBio ! Je souhaite recevoir vos promotions. Mon numéro : '+nlPhone)}`, '_blank')
    setNlPhone('')
  }
  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <img src="/image.png" alt="SweetBio" className={styles.heroLogo}/>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}><FaLeaf size={10}/> Origine Sénégal · 100% Bio</div>
            <h1 className={styles.heroH1}>SWEET<br/><em>BIO</em></h1>
            <p className={styles.heroSub}>L'essence du Sénégal, naturellement</p>
            <p className={styles.heroP}>Arraw, Thiéré, Thiakry — céréales ancestrales sénégalaises précuites au sable filtré. Certifiées 100% biologiques, sans additifs, livrées chez vous.</p>
            <div className={styles.heroBtns}>
              <button className={styles.heroBtnP} onClick={goShop}>Commander maintenant <FiArrowRight size={13}/></button>
              <button className={styles.heroBtnS} onClick={() => navigate('/suivi')}><FiSearch size={12}/> Suivre une commande</button>
            </div>
            <div className={styles.heroStats}>
              <div><div className={styles.statN}>100%</div><div className={styles.statL}>Bio certifié</div></div>
              <div><div className={styles.statN}>3</div><div className={styles.statL}>Produits</div></div>
              <div><div className={styles.statN}>0</div><div className={styles.statL}>Additif</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className={styles.section}><div className={styles.sectionInner}>
        <div className={styles.sectionLabel}>Nos produits phares</div>
        <h2 className={styles.sectionTitle}>Trois <em>trésors</em> du terroir</h2>
        <div className={styles.divider}/>
        <img
          src="/sweetbio-three-products.png"
          alt="Les sachets SweetBio Arraw de mil, Thiéré de mil et Thiakry de mil côte à côte"
          className={styles.productsImage}
        />

        {/* Values */}
        <div className={styles.vGrid}>
          {VALS.map((v,i) => (
            <div key={i} className={`${styles.vCard} ${styles['v'+i]}`}>
              <div className={`${styles.vIcon} ${styles['vi'+i]}`}>{v.icon}</div>
              <h3 className={styles.vTitle}>{v.title}</h3>
              <p className={styles.vText}>{v.text}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* REVIEWS */}
      <section className={styles.revSection}><div className={styles.revInner}>
        <div className={styles.revLabel}>Ils nous font confiance</div>
        <h2 className={styles.revTitle}>Ce que disent <em>nos clients</em></h2>
        <div className={styles.revDivider}/>
        <div className={styles.revGrid}>
          {REVS.map((r,i) => (
            <div key={i} className={styles.revCard}>
              <div className={styles.revStars}>{'★'.repeat(r.stars)}</div>
              <p className={styles.revText}>"{r.text}"</p>
              <div className={styles.revAuthor}>
                <div className={styles.revAvatar}>{r.initials}</div>
                <div><div className={styles.revName}>{r.name}</div><div className={styles.revCity}>📍 {r.city}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div></section>

      {/* NEWSLETTER */}
      <section className={styles.nl}><div className={styles.nlInner}>
        <div className={styles.nlTitle}>🌾 Restez informé</div>
        <p className={styles.nlSub}>Recevez nos promotions et recettes exclusives directement par WhatsApp</p>
        <div className={styles.nlForm}>
          <input className={styles.nlInp} type="tel" placeholder="Votre numéro WhatsApp..." value={nlPhone} onChange={e=>setNlPhone(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleNL()}/>
          <button className={styles.nlBtn} onClick={handleNL}><FaWhatsapp size={14}/> S'inscrire</button>
        </div>
        <p className={styles.nlNote}>🔒 Données confidentielles · Désinscription à tout moment</p>
      </div></section>
    </div>
  )
}
