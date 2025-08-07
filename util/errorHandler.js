const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({ error: err.errors.map((e) => e.message) });
  }
  if (err.name === "SequelizeDatabaseError") {
    return res.status(400).json({ error: "Database error" });
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({ error: "Unique constraint error" });
  }
  if (err.name === "NotFoundError") {
    return res.status(404).json({ error: "Resource not found" });
  }
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  if (err.name === "ForbiddenError") {
    return res.status(403).json({ error: "Forbidden access" });
  }
  if (err.name === "InternalServerError") {
    return res.status(500).json({ error: "Internal server error" });
  }
  // Default error handler
  res.status(500).json({ error: "An unexpected error occurred" });
};

export default errorHandler;
