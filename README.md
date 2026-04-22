# 🌾 Bio Sén — Site E-Commerce React

> L'essence du Sénégal, naturellement

Application e-commerce complète pour **Bio Sén**, construite avec React + Supabase.

---

## 🚀 Démarrage rapide

```bash
# 1. Cloner le projet
git clone https://github.com/siregaye990-dotcom/biosen.git
cd biosen

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# → Éditez .env avec vos clés Supabase

# 4. Lancer en développement
npm start

# 5. Build pour la production
npm run build
```

---

## 🗄️ Configuration Supabase (Backend)

### 1. Créer un projet Supabase
- Allez sur [supabase.com](https://supabase.com) → **New Project**
- Copiez **Project URL** et **anon public key** dans votre `.env`

### 2. Créer les tables (SQL Editor)

```sql
-- Table des commandes
CREATE TABLE orders (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number     TEXT NOT NULL UNIQUE,
  client_name      TEXT NOT NULL,
  phone            TEXT NOT NULL,
  address          TEXT NOT NULL,
  items            TEXT NOT NULL,
  total            INTEGER NOT NULL,
  payment_method   TEXT,
  status           TEXT DEFAULT 'pending',
  note             TEXT,
  promo_code       TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Table des stocks
CREATE TABLE stock (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_key      TEXT UNIQUE NOT NULL,
  product_name     TEXT,
  quantity         INTEGER DEFAULT 0,
  alert_threshold  INTEGER DEFAULT 10,
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Table des visites
CREATE TABLE visits (
  id      UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date    DATE UNIQUE NOT NULL,
  count   INTEGER DEFAULT 0
);

-- Données initiales de stock
INSERT INTO stock (product_key, product_name, quantity) VALUES
  ('Arraw-500g',   'Arraw de Mil 500g',   50),
  ('Arraw-1kg',    'Arraw de Mil 1kg',    30),
  ('Thiéré-500g',  'Thiéré de Mil 500g',  45),
  ('Thiéré-1kg',   'Thiéré de Mil 1kg',   25),
  ('Thiakry-500g', 'Thiakry de Mil 500g', 40),
  ('Thiakry-1kg',  'Thiakry de Mil 1kg',  20);
```

### 3. Row Level Security (RLS)

```sql
-- Commandes : lecture publique (pour suivi), écriture publique (pour passer commande)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_select" ON orders FOR SELECT USING (true);
CREATE POLICY "orders_insert" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "orders_update" ON orders FOR UPDATE USING (auth.role() = 'authenticated');

-- Stock : lecture publique, modification authentifiée
ALTER TABLE stock ENABLE ROW LEVEL SECURITY;
CREATE POLICY "stock_select" ON stock FOR SELECT USING (true);
CREATE POLICY "stock_update" ON stock FOR UPDATE USING (auth.role() = 'authenticated');

-- Visites : lecture/écriture publique
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "visits_all" ON visits FOR ALL USING (true);
```

### 4. Créer le compte admin

Dans Supabase → **Authentication → Users → Invite User** :
- Entrez votre email admin (ex: `siregaye990@gmail.com`)
- Définissez un mot de passe sécurisé
- Cet email/mot de passe sera utilisé pour accéder au dashboard Admin

---

## 📱 Pages de l'application

| Route              | Description                          |
|--------------------|--------------------------------------|
| `/`                | Accueil (hero, showcase, avis, NL)   |
| `/boutique`        | Boutique + panier + checkout         |
| `/boutique/:slug`  | Fiche produit détaillée              |
| `/suivi`           | Suivi de commande en temps réel      |
| `/admin`           | Dashboard admin (login requis)       |

---

## 🛒 Fonctionnalités

### Client
- ✅ Showcase interactif (3 produits avec animation)
- ✅ Sélecteur de format 500g / 1kg avec boutons radio
- ✅ Panier persisté (localStorage)
- ✅ Tunnel de commande avec formulaire livraison
- ✅ Notification WhatsApp automatique à la commande
- ✅ Suivi commande avec timeline animée
- ✅ Fiches produits détaillées (ingrédients, nutrition, recettes, avis)
- ✅ Codes promo (BIOS10, BIO20, SENEGAL15, BIOSEN10)
- ✅ Livraison gratuite dès 5 000 FCFA
- ✅ Bouton WhatsApp flottant

### Admin (`/admin`)
- ✅ Authentification sécurisée via Supabase Auth
- ✅ KPI : commandes, chiffre d'affaires, visites, stock critique
- ✅ Graphique des visites (Recharts)
- ✅ Gestion des stocks avec mise à jour en direct
- ✅ Tableau des commandes avec filtres par statut
- ✅ Avancement du statut : En attente → Confirmée → Expédiée → Livrée
- ✅ Génération de reçus PDF (jsPDF)
- ✅ Export CSV des commandes
- ✅ Export PDF feuille de livraison

---

## 📞 Contact Bio Sén

- **Téléphone / WhatsApp** : +221 77 068 60 34
- **Email** : siregaye990@gmail.com
- **Localisation** : Dakar, Sénégal

---

## 🌐 Déploiement (Netlify)

```bash
# Build
npm run build

# Déployer sur Netlify
# → Drag & drop du dossier /build sur netlify.com
# → Ou connectez votre repo GitHub pour le déploiement automatique
```

**Variables d'environnement Netlify** :
- Site Settings → Environment Variables
- Ajoutez `REACT_APP_SUPABASE_URL` et `REACT_APP_SUPABASE_ANON_KEY`

---

## 🛠️ Stack technique

| Outil           | Usage                        |
|-----------------|------------------------------|
| React 18        | UI framework                 |
| React Router 6  | Navigation                   |
| Supabase        | Backend, Auth, Base de données|
| CSS Modules     | Styles scopés                |
| React Hot Toast | Notifications                |
| Recharts        | Graphiques admin             |
| jsPDF           | Génération PDF               |
| React Icons     | Icônes                       |

---

*Bio Sén © 2026 — L'essence du Sénégal, naturellement 🌾*
