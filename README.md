# StudioSnap AI

StudioSnap AI is a premium, one-page AI photo service MVP that lets users:
1. Turn a clean portrait into a passport-style ID photo.
2. Try an outfit from any reference image.
3. Transform a portrait using a style or location reference.

It uses the Google Gemini 3 Pro Image generation model and Stripe for monetizing high-resolution watermark-free downloads without requiring user accounts or subscriptions. MVP pricing is a simple **$0.99 per HD download** after a free watermarked preview.

## Requirements
- Node.js 18+ (tested with v20+)
- npm

## Environment Variables

Create a `.env.local` file in the root of the project with the following variables:

```bash
# Required for Gemini AI generation
GEMINI_API_KEY=your_gemini_api_key_here

# Required for Stripe Payments (Optional for local dev, will run in mock mode without it)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Important for local webhook and callbacks
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional public support email shown on legal/contact pages
NEXT_PUBLIC_SUPPORT_EMAIL=support@canadianproducer.ca

# Required for production image storage on Vercel
# Create via Vercel Storage → Blob and add to Vercel env vars.
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

## How to Install and Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser.

## Testing Gemini Generation
If you have a `GEMINI_API_KEY`, the application will make live requests to the `gemini-3-pro-image-preview` model. If you do not provide a key, the app will run in "mock mode" and immediately return a grey placeholder image, which is useful for testing UI and Stripe flows without incurring AI costs.

## Testing Stripe Checkout
If `STRIPE_SECRET_KEY` is not provided, the app will run in "mock payment mode" and bypass the Stripe Checkout page directly to the success page to simulate a paid transaction.

## Testing the MVP Flow
Run the app in mock mode on port 3100:

```bash
GEMINI_API_KEY= STRIPE_SECRET_KEY= NEXT_PUBLIC_APP_URL=http://localhost:3100 npx next dev --turbopack -p 3100
```

In another terminal:

```bash
MVP_TEST_BASE_URL=http://localhost:3100 npm run test:mvp-flow
```

The test verifies: generate preview -> preview image works -> HD is locked before payment -> mock checkout succeeds -> HD unlocks -> Privacy/Terms/Contact pages load.


To test real Stripe Checkout:
1. Provide Stripe keys in `.env.local`.
2. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli).
3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe-webhook
   ```
4. Copy the webhook secret from the CLI output and set `STRIPE_WEBHOOK_SECRET` in `.env.local`.

## Deployment to Vercel
1. Push the code to GitHub.
2. Import the repository in Vercel.
3. Create a Vercel Blob store and add `BLOB_READ_WRITE_TOKEN` to the Vercel project environment variables.
4. Add the remaining environment variables from `.env.local` to Vercel. Ensure `NEXT_PUBLIC_APP_URL` is set to the production deployment URL.
5. Deploy.

The app uses local `./.data` storage for development. On Vercel, configure Vercel Blob via `BLOB_READ_WRITE_TOKEN`; otherwise image generation will fail clearly instead of silently losing files between serverless requests.

## Production TODOs
- [x] **Storage adapter:** Local `.data` for development, Vercel Blob when `BLOB_READ_WRITE_TOKEN` is configured.
- [ ] **Rate Limiting:** Add Upstash Redis rate limiting to `/api/generate` to prevent abuse.
- [ ] **Cleanup Cron:** Implement a cron job to delete stored images older than 24 hours.
- [ ] **Moderation:** Add image moderation (NSFW check) using Google Vision or Gemini before processing.
- [x] **Privacy & Legal:** Add MVP Privacy Policy, Terms, and Contact pages.
- [x] **Bot Protection:** Add a honeypot field and request validation for MVP. Later replace/augment with Turnstile/reCAPTCHA.
