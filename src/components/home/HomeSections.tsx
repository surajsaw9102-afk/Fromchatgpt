"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { albums, artists, playlists, songs } from "@/lib/music/catalog";
import { usePlayer } from "@/components/player/PlayerProvider";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

export function HomeSections() {
  const player = usePlayer();
  const firstSong = songs[0];
  const trending = [...songs].sort((a, b) => b.plays - a.plays).slice(0, 4);
  if (!firstSong) return null;

  return (
    <>
      <Section title="Continue Listening" subtitle="Resume instantly across desktop, tablet, and mobile.">
        <Card className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img src={firstSong.artwork} alt="" className="h-24 w-24 rounded-3xl object-cover" />
            <div>
              <p className="text-sm uppercase tracking-[.25em] text-pulse">Last played</p>
              <h3 className="text-3xl font-black">{firstSong.title}</h3>
              <p className="text-slate-300">{firstSong.artistName} · Lyrics, queue, speed, and shortcuts ready</p>
            </div>
          </div>
          <button onClick={() => player.setQueue(songs, 0)} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-ink"><Play size={18} /> Resume</button>
        </Card>
      </Section>
      <Section title="Trending Songs" subtitle="High velocity tracks from the free catalog.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trending.map((song, index) => (
            <Card key={song.id}>
              <button onClick={() => player.setQueue(trending, index)} className="group text-left">
                <img src={song.artwork} alt="" className="aspect-square w-full rounded-2xl object-cover transition group-hover:scale-[1.02]" />
                <h3 className="mt-4 font-bold">{song.title}</h3>
                <p className="text-sm text-slate-400">{song.artistName}</p>
              </button>
            </Card>
          ))}
        </div>
      </Section>
      <Section title="New Releases" subtitle="Fresh albums and singles added for every listener at no cost.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {albums.map((album) => (
            <Link href={`/albums/${album.id}`} key={album.id}><Card><img src={album.cover} alt="" className="aspect-square w-full rounded-2xl object-cover" /><h3 className="mt-4 font-bold">{album.title}</h3><p className="text-sm text-slate-400">{album.artistName} · {album.year}</p></Card></Link>
          ))}
        </div>
      </Section>
      <Section title="Popular Artists" subtitle="Discover independent creators shaping the catalog.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {artists.map((artist) => (
            <Link href={`/artists/${artist.id}`} key={artist.id}><Card className="text-center"><img src={artist.image} alt="" className="mx-auto aspect-square w-32 rounded-full object-cover" /><h3 className="mt-4 font-bold">{artist.name}</h3><p className="text-sm text-slate-400">{artist.genre}</p></Card></Link>
          ))}
        </div>
      </Section>
      <Section title="Personalized for You" subtitle="Editor-built playlists until user-specific recommendations are learned.">
        <div className="grid gap-4 md:grid-cols-2">
          {playlists.map((playlist) => (
            <Link href={`/playlists/${playlist.id}`} key={playlist.id}><Card className="flex gap-4"><img src={playlist.cover} alt="" className="h-28 w-28 rounded-2xl object-cover" /><div><h3 className="font-bold">{playlist.name}</h3><p className="mt-2 text-sm text-slate-400">{playlist.description}</p></div></Card></Link>
          ))}
        </div>
      </Section>
    </>
  );
}
