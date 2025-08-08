import jwt from "jsonwebtoken";
import express from "express";
const router = express.Router();
import { User } from "../models/index.js";
import { JWT_SECRET } from "../util/config.js";

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  // Validate user credentials
  const user = await User.findOne({ where: { username } });
  if (user && "secret" === password) {
    const token = jwt.sign({ username, id: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ token, user: { id: user.id, username: user.username } });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

export default router;
