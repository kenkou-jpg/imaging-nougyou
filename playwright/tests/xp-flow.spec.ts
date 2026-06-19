import { test, expect } from '@playwright/test'

// P3: XP Flow

test.describe('XP Flow', () => {
  test('カード完了後に XP が加算され、プロフィールに反映される', async ({ page }) => {
    // カード完了前の XP を記録
    await page.goto('/profile')
    const xpBefore = await page.getByTestId('user-xp').textContent()

    // カードを完了する
    await page.goto('/')
    await page.getByTestId('start-card-button').click()
    await page.getByTestId('choice-a').click()
    await page.getByTestId('submit-answer-button').click()
    await expect(page.getByTestId('result-screen')).toBeVisible()
    await expect(page.getByTestId('xp-earned')).toBeVisible()

    // プロフィールで XP が増えていることを確認
    await page.goto('/profile')
    const xpAfter = await page.getByTestId('user-xp').textContent()
    expect(xpAfter).not.toEqual(xpBefore)
  })
})
