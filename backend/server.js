import dotenv from "dotenv";
import { app } from "./app.js";
// import express from "express";
import { connectDB } from "./lib/db.database.js";
// import authRoutes from "./routes/auth.route.js";

dotenv.config({
  path: "./.env",
});
// const app = express();
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is listen in port : ", process.env.PORT || 5001);
    });
  })
  .catch((error) => {
    console.log(`Server faced Error : ${error}`);
  });
// app.use("/api/v1/auth", authRoutes);

// bilal123456789 gold949526
