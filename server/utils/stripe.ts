import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE__SECRET_KEY as string, {
  apiVersion: "2022-11-15", // The api version is found in  developers/overview in the stripe dashboard
});
