"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";

const bands = ["60", "170", "310", "600", "1k", "3k", "6k", "12k", "14k", "16k"];

export function AudioSettingsPanel() {
  const [quality, setQuality] = useState("high");
  const [crossfade, setCrossfade] = useState(4);
  const [sleepTimer, setSleepTimer] = useState(0);
  const [gain, setGain] = useState(() => bands.map(() => 0));

  return (
    <Card>
      <h2 className="text-2xl font-black">Audio Session</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label><span className="text-sm text-slate-400">Streaming quality</span><select value={quality} onChange={(event) => setQuality(event.target.value)} className="mt-2 w-full rounded-2xl bg-white/10 p-3"><option value="high">High quality</option><option value="lossless">Lossless when media supports it</option></select></label>
        <label><span className="text-sm text-slate-400">Sleep timer</span><select value={sleepTimer} onChange={(event) => setSleepTimer(Number(event.target.value))} className="mt-2 w-full rounded-2xl bg-white/10 p-3"><option value={0}>Off</option><option value={15}>15 minutes</option><option value={30}>30 minutes</option><option value={60}>60 minutes</option></select></label>
        <label><span className="text-sm text-slate-400">Crossfade: {crossfade}s</span><input type="range" min={0} max={12} value={crossfade} onChange={(event) => setCrossfade(Number(event.target.value))} className="mt-4 w-full accent-pulse" /></label>
        <div><h3 className="font-bold">Gapless + background playback</h3><p className="mt-2 text-sm text-slate-400">The player keeps a persistent audio element mounted at app root and preloads adjacent queued songs.</p></div>
      </div>
      <div className="mt-8"><h3 className="font-bold">Equalizer</h3><div className="mt-4 flex h-44 items-end gap-3">{bands.map((band, index) => <label key={band} className="flex flex-1 flex-col items-center gap-2 text-xs text-slate-400"><input aria-label={`${band} Hz gain`} type="range" min={-12} max={12} value={gain[index]} onChange={(event) => setGain((values) => values.map((value, itemIndex) => itemIndex === index ? Number(event.target.value) : value))} className="h-32 accent-pulse [writing-mode:vertical-rl]" />{band}</label>)}</div></div>
    </Card>
  );
}
