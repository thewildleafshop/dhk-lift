import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle the event
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    console.log("Payment succeeded:", paymentIntent.id);

    try {
      // Check if donation already exists
      const existing = await prisma.donation.findUnique({
        where: { paymentIntent: paymentIntent.id },
      });

      if (!existing) {
        // Create donation record
        await prisma.donation.create({
          data: {
            userId: paymentIntent.metadata.userId || null,
            donorEmail: paymentIntent.receipt_email || paymentIntent.metadata.email || "guest@dhklift.org",
            donorName: paymentIntent.metadata.donorName || "Guest Donor",
            totalAmount: paymentIntent.amount / 100, // Convert cents to dollars
            currency: paymentIntent.currency.toUpperCase(),
            status: "COMPLETED",
            paymentIntent: paymentIntent.id,
            isRecurring: paymentIntent.metadata.donationType === "recurring",
          },
        });

        console.log("Donation record created:", paymentIntent.id);
      }
    } catch (err) {
      console.error("Error creating donation:", err);
    }
  }

  return NextResponse.json({ received: true });
}