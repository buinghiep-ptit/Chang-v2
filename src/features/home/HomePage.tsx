import { useAppMode } from '@/app/app-mode-context'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { HomeMobile } from './views/HomeMobile'
import { HomeDesktop } from './views/HomeDesktop'

export function HomePage() {
  const { isEmbedded } = useAppMode()
  const isMobile = useIsMobile()

  if (isEmbedded || isMobile) return <HomeMobile />
  return <HomeDesktop />
}
