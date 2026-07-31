import { songs } from "@/lib/music/catalog";

export function GET(): Response {
  return Response.json({ history: songs.map((song, index) => ({ song, playedAt: new Date(Date.now() - index * 3_600_000).toISOString(), completed: index % 2 === 0 })) });
}

export async function POST(request: Request): Promise<Response> {
  const event = await request.json();
  return Response.json({ recorded: true, event, recordedAt: new Date().toISOString() }, { status: 201 });
}
