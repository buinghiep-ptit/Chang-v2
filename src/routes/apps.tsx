import { createFileRoute } from '@tanstack/react-router'
import { AppsPage } from '@/features/apps/AppsPage'

export const Route = createFileRoute('/apps')({
  component: AppsPage,
})
