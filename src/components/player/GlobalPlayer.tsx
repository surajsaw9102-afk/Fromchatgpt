"use client";

import { Maximize2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useState } from "react";
import { usePlayer } from "./PlayerProvider";

export function GlobalPlayer() {
  const player = usePlayer();
  const [fullscreen, setFullscreen] = useState(false);
  if (!player.current) return null;
  const duration = player.duration || player.current.durationMs / 1000;

  return (
    <aside className={`${fullscreen ? "fixed inset-4 z-50 grid place-items-center rounded-[2rem] bg-ink/95 p-8" : "fixed inset-x-4 bottom-4 z-50 rounded-3xl border border-white/10 bg-ink/90 p-4 shadow-glow backdrop-blur md:inset-x-8"}`}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 md:flex-row md:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <img src={player.current.artwork} alt="" className="h-16 w-16 rounded-2xl object-cover" />
          <div className="min-w-0">
            <p className="truncate font-bold">{player.current.title}</p>
            <p className="truncate text-sm text-slate-400">{player.current.artistName}</p>
          </div>
        </div>
        <div className="flex flex-[2] flex-col gap-3">
          <div className="flex items-center justify-center gap-3">
            <button aria-label="Shuffle" onClick={() => player.setShuffle(!player.shuffle)} className={player.shuffle ? "text-pulse" : "text-slate-300"}><Shuffle size={19} /></button>
            <button aria-label="Previous" onClick={player.previous}><SkipBack size={22} /></button>
            <button aria-label={player.isPlaying ? "Pause" : "Play"} onClick={() => void player.toggle()} className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink">{player.isPlaying ? <Pause size={20} /> : <Play size={20} />}</button>
            <button aria-label="Next" onClick={player.next}><SkipForward size={22} /></button>
            <button aria-label="Repeat" onClick={() => player.setRepeat(player.repeat === "off" ? "all" : player.repeat === "all" ? "one" : "off")} className={player.repeat !== "off" ? "text-pulse" : "text-slate-300"}><Repeat size={19} /></button>
          </div>
          <input aria-label="Seek bar" type="range" min={0} max={duration} value={Math.min(player.progress, duration)} onChange={(event) => player.seek(Number(event.target.value))} className="w-full accent-pulse" />
        </div>
        <div className="flex items-center justify-end gap-3 md:w-72">
          <select aria-label="Playback speed" value={player.speed} onChange={(event) => player.setSpeed(Number(event.target.value))} className="rounded-full bg-white/10 px-3 py-2 text-sm">
            {[0.75, 1, 1.25, 1.5, 2].map((speed) => <option key={speed} value={speed}>{speed}x</option>)}
          </select>
          <Volume2 size={18} />
          <input aria-label="Volume" type="range" min={0} max={1} step={0.01} value={player.volume} onChange={(event) => player.setVolume(Number(event.target.value))} className="w-24 accent-pulse" />
          <button aria-label="Full screen player" onClick={() => setFullscreen((value) => !value)}><Maximize2 size={18} /></button>
        </div>
      </div>
      {fullscreen ? <pre className="mt-8 whitespace-pre-wrap text-center text-lg leading-8 text-slate-200">{player.current.lyrics}</pre> : null}
    </aside>
  );
}
