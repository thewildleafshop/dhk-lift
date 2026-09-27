"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  User,
  FileText,
  Upload,
  CheckCircle,
  Shield,
  Globe,
  Users,
  DollarSign,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
} from "lucide-react";

// ============ TYPES ============
type FormData = {
  // Step 1: Organization Info
  orgName: string;
  orgType: string;
  country: string;
  city: string;
  address: string;
  website: string;
  foundedYear: string;

  // Step 2: Contact Person
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;

  // Step 3: Mission & Programs
  mission: string;
  previousProjects: string;
  leadershipInfo: string;
  references: string;

  // Step 4: Documents
  registrationDoc: File | null;
  financialDoc: File | null;
  taxDoc: File | null;
  additionalDocs: File | null;

  // Step 5: Consent
  consentData: boolean;
  consentTruth: boolean;
};

// ============ STEPS ============
const steps = [
  { id: 1, name: "Organization", icon: Building2 },
  { id: 2, name: "Contact Person", icon: User },
  { id: 3, name: "Mission & Programs", icon: FileText },
  { id: 4, name: "Documents", icon: Upload },
  { id: 5, name: "Review & Submit", icon: CheckCircle },
];

// ============ ORG TYPES ============
const orgTypes = [
  { id: "ngo", label: "NGO / Nonprofit" },
  { id: "healthcare", label: "Healthcare Provider" },
  { id: "pharmacy", label: "Pharmacy" },
  { id: "education", label: "Educational Institution" },
  { id: "community", label: "Community Organization" },
  { id: "other", label: "Other" },
];

