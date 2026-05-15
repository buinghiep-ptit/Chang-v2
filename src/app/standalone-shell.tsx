import { RouterProvider } from '@tanstack/react-router'
import { StandaloneAuthProvider } from '@/lib/auth/standalone-auth-provider'
import { DevAuthProvider } from '@/lib/auth/dev-auth-provider'
import { useAuth } from '@/lib/auth/auth-context'
import { LoginPage } from '@/pages/login'
import { router } from '@/lib/router'

const Provider = import.meta.env.DEV ? DevAuthProvider : StandaloneAuthProvider

export function StandaloneShell() {
  return (
    <Provider>
      <StandaloneGate />
    </Provider>
  )
}

function StandaloneGate() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <LoginPage />
  return <RouterProvider router={router} />
}
