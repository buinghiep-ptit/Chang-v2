import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Bell, ChevronRight, Ellipsis, Menu, PanelLeft, Plus } from 'lucide-react'
import { Mascot } from './mascot'
import { NotificationDropdown } from './notification-dropdown'
import { cn } from '@/lib/utils'

interface TopBarProps {
  title?: string
  className?: string
  notificationCount?: number
  onMenu?: () => void
  onPlus?: () => void
  onBell?: () => void
  onEllipsis?: () => void
  /** Mobile: hamburger / Desktop: panel toggle */
  variant?: 'mobile' | 'desktop'
}

export function ChangTopBar({
  title,
  className,
  notificationCount = 0,
  onMenu,
  onPlus,
  onBell,
  onEllipsis,
  variant = 'mobile',
}: TopBarProps) {
  const [notifOpen, setNotifOpen] = useState(false)

  function handleBell(): void {
    if (onBell) onBell()
    else setNotifOpen((v) => !v)
  }

  return (
    <div
      className={cn(
        'h-16 shrink-0 bg-background border-b border-border flex items-center justify-between',
        className,
      )}
    >
      <div className="flex items-center gap-2 pl-4 pr-0">
        <IconButton onClick={onMenu}>
          {variant === 'desktop' ? <PanelLeft size={16} /> : <Menu size={16} />}
        </IconButton>
        <Mascot size={20} />
        <nav aria-label="breadcrumb" className="flex items-center gap-1.5">
          <span className="text-sm text-muted-foreground">Chang</span>
          {title && (
            <>
              <ChevronRight size={14} className="text-muted-foreground" />
              <span className="text-sm text-foreground truncate max-w-[160px]">
                {title}
              </span>
            </>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-2 pr-3">
        <IconButton onClick={onPlus}>
          <Plus size={16} />
        </IconButton>

        <div className="relative">
          <IconButton onClick={handleBell} className="relative">
            <Bell size={16} />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 size-3.5 rounded-full bg-primary text-primary-foreground text-[10px] leading-none font-medium flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </IconButton>
          <AnimatePresence>
            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 z-50">
                <NotificationDropdown onClose={() => setNotifOpen(false)} />
              </div>
            )}
          </AnimatePresence>
        </div>

        <IconButton onClick={onEllipsis} variant="accent">
          <Ellipsis size={16} />
        </IconButton>
      </div>
    </div>
  )
}

function IconButton({
  children,
  onClick,
  className,
  variant = 'plain',
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'plain' | 'accent'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'size-7 rounded-lg inline-flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors',
        variant === 'accent' ? 'bg-accent hover:bg-accent/80' : 'hover:bg-muted',
        className,
      )}
    >
      {children}
    </button>
  )
}
