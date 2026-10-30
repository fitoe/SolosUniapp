import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface AuthUser {
  id: string
  nickname: string
  avatar?: string
}

export interface AuthSession {
  token: string
  user: AuthUser
  expiresAt?: number
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref('')
    const userId = ref('')
    const user = ref<AuthUser | null>(null)
    const expiresAt = ref<number | null>(null)

    const isSessionExpired = computed(() => {
      return typeof expiresAt.value === 'number' && expiresAt.value <= Date.now()
    })
    const isLoggedIn = computed(() => token.value.length > 0 && !isSessionExpired.value)

    function setSession(session: AuthSession) {
      token.value = session.token
      userId.value = session.user.id
      user.value = session.user
      expiresAt.value = session.expiresAt ?? null
    }

    function setToken(value: string) {
      token.value = value
    }

    function setUserId(value: string) {
      userId.value = value
      if (user.value) {
        user.value = {
          ...user.value,
          id: value,
        }
      }
    }

    function logout() {
      token.value = ''
      userId.value = ''
      user.value = null
      expiresAt.value = null
    }

    // Time is not reactive: check it at access boundaries, not only in a computed value.
    function hasValidSession() {
      if (expiresAt.value !== null && expiresAt.value <= Date.now()) {
        logout()
      }
      return token.value.length > 0
    }

    return {
      token,
      userId,
      user,
      expiresAt,
      isSessionExpired,
      isLoggedIn,
      setSession,
      setToken,
      setUserId,
      logout,
      hasValidSession,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
