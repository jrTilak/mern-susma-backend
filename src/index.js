import express from "express";
import { authRouter } from "./routes/auth/index.js";
import mongoose from "mongoose";
import { config } from "dotenv";
import { bikesRouter } from "./routes/bikes/index.js";
import { contactRouter } from "./routes/contact/index.js";

config();

const app = express();

app.use(express.static("uploads"));

app.use(express.json());

app.use("/auth", authRouter);
app.use("/bikes", bikesRouter);
app.use("/contact", contactRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
