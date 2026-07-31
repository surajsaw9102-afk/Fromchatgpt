"use client";

import { useMemo, useState } from "react";
import { songs, type PlaylistSummary } from "@/lib/music/catalog";
import { usePlayer } from "@/components/player/PlayerProvider";
import { Card } from "@/components/ui/Card";

export function PlaylistEditor({ initialPlaylist }: { initialPlaylist?: PlaylistSummary }) {
  const player = usePlayer();
  const [name, setName] = useState(initialPlaylist?.name ?? "My Freewave Mix");
  const [description, setDescription] = useState(initialPlaylist?.description ?? "A free playlist with every feature unlocked.");
  const firstSong = songs[0];
  const [cover, setCover] = useState(initialPlaylist?.cover ?? firstSong?.artwork ?? "");
  const [songIds, setSongIds] = useState<string[]>(initialPlaylist?.songIds ?? songs.slice(0, 2).map((song) => song.id));
  const selectedSongs = useMemo(() => songs.filter((song) => songIds.includes(song.id)), [songIds]);

  function toggleSong(id: string) {
    setSongIds((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]);
  }

  function share() {
    void navigator.clipboard?.writeText(`${window.location.origin}/playlists/${initialPlaylist?.id ?? "new"}`);
  }

  function removePlaylist() {
    setSongIds([]);
    setName("New Free Playlist");
    setDescription("Create another free playlist with no limits.");
  }

  return (
    <div className="mx-auto max-w-7xl py-14">
      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        <Card>
          <img src={cover} alt="" className="aspect-square w-full rounded-3xl object-cover" />
          <label className="mt-5 block text-sm text-slate-400">Playlist cover URL</label>
          <input value={cover} onChange={(event) => setCover(event.target.value)} className="mt-2 w-full rounded-2xl bg-white/10 px-4 py-3" />
        </Card>
        <div>
          <input value={name} onChange={(event) => setName(event.target.value)} className="w-full bg-transparent text-5xl font-black outline-none" />
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="mt-4 min-h-24 w-full rounded-3xl bg-white/10 p-4 text-slate-200 outline-none" />
          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={() => player.setQueue(selectedSongs, 0)} className="rounded-full bg-white px-6 py-3 font-bold text-ink">Play Playlist</button>
            <button onClick={share} className="rounded-full bg-white/10 px-6 py-3 font-bold">Share Playlist</button>
            <button onClick={removePlaylist} className="rounded-full bg-rose-400/15 px-6 py-3 font-bold text-rose-100">Delete Playlist</button>
          </div>
          <h2 className="mt-10 text-2xl font-black">Songs</h2>
          <div className="mt-4 space-y-3">{songs.map((song) => <Card key={song.id} className="flex items-center justify-between"><span><strong>{song.title}</strong><p className="text-sm text-slate-400">{song.artistName}</p></span><button onClick={() => toggleSong(song.id)} className="rounded-full bg-white/10 px-4 py-2 text-sm">{songIds.includes(song.id) ? "Remove" : "Add"}</button></Card>)}</div>
        </div>
      </div>
    </div>
  );
}
