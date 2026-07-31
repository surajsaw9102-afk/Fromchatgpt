import { randomUUID } from "node:crypto";
import { playlistSchema } from "@/lib/validation/music";
import { jsonError } from "@/lib/http/errors";
import { playlists } from "@/lib/music/catalog";

export function GET(): Response {
  return Response.json({ playlists });
}

export async function POST(request: Request): Promise<Response> {
  try {
    const input = playlistSchema.parse(await request.json());
    return Response.json({ playlist: { id: randomUUID(), ownerName: "You", updatedAt: new Date().toISOString(), ...input } }, { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}
