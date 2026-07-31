"use client";

import type { ReactNode } from "react";
import { PlayerProvider } from "@/components/player/PlayerProvider";
import { GlobalPlayer } from "@/components/player/GlobalPlayer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PlayerProvider>
      {children}
      <GlobalPlayer />
    </PlayerProvider>
  );
}
