import axios from 'axios'
import { tokenStore } from './auth/token-store'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use((config) => {
  const token = tokenStore.get()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      tokenStore.set(null)
      tokenStore.onUnauthorized()
    }
    return Promise.reject(err)
  },
)

export async function streamPost(
  url: string,
  body: unknown,
  onChunk: (line: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const token = tokenStore.get()
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
    signal,
  })

  if (res.status === 401) {
    tokenStore.set(null)
    tokenStore.onUnauthorized()
    throw new Error('Unauthorized')
  }

  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const reader = res.body?.getReader()
  if (!reader) throw new Error('No response body')

  const decoder = new TextDecoder()
  let buffer = ''

  // rAF syncs with the browser paint cycle (~16ms), allowing React's flushSync
  // renders triggered by onChunk to be visible between chunks.
  const yieldToPaint = () => new Promise<void>((r) => requestAnimationFrame(() => r()))

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue
      onChunk(trimmed)
      await yieldToPaint()
    }
  }
  if (buffer.trim()) onChunk(buffer.trim())
}
