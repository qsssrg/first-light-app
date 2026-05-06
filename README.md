# FIRST LIGHT - 英語学習アプリ

5人のメンバーと一緒に英語力を伸ばすPWAアプリ。推し活×モンテッソーリの設計思想。

## 技術スタック

- Next.js 15 (App Router) + React 19
- Tailwind CSS + shadcn/ui
- IndexedDB (Dexie.js) — サーバーレス、ユーザーデータはブラウザ内
- Claude API (Haiku 4.5) — ライティング添削・スピーキング評価
- Web Speech API — リスニング読み上げ・スピーキング音声認識
- PWA対応

## セットアップ

```bash
npm install
cp .env.example .env.local
# .env.local に ANTHROPIC_API_KEY を設定
npm run dev
```

## Vercelデプロイ

### 1. リポジトリを接続
```bash
git init && git add -A && git commit -m "initial"
# GitHubにpush後、Vercelでリポジトリを接続
```

### 2. 環境変数を設定
Vercel Dashboard > Settings > Environment Variables:
- `ANTHROPIC_API_KEY` = `sk-ant-xxxxx`

### 3. デプロイ設定
- Framework: Next.js (自動検出)
- Build Command: `next build`
- Output Directory: `.next`
- Node.js Version: 20.x

### 4. デプロイ
Vercel Dashboardの「Deploy」ボタン、またはgit pushで自動デプロイ。

## 環境変数

| 変数名 | 必須 | 説明 |
|--------|------|------|
| `ANTHROPIC_API_KEY` | 任意 | Claude API Key。ライティング添削・スピーキング評価に使用。未設定でもアプリ自体は動作する。 |

## データ保存

全てのユーザーデータ（学習進捗、単語帳、設定）はブラウザのIndexedDBに保存されます。サーバーには一切送信しません。

## PWA

manifest.jsonとviewport設定済み。iOS/Androidの「ホーム画面に追加」でネイティブアプリ風に使えます。Service Workerは未実装のため、完全オフライン動作には対応していません。

## 主要ページ

| パス | 機能 |
|------|------|
| `/` | ホーム（レベル、XP、メンバー） |
| `/chapters` | チャプター一覧 |
| `/vocabulary` | SRS単語帳 |
| `/listening` | リスニング練習 |
| `/speaking` | スピーキング練習 |
| `/writing-practice` | ライティング添削 |
| `/mock-exam` | 模擬試験 |
| `/side-story` | サイドストーリー |
| `/past-exams` | 過去問ライブラリ |
| `/dashboard` | 学習分析 |
