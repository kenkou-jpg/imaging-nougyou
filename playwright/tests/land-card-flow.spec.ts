import { test, expect } from '@playwright/test'

// P1: Land Card Flow — 最重要導線
// North Star（Land Reading Sessions）を保護するテスト

test.describe('Land Card Flow', () => {
  test('ホーム画面に土地カードが表示される', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('land-card')).toBeVisible()
    await expect(page.getByTestId('land-card-image')).toBeVisible()
    await expect(page.getByTestId('land-card-title')).toBeVisible()
  })

  test('土地カード完了フロー: Home → Question → Answer → Result', async ({ page }) => {
    await page.goto('/')

    // ホーム: カードをクリックして Question 画面へ
    await page.getByTestId('start-card-button').click()
    await expect(page.getByTestId('question-screen')).toBeVisible()
    await expect(page.getByTestId('question-text')).toBeVisible()

    // Question: 選択肢を選んで回答
    await page.getByTestId('choice-a').click()
    await expect(page.getByTestId('choice-a')).toHaveAttribute('data-selected', 'true')
    await page.getByTestId('submit-answer-button').click()

    // Result: 推奨回答と解説が表示される
    await expect(page.getByTestId('result-screen')).toBeVisible()
    await expect(page.getByTestId('recommended-answer')).toBeVisible()
    await expect(page.getByTestId('explanation')).toBeVisible()

    // 「正解」「不正解」の文言がないことを確認
    await expect(page.getByText('正解')).not.toBeVisible()
    await expect(page.getByText('不正解')).not.toBeVisible()
    await expect(page.getByText('やった！')).not.toBeVisible()
  })

  test('回答後に XP が反映される', async ({ page }) => {
    await page.goto('/')

    await page.getByTestId('start-card-button').click()
    await page.getByTestId('choice-b').click()
    await page.getByTestId('submit-answer-button').click()

    await expect(page.getByTestId('xp-earned')).toBeVisible()
  })

  test('コンソールエラーが発生しない', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    await page.goto('/')
    await page.getByTestId('start-card-button').click()
    await page.getByTestId('choice-a').click()
    await page.getByTestId('submit-answer-button').click()
    await expect(page.getByTestId('result-screen')).toBeVisible()

    expect(errors).toHaveLength(0)
  })

  test('「次の土地へ」で次のカードに進める', async ({ page }) => {
    await page.goto('/')

    await page.getByTestId('start-card-button').click()
    await page.getByTestId('choice-a').click()
    await page.getByTestId('submit-answer-button').click()
    await expect(page.getByTestId('result-screen')).toBeVisible()

    await page.getByTestId('next-card-button').click()
    await expect(page.getByTestId('question-screen')).toBeVisible()
  })
})
