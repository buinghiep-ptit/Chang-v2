import { http } from '@/lib/http'
import type { AuthUser } from '@/lib/auth/auth-context'

interface TokenResponse {
  token: string
  user: AuthUser
}

export const authService = {
  getMe: (): Promise<AuthUser> =>
    http.get<AuthUser>('/auth/me').then((r) => r.data),

  signOut: (): Promise<void> =>
    http.post('/auth/logout').then(() => undefined).catch(() => {}),

  getAzureLoginUrl: (): Promise<string> =>
    http
      .get<{ url: string }>('/auth/azure/authorize', {
        params: { redirect_uri: `${window.location.origin}` },
      })
      .then((r) => r.data.url),

  exchangeCallbackToken: (token: string): Promise<TokenResponse> =>
    http
      .post<TokenResponse>('/auth/azure/callback', { token })
      .then((r) => r.data),
}
