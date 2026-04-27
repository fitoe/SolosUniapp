import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { connectAutomation, DEFAULT_SCREENSHOT } from './wechat-automator-shared.mjs'

function printHelp() {
  console.log(`Usage:
  node ./scripts/wechat-devtools.mjs inspect
  node ./scripts/wechat-devtools.mjs screenshot [output]

Environment variables:
  WECHAT_AUTO_PORT                Automation WebSocket port, default 9420
`)
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
