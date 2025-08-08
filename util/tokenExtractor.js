const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
    try {
      req.decodedToken = jwt.verify(req.token, JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  }
  next();
};

export default tokenExtractor;
