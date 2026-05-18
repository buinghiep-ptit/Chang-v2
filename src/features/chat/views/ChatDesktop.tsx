import { useEffect, useRef } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { AnimatePresence } from 'framer-motion'
import { ChangComposer } from '@/components/chang/composer'
import { ChangTopBar } from '@/components/chang/top-bar'
import { MessageBubble, ThinkingBubble } from '@/components/chang/message-bubble'
import { useChatStore } from '@/store/chat-store'
import { useChatStream } from '@/hooks/use-chat-stream'

interface ChatDesktopProps {
  chatId: string
}

export function ChatDesktop({ chatId }: ChatDesktopProps) {
  const navigate = useNavigate()
  const conversations = useChatStore((s) => s.conversations)
  const addUserMsg = useChatStore((s) => s.addUserMsg)
  const conv = conversations.find((c) => c.id === chatId)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { sendMessage } = useChatStream(chatId)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conv?.messages.length, conv?.status])

  function handleSend(text: string, files?: File[]): void {
    if (!conv || conv.status !== 'idle') return
    const attachments = files?.map((f) => ({
      name: f.name,
      type: f.type,
      objectUrl: URL.createObjectURL(f),
    }))
    addUserMsg(chatId, text, attachments)
    sendMessage(text, conv.backendConvId ?? null)
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

  const isDisabled = conv.status !== 'idle'

  return (
    <>
      <ChangTopBar
        variant="desktop"
        title={conv.title}
        notificationCount={9}
      />

      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3 no-scrollbar max-w-3xl w-full mx-auto">
        <AnimatePresence initial={false}>
          {conv.messages.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isStreaming={conv.status === 'streaming' && i === conv.messages.length - 1}
            />
          ))}

          {conv.status === 'thinking' && (
            <ThinkingBubble key="thinking" botName={conv.botName} botAvatar={conv.botAvatar} />
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      <div className="px-6 pb-6 max-w-3xl w-full mx-auto">
        <ChangComposer onSend={handleSend} disabled={isDisabled} />
      </div>
    </>
  )
}
