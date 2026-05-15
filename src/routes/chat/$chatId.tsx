import { createFileRoute } from '@tanstack/react-router'
import { ChatPage } from '@/features/chat/ChatPage'

export const Route = createFileRoute('/chat/$chatId')({
  component: function ChatRoute() {
    const { chatId } = Route.useParams()
    return <ChatPage chatId={chatId} />
  },
})
