import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

export const createApp = () => {
  const app = express();

  app.use(cors({ origin: process.env.CLIENT_URL?.split(",") || "*", credentials: true }));
  app.use(express.json({ limit: "1mb" }));
  if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));

  app.use(
    "/api/auth",
    rateLimit({ windowMs: 15 * 60 * 1000, limit: 50, standardHeaders: true, legacyHeaders: false })
  );

  app.use("/api", routes);
  app.use(notFound);
  app.use(errorHandler);

  return app;
};
