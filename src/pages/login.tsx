import { useState } from 'react'
import { Mascot } from '@/components/chang/mascot'
import { authService } from '@/services/auth'

export function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(): Promise<void> {
    try {
      setLoading(true)
      setError(null)
      const url = await authService.getAzureLoginUrl()
      window.location.href = url
    } catch {
      setError('Không thể kết nối. Vui lòng thử lại.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <Mascot size={64} />
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">Chang</h1>
            <p className="text-sm text-muted-foreground mt-1">Trợ lý AI của FPT Telecom</p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted transition-colors font-medium text-[15px] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            ) : (
              <MicrosoftIcon />
            )}
            Đăng nhập với Microsoft
          </button>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Chỉ dành cho nhân viên FPT Telecom
        </p>
      </div>
    </div>
  )
}

function MicrosoftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  )
}
