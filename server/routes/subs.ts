import express from "express";
import { checkAuth } from "../middleware/checkAuth";

const router = express.Router();

router.get("/prices", checkAuth, async (req, res) => {
  res.send("prices");
});

export default router;
