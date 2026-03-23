import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref('')
    const userId = ref('')

    const isLoggedIn = computed(() => token.value.length > 0)

    function setToken(value: string) {
      token.value = value
    }

    function setUserId(value: string) {
      userId.value = value
    }

    function logout() {
      token.value = ''
      userId.value = ''
    }

    return {
      token,
      userId,
      isLoggedIn,
      setToken,
      setUserId,
      logout,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
