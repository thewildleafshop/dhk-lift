"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/stripe/CheckoutForm";
import {
  Heart,
  Shield,
  Lock,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  User,
  Gift,
  Loader2,
} from "lucide-react";

// Load Stripe outside of component to avoid re-creating on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Causes Data
const causesData: Record<string, {
  id: string;
  name: string;
  image: string;
  tagline: string;
}> = {
  "where-needed-most": { id: "where-needed-most", name: "Where Needed Most", image: "/images/programs/communityVolunteers.png", tagline: "Maximum Impact. Maximum Flexibility." },
  "lift-health": { id: "lift-health", name: "LIFT Health", image: "/images/programs/healthcare.png", tagline: "Healthcare for Everyone" },
  "lift-protect": { id: "lift-protect", name: "LIFT Protect", image: "/images/programs/familu.png", tagline: "Safety. Dignity. Hope." },
  "lift-ability": { id: "lift-ability", name: "LIFT Ability", image: "/images/programs/disasterRelief.png", tagline: "Empowering Every Ability" },
  "lift-community": { id: "lift-community", name: "LIFT Community", image: "/images/programs/communityVolunteers.png", tagline: "Stronger Together" },
  "children-families": { id: "children-families", name: "Children & Families", image: "/images/stories/volunteer.png", tagline: "Building Brighter Futures" },
  "food-security": { id: "food-security", name: "Food Security", image: "/images/programs/foodDonation.png", tagline: "No One Goes Hungry" },
  "education-support": { id: "education-support", name: "Education Support", image: "/images/programs/education.png", tagline: "Knowledge Changes Everything" },
};

