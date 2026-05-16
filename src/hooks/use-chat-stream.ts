import { useCallback, useRef } from 'react'
import { flushSync } from 'react-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useChatStore } from '@/store/chat-store'
import { chatService } from '@/services/chat'
import type { StreamEvent } from '@/types/stream'

export function useChatStream(convId: string) {
  const setThinking = useChatStore((s) => s.setThinking)
  const handleInProgress = useChatStore((s) => s.handleInProgress)
  const finishStream = useChatStore((s) => s.finishStream)
  const setStatus = useChatStore((s) => s.setStatus)

  const abortRef = useRef<AbortController | null>(null)
  const streamingStartedRef = useRef(false)

  const handleEvent = useCallback(
    (event: StreamEvent) => {
      if (event.type === 'thinking') {
        flushSync(() => setThinking(convId, event.name, event.avatar))
      } else if (event.type === 'in-progress') {
        if (!streamingStartedRef.current) {
          streamingStartedRef.current = true
          flushSync(() => handleInProgress(convId, event.name, event.avatar, event.text))
        } else {
          handleInProgress(convId, event.name, event.avatar, event.text)
        }
      } else if (event.type === 'final') {
        streamingStartedRef.current = false
        flushSync(() =>
          finishStream(convId, event.text, event.name, event.avatar, event.conversationId),
        )
      }
    },
    [convId, setThinking, handleInProgress, finishStream],
  )

  const { mutate } = useMutation({
    mutationFn: async ({
      text,
      conversationId,
    }: {
      text: string
      conversationId: string | null
    }) => {
      streamingStartedRef.current = false
      abortRef.current = new AbortController()
      await chatService.streamChat(text, conversationId, {
        onEvent: handleEvent,
        signal: abortRef.current.signal,
      })
    },
    onError: (err) => {
      if ((err as Error).name === 'AbortError') return
      console.error('chat stream failed', err)
      setStatus(convId, 'idle')
      toast.error('Có lỗi xảy ra, vui lòng thử lại')
    },
  })

  const sendMessage = useCallback(
    (text: string, conversationId: string | null) => {
      mutate({ text, conversationId })
    },
    [mutate],
  )

  const abort = useCallback(() => {
    abortRef.current?.abort()
    setStatus(convId, 'idle')
  }, [convId, setStatus])

  return { sendMessage, abort }
}
