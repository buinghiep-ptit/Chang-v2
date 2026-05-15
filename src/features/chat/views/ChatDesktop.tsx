import { useEffect, useRef } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { AnimatePresence } from 'framer-motion'
import { ChangComposer } from '@/components/chang/composer'
import { MessageBubble, ThinkingBubble } from '@/components/chang/message-bubble'
import { useChatStore, getChangResponse } from '@/store/chat-store'

interface ChatDesktopProps {
  chatId: string
}

export function ChatDesktop({ chatId }: ChatDesktopProps) {
  const navigate = useNavigate()
  const conversations = useChatStore((s) => s.conversations)
  const addUserMsg = useChatStore((s) => s.addUserMsg)
  const addChangMsg = useChatStore((s) => s.addChangMsg)
  const conv = conversations.find((c) => c.id === chatId)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conv?.messages.length, conv?.status])

  function handleSend(text: string, files?: File[]): void {
    if (!conv || conv.status === 'thinking') return
    const attachments = files?.map((f) => ({
      name: f.name,
      type: f.type,
      objectUrl: URL.createObjectURL(f),
    }))
    addUserMsg(chatId, text, attachments)
    const res = getChangResponse(text)
    setTimeout(() => {
      addChangMsg(chatId, res.content, res.tasks)
    }, 1800)
  }

  if (!conv) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        Không tìm thấy cuộc trò chuyện.{' '}
        <button
          onClick={() => navigate({ to: '/' })}
          className="ml-1 text-primary hover:underline"
        >
          Về trang chủ
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Conversation title bar — sidebar handles navigation */}
      <div className="h-14 px-6 flex items-center gap-3 border-b border-border shrink-0">
        <h2 className="font-semibold text-[15px] truncate flex-1">
          {conv.title}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3 no-scrollbar max-w-3xl w-full mx-auto">
        <AnimatePresence initial={false}>
          {conv.messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {conv.status === 'thinking' && <ThinkingBubble key="thinking" />}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      <div className="px-6 pb-6 max-w-3xl w-full mx-auto">
        <ChangComposer tabs onSend={handleSend} disabled={conv.status === 'thinking'} />
      </div>
    </>
  )
}
