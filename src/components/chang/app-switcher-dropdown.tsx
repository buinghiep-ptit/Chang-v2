import { useRef } from 'react'
import { motion } from 'framer-motion'
import { School, Tent } from 'lucide-react'
import { Mascot } from './mascot'
import { useClickOutside } from '@/hooks/use-click-outside'
import { cn } from '@/lib/utils'

interface AppSwitcherDropdownProps {
  onClose: () => void
  className?: string
}

export function AppSwitcherDropdown({ onClose, className }: AppSwitcherDropdownProps) {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, onClose)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -4, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.98 }}
      transition={{ duration: 0.12 }}
      className={cn(
        'w-56 rounded-lg border border-border bg-popover text-popover-foreground shadow-xs overflow-hidden',
        className,
      )}
    >
      <div className="p-1">
        <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
          Chuyển hướng
        </div>
        <Row icon={<Mascot size={16} />} label="Chang: Digital Workforce" active />
        <Row icon={<Tent size={16} />} label="Multi-Agent Platform" />
      </div>
      <div className="h-px bg-border" />
      <div className="p-1">
        <Row icon={<School size={16} />} label="AI Foxskill" />
      </div>
    </motion.div>
  )
}

function Row({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <button
      type="button"
      className={cn(
        'w-full h-8 px-2 gap-2 rounded-md flex items-center text-sm transition-colors',
        active ? 'bg-muted' : 'hover:bg-muted/60',
      )}
    >
      <span className="size-4 inline-flex items-center justify-center shrink-0">{icon}</span>
      <span className="flex-1 text-left truncate">{label}</span>
    </button>
  )
}
