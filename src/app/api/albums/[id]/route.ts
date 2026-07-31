import { AppError, jsonError } from "@/lib/http/errors";
import { getAlbum, songs } from "@/lib/music/catalog";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await params;
    const album = getAlbum(id);
    if (!album) throw new AppError("Album not found", 404, "NOT_FOUND");
    return Response.json({ album, songs: songs.filter((song) => song.albumId === id) });
  } catch (error) {
    return jsonError(error);
  }
}
