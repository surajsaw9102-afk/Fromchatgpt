import { notFound } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { getAlbum, songs } from "@/lib/music/catalog";
import { Card } from "@/components/ui/Card";

export default async function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const album = getAlbum(id);
  if (!album) notFound();
  const albumSongs = songs.filter((song) => song.albumId === album.id);
  return <AppShell><div className="mx-auto max-w-7xl py-14"><div className="grid gap-8 md:grid-cols-[320px_1fr]"><img src={album.cover} alt="" className="aspect-square rounded-[2rem] object-cover shadow-glow" /><div className="self-end"><p className="text-pulse">Album Details</p><h1 className="text-6xl font-black">{album.title}</h1><p className="mt-3 text-slate-300">{album.artistName} · {album.year} · {album.songCount} songs</p><p className="mt-6 max-w-2xl text-slate-400">A free-forever release with high quality streaming, lyrics-capable playback, queue controls, and offline-ready architecture available to every listener.</p></div></div><section className="mt-12 space-y-3">{albumSongs.map((song, index) => <Card key={song.id} className="flex items-center justify-between"><span><strong>{index + 1}. {song.title}</strong><p className="text-sm text-slate-400">{song.genre}</p></span><span className="text-sm text-slate-400">{Math.floor(song.durationMs / 60000)}:{String(Math.floor(song.durationMs / 1000) % 60).padStart(2, "0")}</span></Card>)}</section></div></AppShell>;
}
