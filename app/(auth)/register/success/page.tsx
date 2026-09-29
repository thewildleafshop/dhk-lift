"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <Link href="/">
          <img
            src="/logo/logo.png"
            alt="DHK LIFT"
            className="h-20 w-auto object-contain mx-auto"
          />
        </Link>
      </div>

      <div className="bg-white rounded-card shadow-xl p-8 border border-gray-100 text-center">
        <div className="bg-success/10 rounded-full p-4 w-fit mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-success" />
        </div>
        <h1 className="font-display text-2xl font-bold text-navy">
          Check Your Email
        </h1>
        <p className="text-ink/70 mt-3 leading-relaxed">
          We've sent a verification link to <strong>{email}</strong>. 
          Please click the link in the email to verify your account.
        </p>

        <div className="bg-cloud rounded-input p-4 mt-6 flex items-start gap-3 text-left">
          <Mail className="w-5 h-5 text-navy mt-0.5 shrink-0" />
          <div>
            <p className="text-navy font-semibold text-sm">Didn't receive the email?</p>
            <p className="text-ink/60 text-xs mt-1">
              Check your spam folder. If you still don't see it, try registering again.
            </p>
          </div>
        </div>

        <Link
          href="/login"
          className="btn-lift inline-block mt-6 bg-navy text-white font-semibold px-8 py-3 rounded-input hover:bg-navy/90 transition-colors"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default function RegisterSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 text-navy animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}