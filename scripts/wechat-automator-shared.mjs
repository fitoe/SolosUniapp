import path from 'node:path'
import process from 'node:process'
import automator from 'miniprogram-automator'

export const DEFAULT_AUTO_PORT = Number(process.env.WECHAT_AUTO_PORT || 9420)
export const DEFAULT_SCREENSHOT = path.resolve(process.cwd(), '.tmp/automator/wechat-devtools.png')
const DEFAULT_WS_ENDPOINTS = [
  `ws://localhost:${DEFAULT_AUTO_PORT}`,
  `ws://127.0.0.1:${DEFAULT_AUTO_PORT}`,
  `ws://[::1]:${DEFAULT_AUTO_PORT}`,
]

export async function connectAutomation() {
  let lastError = null

  for (const wsEndpoint of DEFAULT_WS_ENDPOINTS) {
    try {
      const miniProgram = await automator.connect({ wsEndpoint })
      return { miniProgram, wsEndpoint }
    }
    catch (error) {
      lastError = error
    }
  }

  const message = lastError instanceof Error ? lastError.message : String(lastError)
  throw new Error(`${message}\nRun "pnpm debug:mp:enable" first, and make sure the project is opened in Wechat DevTools.`)
}
