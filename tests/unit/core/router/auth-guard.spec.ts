import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAuthStore } from '@/core/auth/store'
import { canOpenRoute, installRouteGuard } from '@/core/router/auth-guard'

describe('route auth guard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.mocked(uni.addInterceptor).mockClear()
    vi.mocked(uni.redirectTo).mockClear()
  })

  it('allows public routes without login', () => {
    expect(canOpenRoute('/pages/index')).toBe(true)
    expect(canOpenRoute('/pages/login')).toBe(true)
  })

  it('blocks protected routes without login', () => {
    expect(canOpenRoute('/pages/mine')).toBe(false)
  })

  it('allows protected routes when the session is valid', () => {
    const auth = useAuthStore()
    auth.setSession({
      token: 'token-1',
      user: {
        id: 'user-1',
        nickname: 'Starter User',
      },
      expiresAt: Date.now() + 60_000,
    })

    expect(canOpenRoute('/pages/mine')).toBe(true)
  })

  it('registers uni navigation interceptors once', () => {
    installRouteGuard()

    expect(uni.addInterceptor).toHaveBeenCalledWith('navigateTo', expect.any(Object))
    expect(uni.addInterceptor).toHaveBeenCalledWith('redirectTo', expect.any(Object))
    expect(uni.addInterceptor).toHaveBeenCalledWith('switchTab', expect.any(Object))
  })
})
