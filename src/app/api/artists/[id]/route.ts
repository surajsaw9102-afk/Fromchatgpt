import { AppError, jsonError } from "@/lib/http/errors";
import { albums, getArtist, songs } from "@/lib/music/catalog";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id } = await params;
    const artist = getArtist(id);
    if (!artist) throw new AppError("Artist not found", 404, "NOT_FOUND");
    return Response.json({ artist, albums: albums.filter((album) => album.artistId === id), popularSongs: songs.filter((song) => song.artistId === id) });
  } catch (error) {
    return jsonError(error);
  }
}
