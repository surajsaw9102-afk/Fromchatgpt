import Link from "next/link";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen px-6 py-6 md:px-10">
      <header className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
        <Link href="/" className="text-lg font-black tracking-tight">Freewave</Link>
        <nav className="flex items-center gap-5 text-sm text-slate-300">
          <a href="#library">Library</a>
          <a href="#upload">Upload</a>
          <a href="#offline">Offline</a>
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-200">Free forever</span>
        </nav>
      </header>
      {children}
    </main>
  );
}
