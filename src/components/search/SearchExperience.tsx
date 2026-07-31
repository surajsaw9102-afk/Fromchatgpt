"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { searchCatalog, songs } from "@/lib/music/catalog";
import { usePlayer } from "@/components/player/PlayerProvider";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

const genres = ["All", ...Array.from(new Set(songs.map((song) => song.genre)))];

export function SearchExperience() {
  const player = usePlayer();
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [history, setHistory] = useState<string[]>([]);
  const results = useMemo(() => searchCatalog(query, genre === "All" ? undefined : genre), [genre, query]);
  const suggestions = useMemo(() => songs.filter((song) => song.title.toLowerCase().includes(query.toLowerCase())).slice(0, 5), [query]);

  function remember(value: string) {
    if (!value.trim()) return;
    setHistory((items) => [value, ...items.filter((item) => item !== value)].slice(0, 6));
  }

  return (
    <div className="mx-auto max-w-7xl py-14">
      <h1 className="text-5xl font-black">Search the free catalog</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_220px]">
        <input value={query} onChange={(event) => setQuery(event.target.value)} onBlur={() => remember(query)} placeholder="Search songs, albums, artists, playlists" className="rounded-3xl border border-white/10 bg-white/10 px-6 py-4 text-lg outline-none focus:border-pulse" />
        <select value={genre} onChange={(event) => setGenre(event.target.value)} className="rounded-3xl border border-white/10 bg-white/10 px-6 py-4 outline-none">
          {genres.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {[...suggestions.map((song) => song.title), ...history].slice(0, 8).map((item) => <button key={item} onClick={() => setQuery(item)} className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-300">{item}</button>)}
      </div>
      <Section title="Songs">
        <div className="space-y-3">{results.songs.map((song, index) => <Card key={song.id} className="flex items-center justify-between gap-4"><button onClick={() => player.setQueue(results.songs, index)} className="flex min-w-0 items-center gap-4 text-left"><img src={song.artwork} alt="" className="h-14 w-14 rounded-xl object-cover" /><span className="min-w-0"><strong className="block truncate">{song.title}</strong><small className="text-slate-400">{song.artistName} · {song.genre}</small></span></button><span className="text-sm text-slate-400">{song.plays.toLocaleString()} plays</span></Card>)}</div>
      </Section>
      <Section title="Albums"><div className="grid gap-4 md:grid-cols-4">{results.albums.map((album) => <Link href={`/albums/${album.id}`} key={album.id}><Card><img src={album.cover} alt="" className="aspect-square rounded-2xl object-cover" /><h3 className="mt-3 font-bold">{album.title}</h3><p className="text-sm text-slate-400">{album.artistName}</p></Card></Link>)}</div></Section>
      <Section title="Artists"><div className="grid gap-4 md:grid-cols-4">{results.artists.map((artist) => <Link href={`/artists/${artist.id}`} key={artist.id}><Card><h3 className="font-bold">{artist.name}</h3><p className="text-sm text-slate-400">{artist.genre}</p></Card></Link>)}</div></Section>
      <Section title="Playlists"><div className="grid gap-4 md:grid-cols-2">{results.playlists.map((playlist) => <Link href={`/playlists/${playlist.id}`} key={playlist.id}><Card><h3 className="font-bold">{playlist.name}</h3><p className="text-sm text-slate-400">{playlist.description}</p></Card></Link>)}</div></Section>
    </div>
  );
}
