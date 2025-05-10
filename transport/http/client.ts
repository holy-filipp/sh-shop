import { useLocalStorage } from '@vueuse/core'
import { API_BASE_URL } from '~/config/main'

interface StripeError {
  status: number
  name: string
  message: string
  details: object
}

export class ApiError extends Error {
  constructor(
    public code: number,
    public override message: string
  ) {
    super(message)
    this.code = code
    this.name = 'ApiError'
  }
}

export const client = {
  async request<T>(method: string, opts?: RequestInit & { json?: unknown }) {
    const jwt = useLocalStorage('jwt', '')
    const headers: HeadersInit = new Headers(opts?.headers)

    headers.set('Authorization', `Bearer ${jwt}`)

    if (opts?.json) {
      headers.set('Content-Type', 'application/json')
      opts.body = JSON.stringify(opts.json)
    }

    try {
      const r = await fetch(`${API_BASE_URL}/${method}`, {
        ...opts,
        headers,
      })

      if (!r.ok) {
        let code = 500
        let message = 'An unexpected error occurred'

        try {
          const errData: { error: StripeError } = await r.json()

          code = errData.error.status
          message = errData.error.message
        } catch {
          code = r.status
          message = r.statusText || message
        }

        throw new ApiError(code, message)
      }

      console.debug(`Request ${method} succeeded`)

      try {
        return (await r.json()) as Promise<T>
      } catch {
        throw new ApiError(400, 'Failed to parse response to JSON')
      }
    } catch (e) {
      if (e instanceof ApiError) {
        throw e
      }

      throw new ApiError(500, 'An unexpected error occurred')
    }
  },
}
