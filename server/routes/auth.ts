import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/User";

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
      return res.json({ errors, data: null }); //If errors, make data null
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }); // The email should match the email from the body

    if (user) {
      return res.json({
        errors: [
          {
            msg: "Email already in use",
          },
        ],
        data: null,
      });
    }

    res.json(user);
  }
);

export default router;
