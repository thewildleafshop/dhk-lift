"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Stethoscope,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Shield,
  Send,
  Heart,
  Building2,
  DollarSign,
  Lock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  IdCard,
} from "lucide-react";

// ============ TYPES ============
type FormData = {
  // Step 1: Patient Info
  fullName: string;
  dateOfBirth: string;
  gender: string;
  cnic: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;

  // Step 2: Medical Info
  diagnosis: string;
  diagnosisDate: string;
  hospital: string;
  doctorName: string;
  treatmentPlan: string;
  requestedAmount: string;

  // Step 3: Financial Info
  monthlyIncome: string;
  householdSize: string;
  employmentStatus: string;
  hasInsurance: string;
  insuranceDetails: string;

  // Step 4: Documents
  medicalReport: File | null;
  hospitalEstimate: File | null;
  idDocument: File | null;
  incomeProof: File | null;

  // Step 5: Consent
  consentMedical: boolean;
  consentPrivacy: boolean;
  consentTruth: boolean;
};

// ============ STEPS ============
const steps = [
  { id: 1, name: "Patient Info", icon: User },
  { id: 2, name: "Medical Info", icon: Stethoscope },
  { id: 3, name: "Financial Info", icon: DollarSign },
  { id: 4, name: "Documents", icon: Upload },
  { id: 5, name: "Review", icon: CheckCircle },
];

// ============ FUND NAMES ============
const fundNames: Record<string, string> = {
  "cancer-care-fund": "Cancer Care Fund",
  "heart-disease-fund": "Heart Disease Fund",
  "kidney-disease-fund": "Kidney Disease Fund",
  "diabetes-care-fund": "Diabetes Care Fund",
  "rare-disease-fund": "Rare Disease Fund",
  "children-health-fund": "Children Health Fund",
  "mental-health-fund": "Mental Health Fund",
  "orthopedic-fund": "Orthopedic Fund",
  "eye-care-fund": "Eye Care Fund",
};

