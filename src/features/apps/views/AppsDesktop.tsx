import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  BarChart2,
  Bell,
  Command,
  LayoutDashboard,
  Pin,
  Search,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { nanoid } from 'nanoid'
import { ChangComposer } from '@/components/chang/composer'
import { useChatStore, getChangResponse } from '@/store/chat-store'

type AppItem = {
  id: string
  icon: LucideIcon
  color: number
  title: string
  subtitle: string
  pinned: boolean
}

const INITIAL_APPS: AppItem[] = [
  { id: 'a1', icon: Command, color: 2, title: 'Tra cứu nhanh', subtitle: 'Mẫu tra cứu thông tin nhanh chóng', pinned: true },
  { id: 'a2', icon: Bell, color: 3, title: 'Khảo sát sau Đào tạo', subtitle: 'Lớp học Quản trị Nguồn nhân lực', pinned: false },
]

const INITIAL_MY_APPS: AppItem[] = [
  { id: 'm1', icon: Sparkles, color: 5, title: 'Chỉ số Đánh giá Cảm xúc', subtitle: 'Đánh giá cảm xúc để biết những đồng nghiệp đang vui hay buồn', pinned: true },
  { id: 'm2', icon: LayoutDashboard, color: 6, title: 'Chỉ số Nhân sự', subtitle: 'Theo dõi chỉ số Nhân sự của đơn vị', pinned: false },
  { id: 'm3', icon: BarChart2, color: 4, title: 'Theo dõi Ngân sách đơn vị', subtitle: 'Tra soát tình hình tài chính của Đơn vị', pinned: false },
]

function AppCard({ app, onPin, onClick }: { app: AppItem; onPin: () => void; onClick: () => void }) {
  const { icon: Icon, color, title, subtitle, pinned } = app
  return (
    <div
      onClick={onClick}
      className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card cursor-pointer hover:border-primary/30 hover:bg-primary/5 active:scale-[0.99] transition-all"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `hsl(var(--chart-${color}) / 0.18)`, color: `hsl(var(--chart-${color}))` }}
      >
        <Icon size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-[15px] leading-tight">{title}</div>
        <div className="text-[13px] text-muted-foreground mt-1 leading-snug line-clamp-2">{subtitle}</div>
      </div>
      <button
        onClick={e => { e.stopPropagation(); onPin() }}
        className="shrink-0 p-1 rounded-md hover:bg-muted transition-colors"
      >
        <Pin
          size={16}
          fill={pinned ? 'currentColor' : 'none'}
          className={pinned ? 'text-info' : 'text-muted-foreground'}
        />
      </button>
    </div>
  )
}

export function AppsDesktop() {
  const navigate = useNavigate()
  const createConversation = useChatStore((s) => s.createConversation)
  const addChangMsg = useChatStore((s) => s.addChangMsg)
  const [apps, setApps] = useState(INITIAL_APPS)
  const [myApps, setMyApps] = useState(INITIAL_MY_APPS)

  function togglePin(list: AppItem[], setList: typeof setApps, id: string): void {
    setList(list.map(a => a.id === id ? { ...a, pinned: !a.pinned } : a))
  }

  function openApp(app: AppItem): void {
    const id = nanoid(8)
    createConversation(id, `Mở ứng dụng: ${app.title}`)
    const res = getChangResponse(app.title)
    setTimeout(() => { addChangMsg(id, res.content, res.tasks) }, 1800)
    navigate({ to: '/chat/$chatId', params: { chatId: id } })
  }

  function handleSend(text: string): void {
    const id = nanoid(8)
    createConversation(id, text)
    const res = getChangResponse(text)
    setTimeout(() => { addChangMsg(id, res.content, res.tasks) }, 1800)
    navigate({ to: '/chat/$chatId', params: { chatId: id } })
  }

  return (
    <>
      <div className="h-14 px-6 flex items-center gap-3 border-b border-border shrink-0">
        <h1 className="text-[15px] font-semibold flex-1">Ứng dụng</h1>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
          <Search size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6 no-scrollbar">
        <div className="grid grid-cols-2 gap-3">
          {apps.map(a => (
            <AppCard key={a.id} app={a}
              onPin={() => togglePin(apps, setApps, a.id)}
              onClick={() => openApp(a)} />
          ))}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 rounded-sm bg-foreground" />
            <div className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">
              Các ứng dụng của bạn
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {myApps.map(a => (
              <AppCard key={a.id} app={a}
                onPin={() => togglePin(myApps, setMyApps, a.id)}
                onClick={() => openApp(a)} />
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <ChangComposer tabs onSend={handleSend} />
      </div>
    </>
  )
}
