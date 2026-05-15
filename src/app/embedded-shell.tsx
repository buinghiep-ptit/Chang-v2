import { RouterProvider } from '@tanstack/react-router'
import { EmbeddedAuthProvider } from '@/lib/auth/embedded-auth-provider'
import { DevAuthProvider } from '@/lib/auth/dev-auth-provider'
import { useAuth } from '@/lib/auth/auth-context'
import { router } from '@/lib/router'

const Provider = import.meta.env.DEV ? DevAuthProvider : EmbeddedAuthProvider

export function EmbeddedShell() {
  return (
    <Provider>
      <EmbeddedGate />
    </Provider>
  )
}

function EmbeddedGate() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground px-6 text-center">
          Không tìm thấy token xác thực.
          <br />
          Vui lòng kiểm tra cấu hình tích hợp.
        </p>
      </div>
    )
  }

  return <RouterProvider router={router} />
}
