"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft,
  Accessibility,
  User,
  Phone,
  Mail,
  MapPin,
  Upload,
  CheckCircle,
  AlertCircle,
  Shield,
  Send,
} from "lucide-react";

export default function EquipmentRequestPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    equipmentType: "",
    condition: "",
    reason: "",
    hasMedicalDoc: false,
    medicalDoc: null as File | null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-cloud">

      {/* ================= HERO ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-10 md:py-12 relative z-10">
          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Equipment
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Request Medical Equipment
          </h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            Fill out the form below and our team will connect you with verified suppliers.
          </p>
        </div>
      </section>

      {/* ================= FORM ================= */}
      <section className="max-w-container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">

          {submitted ? (
            /* ================= SUCCESS ================= */
            <div className="bg-white rounded-card p-8 md:p-12 shadow-sm border border-gray-100 text-center">
              <div className="bg-success/10 rounded-full p-6 w-fit mx-auto mb-6">
                <CheckCircle className="w-16 h-16 text-success" />
              </div>
              <h2 className="font-display text-3xl font-bold text-navy">
                Request Submitted!
              </h2>
              <p className="text-ink/70 mt-4 leading-relaxed max-w-lg mx-auto">
                Thank you for your request. Our team will review it and contact you 
                within 3-5 business days.
              </p>
              <div className="bg-cloud rounded-card p-4 mt-8 inline-block">
                <p className="text-xs text-ink/60 uppercase tracking-wider">Reference Number</p>
                <p className="font-display font-bold text-navy text-lg mt-1">
                  EQ-{Date.now().toString().slice(-8)}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <Link
                  href="/equipment"
                  className="btn-lift bg-gold text-ink font-semibold px-6 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
                >
                  Browse More Equipment
                </Link>
                <Link
                  href="/dashboard"
                  className="btn-lift border-2 border-navy/20 text-navy font-semibold px-6 py-3.5 rounded-input hover:bg-navy/5 transition-colors flex items-center gap-2"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          ) : (
            /* ================= FORM ================= */
            <div className="bg-white rounded-card p-6 md:p-10 shadow-sm border border-gray-100">
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold text-navy">
                  Equipment Request Form
                </h2>
                <p className="text-ink/70 mt-1">
                  All information is kept confidential and secure.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                        placeholder="Enter your full name"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        required
                        placeholder="+92 300 1234567"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Full Address *</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        required
                        placeholder="House #, Street, Area"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      required
                      placeholder="Karachi"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Country *</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      required
                      placeholder="Pakistan"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                </div>

                {/* Equipment Details */}
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <h3 className="font-display font-bold text-navy text-base">
                    Equipment Details
                  </h3>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Equipment Type *</label>
                    <select
                      value={formData.equipmentType}
                      onChange={(e) => handleChange("equipmentType", e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                    >
                      <option value="">Select equipment type</option>
                      <option>Wheelchair</option>
                      <option>Walking Frame / Walker</option>
                      <option>Hospital Bed</option>
                      <option>Oxygen Concentrator</option>
                      <option>Prosthetic Limb</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Medical Condition / Reason *</label>
                    <textarea
                      value={formData.reason}
                      onChange={(e) => handleChange("reason", e.target.value)}
                      required
                      rows={4}
                      placeholder="Describe the medical condition and why equipment is needed..."
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none"
                    />
                  </div>
                </div>

                {/* Documents */}
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <h3 className="font-display font-bold text-navy text-base">
                    Supporting Documents
                  </h3>
                  <div className="border-2 border-dashed border-gray-200 rounded-input p-6 hover:border-gold transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-navy/5 rounded-full p-3 shrink-0">
                        <Upload className="w-6 h-6 text-navy" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-navy text-sm">
                          Medical Report / Prescription (Optional)
                        </p>
                        <p className="text-ink/60 text-xs mt-1">PDF, JPG, or PNG • Max 5MB</p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleChange("medicalDoc", e.target.files?.[0] || null)}
                        className="hidden"
                        id="medical-doc"
                      />
                      <label
                        htmlFor="medical-doc"
                        className="btn-lift bg-navy text-white font-semibold px-4 py-2 rounded-input hover:bg-navy/90 transition-colors cursor-pointer text-sm"
                      >
                        Upload
                      </label>
                    </div>
                    {formData.medicalDoc && (
                      <div className="flex items-center gap-2 mt-3 p-2 bg-success/5 rounded-input">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-xs text-success font-medium">{formData.medicalDoc.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Security Note */}
                <div className="flex items-start gap-3 p-4 bg-info/5 border border-info/20 rounded-input">
                  <Shield className="w-5 h-5 text-info mt-0.5 shrink-0" />
                  <p className="text-ink/70 text-xs">
                    Your information is secure and will only be shared with verified suppliers 
                    for the purpose of fulfilling your request.
                  </p>
                </div>

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
                        Submit Request
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}