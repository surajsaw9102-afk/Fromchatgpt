import { playlistSchema } from "@/lib/validation/music";
import { AppError, jsonError } from "@/lib/http/errors";
import { getPlaylist } from "@/lib/music/catalog";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await params;
    const playlist = getPlaylist(id);
    if (!playlist) throw new AppError("Playlist not found", 404, "NOT_FOUND");
    return Response.json({ playlist });
  } catch (error) {
    return jsonError(error);
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await params;
    const input = playlistSchema.partial().parse(await request.json());
    return Response.json({ playlist: { id, ownerName: "You", updatedAt: new Date().toISOString(), ...input } });
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  const { id } = await params;
  return Response.json({ deleted: true, id });
}
