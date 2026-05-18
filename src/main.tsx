import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { detectAppMode } from '@/lib/app-mode'
import { AppModeProvider } from '@/app/app-mode-context'
import { StandaloneShell } from '@/app/standalone-shell'
import { EmbeddedShell } from '@/app/embedded-shell'
import '@fontsource-variable/noto-sans/index.css'
import '@fontsource-variable/jetbrains-mono/index.css'
import './styles/globals.css'

const mode = detectAppMode()

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
        <AppModeProvider mode={mode}>
          {mode === 'standalone' ? <StandaloneShell /> : <EmbeddedShell />}
        </AppModeProvider>
        <Toaster richColors position="top-center" />
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
