import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { Grid2x2, Home, ListTodo, MessageCircle, User } from 'lucide-react'
import { nanoid } from 'nanoid'
import { useChatStore, getChangResponse } from '@/store/chat-store'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const { location } = useRouterState()
  const navigate = useNavigate()
  const conversations = useChatStore((s) => s.conversations)
  const createConversation = useChatStore((s) => s.createConversation)
  const addChangMsg = useChatStore((s) => s.addChangMsg)

  function newChat() {
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

  const isChat = location.pathname.startsWith('/chat')

  const item = (active: boolean) =>
    cn(
      'flex-1 flex flex-col items-center justify-center pt-2 pb-1 text-[11px] font-medium transition-colors',
      active ? 'text-primary' : 'text-muted-foreground',
    )

  const pill = (active: boolean) =>
    cn(
      'w-12 h-7 rounded-full flex items-center justify-center mb-0.5 transition-all duration-200',
      active ? 'bg-primary/10' : '',
    )

  return (
    <nav
      className="md:hidden shrink-0 flex items-stretch border-t border-border bg-background/95 backdrop-blur-lg"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <Link to="/" className={item(location.pathname === '/')}>
        <div className={pill(location.pathname === '/')}>
          <Home size={20} strokeWidth={location.pathname === '/' ? 2.2 : 1.75} />
        </div>
        Trang chủ
      </Link>

      <button onClick={newChat} className={item(isChat)}>
        <div className={pill(isChat)}>
          <MessageCircle size={20} strokeWidth={isChat ? 2.2 : 1.75} />
        </div>
        Chang
      </button>

      <Link to="/apps" className={item(location.pathname === '/apps')}>
        <div className={pill(location.pathname === '/apps')}>
          <Grid2x2 size={20} strokeWidth={location.pathname === '/apps' ? 2.2 : 1.75} />
        </div>
        Ứng dụng
      </Link>

      <Link to="/tasks" className={item(location.pathname === '/tasks')}>
        <div className={pill(location.pathname === '/tasks')}>
          <ListTodo size={20} strokeWidth={location.pathname === '/tasks' ? 2.2 : 1.75} />
        </div>
        Công việc
      </Link>

      <Link to="/menu" className={item(location.pathname === '/menu')}>
        <div className={pill(location.pathname === '/menu')}>
          <User size={20} strokeWidth={location.pathname === '/menu' ? 2.2 : 1.75} />
        </div>
        Menu
      </Link>
    </nav>
  )
}
