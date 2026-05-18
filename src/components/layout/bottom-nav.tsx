import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { Bot, Home, ListTodo } from 'lucide-react'
import { nanoid } from 'nanoid'
import { useChatStore, getChangResponse } from '@/store/chat-store'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const { location } = useRouterState()
  const navigate = useNavigate()
  const conversations = useChatStore((s) => s.conversations)
  const createConversation = useChatStore((s) => s.createConversation)
  const addChangMsg = useChatStore((s) => s.addChangMsg)

  function openChat() {
    const latest = conversations[0]
    if (latest) {
      navigate({ to: '/chat/$chatId', params: { chatId: latest.id } })
      return
    }
    const id = nanoid(8)
    createConversation(id, 'Xin chào Chang!')
    setTimeout(() => {
      const res = getChangResponse('hello')
      addChangMsg(id, res.content)
    }, 1200)
    navigate({ to: '/chat/$chatId', params: { chatId: id } })
  }

  const isHome = location.pathname === '/'
  const isChat = location.pathname.startsWith('/chat')
  const isTasks = location.pathname === '/tasks'

  return (
    <nav
      className="md:hidden shrink-0 flex items-stretch border-t border-border bg-background"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <NavLink to="/" active={isHome} label="Trang chủ">
        <Home size={20} strokeWidth={isHome ? 2.2 : 1.75} />
      </NavLink>

      <NavButton onClick={openChat} active={isChat} label="Chang">
        <Bot size={20} strokeWidth={isChat ? 2.2 : 1.75} />
      </NavButton>

      <NavLink to="/tasks" active={isTasks} label="Công việc">
        <ListTodo size={20} strokeWidth={isTasks ? 2.2 : 1.75} />
      </NavLink>
    </nav>
  )
}

const itemCls = (active: boolean) =>
  cn(
    'flex-1 flex flex-col items-center justify-center pt-2 pb-1 text-[11px] font-medium transition-colors',
    active ? 'text-foreground' : 'text-muted-foreground',
  )

const pillCls = (active: boolean) =>
  cn(
    'w-12 h-7 rounded-lg flex items-center justify-center mb-0.5 transition-all duration-200',
    active && 'bg-muted',
  )

function NavLink({
  to,
  active,
  label,
  children,
}: {
  to: string
  active: boolean
  label: string
  children: React.ReactNode
}) {
  return (
    <Link to={to} className={itemCls(active)}>
      <div className={pillCls(active)}>{children}</div>
      {label}
    </Link>
  )
}

function NavButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void
  active: boolean
  label: string
  children: React.ReactNode
}) {
  return (
    <button onClick={onClick} className={itemCls(active)}>
      <div className={pillCls(active)}>{children}</div>
      {label}
    </button>
  )
}
