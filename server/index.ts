import express from "express";
import authRoutes from "./routes/auth";

const app = express();

app.use(express.json()); // express. json() is a built in middleware function in Express starting from v4. 16.0. It parses incoming JSON requests and puts the parsed data in req.
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("hello"));

app.listen(5000, () => {
  console.log(`Server listening on port 5000`);
});
