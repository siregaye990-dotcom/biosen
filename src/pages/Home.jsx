// src/pages/Home.jsx — with real images + visit tracking
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiSearch } from 'react-icons/fi'
import { FaLeaf, FaTruck, FaWhatsapp, FaStar } from 'react-icons/fa'
import { GiWheat, GiMortar } from 'react-icons/gi'
import { MdBolt } from 'react-icons/md'
import LOGO_B64    from '../assets/logo_b64'
import SACHETS_B64 from '../assets/sachets_b64'
import { PRODUCTS, WHATSAPP_NUMBER } from '../utils/products'
import { visitsApi } from '../lib/supabase'
import styles from './Home.module.css'

const SC = [
  { pos:'14% center', name:'Arraw de Mil',  tag:'Grains ronds précuits · 100% Bio' },
  { pos:'50% center', name:'Thiéré de Mil', tag:'Couscous de mil · Le plus vendu'  },
  { pos:'84% center', name:'Thiakry de Mil',tag:'Dessert traditionnel sénégalais'  },
]
const VALS = [
  { icon:<FaLeaf/>,  title:'100% Bio',      i:0, text:'Cultivées sans pesticides. Certifiées biologiques du champ à votre table.' },
  { icon:<GiWheat/>, title:'Tradition',     i:1, text:'Recettes ancestrales. Cuisson au sable filtré transmise de génération en génération.' },
  { icon:<MdBolt/>,  title:'Précuit',       i:2, text:'Préparation rapide sans sacrifier l\'authenticité du goût.' },
  { icon:<FaTruck/>, title:'Local & Livré', i:3, text:'Cultivé au Sénégal, livré partout. Chaque achat soutient les agriculteurs locaux.' },
]
const REVS = [
  { initials:'FD', name:'Fatou Diallo',    city:'Dakar, Médina',  stars:5, text:'Le meilleur Thiéré ! La qualité est au rendez-vous, les grains sont parfaits. Ma famille adore !' },
  { initials:'AN', name:'Aissatou Ndiaye', city:'Thiès',          stars:5, text:'Exactement le goût de mon enfance ! Le Thiakry de Bio Sén est authentique et délicieux.' },
  { initials:'MS', name:'Moussa Sow',      city:'Dakar, Plateau', stars:5, text:'Commandé plusieurs fois. Qualité constante. Parfait pour le thiéré du vendredi.' },
]

export default function Home() {
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  const [nlPhone, setNlPhone] = useState('')
  useEffect(() => { visitsApi.track().catch(()=>{}) }, [])
  const goShop = () => navigate('/boutique')
  const handleNL = () => {
    if (!nlPhone.trim()) return
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour Bio Sén ! Je souhaite recevoir vos promotions. Mon numéro : '+nlPhone)}`, '_blank')
    setNlPhone('')
  }
  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <img src={LOGO_B64} alt="Bio Sén" className={styles.heroLogo}/>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}><FaLeaf size={10}/> Origine Sénégal · 100% Bio</div>
            <h1 className={styles.heroH1}>BIO<br/><em>SÉN</em></h1>
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
      <section className={styles.section}><div className={styles.inner}>
        <div className={styles.sLabel}>Nos produits phares</div>
        <h2 className={styles.sTitle}>Trois <em>trésors</em> du terroir</h2>
        <div className={styles.divider}/>
        <div className={styles.showcase}>
          <div className={styles.scImgWrap}>
            <img src={SACHETS_B64} alt={SC[active].name} className={styles.scImg} style={{objectPosition: SC[active].pos}}/>
            <div className={styles.scOverlay}>
              <div><div className={styles.scName}>{SC[active].name}</div><div className={styles.scTag}>{SC[active].tag}</div></div>
              <button className={styles.scBtn} onClick={goShop}>Commander <FiArrowRight size={11}/></button>
            </div>
            <div className={styles.dots}>{SC.map((_,i) => <button key={i} className={`${styles.dot}${i===active?' '+styles.dotOn:''}`} onClick={()=>setActive(i)} aria-label={`Produit ${i+1}`}/>)}</div>
          </div>
          <div className={styles.stabs}>
            {PRODUCTS.map((p,i) => (
              <div key={p.id} className={`${styles.stab}${i===active?' '+styles.stabOn:''} ${styles['s'+i]}`} onClick={()=>setActive(i)}>
                <div className={`${styles.sIcon} ${styles['si'+i]}${i===active?' '+styles['sio'+i]:''}`}>{i===0?<FaLeaf/>:i===1?<FaStar/>:<GiMortar/>}</div>
                <div className={styles.sInfo}><div className={styles.sName}>{p.name}</div><div className={styles.sDesc}>{p.shortDesc.slice(0,52)}…</div></div>
                <div className={styles.sPrice} style={{color:p.color}}>800 F/500g</div>
              </div>
            ))}
          </div>
        </div>

        {/* Product cards */}
        <div className={styles.prodCards}>
          {PRODUCTS.map((p,i) => (
            <div key={p.id} className={styles.prodCard} onClick={()=>navigate('/boutique/'+p.slug)}>
              <div className={styles.pcImg}>
                <img src={SACHETS_B64} alt={p.name} style={{objectPosition:SC[i].pos}}/>
                <span className={styles.pcTag} style={{background:p.color,color:p.id===2?'#1a1209':'#fff'}}>{p.badge}</span>
              </div>
              <div className={styles.pcBody}>
                <div className={styles.pcName}>{p.name}</div>
                <div className={styles.pcDesc}>{p.shortDesc.slice(0,58)}…</div>
                <div className={styles.pcPrice} style={{color:p.color}}>800 FCFA <span>/ 500g · 1 600 FCFA / 1kg</span></div>
              </div>
            </div>
          ))}
        </div>

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
