import { useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCheck, MessageSquareWarning, X } from 'lucide-react'
import { useClickOutside } from '@/hooks/use-click-outside'
import { cn } from '@/lib/utils'

interface NotificationItem {
  id: string
  title: string
  body?: string
  time: string
  withIcon?: boolean
}

const ITEMS: NotificationItem[] = [
  { id: '1', title: 'Create an account', body: 'ok ngon rồi!', time: '1 ngày trước', withIcon: true },
  { id: '2', title: 'Create an account', body: 'Quy định đấu tố 2026 cần bạn phê duyệt trước khi FHR thực hiện tiếp Phase tiếp theo', time: '2 ngày trước', withIcon: true },
  { id: '3', title: 'Create an account', body: 'CV_NguyenVanA đã được tuyển dụng thành công trên các hệ thống nội bộ', time: '2 ngày trước' },
  { id: '4', title: 'Create an account', body: 'mày không làm thì để anh làm!', time: '2 ngày trước' },
]

interface NotificationDropdownProps {
  onClose: () => void
  className?: string
}

export function NotificationDropdown({ onClose, className }: NotificationDropdownProps) {
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
        'w-[350px] max-h-[416px] rounded-lg border border-border bg-popover text-popover-foreground shadow-xs overflow-hidden flex flex-col',
        className,
      )}
    >
      <div className="p-1 flex items-center gap-1">
        <div className="flex-1 px-2 py-1.5 text-sm font-medium">Thông báo</div>
        <button
          type="button"
          aria-label="Đánh dấu tất cả đã đọc"
          className="size-6 rounded-md inline-flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
        >
          <CheckCheck size={16} />
        </button>
        <button
          type="button"
          aria-label="Đóng"
          onClick={onClose}
          className="size-6 rounded-md inline-flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="h-px bg-border mx-0" />

      <div className="flex-1 overflow-y-auto no-scrollbar py-1">
        {ITEMS.map((it) => (
          <button
            key={it.id}
            type="button"
            className="w-full text-left px-3 py-2 hover:bg-muted/60 transition-colors flex flex-col gap-1"
          >
            <div className="flex items-start gap-2">
              {it.withIcon && (
                <div className="size-6 rounded-md inline-flex items-center justify-center text-muted-foreground shrink-0">
                  <MessageSquareWarning size={16} />
                </div>
              )}
              <div className="flex-1 min-w-0 pt-0.5 text-sm font-medium truncate">
                {it.title}
              </div>
            </div>
            {it.body && (
              <div className={cn('text-sm text-muted-foreground leading-5', it.withIcon && 'pl-8')}>
                {it.body}
              </div>
            )}
            <div className={cn('text-xs text-muted-foreground/80', it.withIcon && 'pl-8')}>
              {it.time}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  )
}
