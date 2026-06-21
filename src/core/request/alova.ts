import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import { useAuthStore } from '@/core/auth/store'

interface UniResponse<T = unknown> {
  statusCode: number
  data: T
}

interface ErrorResponseBody {
  message?: string
  msg?: string
  error?: string
}

export class HttpStatusError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly data: unknown,
  ) {
    super(resolveErrorMessage(statusCode, data))
    this.name = 'HttpStatusError'
  }
}

function resolveErrorMessage(statusCode: number, data: unknown) {
  if (typeof data === 'string' && data) {
    return data
  }
  if (data && typeof data === 'object') {
    const body = data as ErrorResponseBody
    const message = body.message || body.msg || body.error
    if (message) {
      return message
    }
  }
  if (statusCode === 401) {
    return 'Unauthorized'
  }
  return `HTTP ${statusCode}`
}

function createUniAlova(baseURL: string) {
  return createAlova({
    ...AdapterUniapp(),
    baseURL,
    timeout: 10000,
    cacheFor: {
      GET: 0,
      POST: 0,
    },
    async beforeRequest(method) {
      const authStore = useAuthStore()
      if (authStore.token) {
        method.config.headers = {
          ...(method.config.headers || {}),
          Authorization: `Bearer ${authStore.token}`,
        }
      }
    },
    responded: {
      onSuccess: async (response) => {
        const uniResponse = response as UniResponse

        if (uniResponse.statusCode === 401) {
          const authStore = useAuthStore()
          authStore.logout()
          throw new HttpStatusError(uniResponse.statusCode, uniResponse.data)
        }

        if (uniResponse.statusCode < 200 || uniResponse.statusCode >= 300) {
          throw new HttpStatusError(uniResponse.statusCode, uniResponse.data)
        }
        return uniResponse.data
      },
      onError: (error) => {
        console.error('[alova] request error', error)
        return Promise.reject(error)
      },
    },
  })
}

export const alovaInstance = createUniAlova(import.meta.env.VITE_API_PATH)
export const uploadAlovaInstance = createUniAlova(import.meta.env.VITE_UPLOAD_PATH)
