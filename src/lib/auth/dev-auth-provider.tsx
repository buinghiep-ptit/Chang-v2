import { type ReactNode } from 'react'
import { AuthContext } from './auth-context'
import { tokenStore } from './token-store'

const DEV_USER = {
  id: 'dev-001',
  name: 'Dev User',
  email: 'dev@ftel.vn',
}

const DEV_TOKEN = 'dev-mock-token'

tokenStore.set(DEV_TOKEN)

export function DevAuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider
      value={{
        user: DEV_USER,
        token: DEV_TOKEN,
        isAuthenticated: true,
        signOut: () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
