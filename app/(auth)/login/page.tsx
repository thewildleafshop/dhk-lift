"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Shield,
  CheckCircle,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const justRegistered = searchParams.get("registered") === "true";
  const justReset = searchParams.get("reset") === "true";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      // Session fetch karein taake role pata chale
      const session = await getSession();
      const userRole = (session?.user as any)?.role;

      console.log("User Role:", userRole); // Debug

     if (callbackUrl) {
  router.push(callbackUrl);
} else if (userRole === "ADMIN") {
  router.push("/admin");
} else if (userRole === "PARTNER") {
  router.push("/partner");
} else {
  // MEMBER, APPLICANT, PROVIDER, PHARMACY, VOLUNTEER — sab /dashboard par jayenge
  router.push("/dashboard");
}

      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
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
        <h1 className="font-display text-2xl md:text-3xl font-bold text-navy mt-6">
          Welcome Back
        </h1>
        <p className="text-ink/70 mt-2">Sign in to your DHK LIFT account</p>
      </div>

      <div className="bg-white rounded-card shadow-xl p-6 md:p-8 border border-gray-100">
        
        {justRegistered && (
          <div className="mb-6 p-4 bg-success/5 border border-success/20 rounded-input flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
            <p className="text-success text-sm">
              Account created successfully! Please sign in.
            </p>
          </div>
        )}

        {justReset && (
          <div className="mb-6 p-4 bg-success/5 border border-success/20 rounded-input flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
            <p className="text-success text-sm">
              Password reset successfully! Please sign in with your new password.
            </p>
          </div>
        )}

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
                className="w-full pl-12 pr-4 py-3.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-ink">Password</label>
              <Link
                href="/forgot-password"
                className="text-xs text-gold hover:text-gold/80 font-medium transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-12 pr-12 py-3.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink"
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

          <button
            type="submit"
            disabled={isLoading}
            className="btn-lift w-full bg-gold text-ink font-bold px-6 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-ink/50">New to DHK LIFT?</span>
          </div>
        </div>

        <Link
          href="/register"
          className="btn-lift w-full border-2 border-navy/20 text-navy font-semibold px-6 py-3.5 rounded-input hover:bg-navy/5 transition-colors flex items-center justify-center gap-2"
        >
          Create an Account
        </Link>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-ink/50 mt-6">
        <Shield className="w-3 h-3" />
        <span>Your information is secure and encrypted</span>
      </div>

      <div className="text-center mt-6">
        <Link href="/" className="text-ink/60 hover:text-navy transition-colors text-sm">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cloud flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-navy/20 border-t-navy rounded-full animate-spin"></div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}