import express from "express";
const router = express.Router();
import { Op } from "sequelize";

import { Note, User } from "../models/index.js";
import tokenExtractor from "../util/tokenExtractor.js";
import userExtractor from "../util/userExtractor.js";

// middleware to find note by id
const noteFinder = async (req, _res, next) => {
  req.note = await Note.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const where = {};
  if (req.query.important) {
    where.important = req.query.important === "true";
  }
  if (req.query.search && req.query.search.trim() !== "") {
    where.content = {
      [Op.iLike]: `%${req.query.search}%`, // case-insensitive search
    };
  }
  const notes = await Note.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["username", "name"],
    },
    where,
  });
  res.json(notes);
});

router.get("/:id", noteFinder, async (req, res) => {
  if (req.note) {
    res.json(req.note);
  } else {
    res.status(404).json({ error: "Note not found" });
  }
});

router.put("/:id", noteFinder, async (req, res) => {
  if (req.note) {
    req.note.important = req.body.important;
    const updatedNote = await req.note.save();
    res.status(200).json(updatedNote);
  } else {
    res.status(404).json({ error: "Note not found" });
  }
});

router.delete("/:id", noteFinder, async (req, res) => {
  if (req.note) {
    await req.note.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Note not found" });
  }
});

router.post("/", tokenExtractor, userExtractor, async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "Token missing or invalid" });
  }
  const note = await Note.create({ ...req.body, userId: user.id });
  res.json(note);
});

export default router;
