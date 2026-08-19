export function errorHandler(err, req, res, next) {
  console.error(err);

  // Prisma: unique constraint violation (e.g. duplicate email caught a different way)
  if (err.code === "P2002") {
    return res.status(409).json({ error: "A record with this value already exists" });
  }

  // Prisma: record not found on update/delete
  if (err.code === "P2025") {
    return res.status(404).json({ error: "Record not found" });
  }

  // Malformed JSON in request body
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Malformed JSON in request body" });
  }

  // JWT errors that slip past auth middleware (shouldn't normally reach here, but just in case)
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  // Fallback — anything unexpected
  res.status(500).json({ error: "Something went wrong. Please try again." });
}