"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Upload,
  CheckCircle,
  Shield,
  Send,
  AlertCircle,
  User,
  Building2,
  DollarSign,
  Calendar,
  Stethoscope,
  Pill,
  Receipt,
  CreditCard,
  Hash,
  MessageSquare,
} from "lucide-react";

// ============ TYPES ============
type FormData = {
  // Step 1: Provider & Patient Info
  providerName: string;
  providerType: string;
  providerLicense: string;
  patientName: string;
  patientApplicationId: string;
  patientFund: string;

  // Step 2: Treatment Info
  treatmentDate: string;
  treatmentType: string;
  diagnosis: string;
  serviceDescription: string;

  // Step 3: Claim Amount
  totalAmount: string;
  requestedAmount: string;
  approvedAmount: string;
  currency: string;

  // Step 4: Documents
  invoice: File | null;
  receipt: File | null;
  prescription: File | null;
  medicalReport: File | null;

  // Step 5: Consent
  consentTruth: boolean;
  consentPayment: boolean;
};

// ============ STEPS ============
const steps = [
  { id: 1, name: "Provider & Patient", icon: User },
  { id: 2, name: "Treatment Details", icon: Stethoscope },
  { id: 3, name: "Claim Amount", icon: DollarSign },
  { id: 4, name: "Documents", icon: Upload },
  { id: 5, name: "Review", icon: CheckCircle },
];

// ============ PROVIDER TYPES ============
const providerTypes = [
  "Hospital",
  "Clinic",
  "Pharmacy",
  "Diagnostic Center",
  "Laboratory",
];

// ============ TREATMENT TYPES ============
const treatmentTypes = [
  "Consultation / Checkup",
  "Surgery / Procedure",
  "Medication / Prescription",
  "Diagnostic Test",
  "Hospitalization",
  "Emergency Care",
  "Chemotherapy",
  "Dialysis",
  "Radiation Therapy",
  "Physical Therapy",
];

// ============ FUNDS ============
const fundsList = [
  "Cancer Care Fund",
  "Heart Disease Fund",
  "Kidney Disease Fund",
  "Diabetes Care Fund",
  "Children Health Fund",
  "Mental Health Fund",
  "Orthopedic Fund",
  "Eye Care Fund",
];

