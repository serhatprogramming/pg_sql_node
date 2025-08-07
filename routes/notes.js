import express from "express";
const router = express.Router();

import Note from "../models/index.js";

router.get("/", async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes);
});

router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (note) {
      console.log(note.toJSON());
      res.json(note);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (note) {
      note.important = req.body.important;
      const updatedNote = await note.save();
      res.status(200).json(updatedNote);
    } else {
      res.status(404).send("Note not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (note) {
      await note.destroy();
      res.status(204).end();
    } else {
      res.status(404).send("Note not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const note = await Note.create(req.body);
    res.json(note);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

export default router;
