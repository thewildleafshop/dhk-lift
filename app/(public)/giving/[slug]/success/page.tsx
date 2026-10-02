"use client";

import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Heart,
  ChevronRight,
  Share2,
  Home,
  TrendingUp,
  Shield,
  Receipt,
} from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "0";
  const type = searchParams.get("type") || "one-time";

  const [referenceNumber, setReferenceNumber] = useState<string>("");

  useEffect(() => {
    setReferenceNumber(`DHK-${Math.floor(10000000 + Math.random() * 90000000)}`);
  }, []);

  return (
    <main className="min-h-screen bg-cloud flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-card shadow-xl p-8 md:p-12 text-center border border-gray-100">
          {/* Icon */}
          <div className="bg-success/10 rounded-full p-6 w-fit mx-auto mb-6 animate-fade-in-up">
            <CheckCircle className="w-16 h-16 text-success" />
          </div>

          {/* Heading */}
          <h1 className="font-display text-3xl md:text-4xl font-bold text-navy animate-fade-in-up">
            Thank You! 🎉
          </h1>
          <p className="text-ink/70 mt-4 leading-relaxed max-w-lg mx-auto animate-fade-in-up delay-100">
            Your {type === "recurring" ? "monthly" : "one-time"} donation of{" "}
            <span className="font-bold text-gold">${amount}</span> has been received.
            You're making a real difference.
          </p>

          {/* Reference Number */}
          <div className="bg-cloud rounded-card p-4 mt-8 inline-block">
            <p className="text-xs text-ink/60 uppercase tracking-wider">
              Reference Number
            </p>
            <p className="font-display font-bold text-navy text-lg mt-1">
              {referenceNumber || "Generating..."}
            </p>
          </div>

          {/* Impact Message */}
          <div className="mt-8 p-4 bg-gold/5 border border-gold/20 rounded-card">
            <TrendingUp className="w-5 h-5 text-gold mx-auto mb-2" />
            <p className="text-ink/80 text-sm">
              A confirmation email with your receipt has been sent. You can track the
              impact of your donation in your dashboard.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/giving"
              className="btn-lift bg-gold text-ink font-semibold px-6 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Donate Again
            </Link>
            <Link
              href="/dashboard"
              className="btn-lift border-2 border-navy/20 text-navy font-semibold px-6 py-3.5 rounded-input hover:bg-navy/5 transition-colors flex items-center gap-2"
            >
              View My Impact
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Share */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-ink/60 text-sm mb-3">Share this cause</p>
            <div className="flex justify-center gap-3">
              <button className="bg-navy/5 hover:bg-navy/10 text-navy p-3 rounded-full transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Back Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-ink/60 hover:text-navy transition-colors text-sm"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cloud flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-navy/20 border-t-navy rounded-full animate-spin"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}