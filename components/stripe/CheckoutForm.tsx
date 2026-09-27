"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface CheckoutFormProps {
  amount: number;
  onSuccess?: () => void;
}

export default function CheckoutForm({ amount, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/giving/success`,
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message || "Payment failed");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setIsSuccess(true);
        if (onSuccess) onSuccess();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-success/5 border border-success/20 rounded-card p-8 text-center">
        <div className="bg-success/10 rounded-full p-4 w-fit mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>
        <h3 className="font-display font-bold text-navy text-xl">Payment Successful!</h3>
        <p className="text-ink/70 mt-2 text-sm">
          Thank you for your donation of ${amount}. Your receipt has been sent to your email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-card p-6 border border-gray-100">
        <PaymentElement />
      </div>

      {errorMessage && (
        <div className="bg-error/5 border border-error/20 rounded-input p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
          <p className="text-error text-sm">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="btn-lift w-full bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
        ) : (
          <>Donate ${amount}</>
        )}
      </button>

      <p className="text-xs text-ink/50 text-center">
        Your payment is secure and encrypted by Stripe.
      </p>
    </form>
  );
}