"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Mail,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Shield,
  Lock,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setIsLoading(false);
      } else {
        setSubmitted(true);
        setIsLoading(false);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

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

      {/* Card */}
      <div className="bg-white rounded-card shadow-xl p-6 md:p-8 border border-gray-100">
        
        {!submitted ? (
          <>
            <div className="text-center mb-6">
              <div className="bg-gold/10 rounded-full p-3 w-fit mx-auto mb-4">
                <Lock className="w-8 h-8 text-gold" />
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
                Forgot Password?
              </h1>
              <p className="text-ink/70 mt-2 text-sm">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-error/5 border border-error/20 rounded-input flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-error mt-0.5 shrink-0" />
                <p className="text-error text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-lift w-full bg-gold text-ink font-bold px-6 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          /* Success State */
          <div className="text-center">
            <div className="bg-success/10 rounded-full p-4 w-fit mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <h1 className="font-display text-2xl font-bold text-navy">
              Check Your Email
            </h1>
            <p className="text-ink/70 mt-3 text-sm leading-relaxed">
              We've sent a password reset link to <br />
              <span className="font-semibold text-navy">{email}</span>
            </p>
            <div className="mt-6 p-4 bg-info/5 border border-info/20 rounded-input text-left">
              <p className="text-xs text-ink/70 leading-relaxed">
                Didn't receive the email? Check your spam folder or try again in a few minutes.
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setEmail("");
              }}
              className="mt-6 text-gold font-semibold text-sm hover:text-gold/80 transition-colors"
            >
              Try a different email
            </button>
          </div>
        )}

        {/* Back to Login */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
        </div>

        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-navy font-semibold text-sm hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </div>

      {/* Security Note */}
      <div className="flex items-center justify-center gap-2 text-xs text-ink/50 mt-6">
        <Shield className="w-3 h-3" />
        <span>Your information is secure and encrypted</span>
      </div>
    </div>
  );
}