import { type ReactNode, useEffect, useRef, useState } from 'react'
import { AuthContext, type AuthUser } from './auth-context'
import { tokenStore } from './token-store'
import { authService } from '@/services/auth'

const STORAGE_KEY = 'chang-sdk:v1:auth'

interface StandaloneAuthProviderProps {
  children: ReactNode
}

export function StandaloneAuthProvider({ children }: StandaloneAuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const initialized = useRef(false)

  function applyToken(t: string): void {
    tokenStore.set(t)
    setToken(t)
    localStorage.setItem(STORAGE_KEY, t)
  }

  function handleSignOut(): void {
    authService.signOut()
    tokenStore.set(null)
    localStorage.removeItem(STORAGE_KEY)
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    tokenStore.setOnUnauthorized(handleSignOut)

    async function init(): Promise<void> {
      try {
        // OAuth callback: BE redirects back with ?auth_token=
        const params = new URLSearchParams(location.search)
        const callbackToken = params.get('auth_token')
        if (callbackToken) {
          applyToken(callbackToken)
          history.replaceState({}, '', location.pathname)
          const me = await authService.getMe()
          setUser(me)
          return
        }

        // Resume existing session from localStorage
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          applyToken(stored)
          const me = await authService.getMe()
          setUser(me)
        }
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
