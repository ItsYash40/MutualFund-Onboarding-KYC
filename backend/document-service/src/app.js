import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import documentRoutes from "./routes/documentRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Document Service Healthy",
  });
});

app.use("/api/documents", documentRoutes);
app.use("/uploads", express.static("src/uploads"));


app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;