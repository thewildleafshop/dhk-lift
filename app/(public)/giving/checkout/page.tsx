"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/stripe/CheckoutForm";
import { useCart } from "@/context/CartContext";
import {
  Heart,
  Shield,
  CreditCard,
  ArrowLeft,
  User,
  Loader2,
  ShoppingCart,
} from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function MultiCauseCheckoutPage() {
  const router = useRouter();
  const { items, getTotal } = useCart();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [coverFees, setCoverFees] = useState(true);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [intentError, setIntentError] = useState<string | null>(null);

  const subtotal = getTotal();
  const processingFee = coverFees ? subtotal * 0.029 + 0.3 : 0;
  const total = subtotal + processingFee;

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/giving");
    }
  }, [items, router]);

  // Create Payment Intent
  useEffect(() => {
    async function createIntent() {
      if (total < 1 || items.length === 0) return;

      setLoadingIntent(true);
      setIntentError(null);

      try {
        const res = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total,
            metadata: {
              isAnonymous: isAnonymous.toString(),
              causes: items.map((i) => i.slug).join(","),
              itemCount: items.length.toString(),
            },
          }),
        });

        if (!res.ok) throw new Error("Failed to create payment intent");
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err: any) {
        setIntentError(err.message);
      } finally {
        setLoadingIntent(false);
      }
    }

    const timeout = setTimeout(() => {
      if (total >= 1 && items.length > 0) createIntent();
    }, 500);

    return () => clearTimeout(timeout);
  }, [total, isAnonymous, items]);

  const stripeOptions = useMemo(
    () => ({
      clientSecret: clientSecret || undefined,
      appearance: {
        theme: "stripe" as const,
        variables: {
          colorPrimary: "#0B468F",
          colorBackground: "#ffffff",
          colorText: "#1F2D3D",
          fontFamily: "Inter, sans-serif",
          borderRadius: "12px",
        },
      },
    }),
    [clientSecret]
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <main className="min-h-screen bg-cloud">
      {/* HEADER */}
      <section className="bg-navy text-white">
        <div className="max-w-container mx-auto px-6 py-6">
          <Link
            href="/giving/cart"
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-container mx-auto px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: FORM */}
          <div className="lg:col-span-2 space-y-6">
            {/* Donor Info */}
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gold/10 rounded-full p-2">
                  <User className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-xl font-bold text-navy">
                  Your Information
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gold/10 rounded-full p-2">
                  <CreditCard className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-xl font-bold text-navy">
                  Payment Method
                </h2>
              </div>

              {loadingIntent && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-navy animate-spin" />
                  <span className="ml-3 text-ink/60 text-sm">
                    Preparing payment...
                  </span>
                </div>
              )}

              {intentError && (
                <div className="bg-error/5 border border-error/20 rounded-input p-4 text-error text-sm">
                  {intentError}
                </div>
              )}

              {clientSecret && !loadingIntent && (
                <Elements stripe={stripePromise} options={stripeOptions}>
                  <CheckoutForm amount={total} />
                </Elements>
              )}
            </div>

            {/* Options */}
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-gold"
                  />
                  <div>
                    <p className="font-semibold text-navy text-sm">
                      Donate Anonymously
                    </p>
                    <p className="text-ink/60 text-xs mt-0.5">
                      Your name won't appear publicly
                    </p>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={coverFees}
                    onChange={(e) => setCoverFees(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-gold"
                  />
                  <div>
                    <p className="font-semibold text-navy text-sm">
                      Cover Processing Fees (+${processingFee.toFixed(2)})
                    </p>
                    <p className="text-ink/60 text-xs mt-0.5">
                      Ensure 100% of your donation reaches the cause
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100 lg:sticky lg:top-24">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingCart className="w-5 h-5 text-navy" />
                <h2 className="font-display text-xl font-bold text-navy">
                  Your Donations ({items.length})
                </h2>
              </div>

              <div className="space-y-4 pb-4 border-b border-gray-100 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.slug} className="flex gap-3">
                    <div className="relative w-12 h-12 rounded-card overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-navy text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-ink/60 text-xs capitalize">
                        {item.type === "recurring" ? "Monthly" : "One-Time"}
                      </p>
                    </div>
                    <span className="font-semibold text-navy text-sm shrink-0">
                      ${item.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="py-4 space-y-3 border-b border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-ink/70">Subtotal</span>
                  <span className="font-semibold text-navy">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                {coverFees && (
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/70">Processing Fee</span>
                    <span className="font-semibold text-navy">
                      ${processingFee.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              <div className="py-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-display text-lg font-bold text-navy">
                    Total
                  </span>
                  <span className="font-display text-3xl font-bold text-gold">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p className="text-ink/60 text-xs mt-1 text-right">
                  One payment for {items.length} cause{items.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-ink/50 mt-4">
                <Shield className="w-3 h-3" />
                <span>Secure & encrypted payment</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}