import express from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/signup",
  body("email").isEmail().withMessage("This email is invalid"), // Check that an email has been entered in the body and it is valid
  body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters"), // Check password is at least 5 characters
  async (req, res) => {
    const validationErrors = validationResult(req); // This returns an array of errors

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map((error) => {
        return {
          msg: error.msg,
        };
      });
      return res.json({ errors });
    }

    const { email, password } = req.body;

    res.json({
      email,
      password,
    });
  }
);

export default router;
