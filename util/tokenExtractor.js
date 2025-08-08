import { JWT_SECRET } from "./config.js";
import jwt from "jsonwebtoken";

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
    try {
      console.log("Extracted token:", req.token);
      console.log("JWT_SECRET:", JWT_SECRET);
      req.decodedToken = jwt.verify(req.token, JWT_SECRET);
    } catch (error) {
      console.error("JWT error:", error.message);
      return res.status(401).json({ error: "Invalid token" });
    }
  }
  next();
};

export default tokenExtractor;
