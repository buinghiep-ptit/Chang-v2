import { useAppMode } from '@/app/app-mode-context'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { AppsMobile } from './views/AppsMobile'
import { AppsDesktop } from './views/AppsDesktop'

export function AppsPage() {
  const { isEmbedded } = useAppMode()
  const isMobile = useIsMobile()

  if (isEmbedded || isMobile) return <AppsMobile />
  return <AppsDesktop />
}
