import { useEffect, useRef } from 'react'
import {
  BriefcaseBusiness,
  ChevronRight,
  Compass,
  Paperclip,
  Route,
  ScanFace,
  Shapes,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface PlusMenuProps {
  onClose: () => void
  onAttach: () => void
  onSelect?: (key: PlusMenuItemKey) => void
  className?: string
}

export type PlusMenuItemKey =
  | 'work'
  | 'apps'
  | 'people'
  | 'skills'
  | 'automation'

interface Item {
  key: PlusMenuItemKey
  icon: LucideIcon
  label: string
  badge?: string
}

const GROUP_A: Item[] = [
  { key: 'work', icon: BriefcaseBusiness, label: 'Công việc', badge: '9' },
  { key: 'apps', icon: Shapes, label: 'Ứng dụng' },
]

const GROUP_B: Item[] = [
  { key: 'people', icon: ScanFace, label: 'Tổng quan nhân sự' },
  { key: 'skills', icon: Compass, label: 'Kỹ năng' },
  { key: 'automation', icon: Route, label: 'Tự động hoá' },
]

export function PlusMenu({ onClose, onAttach, onSelect, className }: PlusMenuProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) onClose()
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      ref={ref}
      className={cn(
        'w-56 max-h-[416px] overflow-y-auto no-scrollbar',
        'rounded-lg border border-border bg-popover shadow-md',
        'flex flex-col',
        className,
      )}
    >
      <div className="pt-1 px-1 flex flex-col">
        <div className="h-8 px-2 py-1.5 flex items-center rounded-lg">
          <span className="flex-1 text-sm font-medium leading-5 text-popover-foreground">
            /Chang
          </span>
        </div>
        <MenuRow icon={Paperclip} label="Thêm tệp" onClick={onAttach} />
      </div>

      <Divider />

      <div className="px-1 flex flex-col">
        {GROUP_A.map((it) => (
          <MenuRow
            key={it.key}
            icon={it.icon}
            label={it.label}
            badge={it.badge}
            chevron
            onClick={() => onSelect?.(it.key)}
          />
        ))}
      </div>

      <Divider />

      <div className="px-1 pb-1 flex flex-col">
        {GROUP_B.map((it) => (
          <MenuRow
            key={it.key}
            icon={it.icon}
            label={it.label}
            chevron
            onClick={() => onSelect?.(it.key)}
          />
        ))}
      </div>
    </div>
  )
}

function MenuRow({
  icon: Icon,
  label,
  badge,
  chevron,
  onClick,
}: {
  icon: LucideIcon
  label: string
  badge?: string
  chevron?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-8 px-2 py-1.5 flex items-center gap-2 rounded-lg text-popover-foreground hover:bg-muted transition-colors"
    >
      <Icon size={16} className="shrink-0" />
      <span className="flex-1 text-left text-sm leading-5 truncate">{label}</span>
      {badge && (
        <span className="h-5 min-w-5 px-2.5 inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-medium leading-4">
          {badge}
        </span>
      )}
      {chevron && <ChevronRight size={16} className="shrink-0 text-muted-foreground" />}
    </button>
  )
}

function Divider() {
  return <div className="h-px bg-border my-1 mx-1" />
}
