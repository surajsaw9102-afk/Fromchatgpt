"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { SongSummary } from "@/lib/music/catalog";

type RepeatMode = "off" | "one" | "all";

type PlayerState = {
  queue: SongSummary[];
  current?: SongSummary;
  currentIndex: number;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  shuffle: boolean;
  repeat: RepeatMode;
  speed: number;
  setQueue: (songs: SongSummary[], startIndex?: number) => void;
  toggle: () => Promise<void>;
  next: () => void;
  previous: () => void;
  seek: (seconds: number) => void;
  setVolume: (volume: number) => void;
  setShuffle: (enabled: boolean) => void;
  setRepeat: (mode: RepeatMode) => void;
  setSpeed: (speed: number) => void;
};

const PlayerContext = createContext<PlayerState | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [queue, updateQueue] = useState<SongSummary[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, updateVolume] = useState(0.85);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<RepeatMode>("off");
  const [speed, updateSpeed] = useState(1);
  const current = queue[currentIndex];

  const setQueue = useCallback((songs: SongSummary[], startIndex = 0) => {
    updateQueue(songs);
    setCurrentIndex(Math.max(0, Math.min(startIndex, songs.length - 1)));
    setIsPlaying(true);
  }, []);

  const playCurrent = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !current) return;
    await audio.play();
    setIsPlaying(true);
  }, [current]);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !current) return;
    if (audio.paused) await playCurrent();
    else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [current, playCurrent]);

  const next = useCallback(() => {
    if (!queue.length) return;
    if (shuffle) setCurrentIndex(Math.floor(Math.random() * queue.length));
    else setCurrentIndex((index) => (index + 1) % queue.length);
    setIsPlaying(true);
  }, [queue.length, shuffle]);

  const previous = useCallback(() => {
    if (!queue.length) return;
    setCurrentIndex((index) => (index - 1 + queue.length) % queue.length);
    setIsPlaying(true);
  }, [queue.length]);

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = seconds;
    setProgress(seconds);
  }, []);

  const setVolume = useCallback((nextVolume: number) => {
    const normalized = Math.max(0, Math.min(1, nextVolume));
    updateVolume(normalized);
    if (audioRef.current) audioRef.current.volume = normalized;
  }, []);

  const setSpeed = useCallback((nextSpeed: number) => {
    updateSpeed(nextSpeed);
    if (audioRef.current) audioRef.current.playbackRate = nextSpeed;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !current) return;
    audio.src = current.streamUrl;
    audio.volume = volume;
    audio.playbackRate = speed;
    if (isPlaying) void audio.play();
  }, [current, isPlaying, speed, volume]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.code === "Space") {
        event.preventDefault();
        void toggle();
      }
      if (event.code === "ArrowRight") next();
      if (event.code === "ArrowLeft") previous();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, previous, toggle]);

  const value = useMemo<PlayerState>(() => ({
    queue,
    current,
    currentIndex,
    isPlaying,
    volume,
    progress,
    duration,
    shuffle,
    repeat,
    speed,
    setQueue,
    toggle,
    next,
    previous,
    seek,
    setVolume,
    setShuffle,
    setRepeat,
    setSpeed
  }), [current, currentIndex, duration, isPlaying, next, previous, progress, queue, repeat, seek, setQueue, setSpeed, setVolume, shuffle, speed, toggle, volume]);

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onEnded={() => {
          if (repeat === "one") seek(0);
          if (repeat === "one") void audioRef.current?.play();
          if (repeat === "all" || currentIndex < queue.length - 1) next();
          if (repeat === "off" && currentIndex >= queue.length - 1) setIsPlaying(false);
        }}
      />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const state = useContext(PlayerContext);
  if (!state) throw new Error("usePlayer must be used within PlayerProvider");
  return state;
}
