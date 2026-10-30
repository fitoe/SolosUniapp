import { expect, test } from '@playwright/test'

test('home page renders the smoke playground and persists state', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText('SolosUniapp 起步首页', { exact: true })).toBeVisible()
  await expect(page.getByText('基础能力', { exact: true })).toBeVisible()
  await expect(page.getByText('自动引入', { exact: true })).toBeVisible()
  await expect(page.getByText('状态与交互', { exact: true })).toBeVisible()

  await page.locator('uni-button', { hasText: '+1 计数' }).click()
  await page.locator('uni-button', { hasText: '切换状态' }).click()
  await page.locator('uni-button', { hasText: 'Wot 设置摘要' }).click()

  await expect(page.getByTestId('count-value')).toHaveText('3')
  await expect(page.getByTestId('status-value')).toHaveText('已暂停')
  await expect(page.getByTestId('note-summary')).toContainText('Wot button clicked')

  await page.reload()

  await expect(page.getByTestId('count-value')).toHaveText('3')
  await expect(page.getByTestId('status-value')).toHaveText('已暂停')
  await expect(page.getByTestId('note-summary')).toContainText('Wot button clicked')
})

test('example list opens the matching detail', async ({ page }) => {
  await page.goto('/')
  await page.getByText('查看列表与详情示例 →').click()
  await expect(page.getByText('本地演示数据，请按业务替换。')).toBeVisible()
  await page.getByText('示例事项', { exact: true }).click()
  await expect(page.getByText('将此示例替换为实际业务数据。')).toBeVisible()
})

test('chart examples render on H5', async ({ page }) => {
  await page.goto('/#/pages/chart/index')
  for (const chart of ['column-chart', 'line-chart', 'pie-chart']) {
    await expect(page.getByTestId(chart).locator('canvas').first()).toBeVisible()
  }
})
