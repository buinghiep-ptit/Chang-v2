export type AppMode = 'standalone' | 'iframe' | 'webview'

export function detectAppMode(): AppMode {
  const params = new URLSearchParams(location.search)
  if (params.get('mode') === 'webview') return 'webview'
  try {
    if (window.self !== window.top) return 'iframe'
  } catch {
    // Cross-origin parent: accessing window.top throws SecurityError
    return 'iframe'
  }
  return 'standalone'
}
