"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function verify() {
      if (!token) {
        setStatus("error");
        setMessage("No verification token provided.");
        return;
      }

      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully!");
          setTimeout(() => router.push("/login?verified=true"), 3000);
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    }

    verify();
  }, [token, router]);

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
        {status === "loading" && (
          <>
            <Loader2 className="w-16 h-16 text-navy animate-spin mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-navy">
              Verifying your email...
            </h1>
            <p className="text-ink/60 mt-2">Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="bg-success/10 rounded-full p-4 w-fit mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <h1 className="font-display text-2xl font-bold text-navy">
              Email Verified!
            </h1>
            <p className="text-ink/60 mt-2">{message}</p>
            <p className="text-ink/50 text-sm mt-4">
              Redirecting to login...
            </p>
            <Link
              href="/login"
              className="btn-lift inline-block mt-6 bg-navy text-white font-semibold px-8 py-3 rounded-input hover:bg-navy/90 transition-colors"
            >
              Go to Login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="bg-error/10 rounded-full p-4 w-fit mx-auto mb-4">
              <XCircle className="w-12 h-12 text-error" />
            </div>
            <h1 className="font-display text-2xl font-bold text-navy">
              Verification Failed
            </h1>
            <p className="text-ink/60 mt-2">{message}</p>
            <Link
              href="/login"
              className="inline-block mt-6 text-navy font-semibold hover:text-gold transition-colors"
            >
              Back to Login
            </Link>
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
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 text-navy animate-spin" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}