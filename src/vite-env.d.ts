/// <reference types="vite/client" />

declare module '@fontsource-variable/inter'

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_AGENT_BASE_URL: string
  readonly VITE_AGENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
