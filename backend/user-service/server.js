import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 4000;
dotenv.config();

connectDB();

app.listen(PORT, () => {
  console.log(`Auth Service Running On Port ${PORT}`);
});
