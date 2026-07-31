export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode = 500,
    public readonly code = "INTERNAL_ERROR"
  ) {
    super(message);
  }
}

export function jsonError(error: unknown): Response {
  const appError = error instanceof AppError ? error : new AppError("Unexpected server error");
  return Response.json({ error: { code: appError.code, message: appError.message } }, { status: appError.statusCode });
}
