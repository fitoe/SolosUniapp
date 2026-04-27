import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { connectAutomation } from './wechat-automator-shared.mjs'

const DEFAULT_SMOKE_SCREENSHOT = path.resolve(process.cwd(), '.tmp/automator/mp-weixin-smoke.png')

function extractNumber(text) {
  const match = String(text).match(/-?\d+/)
  if (!match)
    throw new Error(`Unable to extract number from "${text}"`)
  return Number.parseInt(match[0], 10)
}

async function getRequiredElement(page, selector, label) {
  const element = await page.$(selector)
  if (!element)
    throw new Error(`${label} not found with selector "${selector}"`)
  return element
}

async function getRequiredElementByAny(page, selectors, label) {
  for (const item of selectors) {
    const element = item.type === 'xpath'
      ? await page.getElementByXpath(item.value)
      : await page.$(item.value)

    if (element)
      return element
  }

  const tried = selectors.map(item => `${item.type}:${item.value}`).join(', ')
  throw new Error(`${label} not found. Tried ${tried}`)
}

async function main() {
  const { miniProgram, wsEndpoint } = await connectAutomation()

  try {
    const page = await miniProgram.currentPage()
    if (!page)
      throw new Error('No current page found in Wechat DevTools.')

    await page.waitFor('.hero-title')

    const currentPath = page.path
    if (currentPath !== 'pages/index' && currentPath !== '/pages/index')
      throw new Error(`Unexpected current page: ${currentPath}`)

    const heroTitle = await getRequiredElement(page, '.hero-title', 'Hero title')
    const countValue = await getRequiredElement(page, '.stat-value', 'Count value')
    const statusValue = await getRequiredElement(page, '.stats-grid .stat-card:nth-child(2) .stat-value', 'Status value')
    const incrementButton = await getRequiredElementByAny(page, [
      { type: 'css', value: '.wd-button.is-primary' },
      { type: 'xpath', value: '//*[contains(@class,"wd-button")][.//*[contains(text(),"+1 计数")] or contains(., "+1 计数")]' },
    ], 'Increment button')
    const toggleButton = await getRequiredElementByAny(page, [
      { type: 'css', value: '.wd-button.is-success' },
      { type: 'xpath', value: '//*[contains(@class,"wd-button")][.//*[contains(text(),"切换状态")] or contains(., "切换状态")]' },
    ], 'Toggle button')
    const summaryButton = await getRequiredElementByAny(page, [
      { type: 'css', value: '.wd-button.is-warning' },
      { type: 'xpath', value: '//*[contains(@class,"wd-button")][.//*[contains(text(),"Wot 设置摘要")] or contains(., "Wot 设置摘要")]' },
    ], 'Summary button')
    const noteSummary = await getRequiredElement(page, '.note-summary', 'Note summary')

    const titleText = await heroTitle.text()
    if (!titleText.includes('SolosUniapp 能力面板'))
      throw new Error(`Unexpected hero title: ${titleText}`)

    const beforeCount = extractNumber(await countValue.text())
    const beforeStatus = await statusValue.text()

    await incrementButton.tap()
    await page.waitFor(300)
    await toggleButton.tap()
    await page.waitFor(300)
    await summaryButton.tap()
    await page.waitFor(300)

    const afterCount = extractNumber(await countValue.text())
    const afterStatus = await statusValue.text()
    const summaryText = await noteSummary.text()

    if (afterCount !== beforeCount + 1)
      throw new Error(`Count did not increment as expected: before=${beforeCount}, after=${afterCount}`)

    if (afterStatus === beforeStatus)
      throw new Error(`Status did not change after toggle: before=${beforeStatus}, after=${afterStatus}`)

    if (!summaryText.includes('Wot button clicked'))
      throw new Error(`Unexpected note summary: ${summaryText}`)

    fs.mkdirSync(path.dirname(DEFAULT_SMOKE_SCREENSHOT), { recursive: true })
    await miniProgram.screenshot({ path: DEFAULT_SMOKE_SCREENSHOT })

    console.log(JSON.stringify({
      ok: true,
      mode: 'smoke',
      wsEndpoint,
      currentPage: currentPath,
      beforeCount,
      afterCount,
      beforeStatus,
      afterStatus,
      noteSummary: summaryText,
      screenshot: DEFAULT_SMOKE_SCREENSHOT,
    }, null, 2))
  }
  finally {
    miniProgram.disconnect()
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? `[mp-smoke] ${error.message}` : `[mp-smoke] ${String(error)}`)
  process.exit(1)
})
