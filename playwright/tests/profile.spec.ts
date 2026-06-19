import { test, expect } from '@playwright/test'

/**
 * 主要回帰テスト: プロフィール画面
 *
 * Profile が正常に表示されること。
 * QUALITY_GATE.md 参照。
 */
test.describe('Profile', () => {
  test('プロフィール画面が正常に表示される', async ({ page }) => {
    await page.goto('/profile')

    await expect(page.getByTestId('user-level')).toBeVisible()
    await expect(page.getByTestId('user-xp')).toBeVisible()
    await expect(page.getByTestId('streak-days')).toBeVisible()
    await expect(page.getByTestId('cards-completed')).toBeVisible()
  })

  test('プロフィール画面でコンソールエラーが発生しない', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    page.on('pageerror', (err) => errors.push(err.message))

    await page.goto('/profile')
    // 画面の描画が安定するまで待つ
    await page.waitForLoadState('networkidle')

    expect(errors).toHaveLength(0)
  })
})
