// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check existing session
    authApi.getSession().then(s => {
      setSession(s)
      setLoading(false)
    })

    // Listen to auth changes
    const { data: { subscription } } = authApi.onAuthChange((_event, s) => {
      setSession(s)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    const data = await authApi.signIn(email, password)
    setSession(data.session)
    return data
  }

  const signOut = async () => {
    await authApi.signOut()
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ session, loading, signIn, signOut, isAdmin: !!session }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
