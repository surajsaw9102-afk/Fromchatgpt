export type ArtistSummary = {
  id: string;
  name: string;
  image: string;
  genre: string;
  monthlyListeners: number;
};

export type AlbumSummary = {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  cover: string;
  year: number;
  songCount: number;
};

export type SongSummary = {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  albumId: string;
  albumTitle: string;
  artwork: string;
  durationMs: number;
  genre: string;
  plays: number;
  releaseDate: string;
  lyrics: string;
  streamUrl: string;
};

export type PlaylistSummary = {
  id: string;
  name: string;
  description: string;
  cover: string;
  ownerName: string;
  songIds: string[];
  isPublic: boolean;
  updatedAt: string;
};

export const artists: ArtistSummary[] = [
  { id: "nova-vale", name: "Nova Vale", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", genre: "Dream Pop", monthlyListeners: 842100 },
  { id: "atlas-room", name: "Atlas Room", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", genre: "Indie Electronic", monthlyListeners: 633400 },
  { id: "mira-sun", name: "Mira Sun", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91", genre: "Neo Soul", monthlyListeners: 517300 },
  { id: "low-tide-lab", name: "Low Tide Lab", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9", genre: "Ambient", monthlyListeners: 401900 }
];

export const albums: AlbumSummary[] = [
  { id: "afterglow-city", title: "Afterglow City", artistId: "nova-vale", artistName: "Nova Vale", cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", year: 2026, songCount: 9 },
  { id: "signal-garden", title: "Signal Garden", artistId: "atlas-room", artistName: "Atlas Room", cover: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e", year: 2026, songCount: 11 },
  { id: "velvet-orbit", title: "Velvet Orbit", artistId: "mira-sun", artistName: "Mira Sun", cover: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429", year: 2025, songCount: 8 },
  { id: "quiet-machines", title: "Quiet Machines", artistId: "low-tide-lab", artistName: "Low Tide Lab", cover: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", year: 2026, songCount: 7 }
];

const afterglowCover = albums[0]?.cover ?? "";
const signalCover = albums[1]?.cover ?? "";
const velvetCover = albums[2]?.cover ?? "";
const quietCover = albums[3]?.cover ?? "";

export const songs: SongSummary[] = [
  { id: "midnight-static", title: "Midnight Static", artistId: "nova-vale", artistName: "Nova Vale", albumId: "afterglow-city", albumTitle: "Afterglow City", artwork: afterglowCover, durationMs: 218000, genre: "Dream Pop", plays: 918204, releaseDate: "2026-07-15", lyrics: "City lights breathe softly while the skyline learns your name.", streamUrl: "/sample-audio/midnight-static.mp3" },
  { id: "glass-harbor", title: "Glass Harbor", artistId: "atlas-room", artistName: "Atlas Room", albumId: "signal-garden", albumTitle: "Signal Garden", artwork: signalCover, durationMs: 194000, genre: "Indie Electronic", plays: 784110, releaseDate: "2026-07-05", lyrics: "We drift through glass harbors, awake beneath the waves.", streamUrl: "/sample-audio/glass-harbor.mp3" },
  { id: "saffron-moon", title: "Saffron Moon", artistId: "mira-sun", artistName: "Mira Sun", albumId: "velvet-orbit", albumTitle: "Velvet Orbit", artwork: velvetCover, durationMs: 241000, genre: "Neo Soul", plays: 690421, releaseDate: "2025-11-21", lyrics: "Saffron moon, keep my secrets warm until morning.", streamUrl: "/sample-audio/saffron-moon.mp3" },
  { id: "soft-circuit", title: "Soft Circuit", artistId: "low-tide-lab", artistName: "Low Tide Lab", albumId: "quiet-machines", albumTitle: "Quiet Machines", artwork: quietCover, durationMs: 302000, genre: "Ambient", plays: 553800, releaseDate: "2026-06-28", lyrics: "Soft circuits hum in rooms where silence becomes light.", streamUrl: "/sample-audio/soft-circuit.mp3" },
  { id: "violet-runner", title: "Violet Runner", artistId: "nova-vale", artistName: "Nova Vale", albumId: "afterglow-city", albumTitle: "Afterglow City", artwork: afterglowCover, durationMs: 207000, genre: "Dream Pop", plays: 502100, releaseDate: "2026-07-22", lyrics: "Run violet, run brighter, every street is opening.", streamUrl: "/sample-audio/violet-runner.mp3" },
  { id: "northline", title: "Northline", artistId: "atlas-room", artistName: "Atlas Room", albumId: "signal-garden", albumTitle: "Signal Garden", artwork: signalCover, durationMs: 226000, genre: "Indie Electronic", plays: 466992, releaseDate: "2026-07-12", lyrics: "Follow the northline where the analog stars align.", streamUrl: "/sample-audio/northline.mp3" }
];

export const playlists: PlaylistSummary[] = [
  { id: "freewave-focus", name: "Freewave Focus", description: "Polished independent tracks for deep work.", cover: quietCover, ownerName: "Freewave Editors", songIds: ["soft-circuit", "glass-harbor", "northline"], isPublic: true, updatedAt: "2026-07-31" },
  { id: "late-night-city", name: "Late Night City", description: "Glow-heavy songs for midnight walks.", cover: afterglowCover, ownerName: "Freewave Editors", songIds: ["midnight-static", "violet-runner", "saffron-moon"], isPublic: true, updatedAt: "2026-07-30" }
];

export function getSong(id: string) {
  return songs.find((song) => song.id === id);
}

export function getAlbum(id: string) {
  return albums.find((album) => album.id === id);
}

export function getArtist(id: string) {
  return artists.find((artist) => artist.id === id);
}

export function getPlaylist(id: string) {
  return playlists.find((playlist) => playlist.id === id);
}

export function searchCatalog(query: string, genre?: string) {
  const normalized = query.trim().toLowerCase();
  const matches = (value: string) => value.toLowerCase().includes(normalized);
  const songResults = songs.filter((song) => (!normalized || [song.title, song.artistName, song.albumTitle].some(matches)) && (!genre || song.genre === genre));
  const albumResults = albums.filter((album) => !normalized || [album.title, album.artistName].some(matches));
  const artistResults = artists.filter((artist) => !normalized || [artist.name, artist.genre].some(matches));
  const playlistResults = playlists.filter((playlist) => !normalized || [playlist.name, playlist.description, playlist.ownerName].some(matches));
  return { songs: songResults, albums: albumResults, artists: artistResults, playlists: playlistResults };
}
