import { randomUUID } from "node:crypto";
import { z } from "zod";
import { auth } from "@/lib/auth/config";
import { jsonError, AppError } from "@/lib/http/errors";
import { createUploadUrl } from "@/lib/storage/s3";

const schema = z.object({
  filename: z.string().min(1).max(160),
  contentType: z.enum(["audio/mpeg", "audio/wav", "audio/flac", "audio/mp4", "image/jpeg", "image/png", "image/webp"]),
  size: z.number().int().positive()
});

export async function POST(request: Request): Promise<Response> {
  try {
    const session = await auth();
    if (!session?.user) throw new AppError("Authentication required", 401, "UNAUTHENTICATED");
    const input = schema.parse(await request.json());
    const maxBytes = Number(process.env.MAX_AUDIO_UPLOAD_BYTES ?? 52_428_800);
    if (input.contentType.startsWith("audio/") && input.size > maxBytes) {
      throw new AppError("Audio file exceeds configured upload limit", 413, "UPLOAD_TOO_LARGE");
    }
    const extension = input.filename.split(".").pop()?.toLowerCase() ?? "bin";
    const key = `uploads/${session.user.id}/${randomUUID()}.${extension}`;
    const uploadUrl = await createUploadUrl(key, input.contentType);
    return Response.json({ key, uploadUrl, expiresInSeconds: 300 });
  } catch (error) {
    return jsonError(error);
  }
}
