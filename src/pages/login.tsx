import { useState } from 'react'
import { Mascot } from '@/components/chang/mascot'
import { authService } from '@/services/auth'
import { cn } from '@/lib/utils'

export function LoginPage() {
  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-muted px-4 py-8">
      <div className="w-full max-w-[896px] flex flex-col items-center gap-6">
        <LoginCard />
        <p className="text-xs text-muted-foreground text-center leading-4 px-2 max-w-[343px] md:max-w-none">
          Bằng cách nhấp vào tiếp tục, bạn đồng ý với Điều khoản dịch vụ và Chính
          sách bảo mật của chúng tôi.
        </p>
      </div>
    </div>
  )
}

function LoginCard() {
  return (
    <div className="w-full max-w-[343px] md:max-w-none md:w-[896px] md:flex md:flex-row rounded-3xl border border-border bg-card overflow-hidden">
      <BrandPanel />
      <SignInPane />
    </div>
  )
}

function BrandPanel() {
  return (
    <div className="hidden md:flex md:w-[448px] md:flex-col md:justify-between p-10 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="flex items-center gap-3 relative z-10">
        <Mascot size={28} />
        <span className="text-sm font-light">Chang</span>
        <div className="h-4 w-px bg-primary-foreground/40" />
        <span className="text-sm font-light">Digital Workforce Platform</span>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <span className="text-xs font-light opacity-80">Powered by</span>
        <div className="h-4 w-px bg-primary-foreground/40" />
        <span className="text-xs font-medium">FPT Telecom</span>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-20 size-[420px] rounded-full bg-primary-foreground/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-20 size-[360px] rounded-full bg-primary-foreground/10 blur-3xl"
      />
    </div>
  )
}

function SignInPane() {
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
    <div className="flex-1 flex flex-col items-center p-8 gap-7">
      <div className="size-[72px] rounded-full overflow-hidden border border-border">
        <Mascot size={72} className="bg-muted" />
      </div>

      <div className="flex flex-col gap-2 items-center text-center px-6">
        <h1 className="text-2xl leading-8 text-card-foreground">Xin chào</h1>
        <p className="text-sm text-muted-foreground">
          Giúp Chang biết bạn là ai nhé!
        </p>
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className={cn(
          'w-full max-w-[280px] h-9 px-3 py-2 inline-flex items-center justify-center gap-4',
          'rounded-lg border border-border bg-background shadow-xs',
          'text-sm font-medium text-foreground',
          'hover:bg-muted transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
        )}
      >
        {loading ? (
          <span className="size-4 rounded-full border-2 border-foreground/30 border-t-foreground animate-spin" />
        ) : (
          <MicrosoftIcon />
        )}
        Đăng nhập Microsoft Azure
      </button>

      {error && (
        <p className="text-sm text-destructive text-center -mt-3">{error}</p>
      )}

      <p className="text-sm text-muted-foreground text-center">
        Copyright© 2025 FPT Telecom
      </p>
    </div>
  )
}

function MicrosoftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 21 21" aria-hidden>
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  )
}
