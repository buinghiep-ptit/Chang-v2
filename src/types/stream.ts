export interface ThinkingEvent {
  type: 'thinking'
  name: string
  avatar: string
  text: string
  conversationId: string
}

export interface InProgressEvent {
  type: 'in-progress'
  name: string
  avatar: string
  text: string
  conversationId: string
}

export interface FinalEvent {
  type: 'final'
  text: string
  conversationId: string
  msgId: number
  name: string
  avatar: string
  assistantAgents: { name: string; avatar: string }[]
}

export type StreamEvent = ThinkingEvent | InProgressEvent | FinalEvent
