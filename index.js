import express from "express";
const app = express();
app.use(express.json());

import { PORT } from "./util/config.js";
import { connectToDatabase } from "./util/db.js";
// Routes
import notesRouter from "./routes/notes.js";
import usersRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
// Error handler
import errorHandler from "./util/errorHandler.js";
// middlewares
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(errorHandler);

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