// ============ MAIN COMPONENT ============
export default function PartnerApplyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    orgName: "",
    orgType: "",
    country: "",
    city: "",
    address: "",
    website: "",
    foundedYear: "",
    contactName: "",
    contactRole: "",
    contactEmail: "",
    contactPhone: "",
    mission: "",
    previousProjects: "",
    leadershipInfo: "",
    references: "",
    registrationDoc: null,
    financialDoc: null,
    taxDoc: null,
    additionalDocs: null,
    consentData: false,
    consentTruth: false,
  });

  const updateField = (field: keyof FormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/partnerships/apply/success");
    }, 2000);
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <main className="min-h-screen bg-cloud">

      {/* ================= HERO ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-10 md:py-12 relative z-10">
          <Link
            href="/partnerships"
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Partnerships
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Partner Application
          </h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            Join our global network of verified partners. Fill out the form below to get started.
          </p>
        </div>
      </section>

      {/* ================= STEPPER ================= */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-container mx-auto px-6 py-4">
          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isComplete = currentStep > step.id;
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isComplete
                          ? "bg-success text-white"
                          : isActive
                          ? "bg-gold text-ink"
                          : "bg-gray-100 text-ink/40"
                      }`}
                    >
                      {isComplete ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <div className="hidden lg:block">
                      <p className={`text-xs font-semibold ${isActive ? "text-gold" : isComplete ? "text-success" : "text-ink/40"}`}>
                        Step {step.id}
                      </p>
                      <p className={`text-sm font-medium ${isActive || isComplete ? "text-navy" : "text-ink/40"}`}>
                        {step.name}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${isComplete ? "bg-success" : "bg-gray-200"}`}></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <div className="flex justify-between text-sm text-ink/70 mb-2">
              <span className="font-semibold">Step {currentStep} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-gold to-gold/70 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center text-navy font-semibold mt-2 text-sm">
              {steps[currentStep - 1].name}
            </p>
          </div>
        </div>
      </section>

      {/* ================= FORM ================= */}
      <section className="max-w-container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">

          <div className="bg-white rounded-card p-6 md:p-10 shadow-sm border border-gray-100 animate-fade-in">

            {/* ================= STEP 1: ORGANIZATION ================= */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Organization Information</h2>
                  <p className="text-ink/70 mt-1">Tell us about your organization.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Organization Name *</label>
                    <input
                      type="text"
                      value={formData.orgName}
                      onChange={(e) => updateField("orgName", e.target.value)}
                      placeholder="Enter organization name"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Organization Type *</label>
                    <select
                      value={formData.orgType}
                      onChange={(e) => updateField("orgType", e.target.value)}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white"
                    >
                      <option value="">Select type</option>
                      {orgTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Founded Year *</label>
                    <input
                      type="number"
                      value={formData.foundedYear}
                      onChange={(e) => updateField("foundedYear", e.target.value)}
                      placeholder="e.g., 2015"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Country *</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => updateField("country", e.target.value)}
                      placeholder="Pakistan"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="Karachi"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Full Address *</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      placeholder="Complete address"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Website (Optional)</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => updateField("website", e.target.value)}
                      placeholder="https://yourorg.org"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 2: CONTACT ================= */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Contact Person</h2>
                  <p className="text-ink/70 mt-1">Who should we contact regarding this application?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="text"
                        value={formData.contactName}
                        onChange={(e) => updateField("contactName", e.target.value)}
                        placeholder="Enter full name"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Role / Position *</label>
                    <input
                      type="text"
                      value={formData.contactRole}
                      onChange={(e) => updateField("contactRole", e.target.value)}
                      placeholder="e.g., Director"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => updateField("contactEmail", e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => updateField("contactPhone", e.target.value)}
                        placeholder="+92 300 1234567"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 3: MISSION ================= */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Mission & Programs</h2>
                  <p className="text-ink/70 mt-1">Tell us about your mission and past work.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Mission Statement *</label>
                    <textarea
                      value={formData.mission}
                      onChange={(e) => updateField("mission", e.target.value)}
                      rows={4}
                      placeholder="Describe your organization's mission and vision..."
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Previous Projects *</label>
                    <textarea
                      value={formData.previousProjects}
                      onChange={(e) => updateField("previousProjects", e.target.value)}
                      rows={4}
                      placeholder="List 2-3 of your most impactful projects..."
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Leadership Information *</label>
                    <textarea
                      value={formData.leadershipInfo}
                      onChange={(e) => updateField("leadershipInfo", e.target.value)}
                      rows={3}
                      placeholder="Names and roles of key leadership team members..."
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">References *</label>
                    <textarea
                      value={formData.references}
                      onChange={(e) => updateField("references", e.target.value)}
                      rows={3}
                      placeholder="Names and contact info of 2 references (partners, donors, etc.)..."
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 4: DOCUMENTS ================= */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Required Documents</h2>
                  <p className="text-ink/70 mt-1">Upload the following documents to verify your organization.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { key: "registrationDoc", label: "Organization Registration Certificate *" },
                    { key: "financialDoc", label: "Financial Statements (Last 2 Years) *" },
                    { key: "taxDoc", label: "Tax Exemption Certificate (if applicable)" },
                    { key: "additionalDocs", label: "Additional Supporting Documents" },
                  ].map((doc) => (
                    <div key={doc.key} className="border-2 border-dashed border-gray-200 rounded-input p-6 hover:border-gold transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="bg-navy/5 rounded-full p-3 shrink-0">
                          <Upload className="w-6 h-6 text-navy" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-navy text-sm">{doc.label}</p>
                          <p className="text-ink/60 text-xs mt-1">PDF, JPG, or PNG • Max 10MB</p>
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => updateField(doc.key as keyof FormData, e.target.files?.[0] || null)}
                          className="hidden"
                          id={`file-${doc.key}`}
                        />
                        <label
                          htmlFor={`file-${doc.key}`}
                          className="btn-lift bg-navy text-white font-semibold px-4 py-2 rounded-input hover:bg-navy/90 transition-colors cursor-pointer text-sm"
                        >
                          Upload
                        </label>
                      </div>
                      {formData[doc.key as keyof FormData] && (
                        <div className="flex items-center gap-2 mt-3 p-2 bg-success/5 rounded-input">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span className="text-xs text-success font-medium">
                            {(formData[doc.key as keyof FormData] as File).name}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-3 p-4 bg-info/5 border border-info/20 rounded-input">
                  <AlertCircle className="w-5 h-5 text-info mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-navy text-sm">Documents are secure</p>
                    <p className="text-ink/70 text-xs mt-1">
                      Your documents are encrypted and only accessible to authorized DHK LIFT verification team.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 5: REVIEW & SUBMIT ================= */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Review & Submit</h2>
                  <p className="text-ink/70 mt-1">Please review your information before submitting.</p>
                </div>

                <div className="space-y-4">
                  {/* Organization Summary */}
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-4 h-4 text-navy" />
                      <h3 className="font-semibold text-navy text-sm">Organization Information</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-ink/60">Name:</span> <span className="font-medium text-navy">{formData.orgName || "—"}</span></div>
                      <div><span className="text-ink/60">Type:</span> <span className="font-medium text-navy">{formData.orgType || "—"}</span></div>
                      <div><span className="text-ink/60">Founded:</span> <span className="font-medium text-navy">{formData.foundedYear || "—"}</span></div>
                      <div><span className="text-ink/60">Location:</span> <span className="font-medium text-navy">{formData.city || "—"}, {formData.country || "—"}</span></div>
                    </div>
                  </div>

                  {/* Contact Summary */}
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4 text-navy" />
                      <h3 className="font-semibold text-navy text-sm">Contact Person</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-ink/60">Name:</span> <span className="font-medium text-navy">{formData.contactName || "—"}</span></div>
                      <div><span className="text-ink/60">Role:</span> <span className="font-medium text-navy">{formData.contactRole || "—"}</span></div>
                      <div><span className="text-ink/60">Email:</span> <span className="font-medium text-navy">{formData.contactEmail || "—"}</span></div>
                      <div><span className="text-ink/60">Phone:</span> <span className="font-medium text-navy">{formData.contactPhone || "—"}</span></div>
                    </div>
                  </div>

                  {/* Documents Summary */}
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-navy" />
                      <h3 className="font-semibold text-navy text-sm">Uploaded Documents</h3>
                    </div>
                    <ul className="space-y-1 text-sm">
                      {formData.registrationDoc && <li className="text-success flex items-center gap-2"><CheckCircle className="w-3 h-3" /> Registration Certificate</li>}
                      {formData.financialDoc && <li className="text-success flex items-center gap-2"><CheckCircle className="w-3 h-3" /> Financial Statements</li>}
                      {formData.taxDoc && <li className="text-success flex items-center gap-2"><CheckCircle className="w-3 h-3" /> Tax Certificate</li>}
                      {formData.additionalDocs && <li className="text-success flex items-center gap-2"><CheckCircle className="w-3 h-3" /> Additional Documents</li>}
                    </ul>
                  </div>
                </div>

                {/* Consent */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consentData}
                      onChange={(e) => updateField("consentData", e.target.checked)}
                      className="mt-1 w-4 h-4 accent-gold"
                    />
                    <span className="text-sm text-ink/80">
                      I consent to DHK LIFT collecting and processing my organization's data for verification purposes. *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consentTruth}
                      onChange={(e) => updateField("consentTruth", e.target.checked)}
                      className="mt-1 w-4 h-4 accent-gold"
                    />
                    <span className="text-sm text-ink/80">
                      I confirm that all information provided is true and accurate. *
                    </span>
                  </label>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gold/5 border border-gold/20 rounded-input">
                  <Shield className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-navy text-sm">Verification takes 5-7 business days</p>
                    <p className="text-ink/70 text-xs mt-1">
                      Our team will review your application and contact you via email.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ================= NAVIGATION ================= */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2 text-ink/60 hover:text-navy font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!formData.consentData || !formData.consentTruth || isSubmitting}
                  className="btn-lift bg-gold text-ink font-semibold px-8 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>

          </div>

          {/* Help Box */}
          <div className="mt-6 bg-info/5 border border-info/20 rounded-card p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-info mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-navy text-sm">Need Help?</p>
              <p className="text-ink/70 text-xs mt-1">
                Contact our partnerships team at partners@dhklift.org
              </p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}