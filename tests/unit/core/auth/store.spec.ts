import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useAuthStore } from '@/core/auth/store'

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => vi.useRealTimers())

  it('stores a session profile and reports login state', () => {
    const auth = useAuthStore()

    auth.setSession({
      token: 'token-1',
      user: {
        id: 'user-1',
        nickname: 'Starter User',
        avatar: 'https://example.com/avatar.png',
      },
      expiresAt: Date.now() + 60_000,
    })

    expect(auth.token).toBe('token-1')
    expect(auth.userId).toBe('user-1')
    expect(auth.user?.nickname).toBe('Starter User')
    expect(auth.isLoggedIn).toBe(true)
  })

  it('treats expired sessions as logged out', () => {
    const auth = useAuthStore()

    auth.setSession({
      token: 'expired-token',
      user: {
        id: 'user-1',
        nickname: 'Expired User',
      },
      expiresAt: Date.now() - 1,
    })

    expect(auth.isSessionExpired).toBe(true)
    expect(auth.isLoggedIn).toBe(false)
  })

  it('rechecks and clears a session that expires while the app is open', () => {
    vi.useFakeTimers()
    const auth = useAuthStore()
    auth.setSession({ token: 'token', user: { id: '1', nickname: 'User' }, expiresAt: Date.now() + 1000 })
    expect(auth.isLoggedIn).toBe(true)
    vi.advanceTimersByTime(1001)
    expect(auth.hasValidSession()).toBe(false)
    expect(auth.token).toBe('')
    expect(auth.isLoggedIn).toBe(false)
  })
})
