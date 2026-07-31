import { z } from "zod";
import { auth } from "@/lib/auth/config";
import { cached } from "@/lib/cache/redis";
import { db } from "@/lib/db/client";
import { AppError, jsonError } from "@/lib/http/errors";
import { createStreamUrl, mediaUrl } from "@/lib/storage/s3";

const createTrackSchema = z.object({
  title: z.string().min(1).max(120),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(140),
  description: z.string().max(1000).optional(),
  album: z.string().max(120).optional(),
  genre: z.string().max(80).optional(),
  durationMs: z.number().int().positive(),
  audioKey: z.string().min(1),
  artworkKey: z.string().optional()
});

export async function GET(): Promise<Response> {
  try {
    const tracks = await cached("tracks:public:latest", 30, () =>
      db.track.findMany({
        where: { visibility: "PUBLIC" },
        orderBy: { createdAt: "desc" },
        take: 50,
        include: { artist: { select: { name: true } } }
      })
    );
    const payload = await Promise.all(
      tracks.map(async (track) => ({
        id: track.id,
        title: track.title,
        artistName: track.artist.name ?? "Independent Artist",
        album: track.album,
        genre: track.genre,
        durationMs: track.durationMs,
        artworkUrl: track.artworkKey ? mediaUrl(track.artworkKey) : null,
        streamUrl: await createStreamUrl(track.audioKey)
      }))
    );
    return Response.json({ tracks: payload });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const session = await auth();
    if (!session?.user) throw new AppError("Authentication required", 401, "UNAUTHENTICATED");
    const input = createTrackSchema.parse(await request.json());
    const track = await db.track.create({ data: { ...input, artistId: session.user.id } });
    return Response.json({ track }, { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}
