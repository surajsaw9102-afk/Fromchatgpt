import { notFound } from "next/navigation";
import { PlaylistEditor } from "@/components/playlists/PlaylistEditor";
import { AppShell } from "@/components/shell/AppShell";
import { getPlaylist } from "@/lib/music/catalog";

export default async function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const playlist = getPlaylist(id);
  if (!playlist) notFound();
  return <AppShell><PlaylistEditor initialPlaylist={playlist} /></AppShell>;
}
