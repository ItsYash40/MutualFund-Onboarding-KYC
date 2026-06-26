import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 4005;

connectDB();

app.listen(PORT, () => {
  console.log(`Notification Service Running On Port ${PORT}`);
});
