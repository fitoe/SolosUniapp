import { AUTH_WHITELIST, LOGIN_PATH } from './constants'
import { useAuthStore } from './store'

function parsePath(url: string) {
  const path = url.split('?')[0] || ''
  return path.startsWith('/') ? path : `/${path}`
}

function guardInvoke(options: { url?: string }) {
  const rawUrl = options.url ?? ''
  if (!rawUrl) {
    return options
  }

  const targetPath = parsePath(rawUrl)
  if (AUTH_WHITELIST.has(targetPath)) {
    return options
  }

  const authStore = useAuthStore()
  if (authStore.isLoggedIn) {
    return options
  }

  uni.navigateTo({ url: LOGIN_PATH })
  return false
}

export function installAuthGuard() {
  uni.addInterceptor('navigateTo', { invoke: guardInvoke })
  uni.addInterceptor('redirectTo', { invoke: guardInvoke })
  uni.addInterceptor('reLaunch', { invoke: guardInvoke })
}
