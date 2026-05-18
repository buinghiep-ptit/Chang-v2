import {
  DollarSign,
  FileText,
  Lightbulb,
  ListTodo,
  Newspaper,
  QrCode,
  type LucideIcon,
} from 'lucide-react'
import { Mascot } from '@/components/chang/mascot'
import { cn } from '@/lib/utils'

type Chip = { icon: LucideIcon; label: string }

const CHIPS: Chip[] = [
  { icon: Newspaper, label: 'Tra cứu Hợp đồng' },
  { icon: ListTodo, label: 'Clear Checklist' },
  { icon: DollarSign, label: 'Tra cứu Gói cước' },
  { icon: QrCode, label: 'Lấy QR HTKH' },
  { icon: ListTodo, label: 'Xin nghỉ phép' },
  { icon: QrCode, label: 'Lịch chiếu Film' },
  { icon: ListTodo, label: 'Báo cáo vấn đề đường truyền' },
  { icon: QrCode, label: 'Thông tin thanh toán' },
  { icon: ListTodo, label: 'Tạo cuộc họp' },
]

interface HomeHeroProps {
  onChipClick: (label: string) => void
  onAction?: (panel: 'recommendation' | 'template') => void
}

export function HomeHero({ onChipClick, onAction }: HomeHeroProps) {
  return (
    <>
      <HeroCard />
      <Greeting />
      <ChipGrid onClick={onChipClick} />
      <DividerLabel>HOẶC XEM THÊM TẠI</DividerLabel>
      <ActionRow onAction={onAction} />
    </>
  )
}

function HeroCard() {
  return (
    <div className="relative rounded-lg border border-border bg-card overflow-hidden">
      <div className="h-36 bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-end p-4 gap-2">
        <span className="text-sm font-light text-primary-foreground">Chang</span>
        <span className="text-primary-foreground/50">|</span>
        <span className="text-sm font-light text-primary-foreground">
          Digital Workforce Platform
        </span>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 top-[72px]">
        <div className="size-32 rounded-full bg-card border border-background flex items-center justify-center overflow-hidden shadow-xs">
          <Mascot size={120} />
        </div>
      </div>
      <div className="h-16" />
    </div>
  )
}

function Greeting() {
  return (
    <div className="flex flex-col items-center text-center gap-1">
      <h1 className="text-2xl leading-8 text-card-foreground">Chang nèe</h1>
      <p className="text-sm text-muted-foreground">
        Chang giúp gì được cho anh không?
      </p>
    </div>
  )
}

function ChipGrid({ onClick }: { onClick: (label: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {CHIPS.map((chip) => (
        <button
          key={chip.label}
          onClick={() => onClick(chip.label)}
          className={cn(
            'h-8 px-2.5 inline-flex items-center gap-1.5',
            'rounded-lg border border-border bg-background shadow-xs',
            'text-sm font-medium text-foreground',
            'hover:bg-muted transition-colors',
          )}
        >
          <chip.icon size={16} />
          {chip.label}
        </button>
      ))}
    </div>
  )
}

function DividerLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 border-t border-border" />
      <span className="text-xs leading-4 text-muted-foreground uppercase tracking-wide">
        {children}
      </span>
      <div className="flex-1 border-t border-border" />
    </div>
  )
}

function ActionRow({ onAction }: { onAction?: (panel: 'recommendation' | 'template') => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => onAction?.('recommendation')}
        className="h-8 px-2.5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background shadow-xs text-sm font-medium hover:bg-muted transition-colors"
      >
        <Lightbulb size={16} />
        Gợi ý nhanh
      </button>
      <button
        type="button"
        onClick={() => onAction?.('template')}
        className="h-8 px-2.5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background shadow-xs text-sm font-medium hover:bg-muted transition-colors"
      >
        <FileText size={16} />
        Mẫu Prompt
      </button>
    </div>
  )
}
