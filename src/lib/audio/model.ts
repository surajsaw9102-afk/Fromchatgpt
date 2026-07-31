export type AudioTrack = {
  id: string;
  title: string;
  artistName: string;
  album?: string | null;
  genre?: string | null;
  durationMs: number;
  artworkUrl?: string | null;
  streamUrl: string;
};

export function formatDuration(durationMs: number): string {
  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
