export function GET(): Response {
  return Response.json({ cacheName: "freewave-offline-v1", supportsOfflinePlayback: true, supportsBackgroundDownloads: true, supportsOfflineSync: true });
}
