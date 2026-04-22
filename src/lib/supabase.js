// src/lib/supabase.js
// ⚠️  IMPORTANT : Remplacez ces valeurs par vos vraies clés Supabase
// 1. Allez sur https://supabase.com → votre projet → Settings → API
// 2. Copiez "Project URL" et "anon public key"

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://VOTRE-PROJET.supabase.co'
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'votre-anon-key'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ─── ORDERS ───────────────────────────────────────────────────────────────────

export const ordersApi = {
  // Récupérer toutes les commandes (admin)
  async getAll() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  // Récupérer une commande par son numéro (suivi client)
  async getById(orderId) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderId.toUpperCase())
      .single()
    if (error) throw error
    return data
  },

  // Créer une nouvelle commande
  async create(order) {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single()
    if (error) throw error
    return data
  },

  // Mettre à jour le statut d'une commande (admin)
  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  // Annuler une commande
  async cancel(id) {
    return ordersApi.updateStatus(id, 'cancelled')
  }
}

// ─── STOCK ────────────────────────────────────────────────────────────────────

export const stockApi = {
  // Récupérer tous les stocks
  async getAll() {
    const { data, error } = await supabase
      .from('stock')
      .select('*')
      .order('product_key')
    if (error) throw error
    return data
  },

  // Mettre à jour une quantité
  async update(productKey, quantity) {
    const { data, error } = await supabase
      .from('stock')
      .update({ quantity, updated_at: new Date().toISOString() })
      .eq('product_key', productKey)
      .select()
      .single()
    if (error) throw error
    return data
  },

  // Déduire du stock après commande
  async deduct(items) {
    // items = [{ product_key: 'Arraw-500g', qty: 2 }, ...]
    for (const item of items) {
      const { data: current } = await supabase
        .from('stock')
        .select('quantity')
        .eq('product_key', item.product_key)
        .single()
      if (current) {
        await supabase
          .from('stock')
          .update({ quantity: Math.max(0, current.quantity - item.qty) })
          .eq('product_key', item.product_key)
      }
    }
  }
}

// ─── AUTH (ADMIN) ─────────────────────────────────────────────────────────────

export const authApi = {
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  },

  onAuthChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// ─── VISITS (statistiques) ────────────────────────────────────────────────────

export const visitsApi = {
  async track() {
    const today = new Date().toISOString().split('T')[0]
    const { data } = await supabase
      .from('visits')
      .select('count')
      .eq('date', today)
      .single()

    if (data) {
      await supabase
        .from('visits')
        .update({ count: data.count + 1 })
        .eq('date', today)
    } else {
      await supabase
        .from('visits')
        .insert([{ date: today, count: 1 }])
    }
  },

  async getLast7Days() {
    const { data, error } = await supabase
      .from('visits')
      .select('*')
      .order('date', { ascending: false })
      .limit(7)
    if (error) return []
    return data.reverse()
  }
}
