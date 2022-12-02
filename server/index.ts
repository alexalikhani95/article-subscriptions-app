import express from "express";
import authRoutes from "./routes/auth";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.port;

const app = express();

app.use(express.json()); // express. json() is a built in middleware function in Express starting from v4. 16.0. It parses incoming JSON requests and puts the parsed data in req.
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("hello"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
