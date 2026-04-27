import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import automator from 'miniprogram-automator'

const DEFAULT_AUTO_PORT = Number(process.env.WECHAT_AUTO_PORT || 9420)
const DEFAULT_SCREENSHOT = path.resolve(process.cwd(), '.tmp/automator/wechat-devtools.png')
const DEFAULT_WS_ENDPOINTS = [
  `ws://localhost:${DEFAULT_AUTO_PORT}`,
  `ws://127.0.0.1:${DEFAULT_AUTO_PORT}`,
  `ws://[::1]:${DEFAULT_AUTO_PORT}`,
]

function printHelp() {
  console.log(`Usage:
  node ./scripts/wechat-devtools.mjs inspect
  node ./scripts/wechat-devtools.mjs screenshot [output]

Environment variables:
  WECHAT_AUTO_PORT                Automation WebSocket port, default 9420
`)
}

async function connectAutomation() {
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

async function inspectAutomation() {
  const { miniProgram, wsEndpoint } = await connectAutomation()

  try {
    const [systemInfo, pageStack, currentPage] = await Promise.all([
      miniProgram.systemInfo(),
      miniProgram.pageStack(),
      miniProgram.currentPage(),
    ])

    console.log(JSON.stringify({
      ok: true,
      mode: 'inspect',
      wsEndpoint,
      systemInfo: {
        platform: systemInfo.platform,
        model: systemInfo.model,
        version: systemInfo.version,
        SDKVersion: systemInfo.SDKVersion,
        benchmarkLevel: systemInfo.benchmarkLevel,
      },
      pageStack: pageStack.map(page => ({
        path: page.path,
        query: page.query,
      })),
      currentPage: currentPage
        ? {
            path: currentPage.path,
            query: currentPage.query,
          }
        : null,
    }, null, 2))
  }
  finally {
    miniProgram.disconnect()
  }
}

async function screenshotAutomation(outputPath) {
  const { miniProgram, wsEndpoint } = await connectAutomation()

  try {
    const screenshotPath = path.resolve(outputPath || DEFAULT_SCREENSHOT)
    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true })
    await miniProgram.screenshot({ path: screenshotPath })

    console.log(JSON.stringify({
      ok: true,
      mode: 'screenshot',
      wsEndpoint,
      output: screenshotPath,
    }, null, 2))
  }
  finally {
    miniProgram.disconnect()
  }
}

async function main() {
  const [command = 'help', arg] = process.argv.slice(2)

  switch (command) {
    case 'inspect':
      await inspectAutomation()
      break
    case 'screenshot':
      await screenshotAutomation(arg)
      break
    case 'help':
    case '--help':
    case '-h':
      printHelp()
      break
    default:
      throw new Error(`Unknown command: ${command}`)
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
