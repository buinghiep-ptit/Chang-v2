import { createRootRoute, Outlet } from '@tanstack/react-router'
import { AppLayout } from '@/components/layout/app-layout'
import { useAppMode } from '@/app/app-mode-context'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  const { isEmbedded } = useAppMode()

  if (isEmbedded) {
    return (
      <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
        <Outlet />
      </div>
    )
  }

  return <AppLayout />
}
