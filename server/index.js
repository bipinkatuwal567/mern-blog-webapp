import express from "express";
import mongoose from "mongoose";
import dotevn from "dotenv";
import userRoutes from "./routes/userRoute.js";

dotevn.config();

const app = express();
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Routing
app.use("/api", userRoutes);
