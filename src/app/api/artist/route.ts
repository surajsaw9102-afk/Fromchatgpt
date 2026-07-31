import { albums, artists, songs } from "@/lib/music/catalog";

export function GET(): Response {
  const artist = artists[0] ?? null;
  return Response.json({ artist, albums: albums.filter((album) => album.artistId === artist?.id), songs: songs.filter((song) => song.artistId === artist?.id), analytics: { streams: 1423120, listeners: 842100, saves: 11840, completionRate: 0.84 } });
}

export async function POST(request: Request): Promise<Response> {
  const payload = await request.json();
  return Response.json({ saved: true, payload, savedAt: new Date().toISOString() }, { status: 201 });
}
