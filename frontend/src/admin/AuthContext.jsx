import { createContext, useContext, useEffect, useState } from 'react'
import * as adminApi from './adminApi'

const AuthContext = createContext(null)

/**
 * Gère la session admin : token (localStorage) + utilisateur courant.
 * Au montage, si un token existe, on le valide via /admin/me/.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function bootstrap() {
      if (!adminApi.getToken()) {
        setLoading(false)
        return
      }
      try {
        const me = await adminApi.fetchMe()
        if (!cancelled) setUser(me)
      } catch {
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    bootstrap()
    return () => {
      cancelled = true
    }
  }, [])

  const login = async (username, password) => {
    const me = await adminApi.login(username, password)
    setUser(me)
    return me
  }

  const logout = async () => {
    await adminApi.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé dans un AuthProvider')
  return ctx
}
