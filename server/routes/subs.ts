import express from "express";
import { checkAuth } from "../middleware/checkAuth";
import article from "../models/article";
import User from "../models/User";
import { stripe } from "../utils/stripe";
import Article from "../models/article";

const router = express.Router();

router.get("/prices", checkAuth, async (req, res) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });
  return res.json(prices);
});

router.post("/session", checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user });

  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/articles", // where the user is redirected after checking out
      cancel_url: "http://localhost:3000/article-plans",
      customer: user?.stripeCustomerId,
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );

  return res.json(session);
});

export default router;
