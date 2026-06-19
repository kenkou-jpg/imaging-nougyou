/**
 * Smoke Test — 本番デプロイ後の最低限確認
 *
 * 用途: main merge → Vercel デプロイ後に手動または CI から実行
 * Phase 1 以降で GitHub Actions の smoke-test job として自動化する
 *
 * 実行方法:
 *   PRODUCTION_URL=https://your-app.vercel.app node scripts/smoke-test.js
 */

const BASE_URL = process.env.PRODUCTION_URL || 'http://localhost:3000'

async function checkUrl(path, description) {
  const url = `${BASE_URL}${path}`
  try {
    const res = await fetch(url)
    if (res.ok) {
      console.log(`✅ ${description} (${res.status})`)
      return true
    } else {
      console.error(`❌ ${description} — HTTP ${res.status}: ${url}`)
      return false
    }
  } catch (err) {
    console.error(`❌ ${description} — 接続失敗: ${url}`)
    return false
  }
}

async function main() {
  console.log(`\n🌱 Smoke Test 開始: ${BASE_URL}\n`)

  const checks = [
    checkUrl('/', 'ホーム画面'),
    checkUrl('/profile', 'プロフィール画面'),
    checkUrl('/api/health', 'API ヘルスチェック'),
  ]

  const results = await Promise.all(checks)
  const passed = results.filter(Boolean).length
  const total = results.length

  console.log(`\n結果: ${passed}/${total} 通過`)

  if (passed < total) {
    console.error('\n❌ Smoke Test 失敗 — Vercel Instant Rollback を検討してください')
    process.exit(1)
  } else {
    console.log('\n✅ Smoke Test 通過')
    process.exit(0)
  }
}

main()
