import { expect, test } from '@playwright/test'

test('home page renders starter title', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('基础首页', { exact: true })).toBeVisible()
  await expect(page.getByText('只保留一个基础首页用于 H5 与微信小程序开发。')).toBeVisible()
  await expect(page.getByText('登录鉴权')).toHaveCount(0)
})
