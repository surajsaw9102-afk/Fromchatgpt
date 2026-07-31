import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { albums, artists, getArtist, songs } from "@/lib/music/catalog";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

export default async function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artist = getArtist(id);
  if (!artist) notFound();
  const artistSongs = songs.filter((song) => song.artistId === artist.id);
  const artistAlbums = albums.filter((album) => album.artistId === artist.id);
  const related = artists.filter((item) => item.genre === artist.genre && item.id !== artist.id).concat(artists.filter((item) => item.id !== artist.id)).slice(0, 3);
  return <AppShell><div className="mx-auto max-w-7xl py-14"><div className="flex flex-col gap-6 md:flex-row md:items-end"><img src={artist.image} alt="" className="h-52 w-52 rounded-full object-cover" /><div><p className="text-pulse">Artist Profile</p><h1 className="text-6xl font-black">{artist.name}</h1><p className="mt-3 text-slate-300">{artist.genre} · {artist.monthlyListeners.toLocaleString()} monthly listeners</p></div></div><Section title="Popular Songs"><div className="space-y-3">{artistSongs.map((song) => <Card key={song.id}><strong>{song.title}</strong><p className="text-sm text-slate-400">{song.plays.toLocaleString()} plays</p></Card>)}</div></Section><Section title="Albums & Singles"><div className="grid gap-4 md:grid-cols-4">{artistAlbums.map((album) => <Link href={`/albums/${album.id}`} key={album.id}><Card><img src={album.cover} alt="" className="aspect-square rounded-2xl object-cover" /><h3 className="mt-3 font-bold">{album.title}</h3></Card></Link>)}</div></Section><Section title="Related Artists"><div className="grid gap-4 md:grid-cols-3">{related.map((item) => <Link href={`/artists/${item.id}`} key={item.id}><Card><h3 className="font-bold">{item.name}</h3><p className="text-sm text-slate-400">{item.genre}</p></Card></Link>)}</div></Section></div></AppShell>;
}
