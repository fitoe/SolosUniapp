import { expect, test } from '@playwright/test'

test('home page renders starter title', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Uni Starter v1')).toBeVisible()
})
