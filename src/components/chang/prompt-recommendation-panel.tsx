import { DollarSign, ListTodo, Newspaper, QrCode, X, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PromptRecommendationPanelProps {
  onClose: () => void
  onSelect?: (prompt: string) => void
  className?: string
}

interface Chip {
  icon: LucideIcon
  label: string
}

interface Section {
  label: string
  chips: Chip[]
}

const SECTIONS: Section[] = [
  {
    label: 'Dịch vụ Khách hàng',
    chips: [
      { icon: Newspaper, label: 'Tra cứu Hợp đồng' },
      { icon: DollarSign, label: 'Tra cứu Gói cước' },
      { icon: QrCode, label: 'Lịch chiếu Film' },
    ],
  },
  {
    label: 'Bán hàng & Triển khai',
    chips: [
      { icon: ListTodo, label: 'Clear Checklist' },
      { icon: QrCode, label: 'Lấy QR HTKH' },
      { icon: ListTodo, label: 'Báo cáo vấn đề đường truyền' },
      { icon: QrCode, label: 'Thông tin thanh toán' },
    ],
  },
  {
    label: 'Dịch vụ Nhân sự',
    chips: [
      { icon: ListTodo, label: 'Xin nghỉ phép' },
      { icon: ListTodo, label: 'Tạo cuộc họp' },
    ],
  },
]

export function PromptRecommendationPanel({
  onClose,
  onSelect,
  className,
}: PromptRecommendationPanelProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="px-3 pt-3 pb-1 flex items-center gap-1.5">
        <div className="flex-1 text-sm font-medium leading-5">Gợi ý nhanh</div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="size-6 rounded-lg inline-flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <div className="h-px bg-border mx-3" />
      <div className="px-3 pt-2 pb-1.5 flex flex-col gap-2">
        {SECTIONS.map((s) => (
          <div key={s.label} className="flex flex-col">
            <div className="h-8 px-2 py-1.5 flex items-center text-sm font-medium leading-5 text-popover-foreground">
              {s.label}
            </div>
            <div className="flex flex-wrap gap-2">
              {s.chips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => onSelect?.(chip.label)}
                  className="h-8 px-2.5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background shadow-xs text-sm font-medium hover:bg-muted transition-colors"
                >
                  <chip.icon size={16} className="shrink-0" />
                  <span className="whitespace-nowrap">{chip.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
