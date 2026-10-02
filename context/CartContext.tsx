"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ============ TYPES ============
export interface CartItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  tagline: string;
  amount: number;
  type: "one-time" | "recurring";
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string) => void;
  updateAmount: (slug: string, amount: number) => void;
  updateType: (slug: string, type: "one-time" | "recurring") => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  isInCart: (slug: string) => boolean;
}

// ============ CONTEXT ============
const CartContext = createContext<CartContextType | undefined>(undefined);

// ============ PROVIDER ============
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dhk_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Error loading cart:", err);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("dhk_cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  // Add item to cart
  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === item.slug);
      if (existing) {
        // Already in cart, update amount
        return prev.map((i) =>
          i.slug === item.slug ? { ...i, amount: i.amount + item.amount } : i
        );
      }
      return [...prev, item];
    });
  };

  // Remove item from cart
  const removeItem = (slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  };

  // Update amount
  const updateAmount = (slug: string, amount: number) => {
    setItems((prev) =>
      prev.map((i) => (i.slug === slug ? { ...i, amount } : i))
    );
  };

  // Update type
  const updateType = (slug: string, type: "one-time" | "recurring") => {
    setItems((prev) =>
      prev.map((i) => (i.slug === slug ? { ...i, type } : i))
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("dhk_cart");
  };

  // Get total amount
  const getTotal = () => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  // Get item count
  const getItemCount = () => {
    return items.length;
  };

  // Check if item is in cart
  const isInCart = (slug: string) => {
    return items.some((i) => i.slug === slug);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateAmount,
        updateType,
        clearCart,
        getTotal,
        getItemCount,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ============ HOOK ============
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}