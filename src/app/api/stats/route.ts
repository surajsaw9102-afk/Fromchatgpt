import { songs } from "@/lib/music/catalog";

export function GET(): Response {
  const totalMinutes = Math.round(songs.reduce((total, song) => total + song.durationMs, 0) / 60000);
  const topGenres = Array.from(new Set(songs.map((song) => song.genre))).map((genre) => ({ genre, plays: songs.filter((song) => song.genre === genre).reduce((total, song) => total + song.plays, 0) }));
  return Response.json({ totalMinutes, totalTracks: songs.length, topGenres, streakDays: 18 });
}
