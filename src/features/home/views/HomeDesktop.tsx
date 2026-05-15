import { useNavigate } from '@tanstack/react-router'
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Globe,
  Info,
  Lightbulb,
  Lock,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { nanoid } from 'nanoid'
import { ChangComposer } from '@/components/chang/composer'
import { useChatStore, getChangResponse } from '@/store/chat-store'
import { cn } from '@/lib/utils'

const CHART_COLORS: Record<number, string> = {
  0: 'hsl(var(--destructive))',
  1: 'hsl(var(--chart-1))',
  2: 'hsl(var(--chart-2))',
  3: 'hsl(var(--chart-3))',
  4: 'hsl(var(--chart-4))',
  5: 'hsl(var(--chart-5))',
  6: 'hsl(var(--chart-6))',
}

const GRADIENT_BORDERS: Record<number, string> = {
  0: 'linear-gradient(135deg, #f5576c, #f093fb)',
  1: 'linear-gradient(135deg, #f6d365, #fda085)',
  2: 'linear-gradient(135deg, #4facfe, #00f2fe)',
  3: 'linear-gradient(135deg, #43e97b, #38f9d7)',
  4: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  5: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
  6: 'linear-gradient(135deg, #fddb92, #d1fdff)',
}

type Suggestion = { icon: LucideIcon; color: number; text: string }

const SUGGESTIONS: Suggestion[] = [
  { icon: Lightbulb, color: 3, text: 'Tra cứu gói cước' },
  { icon: Info, color: 2, text: 'Thông tin hợp đồng' },
  { icon: AlertTriangle, color: 0, text: 'Vấn đề đường truyền theo Số điện thoại' },
  { icon: Bell, color: 1, text: 'Nâng cấp gói cước cho Khách hàng' },
  { icon: Globe, color: 3, text: 'Tạm dừng dịch vụ' },
  { icon: CheckCircle, color: 4, text: 'Kịch bản tư vấn' },
  { icon: Sparkles, color: 0, text: 'Lấy QR hỗ trợ khách hàng' },
  { icon: Lock, color: 3, text: 'Khoá hợp đồng' },
  { icon: Info, color: 2, text: 'Clear Checklist' },
  { icon: AlertTriangle, color: 0, text: 'Các gói FPT Play' },
  { icon: Bell, color: 1, text: 'Lịch chiếu phim' },
  { icon: Globe, color: 3, text: 'Lịch thi đấu Giải bóng đá Ngoại hạng Anh' },
]

export function HomeDesktop() {
  const navigate = useNavigate()
  const createConversation = useChatStore((s) => s.createConversation)
  const addChangMsg = useChatStore((s) => s.addChangMsg)

  function startChat(text: string): void {
    const id = nanoid(8)
    createConversation(id, text)
    navigate({ to: '/chat/$chatId', params: { chatId: id } })
    const res = getChangResponse(text)
    setTimeout(() => {
      addChangMsg(id, res.content, res.tasks)
    }, 1800)
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6 no-scrollbar">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Hôm nay bạn muốn biết điều gì?
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Chọn gợi ý bên dưới hoặc nhập câu hỏi của bạn
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
          {SUGGESTIONS.map((s, i) => (
            <div
              key={i}
              style={{ background: GRADIENT_BORDERS[s.color], padding: 1, borderRadius: 12 }}
              className="active:scale-[0.97] transition-transform"
            >
              <button
                onClick={() => startChat(s.text)}
                className={cn(
                  'w-full inline-flex items-center gap-2 px-3.5 py-3 rounded-[11px] bg-card text-[13px] text-left',
                  'hover:bg-primary/5 transition-colors',
                )}
              >
                <s.icon size={16} style={{ color: CHART_COLORS[s.color] }} />
                <span>{s.text}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-6">
        <ChangComposer onSend={startChat} />
      </div>
    </>
  )
}
