import { test, expect } from '@playwright/test'

/**
 * 主要回帰テスト: 土地カード完了フロー
 *
 * Home → Question → Answer → Result → XP 反映
 *
 * このテストが壊れた状態でのマージは禁止。
 * QUALITY_GATE.md 参照。
 */
test.describe('Land Card Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('ホーム画面が表示される', async ({ page }) => {
    await expect(page).toHaveTitle(/Imaging Agriculture/)
    // 土地カードが1枚以上表示されている
    await expect(page.getByTestId('featured-land-card')).toBeVisible()
    // CTA ボタンが表示されている
    await expect(page.getByRole('button', { name: '回答する' })).toBeVisible()
  })

  test('土地カード完了フロー: Home → Question → Answer → Result', async ({ page }) => {
    // Home: CTA をクリック
    await page.getByRole('button', { name: '回答する' }).click()

    // Question: 土地画像と選択肢が表示される
    await expect(page.getByTestId('land-image')).toBeVisible()
    await expect(page.getByTestId('question-text')).toBeVisible()
    const choices = page.getByTestId('choice-button')
    await expect(choices).toHaveCount(4)

    // 「回答する」ボタンは選択前は非活性
    const submitButton = page.getByRole('button', { name: '回答する' })
    await expect(submitButton).toBeDisabled()

    // 選択肢を1つ選ぶ
    await choices.first().click()
    await expect(submitButton).toBeEnabled()

    // 回答する
    await submitButton.click()

    // Result: 解説画面が表示される
    await expect(page.getByTestId('result-explanation')).toBeVisible()
    await expect(page.getByTestId('xp-earned')).toBeVisible()
    await expect(page.getByRole('button', { name: '次の土地へ' })).toBeVisible()
  })

  test('XP が回答後に反映される', async ({ page }) => {
    // プロフィールで初期XPを確認
    await page.goto('/profile')
    const initialXp = await page.getByTestId('user-xp').textContent()

    // カードを1枚完了
    await page.goto('/')
    await page.getByRole('button', { name: '回答する' }).click()
    await page.getByTestId('choice-button').first().click()
    await page.getByRole('button', { name: '回答する' }).click()

    // Result 画面で XP 表示を確認
    await expect(page.getByTestId('xp-earned')).toBeVisible()

    // プロフィールに戻り XP が増加していることを確認
    await page.goto('/profile')
    const newXp = await page.getByTestId('user-xp').textContent()
    expect(Number(newXp)).toBeGreaterThan(Number(initialXp))
  })

  test('コンソールエラーが発生しない', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    page.on('pageerror', (err) => errors.push(err.message))

    // 主要導線を一通り通る
    await page.goto('/')
    await page.getByRole('button', { name: '回答する' }).click()
    await page.getByTestId('choice-button').first().click()
    await page.getByRole('button', { name: '回答する' }).click()
    await page.goto('/profile')

    expect(errors).toHaveLength(0)
  })
})
