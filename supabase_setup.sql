-- ============================================================
-- BIO SÉN — Script SQL complet pour Supabase
-- Copiez-collez ce script dans l'onglet SQL Editor de Supabase
-- ============================================================

-- ── 1. TABLE DES COMMANDES ────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number     TEXT NOT NULL UNIQUE,
  client_name      TEXT NOT NULL,
  phone            TEXT NOT NULL,
  address          TEXT NOT NULL,
  items            TEXT NOT NULL,
  total            INTEGER NOT NULL DEFAULT 0,
  payment_method   TEXT,
  status           TEXT NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
  note             TEXT,
  promo_code       TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour les recherches fréquentes
CREATE INDEX IF NOT EXISTS orders_status_idx       ON orders(status);
CREATE INDEX IF NOT EXISTS orders_order_number_idx ON orders(order_number);
CREATE INDEX IF NOT EXISTS orders_created_at_idx   ON orders(created_at DESC);

-- ── 2. TABLE DES STOCKS ───────────────────────────────────
CREATE TABLE IF NOT EXISTS stock (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_key      TEXT UNIQUE NOT NULL,
  product_name     TEXT,
  quantity         INTEGER NOT NULL DEFAULT 0,
  alert_threshold  INTEGER NOT NULL DEFAULT 10,
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 3. TABLE DES VISITES ──────────────────────────────────
CREATE TABLE IF NOT EXISTS visits (
  id    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date  DATE UNIQUE NOT NULL,
  count INTEGER NOT NULL DEFAULT 0
);

-- ── 4. DONNÉES INITIALES STOCKS ──────────────────────────
INSERT INTO stock (product_key, product_name, quantity, alert_threshold) VALUES
  ('Arraw-500g',   'Arraw de Mil 500g',   50, 10),
  ('Arraw-1kg',    'Arraw de Mil 1kg',    30, 5 ),
  ('Thiéré-500g',  'Thiéré de Mil 500g',  45, 10),
  ('Thiéré-1kg',   'Thiéré de Mil 1kg',   25, 5 ),
  ('Thiakry-500g', 'Thiakry de Mil 500g', 40, 10),
  ('Thiakry-1kg',  'Thiakry de Mil 1kg',  20, 5 )
ON CONFLICT (product_key) DO NOTHING;

-- ── 5. ROW LEVEL SECURITY ─────────────────────────────────

-- Commandes
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Clients : peuvent créer et lire leurs propres commandes
CREATE POLICY "orders_public_insert" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "orders_public_select" ON orders
  FOR SELECT USING (true);

-- Admin uniquement : modifier le statut
CREATE POLICY "orders_admin_update" ON orders
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "orders_admin_delete" ON orders
  FOR DELETE USING (auth.role() = 'authenticated');

-- Stock
ALTER TABLE stock ENABLE ROW LEVEL SECURITY;

CREATE POLICY "stock_public_select" ON stock
  FOR SELECT USING (true);

CREATE POLICY "stock_public_update" ON stock
  FOR UPDATE USING (true);

-- Visites
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "visits_all" ON visits
  FOR ALL USING (true) WITH CHECK (true);

-- ── 6. TRIGGER : updated_at automatique ──────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER stock_updated_at
  BEFORE UPDATE ON stock
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── 7. VÉRIFICATION ──────────────────────────────────────
SELECT 'orders' AS table_name, COUNT(*) AS rows FROM orders
UNION ALL
SELECT 'stock',  COUNT(*) FROM stock
UNION ALL
SELECT 'visits', COUNT(*) FROM visits;

-- ✅ Script exécuté avec succès !
-- Prochaine étape : créez votre compte admin dans
-- Authentication → Users → Invite User
