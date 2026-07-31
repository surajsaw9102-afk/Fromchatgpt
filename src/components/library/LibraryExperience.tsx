"use client";

import Link from "next/link";
import { albums, artists, playlists, songs } from "@/lib/music/catalog";
import { usePlayer } from "@/components/player/PlayerProvider";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

export function LibraryExperience() {
  const player = usePlayer();
  const likedSongs = songs.slice(0, 4);
  return (
    <div className="mx-auto max-w-7xl py-14">
      <h1 className="text-5xl font-black">Your Library</h1>
      <Section title="Liked Songs"><div className="space-y-3">{likedSongs.map((song, index) => <Card key={song.id} className="flex items-center justify-between"><button onClick={() => player.setQueue(likedSongs, index)} className="text-left"><strong>{song.title}</strong><p className="text-sm text-slate-400">{song.artistName}</p></button><span className="text-sm text-slate-400">Liked</span></Card>)}</div></Section>
      <Section title="Favorite Albums"><div className="grid gap-4 md:grid-cols-4">{albums.map((album) => <Link href={`/albums/${album.id}`} key={album.id}><Card><img src={album.cover} alt="" className="aspect-square rounded-2xl object-cover" /><h3 className="mt-3 font-bold">{album.title}</h3></Card></Link>)}</div></Section>
      <Section title="Favorite Artists"><div className="grid gap-4 md:grid-cols-4">{artists.map((artist) => <Link href={`/artists/${artist.id}`} key={artist.id}><Card><h3 className="font-bold">{artist.name}</h3><p className="text-sm text-slate-400">{artist.monthlyListeners.toLocaleString()} monthly listeners</p></Card></Link>)}</div></Section>
      <Section title="Recently Played"><div className="grid gap-4 md:grid-cols-3">{songs.slice().reverse().slice(0, 3).map((song) => <Card key={song.id}><h3 className="font-bold">{song.title}</h3><p className="text-sm text-slate-400">{song.albumTitle}</p></Card>)}</div></Section>
      <Section title="Playlist Library"><div className="grid gap-4 md:grid-cols-2">{playlists.map((playlist) => <Link href={`/playlists/${playlist.id}`} key={playlist.id}><Card><h3 className="font-bold">{playlist.name}</h3><p className="text-sm text-slate-400">{playlist.songIds.length} songs</p></Card></Link>)}</div></Section>
    </div>
  );
}
