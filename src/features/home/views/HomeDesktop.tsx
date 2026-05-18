import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { nanoid } from 'nanoid'
import { ChangComposer, type ComposerPanel } from '@/components/chang/composer'
import { ChangTopBar } from '@/components/chang/top-bar'
import { HomeHero } from './HomeHero'
import { useChatStore, getChangResponse } from '@/store/chat-store'

export function HomeDesktop() {
  const navigate = useNavigate()
  const createConversation = useChatStore((s) => s.createConversation)
  const addChangMsg = useChatStore((s) => s.addChangMsg)
  const [panel, setPanel] = useState<ComposerPanel>(null)

  function startChat(text: string): void {
    const id = nanoid(8)
    createConversation(id, text)
    navigate({ to: '/chat/$chatId', params: { chatId: id } })
    const res = getChangResponse(text)
    setTimeout(() => addChangMsg(id, res.content, res.tasks), 1800)
  }

  return (
    <>
      <ChangTopBar variant="desktop" notificationCount={9} />

      <div className="flex-1 overflow-y-auto bg-muted">
        <div className="max-w-[500px] mx-auto px-4 pt-20 pb-8 flex flex-col gap-6">
          <HomeHero onChipClick={startChat} onAction={setPanel} />
        </div>
      </div>

      <div className="bg-muted">
        <div className="max-w-[768px] mx-auto px-8 pb-8">
          <ChangComposer onSend={startChat} panel={panel} onPanelChange={setPanel} />
        </div>
      </div>
    </>
  )
}
