type UnauthorizedHandler = () => void

let _token: string | null = null
let _onUnauthorized: UnauthorizedHandler | null = null

export const tokenStore = {
  get: (): string | null => _token,
  set: (token: string | null): void => {
    _token = token
  },
  setOnUnauthorized: (handler: UnauthorizedHandler): void => {
    _onUnauthorized = handler
  },
  onUnauthorized: (): void => {
    _onUnauthorized?.()
  },
}
