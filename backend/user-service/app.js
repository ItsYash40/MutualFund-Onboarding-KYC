import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";
import { error } from "node:console";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "Auth Service",
    status: "UP",
  });
});

app.use("/api/auth", authRoutes);
app.use(errorMiddleware);

export default app;
