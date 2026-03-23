import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist-uni'
import { createSSRApp } from 'vue'
import App from './App.vue'
import { installAuthGuard } from './core/auth/guard'

import 'uno.css'
import '@/styles/main.scss'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  pinia.use(piniaPersist)
  app.use(pinia)

  installAuthGuard()

  return {
    app,
    pinia,
  }
}
