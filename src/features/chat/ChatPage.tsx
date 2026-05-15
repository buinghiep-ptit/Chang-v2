import { useAppMode } from '@/app/app-mode-context'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { ChatMobile } from './views/ChatMobile'
import { ChatDesktop } from './views/ChatDesktop'

interface ChatPageProps {
  chatId: string
}

export function ChatPage({ chatId }: ChatPageProps) {
  const { isEmbedded } = useAppMode()
  const isMobile = useIsMobile()

  if (isEmbedded || isMobile) return <ChatMobile chatId={chatId} />
  return <ChatDesktop chatId={chatId} />
}
