"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  Heart,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ChevronRight,
  Shield,
  ArrowLeft,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateAmount, updateType, getTotal, clearCart } = useCart();

  const total = getTotal();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-cloud">
        <section className="max-w-container mx-auto px-6 py-16 md:py-24 text-center">
          <div className="bg-white rounded-card p-12 shadow-sm border border-gray-100 max-w-md mx-auto">
            <div className="bg-cloud rounded-full p-6 w-fit mx-auto mb-4">
              <ShoppingCart className="w-12 h-12 text-ink/30" />
            </div>
            <h1 className="font-display text-2xl font-bold text-navy">
              Your Cart is Empty
            </h1>
            <p className="text-ink/60 mt-2">
              Add causes to your cart and donate to multiple causes in one transaction.
            </p>
            <Link
              href="/giving"
              className="btn-lift inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg mt-6"
            >
              <Heart className="w-5 h-5" />
              Browse Causes
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cloud">
      {/* HEADER */}
      <section className="bg-navy text-white">
        <div className="max-w-container mx-auto px-6 py-6">
          <Link
            href="/giving"
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Browsing
          </Link>
        </div>
      </section>

      {/* CART CONTENT */}
      <section className="max-w-container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: CART ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
                Your Donation Cart ({items.length})
              </h1>
              <button
                onClick={clearCart}
                className="text-error text-sm font-semibold hover:text-error/80 transition-colors"
              >
                Clear All
              </button>
            </div>

            {items.map((item) => (
              <div
                key={item.slug}
                className="bg-white rounded-card p-4 md:p-6 shadow-sm border border-gray-100"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-card overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-display font-bold text-navy text-base md:text-lg truncate">
                          {item.name}
                        </h3>
                        <p className="text-ink/60 text-xs truncate">{item.tagline}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.slug)}
                        className="text-ink/40 hover:text-error transition-colors p-1 shrink-0"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Donation Type */}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => updateType(item.slug, "one-time")}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          item.type === "one-time"
                            ? "bg-navy text-white"
                            : "bg-cloud text-ink/60 hover:bg-navy/5"
                        }`}
                      >
                        One-Time
                      </button>
                      <button
                        onClick={() => updateType(item.slug, "recurring")}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          item.type === "recurring"
                            ? "bg-navy text-white"
                            : "bg-cloud text-ink/60 hover:bg-navy/5"
                        }`}
                      >
                        Monthly
                      </button>
                    </div>

                    {/* Amount Controls */}
                    <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateAmount(item.slug, Math.max(1, item.amount - 10))}
                          className="w-8 h-8 rounded-full bg-cloud hover:bg-navy/10 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3 text-navy" />
                        </button>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/60 font-semibold text-sm">
                            $
                          </span>
                          <input
                            type="number"
                            value={item.amount}
                            onChange={(e) =>
                              updateAmount(item.slug, parseFloat(e.target.value) || 0)
                            }
                            className="w-24 pl-7 pr-3 py-1.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm font-semibold text-navy"
                          />
                        </div>
                        <button
                          onClick={() => updateAmount(item.slug, item.amount + 10)}
                          className="w-8 h-8 rounded-full bg-cloud hover:bg-navy/10 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3 text-navy" />
                        </button>
                      </div>

                      <span className="font-display font-bold text-navy text-base">
                        ${item.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add More Causes */}
            <Link
              href="/giving"
              className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-card text-ink/60 hover:border-gold hover:text-gold transition-all font-semibold text-sm"
            >
              <Plus className="w-4 h-4" />
              Add More Causes
            </Link>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100 lg:sticky lg:top-24">
              <h2 className="font-display text-xl font-bold text-navy mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 pb-4 border-b border-gray-100">
                {items.map((item) => (
                  <div key={item.slug} className="flex justify-between text-sm">
                    <span className="text-ink/70 truncate pr-2">{item.name}</span>
                    <span className="font-semibold text-navy shrink-0">
                      ${item.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="py-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-display text-lg font-bold text-navy">
                    Total
                  </span>
                  <span className="font-display text-3xl font-bold text-gold">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p className="text-ink/60 text-xs mt-1 text-right">
                  One payment, multiple causes
                </p>
              </div>

              <button
                onClick={() => router.push("/giving/checkout")}
                className="btn-lift w-full bg-gold text-ink font-bold px-6 py-4 rounded-input hover:bg-gold/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Heart className="w-5 h-5" />
                Proceed to Checkout
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-ink/50 mt-4">
                <Shield className="w-3 h-3" />
                <span>Secure & encrypted payment</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}