import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Check, Ellipsis, Lock, Plane, Search, ShieldCheck, X, type LucideIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { nanoid } from 'nanoid'
import { ChangComposer } from '@/components/chang/composer'
import { useChatStore, getChangResponse } from '@/store/chat-store'
import { cn } from '@/lib/utils'

type TaskStatus = 'pending' | 'approved' | 'rejected'

type TaskItem = {
  id: string
  icon: LucideIcon
  color: number
  title: string
  subtitle: string
  actions?: boolean
  status: TaskStatus
}

type TaskGroup = { group: string; items: TaskItem[] }

const INITIAL: TaskGroup[] = [
  {
    group: 'Dịch vụ nhân sự',
    items: [
      { id: 't1', icon: ShieldCheck, color: 0, title: 'Bồi thường bảo hiểm của TienNT34', subtitle: 'Đang đối chiếu quyền lợi bảo hiểm và anh PhongNT31 sẽ đưa ra quyết định chấp thuận hoặc từ chối.', status: 'pending' },
    ],
  },
  {
    group: 'Cấp quyền VPN',
    items: [
      { id: 't2', icon: Lock, color: 5, title: 'Cấp quyền VPN cho ThangPV', subtitle: 'Đã đối chiếu quy định, anh ThangPV đủ điều kiện cấp VPN. Anh hãy đưa ra quyết định chấp thuận hoặc từ chối.', actions: true, status: 'pending' },
    ],
  },
  {
    group: 'Di chuyển',
    items: [
      { id: 't3', icon: Plane, color: 6, title: 'Đặt vé máy bay cho PhongNT31', subtitle: 'Đã hoàn thành tiếp nhận và xử lý các thông tin của PhongNT31 với hãng, đang thực hiện các thủ tục đặt vé máy bay.', status: 'pending' },
    ],
  },
  { group: 'Hỗ trợ Kinh doanh', items: [] },
]

function TaskCard({ task, onApprove, onReject }: { task: TaskItem; onApprove: () => void; onReject: () => void }) {
  const { icon: Icon, color, title, subtitle, actions, status } = task
  return (
    <motion.div layout className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `hsl(var(--chart-${color}) / 0.18)`, color: `hsl(var(--chart-${color}))` }}
        >
          <Icon size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[15px] leading-tight">{title}</div>
          <div className="text-[13px] text-muted-foreground mt-1 leading-snug">{subtitle}</div>
        </div>
        {status !== 'pending' ? (
          <div className={cn(
            'shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full self-start',
            status === 'approved' ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive',
          )}>
            {status === 'approved' ? 'Đã duyệt' : 'Từ chối'}
          </div>
        ) : actions && (
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={onApprove}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors text-[13px] font-medium">
              <Check size={14} />Duyệt
            </button>
            <button onClick={onReject}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-[13px] font-medium">
              <X size={14} />Từ chối
            </button>
            <button className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
              <Ellipsis size={16} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function TasksDesktop() {
  const navigate = useNavigate()
  const createConversation = useChatStore((s) => s.createConversation)
  const addChangMsg = useChatStore((s) => s.addChangMsg)
  const [groups, setGroups] = useState(INITIAL)

  function handleSend(text: string): void {
    const id = nanoid(8)
    createConversation(id, text)
    const res = getChangResponse(text)
    setTimeout(() => { addChangMsg(id, res.content, res.tasks) }, 1800)
    navigate({ to: '/chat/$chatId', params: { chatId: id } })
  }

  function updateStatus(taskId: string, status: TaskStatus): void {
    setGroups(gs => gs.map(g => ({
      ...g,
      items: g.items.map(t => t.id === taskId ? { ...t, status } : t),
    })))
  }

  return (
    <>
      <div className="h-14 px-6 flex items-center gap-3 border-b border-border shrink-0">
        <h1 className="text-[15px] font-semibold flex-1">Quản lý Công việc</h1>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
          <Search size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4 no-scrollbar">
        <AnimatePresence>
          {groups.filter(g => g.items.length > 0).map(g => (
            <div key={g.group} className="flex flex-col gap-2">
              <div className="px-3 py-2 rounded-xl border border-border bg-card text-[13px] font-medium">
                {g.group}
              </div>
              {g.items.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onApprove={() => updateStatus(task.id, 'approved')}
                  onReject={() => updateStatus(task.id, 'rejected')}
                />
              ))}
            </div>
          ))}
        </AnimatePresence>
      </div>

      <div className="px-6 pb-6">
        <ChangComposer tabs onSend={handleSend} />
      </div>
    </>
  )
}
