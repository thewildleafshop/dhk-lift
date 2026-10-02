"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FileUploader from "@/components/uploads/FileUploader";
import {
  ChevronLeft,
  User,
  FileText,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle,
  Shield,
  Send,
  Stethoscope,
} from "lucide-react";

export default function ClaimSubmitPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documentUrls, setDocumentUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    providerName: "",
    serviceDate: "",
    serviceType: "",
    amount: "",
    description: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          documents: documentUrls,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit claim");
      router.push("/partner/healthcare/claims/success");
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="space-y-6">
      <Link
        href="/partner/healthcare"
        className="inline-flex items-center gap-2 text-ink/60 hover:text-navy font-medium transition-colors text-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Healthcare
      </Link>

      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
          Submit Healthcare Claim
        </h1>
        <p className="text-ink/70 mt-1">
          Submit a claim for reimbursement. Our team will review it within 5-7 business days.
        </p>
      </div>

      <div className="bg-white rounded-card p-6 md:p-10 shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Patient Information */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-navy text-base flex items-center gap-2">
              <User className="w-5 h-5 text-gold" />
              Patient Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Patient Name *</label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => updateField("patientName", e.target.value)}
                  required
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Patient ID / Reference</label>
                <input
                  type="text"
                  value={formData.patientId}
                  onChange={(e) => updateField("patientId", e.target.value)}
                  placeholder="e.g., PT-2024-001"
                  className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                />
              </div>
            </div>
          </div>

          {/* Provider & Service */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="font-display font-bold text-navy text-base flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-gold" />
              Provider & Service
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-ink mb-2">Provider / Hospital Name *</label>
                <input
                  type="text"
                  value={formData.providerName}
                  onChange={(e) => updateField("providerName", e.target.value)}
                  required
                  placeholder="e.g., Aga Khan Hospital"
                  className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Service Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                  <input
                    type="date"
                    value={formData.serviceDate}
                    onChange={(e) => updateField("serviceDate", e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Service Type *</label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => updateField("serviceType", e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                >
                  <option value="">Select type</option>
                  <option value="consultation">Consultation</option>
                  <option value="surgery">Surgery</option>
                  <option value="medication">Medication</option>
                  <option value="diagnostic">Diagnostic Test</option>
                  <option value="hospitalization">Hospitalization</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Claim Amount */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="font-display font-bold text-navy text-base flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gold" />
              Claim Details
            </h2>
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Claim Amount (USD) *</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => updateField("amount", e.target.value)}
                  required
                  placeholder="e.g., 500"
                  className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Description / Treatment Details *</label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                required
                rows={4}
                placeholder="Describe the treatment, diagnosis, and reason for claim..."
                className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none"
              />
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="font-display font-bold text-navy text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold" />
              Supporting Documents
            </h2>
            <FileUploader
              endpoint="claimUploader"
              label="Upload invoices, receipts, medical reports (PDF, JPG)"
              multiple={true}
              onUploadComplete={(urls) => {
                setDocumentUrls(urls);
              }}
              onUploadError={(err: Error) => setError(err.message)}
            />
          </div>

          {/* Security Note */}
          <div className="flex items-start gap-3 p-4 bg-info/5 border border-info/20 rounded-input">
            <Shield className="w-5 h-5 text-info mt-0.5 shrink-0" />
            <p className="text-ink/70 text-xs">
              All patient information is kept confidential and securely stored.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-input">
              <p className="text-error text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-lift bg-gold text-ink font-semibold px-8 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Claim
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}