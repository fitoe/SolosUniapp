import piniaPersist from 'pinia-plugin-persist-uni'
import { createSSRApp } from 'vue'
import { installRouteGuard } from '@/core/router/auth-guard'
import App from './App.vue'

import 'uno.css'
import '@/styles/main.scss'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  pinia.use(piniaPersist)
  app.use(pinia)
  installRouteGuard()

  return {
    app,
    pinia,
  }
}
