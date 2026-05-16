# AI Photo App - Business Model + Pricing Draft

Date: 2026-05-15  
Working product names: **PhotoForge AI** / StudioSnap AI / LookMeld  
Current app repo: `projects/anotherPhotoApp`  
Current public promise in app: "AI photo edits without subscriptions. Preview free. Download HD for $0.99."

## Recommendation Summary

Build this first as a **tiny paid utility**, not a broad AI photo platform.

**Best MVP wedge:**

> Upload a portrait + optional reference. Get a free watermarked preview. Pay a small one-time fee for clean HD download.

Primary near-term goal is not maximum ARPU. It is validating whether strangers will complete this flow and pay at all.

## Block 1 - Customer Segments

### Segment A: Individuals needing fast practical photo edits

Examples:
- passport-style / ID-style photos;
- LinkedIn/profile photo cleanup;
- outfit try-on for a photo;
- quick stylized portrait for social/profile use.

Pain:
- They do not want to learn Photoshop or prompt engineering.
- They need a quick result and are willing to pay a small amount if preview looks good.

Budget:
- Low per transaction, likely $1-$10.

Reachability:
- SEO, short-form content demos, Reddit/Quora style answers, Instagram/TikTok before-after videos.

### Segment B: Content creators / solopreneurs

Examples:
- creator needs thumbnails/profile assets;
- freelancer wants better profile photos;
- small business owner needs simple branded portraits.

Pain:
- Need more polished visuals quickly without booking a photographer.

Budget:
- Moderate, maybe $5-$29 per pack or $19-$49/month if repeated use is proven.

Reachability:
- CanadianProducer content, Threads/Instagram, YouTube/creator communities.

### Segment C: Local service businesses / consultants

Examples:
- realtor, mortgage broker, coach, beauty professional, contractor.

Pain:
- Need professional-looking photos/ads/social images but do not have design support.

Budget:
- Higher if bundled as service: $99-$499 setup/content package.

Reachability:
- Direct outreach and CanadianProducer services, not pure self-serve MVP.

### Primary segment for MVP

Start with **Segment A + narrow creator use cases from Segment B**.

Reason: easiest to test with the current app, least sales friction, and aligns with free-preview/paid-download flow.

## Block 2 - Value Propositions

### Main value proposition

> People can turn one ordinary portrait into a useful polished photo edit in under 2 minutes, without subscriptions, accounts, Photoshop, or prompt writing.

### Tool-level promises

1. **Passport / ID-style photo**
   - "Create a clean professional white-background portrait from your existing photo."
   - Caveat: avoid claiming official government compliance unless we implement country-specific sizing/rules.

2. **Outfit try-on**
   - "See yourself in a reference outfit before buying or posting."

3. **Style / location reference portrait**
   - "Turn your portrait into a premium editorial-style image using a reference look."

### Stronger positioning than generic AI photos

- Free preview before payment.
- No account required.
- Pay only if the result is worth downloading.
- Simple tools, not prompt engineering.

## Block 3 - Channels

### MVP channels

- Public landing page / SEO page for each tool:
  - `/passport-photo`
  - `/outfit-try-on`
  - `/ai-portrait-style`
- Instagram/Threads before-after posts.
- CanadianProducer.ca subdomain or standalone domain.
- Short demos: "I turned this messy selfie into X in 30 seconds."

### Later channels

- Google Search ads only after conversion is known.
- Creator partnerships.
- Affiliate/referral offers.
- B2B service funnel through CanadianProducer.

## Block 4 - Customer Relationships

MVP relationship model:

- **Self-service** for consumer flow.
- **Light automated personal service** via clear email receipt/download instructions.
- No accounts at first.
- Support limited to payment/result issues.

Service upsell later:

- One-to-one or productized service for creators/businesses who want custom photo/ad packs.

## Block 5 - Revenue Streams

### Current MVP revenue stream

- Free watermarked preview.
- **$0.99 one-time HD watermark-free download.**

### Pricing concern

$0.99 is good for frictionless validation, but may be too low after payment fees and AI cost.

Rough problem:
- Stripe/payment fees can eat a large chunk of $0.99.
- Image generation cost and abuse risk matter.
- Support time can destroy margins.

### MVP pricing decision

Launch the first public version with the simplest possible flow:

- **$0.99 per HD download.**
- No packs.
- No credits.
- No accounts.
- No subscriptions.

Reason: the immediate goal is validation, not pricing optimization. If people will not pay $0.99 after seeing a free preview, a more complex package will not save the product. First prove the core behavior: preview -> checkout -> download.

