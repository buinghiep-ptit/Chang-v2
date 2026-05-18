import { useEffect, useRef } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { AnimatePresence } from 'framer-motion'
import { ChangComposer } from '@/components/chang/composer'
import { ChangTopBar } from '@/components/chang/top-bar'
import { MessageBubble, ThinkingBubble } from '@/components/chang/message-bubble'
import { useChatStore } from '@/store/chat-store'
import { useChatStream } from '@/hooks/use-chat-stream'
import { useDrawer } from '@/components/layout/app-layout'

interface ChatMobileProps {
  chatId: string
}

export function ChatMobile({ chatId }: ChatMobileProps) {
  const navigate = useNavigate()
  const { openDrawer } = useDrawer()
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
        Không tìm thấy cuộc trò chuyện.
      </div>
    )
  }

  const isDisabled = conv.status !== 'idle'

  return (
    <>
      <ChangTopBar
        title={conv.title.length > 24 ? conv.title.slice(0, 24) + '…' : conv.title}
        onMenu={openDrawer}
        onPlus={() => navigate({ to: '/' })}
      />

      <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3 no-scrollbar md:px-6 md:max-w-2xl md:mx-auto md:w-full">
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

      <div className="md:max-w-2xl md:mx-auto md:w-full">
        <ChangComposer onSend={handleSend} disabled={isDisabled} />
      </div>
    </>
  )
}
