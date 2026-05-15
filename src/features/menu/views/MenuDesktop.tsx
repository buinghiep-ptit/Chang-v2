import { useNavigate } from '@tanstack/react-router'
import { Moon, Sun, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Mascot } from '@/components/chang/mascot'
import { useAuth } from '@/lib/auth/auth-context'

export function MenuDesktop() {
  const navigate = useNavigate()
  const { resolvedTheme, setTheme } = useTheme()
  const { user, signOut } = useAuth()

  function handleSignOut(): void {
    signOut()
    navigate({ to: '/' })
  }

  return (
    <>
      <div className="h-14 px-6 flex items-center gap-3 border-b border-border shrink-0">
        <h1 className="text-[15px] font-semibold flex-1">Cài đặt</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 no-scrollbar max-w-lg">
        {/* Profile */}
        <section className="flex flex-col gap-1">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
            Tài khoản
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User size={20} className="text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[15px] truncate">{user?.name ?? '—'}</div>
              <div className="text-[13px] text-muted-foreground truncate">{user?.email ?? '—'}</div>
            </div>
          </div>
        </section>

        {/* Chang assistant */}
        <section className="flex flex-col gap-1">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
            Trợ lý
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
            <Mascot size={40} />
            <div>
              <div className="font-semibold text-[15px]">Chang Bít Tất</div>
              <div className="text-[13px] text-muted-foreground">Trợ lý mặc định</div>
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section className="flex flex-col gap-1">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
            Giao diện
          </div>
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted transition-colors text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              {resolvedTheme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </div>
            <div className="flex-1">
              <div className="text-[15px] font-medium">
                {resolvedTheme === 'dark' ? 'Chế độ tối' : 'Chế độ sáng'}
              </div>
              <div className="text-[13px] text-muted-foreground">Nhấn để chuyển đổi</div>
            </div>
          </button>
        </section>

        {/* Sign out */}
        <section>
          <button
            onClick={handleSignOut}
            className="w-full p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive font-medium text-[15px] hover:bg-destructive/10 transition-colors"
          >
            Đăng xuất
          </button>
        </section>
      </div>
    </>
  )
}
