import { createContext, useContext, type ReactNode } from 'react'
import type { AppMode } from '@/lib/app-mode'

interface AppModeContextValue {
  mode: AppMode
  isEmbedded: boolean
}

const AppModeContext = createContext<AppModeContextValue | null>(null)

export function useAppMode(): AppModeContextValue {
  const ctx = useContext(AppModeContext)
  if (!ctx) throw new Error('useAppMode must be used within AppModeProvider')
  return ctx
}

interface AppModeProviderProps {
  mode: AppMode
  children: ReactNode
}

export function AppModeProvider({ mode, children }: AppModeProviderProps) {
  return (
    <AppModeContext.Provider value={{ mode, isEmbedded: mode !== 'standalone' }}>
      {children}
    </AppModeContext.Provider>
  )
}
