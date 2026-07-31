import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur transition hover:bg-white/[0.11] ${className}`}>{children}</div>;
}
