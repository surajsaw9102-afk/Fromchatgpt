import { albums, artists, playlists, songs } from "@/lib/music/catalog";

export function GET(): Response {
  return Response.json({ likedSongs: songs.slice(0, 4), favoriteAlbums: albums, favoriteArtists: artists, recentlyPlayed: songs.slice().reverse().slice(0, 6), playlists });
}
