import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const requestBodySchema = z.array(
  z.object({
    stripeProductId: z.string(),
    quantity: z.number().min(1),
  })
);

export async function POST(req: NextRequest) {
  try {
    const reqHeaders = headers();
    const origin = reqHeaders.get("origin");
    const body = await req.json();
    const parsedBody = await requestBodySchema.parseAsync(body);

    const line_items = parsedBody.map((item) => ({
      price: item.stripeProductId,
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/payment?success=true`,
      cancel_url: `${origin}/payment?canceled=true`,
    });
    return NextResponse.json(session.url);
  } catch (err: any) {
    return NextResponse.json(err?.message ?? "Something went wrong", {
      status: err?.statusCode ?? 500,
    });
  }
}
