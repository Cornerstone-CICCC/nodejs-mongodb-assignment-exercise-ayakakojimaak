import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import productRouter from "./routes/product.routes";

// Create server
const app = express();

// Middleware
app.use(express.json());

app.use("/", productRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send("404");
});

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 3000;

if (!process.env.DATABASE_URL) {
  throw Error("DATABASE_URL is not defined in .env file");
}
mongoose
  .connect(process.env.DATABASE_URL, { dbName: "store" })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("Failed to connect to MongoDB", err));