export default function CheckoutPage() {
  const params = useParams();
  const slug = params.slug as string;
  const cause = causesData[slug];

  const [donationType, setDonationType] = useState<"one-time" | "recurring">("one-time");
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [coverFees, setCoverFees] = useState(true);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [intentError, setIntentError] = useState<string | null>(null);

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : amount;
  const processingFee = coverFees ? finalAmount * 0.029 + 0.3 : 0;
  const totalAmount = finalAmount + processingFee;

  // Create Payment Intent when amount changes
  useEffect(() => {
    async function createIntent() {
      if (totalAmount < 1) return;

      setLoadingIntent(true);
      setIntentError(null);

      try {
        const res = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: totalAmount,
            metadata: { causeSlug: slug, donationType, isAnonymous: isAnonymous.toString() },
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

    // Debounce - only create when user stops typing
    const timeout = setTimeout(() => {
      if (totalAmount >= 1) createIntent();
    }, 500);

    return () => clearTimeout(timeout);
  }, [totalAmount, slug, donationType, isAnonymous]);
  const stripeOptions = useMemo(
    () => ({
      clientSecret: clientSecret || undefined, // ✅ null ko undefined mein convert karein
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
  if (!cause) {
    return (
      <main className="min-h-screen bg-cloud flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-navy">Cause Not Found</h1>
          <Link href="/giving" className="text-gold font-semibold mt-4 inline-block">← Back to Giving</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cloud">
      
      {/* HEADER BAR */}
      <section className="bg-navy text-white">
        <div className="max-w-container mx-auto px-6 py-6">
          <Link href={`/giving/${slug}`} className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to {cause.name}
          </Link>
        </div>
      </section>

      {/* CHECKOUT CONTENT */}
      <section className="max-w-container mx-auto px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: FORM */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Donation Type */}
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gold/10 rounded-full p-2">
                  <Heart className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-xl font-bold text-navy">Donation Type</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setDonationType("one-time")} className={`p-4 rounded-input border-2 font-semibold transition-all ${donationType === "one-time" ? "border-gold bg-gold/5 text-navy" : "border-gray-200 text-ink/70 hover:border-gray-300"}`}>One-Time</button>
                <button type="button" onClick={() => setDonationType("recurring")} className={`p-4 rounded-input border-2 font-semibold transition-all ${donationType === "recurring" ? "border-gold bg-gold/5 text-navy" : "border-gray-200 text-ink/70 hover:border-gray-300"}`}>Monthly</button>
              </div>
            </div>

            {/* Step 2: Amount */}
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gold/10 rounded-full p-2">
                  <Gift className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-xl font-bold text-navy">Choose Amount</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[25, 50, 100, 250].map((amt) => (
                  <button key={amt} type="button" onClick={() => { setAmount(amt); setCustomAmount(""); }} className={`p-4 rounded-input border-2 font-semibold transition-all ${amount === amt && !customAmount ? "border-gold bg-gold/5 text-navy" : "border-gray-200 text-ink/70 hover:border-gray-300"}`}>${amt}</button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/60 font-semibold">$</span>
                <input type="number" placeholder="Custom amount" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} className="w-full pl-8 pr-4 py-3.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink" />
              </div>
            </div>

            {/* Step 3: Donor Info */}
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gold/10 rounded-full p-2">
                  <User className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-xl font-bold text-navy">Your Information</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Full Name *</label>
                  <input type="text" placeholder="Enter your full name" className="w-full px-4 py-3.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Email Address *</label>
                  <input type="email" placeholder="you@example.com" className="w-full px-4 py-3.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Phone Number (Optional)</label>
                  <input type="tel" placeholder="+92 300 1234567" className="w-full px-4 py-3.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink" />
                </div>
              </div>
            </div>

            {/* Step 4: Payment (Stripe Elements) */}
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gold/10 rounded-full p-2">
                  <CreditCard className="w-5 h-5 text-gold" />
                </div>
                <h2 className="font-display text-xl font-bold text-navy">Payment Method</h2>
              </div>

              {loadingIntent && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-navy animate-spin" />
                  <span className="ml-3 text-ink/60 text-sm">Preparing payment...</span>
                </div>
              )}

              {intentError && (
                <div className="bg-error/5 border border-error/20 rounded-input p-4 text-error text-sm">
                  {intentError}
                </div>
              )}

              {clientSecret && !loadingIntent && (
                <Elements stripe={stripePromise} options={stripeOptions}>
                  <CheckoutForm amount={totalAmount} />
                </Elements>
              )}
            </div>

            {/* Options */}
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="mt-1 w-4 h-4 accent-gold" />
                  <div>
                    <p className="font-semibold text-navy text-sm">Donate Anonymously</p>
                    <p className="text-ink/60 text-xs mt-0.5">Your name won't appear publicly</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={coverFees} onChange={(e) => setCoverFees(e.target.checked)} className="mt-1 w-4 h-4 accent-gold" />
                  <div>
                    <p className="font-semibold text-navy text-sm">Cover Processing Fees (+${processingFee.toFixed(2)})</p>
                    <p className="text-ink/60 text-xs mt-0.5">Ensure 100% of your donation reaches the cause</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100 lg:sticky lg:top-24">
              <h2 className="font-display text-xl font-bold text-navy mb-6">Donation Summary</h2>

              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="relative w-16 h-16 rounded-card overflow-hidden shrink-0">
                  <Image src={cause.image} alt={cause.name} fill sizes="64px" className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">{cause.name}</p>
                  <p className="text-ink/60 text-xs">{cause.tagline}</p>
                </div>
              </div>

              <div className="py-4 space-y-3 border-b border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-ink/70">Donation Type</span>
                  <span className="font-semibold text-navy capitalize">{donationType === "one-time" ? "One-Time" : "Monthly"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink/70">Your Donation</span>
                  <span className="font-semibold text-navy">${finalAmount.toFixed(2)}</span>
                </div>
                {coverFees && (
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/70">Processing Fee</span>
                    <span className="font-semibold text-navy">${processingFee.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="py-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-display text-lg font-bold text-navy">Total</span>
                  <span className="font-display text-3xl font-bold text-gold">${totalAmount.toFixed(2)}</span>
                </div>
                {donationType === "recurring" && (
                  <p className="text-ink/60 text-xs mt-1 text-right">per month</p>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-ink/50 mt-4">
                <Shield className="w-3 h-3" />
                <span>Secure & encrypted payment</span>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex justify-center gap-4 text-ink/40 text-xs">
                  <span>🔒 SSL</span>
                  <span>•</span>
                  <span>PCI Compliant</span>
                  <span>•</span>
                  <span>Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}