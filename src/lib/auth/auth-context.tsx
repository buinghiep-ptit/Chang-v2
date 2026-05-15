import { createContext, useContext } from 'react'

export interface AuthUser {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an auth provider')
  return ctx
}
