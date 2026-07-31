export function GET(): Response {
  return Response.json({ ok: true, service: "freewave", freeForever: true });
}
