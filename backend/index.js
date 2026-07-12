import "dotenv/config";
import db from "./db/db.config.js";
import express from "express";
import cors from "cors";
import mainRouter from "./src/api/main.routes.js";
import { ErrorHandler } from "./src/middleware/error-hander.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://gptforge.netlify.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("GPTForge Backend Running");
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is healthy",
  });
});

app.use("/api", mainRouter);

app.use(ErrorHandler);

async function startServer() {
  try {
    const connection = await db.getConnection();

    console.log("Database connected successfully");

    connection.release();

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  } catch (err) {
    console.error("FAILED TO START SERVER:", err);
  }
}

startServer();