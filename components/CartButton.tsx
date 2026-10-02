"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { getItemCount } = useCart();
  const count = getItemCount();

  return (
    <Link
      href="/giving/cart"
      className="relative p-2 text-navy hover:text-gold transition-colors"
      aria-label="View cart"
    >
      <ShoppingCart className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-gold text-ink text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}