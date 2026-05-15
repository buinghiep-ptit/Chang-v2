import { useAppMode } from '@/app/app-mode-context'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { MenuMobile } from './views/MenuMobile'
import { MenuDesktop } from './views/MenuDesktop'

export function MenuPage() {
  const { isEmbedded } = useAppMode()
  const isMobile = useIsMobile()

  if (isEmbedded || isMobile) return <MenuMobile />
  return <MenuDesktop />
}
