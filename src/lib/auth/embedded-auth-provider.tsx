import { type ReactNode, useEffect, useRef, useState } from 'react'
import { AuthContext, type AuthUser } from './auth-context'
import { tokenStore } from './token-store'
import { authService } from '@/services/auth'

interface EmbeddedAuthProviderProps {
  children: ReactNode
}

export function EmbeddedAuthProvider({ children }: EmbeddedAuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const initialized = useRef(false)

  function handleSignOut(): void {
    tokenStore.set(null)
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    tokenStore.setOnUnauthorized(handleSignOut)

    async function init(): Promise<void> {
      try {
        const params = new URLSearchParams(location.search)
        const urlToken = params.get('token')
        if (!urlToken) return

        tokenStore.set(urlToken)
        setToken(urlToken)

        const me = await authService.getMe()
        setUser(me)
      } catch {
        handleSignOut()
      } finally {
        setLoading(false)
      }
    }

    void init()
  }, [])

  if (loading) return null

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
