import express from "express";
import { checkAuth } from "../middleware/checkAuth";
import Article from "../models/article";
import User from "../models/User";
import { stripe } from "../utils/stripe";

const router = express.Router();

router.get("/", checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user });

  const subscriptions = await stripe.subscriptions.list(
    {
      customer: user?.stripeCustomerId,
      status: "all", // get all of them,
      expand: ["data.default_payment_method"], // payment method
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );

  if (!subscriptions.data.length) return res.json([]); // return no articles if there are no subscriptions for the user

  //@ts-ignore
  const plan = subscriptions.data[0].plan.nickname;

  if (plan === "Basic") {
    const articles = await Article.find({ access: "Basic" });
    return res.json(articles);
  } else if (plan === "Standard") {
    const articles = await Article.find({
      access: { $in: ["Basic", "Standard"] }, // Get all articles that have either basic or standard
    });
    return res.json(articles);
  } else {
    const articles = await Article.find({}); // All articles
    return res.json(articles);
  }
});

export default router;
