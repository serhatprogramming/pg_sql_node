import express from "express";
const app = express();
app.use(express.json());

import { PORT } from "./util/config.js";
import { connectToDatabase } from "./util/db.js";
import notesRouter from "./routes/notes.js";

app.use("/api/notes", notesRouter);

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
