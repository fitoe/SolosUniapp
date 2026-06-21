import { useAuthStore } from '@/core/auth/store'

const protectedRoutes = new Set([
  '/pages/mine',
])

let installed = false

function normalizeRoute(url: string) {
  const path = url.split('?')[0] || ''
  return path.startsWith('/') ? path : `/${path}`
}

export function isProtectedRoute(url: string) {
  return protectedRoutes.has(normalizeRoute(url))
}

export function canOpenRoute(url: string) {
  if (!isProtectedRoute(url)) {
    return true
  }

  const authStore = useAuthStore()
  return authStore.isLoggedIn
}

function createInterceptor() {
  return {
    invoke(options: { url?: string }) {
      const url = options.url || ''
      if (canOpenRoute(url)) {
        return true
      }

      uni.redirectTo({
        url: `/pages/login?redirect=${encodeURIComponent(normalizeRoute(url))}`,
      })
      return false
    },
  }
}

export function installRouteGuard() {
  if (installed) {
    return
  }

  const interceptor = createInterceptor()
  uni.addInterceptor('navigateTo', interceptor)
  uni.addInterceptor('redirectTo', interceptor)
  uni.addInterceptor('switchTab', interceptor)
  installed = true
}
