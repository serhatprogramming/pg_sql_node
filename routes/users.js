import express from "express";
const router = express.Router();
import { User } from "../models/index.js";
import { Note } from "../models/index.js";
import { Team } from "../models/index.js";
import isAdmin from "../util/isAdmin.js";
import tokenExtractor from "../util/tokenExtractor.js";
import userExtractor from "../util/userExtractor.js";

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      { model: Note, attributes: { exclude: ["userId"] } },
      {
        model: Team,
        attributes: { exclude: ["id"] },
        through: { attributes: [] },
      },
    ],
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

router.put(
  "/:username",
  tokenExtractor,
  userExtractor,
  isAdmin,
  async (req, res) => {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    if (user) {
      user.disabled = req.body.disabled;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }
);

export default router;
