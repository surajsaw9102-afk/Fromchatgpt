import { albums, artists, playlists, songs } from "@/lib/music/catalog";

export function GET(): Response {
  const trending = [...songs].sort((a, b) => b.plays - a.plays);
  const dailyMix = songs.filter((song) => ["Dream Pop", "Indie Electronic"].includes(song.genre));
  return Response.json({ continueListening: songs[0] ?? null, dailyMix, recommendations: trending.slice(0, 6), popularArtists: artists, popularAlbums: albums, playlists });
}