// ============ MAIN COMPONENT ============
export default function ClaimSubmissionPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    providerName: "",
    providerType: "",
    providerLicense: "",
    patientName: "",
    patientApplicationId: "",
    patientFund: "",
    treatmentDate: "",
    treatmentType: "",
    diagnosis: "",
    serviceDescription: "",
    totalAmount: "",
    requestedAmount: "",
    approvedAmount: "",
    currency: "USD",
    invoice: null,
    receipt: null,
    prescription: null,
    medicalReport: null,
    consentTruth: false,
    consentPayment: false,
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
      router.push("/healthcare/claims/submit/success");
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
            href="/healthcare/funds"
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Healthcare
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gold/20 rounded-full p-2.5">
              <Receipt className="w-6 h-6 text-gold" />
            </div>
            <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
              Claim Submission
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Submit a Claim for Reimbursement
          </h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            For verified healthcare providers and pharmacies. Submit treatment claims 
            for DHK LIFT patients and receive direct payment.
          </p>
        </div>
      </section>

      {/* ================= STEPPER ================= */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-container mx-auto px-6 py-4">
          {/* Desktop */}
          <div className="hidden lg:flex items-center justify-between">
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
                    <div className="hidden xl:block">
                      <p className={`text-xs font-semibold ${isActive ? "text-gold" : isComplete ? "text-success" : "text-ink/40"}`}>
                        Step {step.id}
                      </p>
                      <p className={`text-sm font-medium ${isActive || isComplete ? "text-navy" : "text-ink/40"}`}>
                        {step.name}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-3 ${isComplete ? "bg-success" : "bg-gray-200"}`}></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile */}
          <div className="lg:hidden">
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

            {/* ================= STEP 1: PROVIDER & PATIENT ================= */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Provider & Patient Info</h2>
                  <p className="text-ink/70 mt-1">Who is submitting the claim and for whom?</p>
                </div>

                {/* Provider Info */}
                <div className="bg-cloud rounded-card p-5 space-y-4">
                  <h3 className="font-semibold text-navy text-sm flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gold" />
                    Provider Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-ink mb-2">Provider Name *</label>
                      <input
                        type="text"
                        value={formData.providerName}
                        onChange={(e) => updateField("providerName", e.target.value)}
                        placeholder="Hospital/Clinic/Pharmacy name"
                        className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Provider Type *</label>
                      <select
                        value={formData.providerType}
                        onChange={(e) => updateField("providerType", e.target.value)}
                        className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                      >
                        <option value="">Select type</option>
                        {providerTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">License Number *</label>
                      <div className="relative">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                        <input
                          type="text"
                          value={formData.providerLicense}
                          onChange={(e) => updateField("providerLicense", e.target.value)}
                          placeholder="Provider license number"
                          className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="bg-cloud rounded-card p-5 space-y-4">
                  <h3 className="font-semibold text-navy text-sm flex items-center gap-2">
                    <User className="w-4 h-4 text-gold" />
                    Patient Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-ink mb-2">Patient Name *</label>
                      <input
                        type="text"
                        value={formData.patientName}
                        onChange={(e) => updateField("patientName", e.target.value)}
                        placeholder="Patient's full name"
                        className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Application ID *</label>
                      <div className="relative">
                        <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                        <input
                          type="text"
                          value={formData.patientApplicationId}
                          onChange={(e) => updateField("patientApplicationId", e.target.value)}
                          placeholder="e.g., HLT-24001"
                          className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Assigned Fund *</label>
                      <select
                        value={formData.patientFund}
                        onChange={(e) => updateField("patientFund", e.target.value)}
                        className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                      >
                        <option value="">Select fund</option>
                        {fundsList.map((fund) => (
                          <option key={fund} value={fund}>{fund}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 2: TREATMENT DETAILS ================= */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Treatment Details</h2>
                  <p className="text-ink/70 mt-1">Provide details about the medical treatment.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Treatment Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                        <input
                          type="date"
                          value={formData.treatmentDate}
                          onChange={(e) => updateField("treatmentDate", e.target.value)}
                          className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Treatment Type *</label>
                      <select
                        value={formData.treatmentType}
                        onChange={(e) => updateField("treatmentType", e.target.value)}
                        className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                      >
                        <option value="">Select type</option>
                        {treatmentTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Diagnosis *</label>
                    <input
                      type="text"
                      value={formData.diagnosis}
                      onChange={(e) => updateField("diagnosis", e.target.value)}
                      placeholder="Patient's diagnosis or medical condition"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Service Description *</label>
                    <textarea
                      value={formData.serviceDescription}
                      onChange={(e) => updateField("serviceDescription", e.target.value)}
                      rows={4}
                      placeholder="Describe the services provided in detail (procedures, medications, tests, etc.)..."
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 3: CLAIM AMOUNT ================= */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Claim Amount</h2>
                  <p className="text-ink/70 mt-1">Enter the financial details of your claim.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Currency *</label>
                    <select
                      value={formData.currency}
                      onChange={(e) => updateField("currency", e.target.value)}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                    >
                      <option>USD</option>
                      <option>PKR</option>
                      <option>AED</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Total Treatment Cost *</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="number"
                        value={formData.totalAmount}
                        onChange={(e) => updateField("totalAmount", e.target.value)}
                        placeholder="e.g., 5000"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Amount Requested from DHK LIFT *</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="number"
                        value={formData.requestedAmount}
                        onChange={(e) => updateField("requestedAmount", e.target.value)}
                        placeholder="e.g., 4000"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Already Approved Amount (if any)</label>
                    <div className="relative">
                      <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="number"
                        value={formData.approvedAmount}
                        onChange={(e) => updateField("approvedAmount", e.target.value)}
                        placeholder="0"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Summary Card */}
                {(formData.totalAmount || formData.requestedAmount) && (
                  <div className="bg-gold/5 border border-gold/20 rounded-card p-5">
                    <h3 className="font-semibold text-navy text-sm mb-4">Claim Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-ink/60">Total Treatment Cost</span>
                        <span className="font-semibold text-navy">
                          {formData.currency} {formData.totalAmount || "0"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ink/60">Requested Amount</span>
                        <span className="font-semibold text-navy">
                          {formData.currency} {formData.requestedAmount || "0"}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gold/20">
                        <span className="font-semibold text-navy">Claim Amount</span>
                        <span className="font-display font-bold text-gold text-lg">
                          {formData.currency} {formData.requestedAmount || "0"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================= STEP 4: DOCUMENTS ================= */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Required Documents</h2>
                  <p className="text-ink/70 mt-1">Upload all supporting documents for this claim.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { key: "invoice", label: "Hospital/Pharmacy Invoice *", required: true },
                    { key: "receipt", label: "Payment Receipt *", required: true },
                    { key: "prescription", label: "Doctor's Prescription *", required: true },
                    { key: "medicalReport", label: "Medical Report (Optional)", required: false },
                  ].map((doc) => (
                    <div key={doc.key} className="border-2 border-dashed border-gray-200 rounded-input p-6 hover:border-gold transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="bg-gold/10 rounded-full p-3 shrink-0">
                          <Upload className="w-6 h-6 text-gold" />
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
                  <Shield className="w-5 h-5 text-info mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-navy text-sm">Documents are secure</p>
                    <p className="text-ink/70 text-xs mt-1">
                      All documents are encrypted and only accessible to our claims verification team.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 5: REVIEW ================= */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Review & Submit</h2>
                  <p className="text-ink/70 mt-1">Please review your claim before submitting.</p>
                </div>

                <div className="space-y-4">
                  {/* Provider Info */}
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-4 h-4 text-navy" />
                      <h3 className="font-semibold text-navy text-sm">Provider</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-ink/60">Name:</span> <span className="font-medium text-navy">{formData.providerName || "—"}</span></div>
                      <div><span className="text-ink/60">Type:</span> <span className="font-medium text-navy">{formData.providerType || "—"}</span></div>
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4 text-navy" />
                      <h3 className="font-semibold text-navy text-sm">Patient</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-ink/60">Name:</span> <span className="font-medium text-navy">{formData.patientName || "—"}</span></div>
                      <div><span className="text-ink/60">App ID:</span> <span className="font-medium text-navy">{formData.patientApplicationId || "—"}</span></div>
                      <div className="col-span-2"><span className="text-ink/60">Fund:</span> <span className="font-medium text-navy">{formData.patientFund || "—"}</span></div>
                    </div>
                  </div>

                  {/* Treatment Info */}
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Stethoscope className="w-4 h-4 text-navy" />
                      <h3 className="font-semibold text-navy text-sm">Treatment</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-ink/60">Date:</span> <span className="font-medium text-navy">{formData.treatmentDate || "—"}</span></div>
                      <div><span className="text-ink/60">Type:</span> <span className="font-medium text-navy">{formData.treatmentType || "—"}</span></div>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="bg-gold/5 border border-gold/20 rounded-card p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-ink/60">Claim Amount</p>
                        <p className="font-display text-2xl font-bold text-gold mt-1">
                          {formData.currency} {formData.requestedAmount || "0"}
                        </p>
                      </div>
                      <DollarSign className="w-10 h-10 text-gold/40" />
                    </div>
                  </div>
                </div>

                {/* Consent */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consentTruth}
                      onChange={(e) => updateField("consentTruth", e.target.checked)}
                      className="mt-1 w-4 h-4 accent-gold"
                    />
                    <span className="text-sm text-ink/80">
                      I confirm that all information and documents provided are accurate and truthful. *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consentPayment}
                      onChange={(e) => updateField("consentPayment", e.target.checked)}
                      className="mt-1 w-4 h-4 accent-gold"
                    />
                    <span className="text-sm text-ink/80">
                      I understand that approved claims will be paid directly to the provider's bank account. *
                    </span>
                  </label>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gold/5 border border-gold/20 rounded-input">
                  <AlertCircle className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-navy text-sm">Processing Time</p>
                    <p className="text-ink/70 text-xs mt-1">
                      Claims are reviewed within 5-7 business days. Payments are processed 
                      within 3 business days after approval.
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
                  disabled={!formData.consentTruth || !formData.consentPayment || isSubmitting}
                  className="btn-lift bg-gold text-ink font-semibold px-8 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Claim
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Help Box */}
          <div className="mt-6 bg-info/5 border border-info/20 rounded-card p-4 flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-info mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-navy text-sm">Need Help?</p>
              <p className="text-ink/70 text-xs mt-1">
                Contact our claims team at claims@dhklift.org
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}