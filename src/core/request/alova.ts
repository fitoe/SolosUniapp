import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import { useAuthStore } from '@/core/auth/store'

export const alovaInstance = createAlova({
  ...AdapterUniapp(),
  baseURL: import.meta.env.VITE_API_PATH,
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
    if (method.url === '/upload') {
      method.baseURL = import.meta.env.VITE_UPLOAD_PATH
      method.url = ''
    }
  },
  responded: {
    onSuccess: async (response) => {
      if (response.statusCode === 401) {
        const authStore = useAuthStore()
        authStore.logout()
        throw new Error('Unauthorized')
      }

      if (response.statusCode < 200 || response.statusCode >= 300) {
        throw new Error(`HTTP ${response.statusCode}`)
      }
      return (response as any).data
    },
    onError: (error) => {
      console.error('[alova] request error', error)
      return Promise.reject(error)
    },
  },
})
