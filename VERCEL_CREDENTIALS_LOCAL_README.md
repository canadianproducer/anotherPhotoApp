# Vercel credentials — local handling

This project is ready for Vercel deployment, but real credentials must stay local and out of chat/history.

## Files

- `.env.vercel.local.example` — safe template, may be committed.
- `.env.vercel.local` — real local secrets, do not commit. Covered by `.gitignore` via `.env*`.
- `.vercel/` — Vercel CLI project link metadata, do not commit. Already ignored.

## Values to keep locally

```env
VERCEL_TOKEN=
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=
GEMINI_API_KEY=
BLOB_READ_WRITE_TOKEN=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=https://photoforge.intechtrap.com
NEXT_PUBLIC_SUPPORT_EMAIL=support@intechtrap.com
```

## Safe deployment flow

1. Sign up / log in at Vercel with GitHub.
2. Import the GitHub repo for this app.
3. Create a Vercel Blob store and copy `BLOB_READ_WRITE_TOKEN` into Vercel Project → Settings → Environment Variables.
4. Add `GEMINI_API_KEY`.
5. Add `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_SUPPORT_EMAIL`.
6. Deploy preview and smoke-test `/api/generate` flow.
7. Add custom domain, e.g. `photoforge.intechtrap.com`.
8. Later: add Stripe live keys and webhook secret, then configure webhook endpoint `/api/stripe-webhook`.

## Important

Do not paste tokens into Telegram, Discord, GitHub issues, commits, screenshots, or logs. If a token is exposed, revoke it immediately and create a new one.
