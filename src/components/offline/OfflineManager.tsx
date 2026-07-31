"use client";

import { useEffect, useState } from "react";
import { albums, playlists, songs } from "@/lib/music/catalog";
import { cleanupOfflineCache, estimateStorage, getDownloadQueue, queueAlbumDownload, queuePlaylistDownload, queueSongDownload, registerServiceWorker, runDownloadQueue, type DownloadItem } from "@/lib/offline/manager";
import { Card } from "@/components/ui/Card";

export function OfflineManager() {
  const [queue, setQueue] = useState<DownloadItem[]>([]);
  const [storage, setStorage] = useState<StorageEstimate>({ quota: 0, usage: 0 });

  async function refresh() {
    setQueue(await getDownloadQueue());
    setStorage(await estimateStorage());
  }

  useEffect(() => {
    void registerServiceWorker().then(refresh);
  }, []);

  return (
    <div className="mx-auto max-w-7xl py-14">
      <h1 className="text-5xl font-black">Offline downloads</h1>
      <p className="mt-3 max-w-2xl text-slate-300">Download songs, albums, and playlists for offline playback. Played songs are automatically cached by the service worker.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card><h2 className="font-bold">Storage Manager</h2><p className="mt-2 text-sm text-slate-400">{Math.round((storage.usage ?? 0) / 1024 / 1024)} MB used of {Math.round((storage.quota ?? 0) / 1024 / 1024)} MB</p><button onClick={() => void cleanupOfflineCache(50).then(refresh)} className="mt-4 rounded-full bg-white/10 px-4 py-2">Clean cache</button></Card>
        <Card><h2 className="font-bold">Background Downloads</h2><p className="mt-2 text-sm text-slate-400">Queued downloads resume when the app is reopened.</p><button onClick={() => void runDownloadQueue(songs).then(refresh)} className="mt-4 rounded-full bg-white px-4 py-2 font-bold text-ink">Resume downloads</button></Card>
        <Card><h2 className="font-bold">Smart Cache</h2><p className="mt-2 text-sm text-slate-400">Recently played audio is cached automatically for offline replay.</p></Card>
      </div>
      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        <Card><h2 className="font-bold">Download Songs</h2>{songs.slice(0, 4).map((song) => <button key={song.id} onClick={() => void queueSongDownload(song).then(refresh)} className="mt-3 block w-full rounded-2xl bg-white/10 p-3 text-left">{song.title}</button>)}</Card>
        <Card><h2 className="font-bold">Download Albums</h2>{albums.map((album) => <button key={album.id} onClick={() => void queueAlbumDownload(album, songs.filter((song) => song.albumId === album.id)).then(refresh)} className="mt-3 block w-full rounded-2xl bg-white/10 p-3 text-left">{album.title}</button>)}</Card>
        <Card><h2 className="font-bold">Download Playlists</h2>{playlists.map((playlist) => <button key={playlist.id} onClick={() => void queuePlaylistDownload(playlist).then(refresh)} className="mt-3 block w-full rounded-2xl bg-white/10 p-3 text-left">{playlist.name}</button>)}</Card>
      </section>
      <section className="mt-10"><h2 className="text-2xl font-black">Download Queue</h2><div className="mt-4 space-y-3">{queue.map((item) => <Card key={item.id} className="flex items-center justify-between"><span><strong>{item.title}</strong><p className="text-sm text-slate-400">{item.type} · {item.status}</p></span><span>{item.progress}%</span></Card>)}</div></section>
    </div>
  );
}
