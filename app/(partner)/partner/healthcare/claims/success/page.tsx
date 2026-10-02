import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ClaimSuccessPage() {
  return (
    <main className="max-w-2xl mx-auto py-12">
      <div className="bg-white rounded-card p-8 md:p-12 shadow-sm border border-gray-100 text-center">
        <div className="bg-success/10 rounded-full p-6 w-fit mx-auto mb-6">
          <CheckCircle className="w-16 h-16 text-success" />
        </div>
        <h1 className="font-display text-3xl font-bold text-navy">Claim Submitted!</h1>
        <p className="text-ink/70 mt-4 max-w-lg mx-auto">
          Your healthcare claim has been submitted successfully. Our team will review it within 5-7 business days.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            href="/partner/healthcare"
            className="btn-lift bg-gold text-ink font-semibold px-6 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg"
          >
            Back to Healthcare
          </Link>
          <Link
            href="/partner/dashboard"
            className="btn-lift border-2 border-navy/20 text-navy font-semibold px-6 py-3.5 rounded-input hover:bg-navy/5 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}