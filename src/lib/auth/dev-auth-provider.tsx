import { type ReactNode } from 'react'
import { AuthContext } from './auth-context'
import { tokenStore } from './token-store'

const DEV_USER = {
  id: 'dev-001',
  name: 'Dev User',
  email: 'dev@ftel.vn',
}

const DEV_TOKEN =
  'eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjoiUk9MRV9DVVNUT01FUixST0xFX1NVUEVSX0FETUlOIiwiY3JlYXRlZCI6MTc3ODg5MTg5Mywib3JnYW5pemF0aW9uIjoiRlRFTC9GVEVMSU1VL0RTQy9EU0NSQS8iLCJmcHRfdXNlcl9pZF9rZXkiOjMxNDgwLCJlbWFpbCI6Ik5naGllcEJWMkBmcHQuY29tIiwiYWdlbnRfdXNlcl9pZF9rZXkiOjE1Nywic3ViIjoiTmdoaWVwQlYyQGZwdC5jb20iLCJleHAiOjE3Nzg5NzgyOTN9.2CgHnaD1im6tnrledhqX-GGJF1ptJhGni2IPSn6K1n0wRIiYe7OqgUY31JSxB5Zrq2EQ9qLtIFA30LI0_NXCdw'

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
