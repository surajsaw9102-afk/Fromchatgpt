import { OFFLINE_CACHE_NAME, OFFLINE_METADATA_STORE, OFFLINE_TRACK_STORE } from "./constants";
import type { AlbumSummary, PlaylistSummary, SongSummary } from "@/lib/music/catalog";

export type DownloadStatus = "queued" | "downloading" | "completed" | "failed" | "paused";

export type DownloadItem = {
  id: string;
  type: "song" | "album" | "playlist";
  title: string;
  songIds: string[];
  status: DownloadStatus;
  progress: number;
  updatedAt: string;
};

const DB_NAME = "freewave-offline-db";
const DB_VERSION = 1;

function openOfflineDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(OFFLINE_TRACK_STORE)) db.createObjectStore(OFFLINE_TRACK_STORE, { keyPath: "id" });
      if (!db.objectStoreNames.contains(OFFLINE_METADATA_STORE)) db.createObjectStore(OFFLINE_METADATA_STORE, { keyPath: "id" });
      if (!db.objectStoreNames.contains("download-queue")) db.createObjectStore("download-queue", { keyPath: "id" });
    };
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function writeStore<T extends { id: string }>(storeName: string, value: T): Promise<void> {
  const db = await openOfflineDb();
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    transaction.objectStore(storeName).put(value);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

async function readAll<T>(storeName: string): Promise<T[]> {
  const db = await openOfflineDb();
  const values = await new Promise<T[]>((resolve, reject) => {
    const request = db.transaction(storeName).objectStore(storeName).getAll();
    request.onsuccess = () => resolve(request.result as T[]);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return values;
}

async function deleteFromStore(storeName: string, id: string): Promise<void> {
  const db = await openOfflineDb();
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    transaction.objectStore(storeName).delete(id);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

export async function registerServiceWorker(): Promise<void> {
  if (!("serviceWorker" in navigator)) return;
  await navigator.serviceWorker.register("/sw.js", { scope: "/" });
}

export async function cachePlayedSong(song: SongSummary): Promise<void> {
  if (!("caches" in window)) return;
  const cache = await caches.open(OFFLINE_CACHE_NAME);
  await cache.add(song.streamUrl);
  await writeStore(OFFLINE_METADATA_STORE, { id: song.id, song, cachedAt: new Date().toISOString() });
}

export async function queueSongDownload(song: SongSummary): Promise<DownloadItem> {
  const item: DownloadItem = { id: `song:${song.id}`, type: "song", title: song.title, songIds: [song.id], status: "queued", progress: 0, updatedAt: new Date().toISOString() };
  await writeStore("download-queue", item);
  return item;
}

export async function queueAlbumDownload(album: AlbumSummary, songs: SongSummary[]): Promise<DownloadItem> {
  const item: DownloadItem = { id: `album:${album.id}`, type: "album", title: album.title, songIds: songs.map((song) => song.id), status: "queued", progress: 0, updatedAt: new Date().toISOString() };
  await writeStore("download-queue", item);
  return item;
}

export async function queuePlaylistDownload(playlist: PlaylistSummary): Promise<DownloadItem> {
  const item: DownloadItem = { id: `playlist:${playlist.id}`, type: "playlist", title: playlist.name, songIds: playlist.songIds, status: "queued", progress: 0, updatedAt: new Date().toISOString() };
  await writeStore("download-queue", item);
  return item;
}

export async function runDownloadQueue(catalogSongs: SongSummary[]): Promise<DownloadItem[]> {
  const queue = await readAll<DownloadItem>("download-queue");
  const cache = await caches.open(OFFLINE_CACHE_NAME);
  const completed: DownloadItem[] = [];
  for (const item of queue) {
    const nextItem = { ...item, status: "downloading" as DownloadStatus, updatedAt: new Date().toISOString() };
    await writeStore("download-queue", nextItem);
    const downloadSongs = catalogSongs.filter((song) => item.songIds.includes(song.id));
    let finished = 0;
    for (const song of downloadSongs) {
      await cache.add(song.streamUrl);
      await writeStore(OFFLINE_TRACK_STORE, { id: song.id, song, cachedAt: new Date().toISOString() });
      finished += 1;
      await writeStore("download-queue", { ...nextItem, progress: Math.round((finished / downloadSongs.length) * 100), updatedAt: new Date().toISOString() });
    }
    const done = { ...nextItem, status: "completed" as DownloadStatus, progress: 100, updatedAt: new Date().toISOString() };
    await writeStore("download-queue", done);
    completed.push(done);
  }
  return completed;
}

export async function getDownloadQueue(): Promise<DownloadItem[]> {
  return readAll<DownloadItem>("download-queue");
}

export async function cleanupOfflineCache(maxItems = 100): Promise<void> {
  const cached = await readAll<{ id: string; cachedAt: string }>(OFFLINE_TRACK_STORE);
  const overflow = cached.sort((a, b) => a.cachedAt.localeCompare(b.cachedAt)).slice(0, Math.max(0, cached.length - maxItems));
  const cache = await caches.open(OFFLINE_CACHE_NAME);
  for (const item of overflow) {
    await deleteFromStore(OFFLINE_TRACK_STORE, item.id);
    await cache.delete(new Request(`/sample-audio/${item.id}.mp3`));
  }
}

export async function estimateStorage(): Promise<StorageEstimate> {
  return navigator.storage?.estimate ? navigator.storage.estimate() : { quota: 0, usage: 0 };
}
