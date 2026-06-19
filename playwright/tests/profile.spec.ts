import { test, expect } from '@playwright/test'

// P2: Profile Flow

test.describe('Profile', () => {
  test('プロフィール画面が表示される', async ({ page }) => {
    await page.goto('/profile')

    await expect(page.getByTestId('profile-screen')).toBeVisible()
    await expect(page.getByTestId('user-level')).toBeVisible()
    await expect(page.getByTestId('user-xp')).toBeVisible()
    await expect(page.getByTestId('cards-completed')).toBeVisible()
    await expect(page.getByTestId('streak-days')).toBeVisible()
  })

  test('プロフィール画面でコンソールエラーが発生しない', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    await page.goto('/profile')
    await expect(page.getByTestId('profile-screen')).toBeVisible()

    expect(errors).toHaveLength(0)
  })
})
