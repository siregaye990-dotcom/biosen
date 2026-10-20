import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export const CURRENCIES = {
  XOF: { code: 'XOF', flag: '🇸🇳', symbol: 'FCFA', rate: 1, decimals: 0 },
  EUR: { code: 'EUR', flag: '🇪🇺', symbol: '€', rate: 1 / 400, decimals: 2 },
  USD: { code: 'USD', flag: '🇺🇸', symbol: '$', rate: 1 / 400, decimals: 2 },
  CAD: { code: 'CAD', flag: '🇨🇦', symbol: 'C$', rate: 3 / 800, decimals: 2 },
}

const CurrencyContext = createContext(null)

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    if (typeof window === 'undefined') return 'XOF'
    const saved = window.localStorage.getItem('sweetbio_currency')
    return saved && CURRENCIES[saved] ? saved : 'XOF'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('sweetbio_currency', currency)
    }
  }, [currency])

  const formatAmount = useMemo(() => (value, targetCurrency = currency) => {
    const config = CURRENCIES[targetCurrency] || CURRENCIES.XOF
    const converted = value * config.rate
    const formatted = converted.toLocaleString('fr-FR', {
      minimumFractionDigits: config.decimals,
      maximumFractionDigits: config.decimals,
    })

    return `${formatted} ${config.symbol}`
  }, [currency])

  const convertAmount = useMemo(() => (value, targetCurrency = currency) => {
    const config = CURRENCIES[targetCurrency] || CURRENCIES.XOF
    return value * config.rate
  }, [currency])

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, CURRENCIES, formatAmount, convertAmount }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider')
  return ctx
}
