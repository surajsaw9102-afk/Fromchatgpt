import { albums, artists, playlists, songs } from "@/lib/music/catalog";

export function GET(): Response {
  return Response.json({ users: 12840, artists: artists.length, albums: albums.length, songs: songs.length, playlists: playlists.length, reports: [{ id: "report-1", type: "metadata", status: "reviewed" }], moderationQueue: songs.slice(0, 2) });
}
