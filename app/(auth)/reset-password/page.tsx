"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Shield,
  ArrowRight,
} from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (passwords.newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: passwords.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setIsLoading(false);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login?reset=true");
        }, 2500);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-card shadow-xl p-8 border border-gray-100 text-center">
          <div className="bg-success/10 rounded-full p-4 w-fit mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>
          <h1 className="font-display text-2xl font-bold text-navy">
            Password Reset!
          </h1>
          <p className="text-ink/70 mt-3 text-sm">
            Your password has been reset successfully. Redirecting to login...
          </p>
          <div className="mt-6 w-8 h-8 border-4 border-navy/20 border-t-navy rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

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

      <div className="bg-white rounded-card shadow-xl p-6 md:p-8 border border-gray-100">
        <div className="text-center mb-6">
          <div className="bg-gold/10 rounded-full p-3 w-fit mx-auto mb-4">
            <Lock className="w-8 h-8 text-gold" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
            Set New Password
          </h1>
          <p className="text-ink/70 mt-2 text-sm">
            Enter your new password below.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error/5 border border-error/20 rounded-input flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-error mt-0.5 shrink-0" />
            <p className="text-error text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
              <input
                type={showPassword ? "text" : "password"}
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                placeholder="Min. 8 characters"
                required
                className="w-full pl-12 pr-12 py-3.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 hover:text-navy transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
              <input
                type={showPassword ? "text" : "password"}
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                placeholder="Re-enter password"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !token}
            className="btn-lift w-full bg-gold text-ink font-bold px-6 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin"></div>
                Resetting...
              </>
            ) : (
              <>
                Reset Password
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <Link
            href="/login"
            className="text-navy font-semibold text-sm hover:text-gold transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-ink/50 mt-6">
        <Shield className="w-3 h-3" />
        <span>Your password is encrypted</span>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cloud flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-navy/20 border-t-navy rounded-full animate-spin"></div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}