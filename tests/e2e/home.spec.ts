import { expect, test } from '@playwright/test'

test('home page renders the smoke playground and persists state', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText('SolosUniapp 起步首页', { exact: true })).toBeVisible()
  await expect(page.getByText('开箱能力', { exact: true })).toBeVisible()
  await expect(page.getByText('样式与图标', { exact: true })).toBeVisible()
  await expect(page.getByText('状态与交互', { exact: true })).toBeVisible()
  await expect(page.getByText('Wot 组件验证', { exact: true })).toBeVisible()
  await expect(page.getByText('自动引入', { exact: true })).toBeVisible()

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
