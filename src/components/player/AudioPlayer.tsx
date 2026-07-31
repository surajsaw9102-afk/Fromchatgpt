"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { formatDuration, type AudioTrack } from "@/lib/audio/model";

export function AudioPlayer({ track }: { track: AudioTrack }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-glow backdrop-blur">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={togglePlayback}
          className="grid h-14 w-14 place-items-center rounded-full bg-white text-ink transition hover:scale-105"
          aria-label={playing ? "Pause track" : "Play track"}
        >
          {playing ? <Pause size={22} /> : <Play size={22} />}
        </button>
        <div className="min-w-0">
          <h3 className="truncate text-xl font-bold">{track.title}</h3>
          <p className="truncate text-sm text-slate-300">{track.artistName} · {formatDuration(track.durationMs)}</p>
        </div>
      </div>
      <audio ref={audioRef} preload="metadata" src={track.streamUrl} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} />
    </section>
  );
}
