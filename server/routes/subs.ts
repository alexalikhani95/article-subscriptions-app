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

  Article.create({
    title: "Zebras",
    imageUrl:
      "https://images.unsplash.com/photo-1666723655505-419fd684c451?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM3fEpwZzZLaWRsLUhrfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
    access: "Basic",
  });

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
