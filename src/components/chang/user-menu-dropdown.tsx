import { useRef } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { CircleHelp, HandHelping, LogOut, Moon, UserCog } from 'lucide-react'
import { useClickOutside } from '@/hooks/use-click-outside'
import { cn } from '@/lib/utils'

interface UserMenuDropdownProps {
  onClose: () => void
  className?: string
}

export function UserMenuDropdown({ onClose, className }: UserMenuDropdownProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  useClickOutside(ref, onClose)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 4, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.98 }}
      transition={{ duration: 0.12 }}
      className={cn(
        'w-56 rounded-lg border border-border bg-popover text-popover-foreground shadow-xs overflow-hidden',
        className,
      )}
    >
      <div className="p-1">
        <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
          Cài đặt
        </div>
        <Row icon={<UserCog size={16} />} label="Tài khoản" />
      </div>
      <div className="h-px bg-border" />
      <div className="p-1">
        <button
          type="button"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="w-full h-9 px-2 gap-2 rounded-md flex items-center text-sm hover:bg-muted/60 transition-colors"
        >
          <Moon size={16} className="shrink-0" />
          <span className="flex-1 text-left truncate">Chế độ tối</span>
          <Switch checked={isDark} />
        </button>
      </div>
      <div className="p-1">
        <Row icon={<HandHelping size={16} />} label="Trung tâm trợ giúp" />
        <Row icon={<CircleHelp size={16} />} label="Câu hỏi thường gặp" />
      </div>
      <div className="h-px bg-border" />
      <div className="p-1">
        <Row icon={<LogOut size={16} />} label="Đăng xuất" />
      </div>
    </motion.div>
  )
}

function Row({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="w-full h-8 px-2 gap-2 rounded-md flex items-center text-sm hover:bg-muted/60 transition-colors"
    >
      <span className="size-4 inline-flex items-center justify-center shrink-0">{icon}</span>
      <span className="flex-1 text-left truncate">{label}</span>
    </button>
  )
}

function Switch({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        'w-11 h-6 rounded-full p-0.5 transition-colors shrink-0',
        checked ? 'bg-primary' : 'bg-input',
      )}
    >
      <span
        className={cn(
          'block size-5 rounded-full bg-background shadow-xs transition-transform',
          checked && 'translate-x-5',
        )}
      />
    </span>
  )
}
