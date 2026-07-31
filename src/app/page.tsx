import { AppShell } from "@/components/shell/AppShell";
import { HomeSections } from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <AppShell>
      <section className="mx-auto grid max-w-7xl gap-10 py-20 md:grid-cols-[1.1fr_.9fr] md:items-center">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200">
            Premium music streaming. Free forever. No ads. No paywalls.
          </p>
          <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
            A world-class home for independent sound.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Freewave is architected for secure authentication, artist uploads, resilient streaming,
            offline listening, cached discovery, and enterprise observability without subscriptions,
            paid plans, in-app purchases, locked features, limitations, advertisements, or paywalls.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Every feature free",
              "Secure uploads",
              "Offline-first playback",
              "Fast global delivery",
              "Privacy-conscious analytics"
            ].map((item) => (
              <span key={item} className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200">{item}</span>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-glow backdrop-blur">
          <div className="rounded-3xl bg-gradient-to-br from-aurora via-pulse to-ember p-1">
            <div className="rounded-[1.35rem] bg-ink/90 p-6">
              <h2 className="text-2xl font-bold">Foundation included</h2>
              <ul className="mt-5 space-y-3 text-slate-300">
                <li>Authentication and role-based authorization</li>
                <li>PostgreSQL data model with Prisma</li>
                <li>S3-compatible media upload and streaming URLs</li>
                <li>Redis-backed caching and rate limiting</li>
                <li>Offline cache strategy for installed web app flows</li>
                <li>Structured logging, strict TypeScript, hardened headers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <HomeSections />
    </AppShell>
  );
}
