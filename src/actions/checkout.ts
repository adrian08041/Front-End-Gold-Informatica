"use server";

import { CartProduct } from "@/providers/cart";
import Stripe from "stripe";

export const createCheckout = async (
  products: CartProduct[],
  orderId: string,
) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-04-30.basil",
  });

  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    success_url: process.env.HOST_URL || "http://localhost:3000/",
    cancel_url: process.env.HOST_URL || "http://localhost:3000/",

    metadata: {
      orderId,
    },

    line_items: products.map((product) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: product.name,
          description: product.description,
          images: product.imageUrls,
        },
        unit_amount: Math.round(product.totalPrice * 100), // importante: sempre usar Math.round para evitar erros com centavos
      },
      quantity: product.quantity,
    })),
  });

  return {
    url: checkout.url,
    id: checkout.id,
  };
};
