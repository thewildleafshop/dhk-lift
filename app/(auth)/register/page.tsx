"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Shield,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  if (formData.password.length < 8) {
    setError("Password must be at least 8 characters long.");
    return;
  }

  setIsLoading(true);

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Registration failed. Please try again.");
      setIsLoading(false);
    } else {
      // ✅ Login page par na bhejein, balki verification message page par bhejein
      router.push(`/register/success?email=${encodeURIComponent(formData.email)}`);
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
        <h1 className="font-display text-2xl md:text-3xl font-bold text-navy mt-6">
          Create Your Account
        </h1>
        <p className="text-ink/70 mt-2">
          Join DHK LIFT and start making a difference
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-card shadow-xl p-6 md:p-8 border border-gray-100">
        
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-error/5 border border-error/20 rounded-input flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-error mt-0.5 shrink-0" />
            <p className="text-error text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Min. 8 characters"
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                placeholder="Re-enter your password"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-lift w-full bg-gold text-ink font-bold px-6 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin"></div>
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-ink/50">Already have an account?</span>
          </div>
        </div>

        {/* Login Link */}
        <Link
          href="/login"
          className="btn-lift w-full border-2 border-navy/20 text-navy font-semibold px-6 py-3.5 rounded-input hover:bg-navy/5 transition-colors flex items-center justify-center gap-2"
        >
          Sign In Instead
        </Link>
      </div>

      {/* Security Note */}
      <div className="flex items-center justify-center gap-2 text-xs text-ink/50 mt-6">
        <Shield className="w-3 h-3" />
        <span>Your information is secure and encrypted</span>
      </div>

      {/* Back to Home */}
      <div className="text-center mt-6">
        <Link
          href="/"
          className="text-ink/60 hover:text-navy transition-colors text-sm"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}