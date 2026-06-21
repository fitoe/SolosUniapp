import type { AuthSession } from './store'
import { loginByProvider } from '@/platform/auth'

export async function createDemoSession(): Promise<AuthSession> {
  const credential = await loginByProvider()
  const now = Date.now()

  return {
    token: `${credential.provider}:${credential.code}`,
    user: {
      id: `${credential.provider}-starter-user`,
      nickname: credential.provider === 'weixin' ? '微信体验用户' : 'H5 体验用户',
    },
    expiresAt: now + 7 * 24 * 60 * 60 * 1000,
  }
}

export async function loginWithDemoAccount() {
  const authStore = useAuthStore()
  const session = await createDemoSession()
  authStore.setSession(session)
  return session
}