### Later pricing tests, only after real usage

Consider these only if the simple flow gets traffic and paid downloads:

- $1.99 or $2.99 single download if unit economics are bad.
- Small pack pricing if users repeatedly generate variants.
- Manual creator/business packs if Alex wants a higher-ticket service bridge.

## Block 6 - Key Resources

Current resources:

- Existing Next.js app.
- Prompt workflows for passport/outfit/style.
- Storage adapter: local + Vercel Blob path.
- Stripe checkout flow / mock mode.
- Abuse controls: in-memory rate limit, honeypot, validation.
- Alex's content/marketing instincts and CanadianProducer channels.

Missing / weak resources:

- Confirmed target image model and production API key/config.
- Real Vercel Blob production test.
- Privacy policy / terms.
- Better prompt/version testing.
- Product name/domain decision.
- Analytics and conversion tracking.

## Block 7 - Key Activities

### Build activities

- Refine prompts and model adapter.
- Deploy to Vercel.
- Add privacy/terms pages.
- Add basic analytics events.
- Test Stripe payment/download flow.

### Growth activities

- Publish before-after examples.
- Create 3 SEO landing pages.
- Test 5-10 short posts/reels.
- Track visits -> generation starts -> preview -> checkout -> paid download.

### Ops activities

- Monitor abuse/costs.
- Check failed generations/payment errors.
- Improve prompts based on outputs.

## Block 8 - Key Partnerships / Dependencies

- Image generation provider: currently Gemini; target may switch to GPT Images.
- Vercel hosting + Blob storage.
- Stripe payments.
- Domain/subdomain via CanadianProducer.ca or standalone domain.
- GitHub for versioning.

Risk:
- Single AI provider can change quality/cost/API.
- Payment fees hurt low-ticket price.
- Public photo app carries abuse/privacy risk.

Mitigation:
- Keep model adapter clean.
- Use free preview limits and moderation.
- Avoid storing images longer than needed.

## Block 9 - Cost Structure

### Fixed costs

- Domain/subdomain: low.
- Vercel: likely free/low at MVP.
- Vercel Blob: usage-based.
- Monitoring/analytics: low/free at first.

### Variable costs

- Image generation per attempt.
- Storage/bandwidth.
- Stripe fees.
- Abuse/fraud/support time.

### Break-even examples

If net profit per paid download is roughly:

- $0.30 at $0.99 price -> 100 paid downloads = $30 gross contribution.

This is not attractive as a mature business, but it is acceptable as a validation price. If the funnel works, price can be raised later with evidence instead of guessing.

## Block 10 - Time & Energy Budget

### Sustainable weekly MVP cadence

- 3-5h product improvements.
- 2h prompt/output testing.
- 2h content demos/social posts.
- 1h analytics/review.

Total: **8-10h/week**.

If it needs more than that before revenue appears, it competes too hard with YAVTUSH and consulting/social tracks.

## Validation Metrics

Track these before overbuilding:

1. Landing page visit -> generation started.
2. Generation started -> preview created.
3. Preview created -> checkout clicked.
4. Checkout clicked -> paid download.
5. Cost per generated preview.
6. Refund/support complaints.

Minimum useful validation:

- 100 real visitors.
- 30+ generations.
- At least 3-5 paid downloads.

If zero paid downloads after decent traffic and good previews, fix offer/result quality before adding features.

## Immediate MVP Decisions Needed

1. Product name: **PhotoForge AI** vs StudioSnap AI vs other.
2. Price test: **decided for MVP code: $0.99 single HD download, no packs/credits/accounts.**
3. Target model/API: Gemini vs GPT Images target.
4. Launch location: CanadianProducer.ca subdomain vs standalone domain.
5. Which first landing page: passport/profile, outfit try-on, or style portrait.

## Recommended Next Build Order

1. Decide model/API target.
2. Refine prompts and add prompt version labels internally.
3. Add analytics events.
4. Add privacy/terms draft pages.
5. Add pricing config so price can be changed without editing UI in multiple places.
6. Deploy Vercel preview.
7. Publish 5 before-after demo posts.

## Orion's Current Recommendation

Position it as **PhotoForge AI** or keep **StudioSnap AI** for now, and launch with:

- Free watermarked preview.
- $0.99 single HD download.
- No packs/credits/accounts in MVP.

Reason: fewer moving parts. Tiny payments are financially silly, yes, but overbuilt MVPs are where small apps go to die in a tasteful SaaS coffin.
