import { useState } from 'react'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { AnimatePresence } from 'framer-motion'
import {
  Bot,
  Briefcase,
  ChevronRight,
  ChevronsUpDown,
  Code,
  DollarSign,
  Ellipsis,
  Frame,
  History,
  Shapes,
  Users,
  GitBranch,
} from 'lucide-react'
import { Mascot } from '@/components/chang/mascot'
import { AppSwitcherDropdown } from '@/components/chang/app-switcher-dropdown'
import { UserMenuDropdown } from '@/components/chang/user-menu-dropdown'
import { useChatStore } from '@/store/chat-store'
import { cn } from '@/lib/utils'

export function SidebarNav() {
  const { location } = useRouterState()
  const navigate = useNavigate()
  const conversations = useChatStore((s) => s.conversations)
  const [appSwitcherOpen, setAppSwitcherOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  function openConversation() {
    const latest = conversations[0]
    if (latest) navigate({ to: '/chat/$chatId', params: { chatId: latest.id } })
  }

  const isTasks = location.pathname === '/tasks'
  const isHome = location.pathname === '/'

  return (
    <div className="flex flex-col h-full w-full bg-sidebar text-sidebar-foreground">
      {/* Header */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setAppSwitcherOpen((v) => !v)}
          className="w-full p-2 flex items-center gap-2 hover:bg-sidebar-accent/60 transition-colors text-left"
        >
          <Link
            to="/"
            onClick={(e) => e.stopPropagation()}
            className="size-8 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground inline-flex items-center justify-center overflow-hidden"
            aria-label="Chang"
          >
            <Mascot size={20} className="invert" />
          </Link>
          <div className="flex-1 min-w-0 flex flex-col">
            <span className="text-sm font-bold leading-5 truncate">Chang</span>
            <span className="text-xs leading-4 text-sidebar-foreground/70 truncate">
              Digital Workforce
            </span>
          </div>
          <span className="size-6 rounded-md inline-flex items-center justify-center text-sidebar-foreground/70">
            <ChevronsUpDown size={16} />
          </span>
        </button>
        <AnimatePresence>
          {appSwitcherOpen && (
            <div className="absolute left-2 right-2 top-full mt-1 z-50">
              <AppSwitcherDropdown onClose={() => setAppSwitcherOpen(false)} className="w-full" />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Group: Chức năng */}
      <Group label="Chức năng">
        <MenuItem icon={Bot} label="Quản lý Nhân sự số" active={isHome} onClick={() => navigate({ to: '/' })} />
        <MenuItem icon={Briefcase} label="Công việc" badge="9" active={isTasks} onClick={() => navigate({ to: '/tasks' })} />
        <MenuItem icon={Shapes} label="Ứng dụng" />
        <MenuItem icon={History} label="Lịch sử hội thoại" onClick={openConversation} />
      </Group>

      {/* Group: Nhân sự số */}
      <Group label="Nhân sự số">
        <MenuItem icon={Frame} label="Chang" highlight onClick={openConversation} />
      </Group>

      {/* Group: Chuyên gia */}
      <Group label="Chuyên gia" className="flex-1 min-h-0">
        <MenuItem icon={Users} label="FHR" muted />
        <MenuItem icon={GitBranch} label="FTQ" muted />
        <MenuItem icon={DollarSign} label="FIM" muted />
        <MenuItem icon={Code} label="DSC" muted />
        <MenuItem icon={Ellipsis} label="Xem thêm" muted />
      </Group>

      {/* Footer */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setUserMenuOpen((v) => !v)}
          className="w-full p-2 flex items-center gap-2 hover:bg-sidebar-accent/60 transition-colors text-left"
        >
          <div className="size-8 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground inline-flex items-center justify-center text-xs font-medium">
            PT
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold leading-5 truncate">Nguyễn Tuấn Phong</div>
            <div className="text-xs leading-4 text-sidebar-foreground/70 truncate">
              phongnt31@fpt.com
            </div>
          </div>
          <span className="size-6 rounded-md inline-flex items-center justify-center text-sidebar-foreground/70">
            <ChevronsUpDown size={16} />
          </span>
        </button>
        <AnimatePresence>
          {userMenuOpen && (
            <div className="absolute left-2 right-2 bottom-full mb-1 z-50">
              <UserMenuDropdown onClose={() => setUserMenuOpen(false)} className="w-full" />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Group({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('p-2 flex flex-col gap-0.5', className)}>
      <div className="h-8 px-2 flex items-center text-xs leading-4 text-sidebar-foreground/70">
        {label}
      </div>
      {children}
    </div>
  )
}

interface MenuItemProps {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  badge?: string
  active?: boolean
  highlight?: boolean
  muted?: boolean
  onClick?: () => void
}

function MenuItem({
  icon: Icon,
  label,
  badge,
  active,
  highlight,
  muted,
  onClick,
}: MenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-8 px-2 gap-2 rounded-lg w-full flex items-center text-sm transition-colors',
        highlight && 'bg-sidebar-primary text-sidebar-primary-foreground pr-2',
        !highlight && active && 'bg-sidebar-accent text-sidebar-accent-foreground',
        !highlight && !active && 'text-sidebar-foreground hover:bg-sidebar-accent',
        muted && !active && 'opacity-80',
      )}
    >
      <Icon size={16} className="shrink-0" />
      <span className="flex-1 text-left truncate">{label}</span>
      {badge && (
        <span className="min-w-5 h-5 px-1.5 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-xs font-medium inline-flex items-center justify-center">
          {badge}
        </span>
      )}
      {!highlight && !badge && (
        <ChevronRight size={14} className="shrink-0 text-sidebar-foreground/50" />
      )}
    </button>
  )
}