// ============ MAIN COMPONENT ============
export default function FundApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const fundName = fundNames[slug] || "Disease Fund";

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    cnic: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "",
    diagnosis: "",
    diagnosisDate: "",
    hospital: "",
    doctorName: "",
    treatmentPlan: "",
    requestedAmount: "",
    monthlyIncome: "",
    householdSize: "",
    employmentStatus: "",
    hasInsurance: "",
    insuranceDetails: "",
    medicalReport: null,
    hospitalEstimate: null,
    idDocument: null,
    incomeProof: null,
    consentMedical: false,
    consentPrivacy: false,
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
      router.push(`/healthcare/funds/${slug}/apply/success`);
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
            href={`/healthcare/funds/${slug}`}
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to {fundName}
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gold/20 rounded-full p-2.5">
              <Stethoscope className="w-6 h-6 text-gold" />
            </div>
            <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
              {fundName}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Application for Assistance
          </h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            Please fill out the form carefully. All information is kept strictly confidential.
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

      {/* ================= FORM CONTENT ================= */}
      <section className="max-w-container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-card p-6 md:p-10 shadow-sm border border-gray-100 animate-fade-in">

            {/* ================= STEP 1: PATIENT INFO ================= */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Patient Information</h2>
                  <p className="text-ink/70 mt-1">Tell us about the patient applying for assistance.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="Patient's full name"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Date of Birth *</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateField("dateOfBirth", e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Gender *</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => updateField("gender", e.target.value)}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                    >
                      <option value="">Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">CNIC / ID Number *</label>
                    <div className="relative">
                      <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="text"
                        value={formData.cnic}
                        onChange={(e) => updateField("cnic", e.target.value)}
                        placeholder="e.g., 42101-1234567-8"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+92 300 1234567"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Complete Address *</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => updateField("address", e.target.value)}
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
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="Karachi"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Country *</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => updateField("country", e.target.value)}
                      placeholder="Pakistan"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 2: MEDICAL INFO ================= */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Medical Information</h2>
                  <p className="text-ink/70 mt-1">Provide details about the medical condition and treatment.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Diagnosis / Medical Condition *</label>
                    <textarea
                      value={formData.diagnosis}
                      onChange={(e) => updateField("diagnosis", e.target.value)}
                      rows={3}
                      placeholder="Describe the diagnosis and current medical condition..."
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Diagnosis Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                        <input
                          type="date"
                          value={formData.diagnosisDate}
                          onChange={(e) => updateField("diagnosisDate", e.target.value)}
                          className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Hospital / Treatment Center *</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                        <input
                          type="text"
                          value={formData.hospital}
                          onChange={(e) => updateField("hospital", e.target.value)}
                          placeholder="Hospital name"
                          className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Doctor's Name *</label>
                      <input
                        type="text"
                        value={formData.doctorName}
                        onChange={(e) => updateField("doctorName", e.target.value)}
                        placeholder="Dr. Ahmed Khan"
                        className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Amount Requested (USD) *</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                        <input
                          type="number"
                          value={formData.requestedAmount}
                          onChange={(e) => updateField("requestedAmount", e.target.value)}
                          placeholder="e.g., 5000"
                          className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Treatment Plan *</label>
                    <textarea
                      value={formData.treatmentPlan}
                      onChange={(e) => updateField("treatmentPlan", e.target.value)}
                      rows={3}
                      placeholder="Describe the recommended treatment plan by your doctor..."
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 3: FINANCIAL INFO ================= */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Financial Information</h2>
                  <p className="text-ink/70 mt-1">Help us understand your financial situation.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Monthly Income (USD) *</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="number"
                        value={formData.monthlyIncome}
                        onChange={(e) => updateField("monthlyIncome", e.target.value)}
                        placeholder="e.g., 300"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Household Size *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="number"
                        value={formData.householdSize}
                        onChange={(e) => updateField("householdSize", e.target.value)}
                        placeholder="e.g., 5"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Employment Status *</label>
                    <select
                      value={formData.employmentStatus}
                      onChange={(e) => updateField("employmentStatus", e.target.value)}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                    >
                      <option value="">Select status</option>
                      <option>Employed (Full-time)</option>
                      <option>Employed (Part-time)</option>
                      <option>Self-employed</option>
                      <option>Unemployed</option>
                      <option>Retired</option>
                      <option>Student</option>
                      <option>Unable to work (medical)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Do you have health insurance? *</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => updateField("hasInsurance", "yes")}
                        className={`p-4 rounded-input border-2 font-semibold transition-all ${
                          formData.hasInsurance === "yes"
                            ? "border-gold bg-gold/5 text-navy"
                            : "border-gray-200 text-ink/70 hover:border-gray-300"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => updateField("hasInsurance", "no")}
                        className={`p-4 rounded-input border-2 font-semibold transition-all ${
                          formData.hasInsurance === "no"
                            ? "border-gold bg-gold/5 text-navy"
                            : "border-gray-200 text-ink/70 hover:border-gray-300"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  {formData.hasInsurance === "yes" && (
                    <div className="md:col-span-2 animate-fade-in">
                      <label className="block text-sm font-semibold text-ink mb-2">Insurance Details</label>
                      <input
                        type="text"
                        value={formData.insuranceDetails}
                        onChange={(e) => updateField("insuranceDetails", e.target.value)}
                        placeholder="Provider name and policy number"
                        className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ================= STEP 4: DOCUMENTS ================= */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Required Documents</h2>
                  <p className="text-ink/70 mt-1">Upload all required documents to support your application.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { key: "medicalReport", label: "Medical Report / Diagnosis *", required: true },
                    { key: "hospitalEstimate", label: "Hospital Cost Estimate *", required: true },
                    { key: "idDocument", label: "ID Document (CNIC/Passport) *", required: true },
                    { key: "incomeProof", label: "Income Proof / Financial Statement *", required: true },
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
                  <Shield className="w-5 h-5 text-info mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-navy text-sm">Documents are secure</p>
                    <p className="text-ink/70 text-xs mt-1">
                      Your documents are encrypted and only accessible to our healthcare verification team.
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
                  <p className="text-ink/70 mt-1">Please review your information carefully before submitting.</p>
                </div>

                <div className="space-y-4">
                  {/* Patient Info */}
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4 text-navy" />
                      <h3 className="font-semibold text-navy text-sm">Patient Information</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-ink/60">Name:</span> <span className="font-medium text-navy">{formData.fullName || "—"}</span></div>
                      <div><span className="text-ink/60">DOB:</span> <span className="font-medium text-navy">{formData.dateOfBirth || "—"}</span></div>
                      <div><span className="text-ink/60">CNIC:</span> <span className="font-medium text-navy">{formData.cnic || "—"}</span></div>
                      <div><span className="text-ink/60">Phone:</span> <span className="font-medium text-navy">{formData.phone || "—"}</span></div>
                      <div className="col-span-2"><span className="text-ink/60">Address:</span> <span className="font-medium text-navy">{formData.city || "—"}, {formData.country || "—"}</span></div>
                    </div>
                  </div>

                  {/* Medical Info */}
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Stethoscope className="w-4 h-4 text-navy" />
                      <h3 className="font-semibold text-navy text-sm">Medical Information</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="col-span-2"><span className="text-ink/60">Diagnosis:</span> <span className="font-medium text-navy">{formData.diagnosis || "—"}</span></div>
                      <div><span className="text-ink/60">Hospital:</span> <span className="font-medium text-navy">{formData.hospital || "—"}</span></div>
                      <div><span className="text-ink/60">Doctor:</span> <span className="font-medium text-navy">{formData.doctorName || "—"}</span></div>
                      <div><span className="text-ink/60">Amount:</span> <span className="font-medium text-gold">${formData.requestedAmount || "—"}</span></div>
                    </div>
                  </div>

                  {/* Financial Info */}
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-4 h-4 text-navy" />
                      <h3 className="font-semibold text-navy text-sm">Financial Information</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-ink/60">Income:</span> <span className="font-medium text-navy">${formData.monthlyIncome || "—"}</span></div>
                      <div><span className="text-ink/60">Household:</span> <span className="font-medium text-navy">{formData.householdSize || "—"}</span></div>
                      <div><span className="text-ink/60">Employment:</span> <span className="font-medium text-navy">{formData.employmentStatus || "—"}</span></div>
                      <div><span className="text-ink/60">Insurance:</span> <span className="font-medium text-navy">{formData.hasInsurance || "—"}</span></div>
                    </div>
                  </div>
                </div>

                {/* Consent */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consentMedical}
                      onChange={(e) => updateField("consentMedical", e.target.checked)}
                      className="mt-1 w-4 h-4 accent-gold"
                    />
                    <span className="text-sm text-ink/80">
                      I consent to DHK LIFT verifying my medical information with the hospital and healthcare providers. *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consentPrivacy}
                      onChange={(e) => updateField("consentPrivacy", e.target.checked)}
                      className="mt-1 w-4 h-4 accent-gold"
                    />
                    <span className="text-sm text-ink/80">
                      I have read and agree to the Privacy Policy and Terms of Service. *
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
                      I confirm that all information provided is true and accurate to the best of my knowledge. *
                    </span>
                  </label>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gold/5 border border-gold/20 rounded-input">
                  <Lock className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-navy text-sm">Your information is secure</p>
                    <p className="text-ink/70 text-xs mt-1">
                      All data is encrypted and stored securely. Only authorized healthcare 
                      team members can access your application.
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
                  disabled={!formData.consentMedical || !formData.consentPrivacy || !formData.consentTruth || isSubmitting}
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
                Contact our healthcare team at healthcare@dhklift.org
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}