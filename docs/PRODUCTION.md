# Production Readiness

## Runtime

- Run with Node.js 22 or newer.
- Use PostgreSQL for durable data and Redis for cache/rate-limiting.
- Store audio and artwork in an S3-compatible object store behind a CDN.

## Security

- Set a high-entropy `AUTH_SECRET`.
- Rotate S3 credentials regularly and scope bucket permissions to required objects.
- Keep all free-forever features available to every user; do not add subscription, payment, advertising, paywall, or locked-feature code.

## Performance

- The app uses Next.js App Router for route-level code splitting.
- Media is CDN-addressable and signed stream URLs are short-lived.
- Redis caching reduces catalog/discovery load.
- PWA service worker caches shell assets, images, and played audio where supported by the browser.

## Accessibility

- Interactive playback controls include accessible labels.
- Forms use visible labels or descriptive placeholders.
- Color contrast is designed for a dark premium interface.
