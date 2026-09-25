"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      router.push("/login?registered=true");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h1 className="text-3xl font-bold text-navy mb-6">Create Account</h1>

      {error && (
        <div className="bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            Full Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-navy"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-navy"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            Password
          </label>
          <input
            type="password"
            required
            minLength={8}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-navy"
            placeholder="Min 8 characters"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-navy text-white py-3 rounded-xl font-semibold hover:bg-navy-dark transition disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="text-center text-sm text-ink mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-navy font-semibold hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}