"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  Loader2,
  Mail,
  ArrowRight,
  Home,
} from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage("Your email has been verified successfully!");
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="w-full max-w-md">
      
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block">
          <img
            src="/logo/logo.png"
            alt="DHK LIFT"
            className="h-20 w-auto object-contain mx-auto"
          />
        </Link>
      </div>

      <div className="bg-white rounded-card shadow-xl p-8 border border-gray-100 text-center">
        
        {/* Loading */}
        {status === "loading" && (
          <>
            <div className="bg-gold/10 rounded-full p-4 w-fit mx-auto mb-4">
              <Loader2 className="w-12 h-12 text-gold animate-spin" />
            </div>
            <h1 className="font-display text-2xl font-bold text-navy">
              Verifying Your Email
            </h1>
            <p className="text-ink/70 mt-3 text-sm">
              Please wait while we verify your email address...
            </p>
          </>
        )}

        {/* Success */}
        {status === "success" && (
          <>
            <div className="bg-success/10 rounded-full p-4 w-fit mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <h1 className="font-display text-2xl font-bold text-navy">
              Email Verified!
            </h1>
            <p className="text-ink/70 mt-3 text-sm">
              {message}
            </p>
            <p className="text-ink/60 text-xs mt-2">
              You can now log in to your account.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/login"
                className="btn-lift bg-gold text-ink font-semibold px-6 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                Go to Login
              </Link>
              <Link
                href="/"
                className="btn-lift border-2 border-navy/20 text-navy font-semibold px-6 py-3.5 rounded-input hover:bg-navy/5 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <div className="bg-error/10 rounded-full p-4 w-fit mx-auto mb-4">
              <XCircle className="w-12 h-12 text-error" />
            </div>
            <h1 className="font-display text-2xl font-bold text-navy">
              Verification Failed
            </h1>
            <p className="text-ink/70 mt-3 text-sm">
              {message}
            </p>

            <div className="mt-6 bg-info/5 border border-info/20 rounded-input p-4 text-left">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-info mt-0.5 shrink-0" />
                <p className="text-xs text-ink/70 leading-relaxed">
                  The verification link may have expired. Please contact support 
                  or register again to receive a new link.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/register"
                className="btn-lift bg-gold text-ink font-semibold px-6 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                Register Again
              </Link>
              <Link
                href="/contact"
                className="btn-lift border-2 border-navy/20 text-navy font-semibold px-6 py-3.5 rounded-input hover:bg-navy/5 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                Contact Support
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cloud flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-navy/20 border-t-navy rounded-full animate-spin"></div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}