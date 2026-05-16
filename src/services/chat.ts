import { streamPost } from '@/lib/http'
import type { StreamEvent } from '@/types/stream'

const AGENT_BASE_URL = import.meta.env.VITE_AGENT_BASE_URL ?? ''
const AGENT_ID = import.meta.env.VITE_AGENT_ID ?? ''

function buildStreamUrl(): string {
  return `${AGENT_BASE_URL}/ai-agent/api/hrai-portal/agent/${AGENT_ID}/chat?isStream=true`
}

interface StreamChatOptions {
  onEvent: (event: StreamEvent) => void
  signal?: AbortSignal
}

export const chatService = {
  streamChat: async (
    text: string,
    conversationId: string | null,
    options: StreamChatOptions,
  ): Promise<void> => {
    await streamPost(
      buildStreamUrl(),
      { text, conversationId, attachments: null },
      (line) => {
        try {
          const event = JSON.parse(line) as StreamEvent
          options.onEvent(event)
        } catch {
          // ignore malformed NDJSON lines
        }
      },
      options.signal,
    )
  },
}
