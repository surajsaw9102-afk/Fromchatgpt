# Freewave

Freewave is a premium music streaming web application foundation that is completely free forever. It explicitly excludes subscriptions, paid plans, payment gateways, in-app purchases, locked features, feature limitations, advertisements, and paywalls.

## Architecture

- **Web:** Next.js App Router, React, TypeScript, Tailwind CSS.
- **Authentication:** NextAuth with Prisma adapter, credential login, secure password hashing, JWT sessions.
- **Authorization:** Role-aware session claims for listeners, artists, and administrators.
- **Database:** PostgreSQL modeled with Prisma for users, tracks, playlists, likes, plays, and auth tables.
- **Media:** S3-compatible signed uploads and short-lived signed streaming URLs.
- **Caching:** Redis-backed cache helper and rate-limit primitive with safe no-Redis fallback for local development.
- **Offline:** PWA manifest and named cache constants for track metadata and audio cache integration.
- **Security:** Hardened HTTP headers, strict validation with Zod, upload type allowlisting, redacted structured logs.
- **Observability:** Pino structured logging with production-safe redaction.
- **Performance:** Server-side data access, edge-cache friendly JSON endpoints, CDN-ready media URLs, typed routes, and strict TypeScript.

## Local development

1. Copy `.env.example` to `.env.local` and set real secrets.
2. Start PostgreSQL and Redis.
3. Run `npm install`.
4. Run `npm run db:migrate`.
5. Run `npm run dev`.

## Free forever guarantee

Every user receives every feature for free. Monetization code, payment providers, premium tiers, feature locks, advertisements, and paywalls are intentionally absent from the architecture.

## Phase 3 capabilities

- Offline downloads for songs, albums, and playlists with resumable queue state, storage estimates, cache cleanup, and service-worker-backed offline playback where supported by the browser.
- Audio controls include high-quality/lossless preference UI, equalizer controls, crossfade, sleep timer, persistent background playback behavior, and gapless-session architecture.
- Smart features include recommendations, daily mix, continue listening, listening history, listening statistics, trending data, and smart search suggestions.
- Artist dashboard includes artist login surface, song uploads, album uploads, music editing, analytics, and profile management.
- Admin dashboard includes user management, artist management, music management, reports, analytics, and content moderation.
- Production readiness includes Docker, Docker Compose, GitHub Actions CI, PWA service worker, install manifest assets, production documentation, and build verification scripts.
