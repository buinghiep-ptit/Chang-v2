import { useAppMode } from '@/app/app-mode-context'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { TasksMobile } from './views/TasksMobile'
import { TasksDesktop } from './views/TasksDesktop'

export function TasksPage() {
  const { isEmbedded } = useAppMode()
  const isMobile = useIsMobile()

  if (isEmbedded || isMobile) return <TasksMobile />
  return <TasksDesktop />
}
