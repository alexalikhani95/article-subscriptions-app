import express from "express";
import authRoutes from "./routes/auth";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.port;

const app = express();

app.use(express.json()); // express. json() is a built in middleware function in Express starting from v4. 16.0. It parses incoming JSON requests and puts the parsed data in req.
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MONGODB");
  })
  .catch((error) => {
    console.log(error);
    throw new Error(error);
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
