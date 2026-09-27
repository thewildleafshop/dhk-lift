"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  CheckCircle,
  Receipt,
  Clock,
  Mail,
  ChevronRight,
  Shield,
  Home,
  DollarSign,
} from "lucide-react";

export default function ClaimSubmissionSuccessPage() {
  const [referenceNumber, setReferenceNumber] = useState<string>("");

  useEffect(() => {
    setReferenceNumber(`CLM-${Math.floor(10000000 + Math.random() * 90000000)}`);
  }, []);

  return (
    <main className="min-h-screen bg-cloud flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-card shadow-xl p-8 md:p-12 text-center border border-gray-100">
          
          <div className="bg-success/10 rounded-full p-6 w-fit mx-auto mb-6 animate-fade-in-up">
            <CheckCircle className="w-16 h-16 text-success" />
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Claim Submitted!
          </h1>
          <p className="text-ink/70 mt-4 leading-relaxed max-w-lg mx-auto">
            Thank you for submitting your claim. Our claims team will review it within 
            5-7 business days. You'll receive updates via email.
          </p>

          <div className="bg-cloud rounded-card p-4 mt-8 inline-block">
            <p className="text-xs text-ink/60 uppercase tracking-wider">Claim Reference</p>
            <p className="font-display font-bold text-navy text-lg mt-1">
              {referenceNumber || "Generating..."}
            </p>
          </div>

          <div className="mt-8 p-4 bg-gold/5 border border-gold/20 rounded-card">
            <Clock className="w-5 h-5 text-gold mx-auto mb-2" />
            <p className="text-ink/80 text-sm">
              Claims are reviewed within 5-7 business days. Payment is processed 
              within 3 business days after approval.
            </p>
          </div>

          {/* What's Next */}
          <div className="mt-8 text-left bg-cloud rounded-card p-6">
            <h3 className="font-display font-bold text-navy text-base mb-4">What Happens Next?</h3>
            <ul className="space-y-3">
              {[
                "Document verification (2-3 days)",
                "Claims team reviews treatment details",
                "Amount verification against patient's fund",
                "Approval notification via email",
                "Direct payment to your bank account",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <div className="bg-navy text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-ink/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/healthcare/claims/status"
              className="btn-lift bg-gold text-ink font-semibold px-6 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <Receipt className="w-5 h-5" />
              Track Claim Status
            </Link>
            <Link
              href="/"
              className="btn-lift border-2 border-navy/20 text-navy font-semibold px-6 py-3.5 rounded-input hover:bg-navy/5 transition-colors flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-ink/60">
            <Mail className="w-4 h-4" />
            <span>Questions? Email claims@dhklift.org</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-ink/50 mt-6">
          <Shield className="w-3 h-3" />
          <span>All claims are verified for accuracy and transparency</span>
        </div>
      </div>
    </main>
  );
}