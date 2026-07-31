import { searchSchema } from "@/lib/validation/music";
import { jsonError } from "@/lib/http/errors";
import { searchCatalog } from "@/lib/music/catalog";

export function GET(request: Request): Response {
  try {
    const url = new URL(request.url);
    const parsed = searchSchema.parse({ q: url.searchParams.get("q") ?? "", genre: url.searchParams.get("genre") ?? undefined, type: url.searchParams.get("type") ?? "all" });
    const results = searchCatalog(parsed.q, parsed.genre);
    return Response.json({ query: parsed.q, type: parsed.type, results });
  } catch (error) {
    return jsonError(error);
  }
}
