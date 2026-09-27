"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Stethoscope,
  FileText,
  Upload,
  CheckCircle,
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
  Loader2,
} from "lucide-react";

// ============ TYPES ============
type FormData = {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  cnic: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  diagnosis: string;
  diagnosisDate: string;
  hospital: string;
  doctorName: string;
  treatmentPlan: string;
  requestedAmount: string;
  monthlyIncome: string;
  householdSize: string;
  employmentStatus: string;
  hasInsurance: string;
  insuranceDetails: string;
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

const fundNames: Record<string, string> = {
  "cancer-care-fund": "Cancer Care Fund",
  "heart-disease-fund": "Heart Disease Fund",
  "kidney-disease-fund": "Kidney Disease Fund",
  "diabetes-care-fund": "Diabetes Care Fund",
  "rare-disease-fund": "Rare Disease Fund",
  "children-health-fund": "Children Health Fund",
  "mental-health-fund": "Mental Health Fund",
  "thalassemia-fund": "Thalassemia Fund",
  "maternal-health-fund": "Maternal Health Fund",
};

// ============ MAIN COMPONENT ============
export default function FundApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const fundName = fundNames[slug] || "Disease Fund";

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [programId, setProgramId] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: "", dateOfBirth: "", gender: "", cnic: "", phone: "", email: "",
    address: "", city: "", country: "",
    diagnosis: "", diagnosisDate: "", hospital: "", doctorName: "", treatmentPlan: "", requestedAmount: "",
    monthlyIncome: "", householdSize: "", employmentStatus: "", hasInsurance: "", insuranceDetails: "",
    consentMedical: false, consentPrivacy: false, consentTruth: false,
  });

  // Fetch program ID from slug
  useEffect(() => {
    async function fetchProgram() {
      try {
        const res = await fetch(`/api/disease-funds/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProgramId(data.id);
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (slug) fetchProgram();
  }, [slug]);

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
    setError(null);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programId,
          amountRequested: parseFloat(formData.requestedAmount) || null,
          data: {
            fundSlug: slug,
            fundName,
            patientName: formData.fullName,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            cnic: formData.cnic,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            country: formData.country,
            diagnosis: formData.diagnosis,
            diagnosisDate: formData.diagnosisDate,
            hospital: formData.hospital,
            doctorName: formData.doctorName,
            treatmentPlan: formData.treatmentPlan,
            requestedAmount: formData.requestedAmount,
            monthlyIncome: formData.monthlyIncome,
            householdSize: formData.householdSize,
            employmentStatus: formData.employmentStatus,
            hasInsurance: formData.hasInsurance,
            insuranceDetails: formData.insuranceDetails,
          },
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to submit application");
      }

      const result = await res.json();
      router.push(`/healthcare/funds/${slug}/apply/success?ref=${result.confirmationNo}`);
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <main className="min-h-screen bg-cloud">
      {/* HERO */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-10 md:py-12 relative z-10">
          <Link href={`/healthcare/funds/${slug}`} className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm mb-4">
            <ChevronLeft className="w-4 h-4" />
            Back to {fundName}
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gold/20 rounded-full p-2.5">
              <Stethoscope className="w-6 h-6 text-gold" />
            </div>
            <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">{fundName}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Application for Assistance</h1>
          <p className="text-white/80 mt-2 max-w-2xl">Please fill out the form carefully. All information is kept strictly confidential.</p>
        </div>
      </section>

      {/* STEPPER */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-container mx-auto px-6 py-4">
          <div className="hidden lg:flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isComplete = currentStep > step.id;
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isComplete ? "bg-success text-white" : isActive ? "bg-gold text-ink" : "bg-gray-100 text-ink/40"
                    }`}>
                      {isComplete ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <div className="hidden xl:block">
                      <p className={`text-xs font-semibold ${isActive ? "text-gold" : isComplete ? "text-success" : "text-ink/40"}`}>Step {step.id}</p>
                      <p className={`text-sm font-medium ${isActive || isComplete ? "text-navy" : "text-ink/40"}`}>{step.name}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-3 ${isComplete ? "bg-success" : "bg-gray-200"}`}></div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="lg:hidden">
            <div className="flex justify-between text-sm text-ink/70 mb-2">
              <span className="font-semibold">Step {currentStep} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-gold to-gold/70 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-center text-navy font-semibold mt-2 text-sm">{steps[currentStep - 1].name}</p>
          </div>
        </div>
      </section>

      {/* FORM CONTENT */}
      <section className="max-w-container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-card p-6 md:p-10 shadow-sm border border-gray-100">

            {/* STEP 1: PATIENT INFO */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Patient Information</h2>
                  <p className="text-ink/70 mt-1">Tell us about the patient applying for assistance.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Full Name *</label>
                    <input type="text" value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} placeholder="Patient's full name" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Date of Birth *</label>
                    <input type="date" value={formData.dateOfBirth} onChange={(e) => updateField("dateOfBirth", e.target.value)} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Gender *</label>
                    <select value={formData.gender} onChange={(e) => updateField("gender", e.target.value)} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm">
                      <option value="">Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">CNIC / ID Number *</label>
                    <input type="text" value={formData.cnic} onChange={(e) => updateField("cnic", e.target.value)} placeholder="e.g., 42101-1234567-8" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Phone Number *</label>
                    <input type="tel" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+92 300 1234567" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Email Address *</label>
                    <input type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Complete Address *</label>
                    <input type="text" value={formData.address} onChange={(e) => updateField("address", e.target.value)} placeholder="House #, Street, Area" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">City *</label>
                    <input type="text" value={formData.city} onChange={(e) => updateField("city", e.target.value)} placeholder="Karachi" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Country *</label>
                    <input type="text" value={formData.country} onChange={(e) => updateField("country", e.target.value)} placeholder="Pakistan" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: MEDICAL INFO */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Medical Information</h2>
                  <p className="text-ink/70 mt-1">Provide details about the medical condition and treatment.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Diagnosis / Medical Condition *</label>
                    <textarea value={formData.diagnosis} onChange={(e) => updateField("diagnosis", e.target.value)} rows={3} placeholder="Describe the diagnosis..." className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Diagnosis Date *</label>
                      <input type="date" value={formData.diagnosisDate} onChange={(e) => updateField("diagnosisDate", e.target.value)} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Hospital / Treatment Center *</label>
                      <input type="text" value={formData.hospital} onChange={(e) => updateField("hospital", e.target.value)} placeholder="Hospital name" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Doctor's Name *</label>
                      <input type="text" value={formData.doctorName} onChange={(e) => updateField("doctorName", e.target.value)} placeholder="Dr. Ahmed Khan" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Amount Requested (USD) *</label>
                      <input type="number" value={formData.requestedAmount} onChange={(e) => updateField("requestedAmount", e.target.value)} placeholder="e.g., 5000" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Treatment Plan *</label>
                    <textarea value={formData.treatmentPlan} onChange={(e) => updateField("treatmentPlan", e.target.value)} rows={3} placeholder="Describe the recommended treatment..." className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: FINANCIAL INFO */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Financial Information</h2>
                  <p className="text-ink/70 mt-1">Help us understand your financial situation.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Monthly Income (USD) *</label>
                    <input type="number" value={formData.monthlyIncome} onChange={(e) => updateField("monthlyIncome", e.target.value)} placeholder="e.g., 300" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Household Size *</label>
                    <input type="number" value={formData.householdSize} onChange={(e) => updateField("householdSize", e.target.value)} placeholder="e.g., 5" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Employment Status *</label>
                    <select value={formData.employmentStatus} onChange={(e) => updateField("employmentStatus", e.target.value)} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm">
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
                      <button type="button" onClick={() => updateField("hasInsurance", "yes")} className={`p-4 rounded-input border-2 font-semibold transition-all ${formData.hasInsurance === "yes" ? "border-gold bg-gold/5 text-navy" : "border-gray-200 text-ink/70"}`}>Yes</button>
                      <button type="button" onClick={() => updateField("hasInsurance", "no")} className={`p-4 rounded-input border-2 font-semibold transition-all ${formData.hasInsurance === "no" ? "border-gold bg-gold/5 text-navy" : "border-gray-200 text-ink/70"}`}>No</button>
                    </div>
                  </div>
                  {formData.hasInsurance === "yes" && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-ink mb-2">Insurance Details</label>
                      <input type="text" value={formData.insuranceDetails} onChange={(e) => updateField("insuranceDetails", e.target.value)} placeholder="Provider name and policy number" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4: DOCUMENTS (Placeholder - baad mein File Upload) */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Required Documents</h2>
                  <p className="text-ink/70 mt-1">Document upload will be available in the next update.</p>
                </div>
                <div className="space-y-4">
                  {["Medical Report / Diagnosis", "Hospital Cost Estimate", "ID Document (CNIC/Passport)", "Income Proof / Financial Statement"].map((doc, i) => (
                    <div key={i} className="border-2 border-dashed border-gray-200 rounded-input p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-navy/5 rounded-full p-3 shrink-0"><Upload className="w-6 h-6 text-navy" /></div>
                        <div className="flex-1">
                          <p className="font-semibold text-navy text-sm">{doc}</p>
                          <p className="text-ink/60 text-xs mt-1">Will be available soon</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: REVIEW */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Review & Submit</h2>
                  <p className="text-ink/70 mt-1">Please review your information carefully before submitting.</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3"><User className="w-4 h-4 text-navy" /><h3 className="font-semibold text-navy text-sm">Patient Information</h3></div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-ink/60">Name:</span> <span className="font-medium text-navy">{formData.fullName || "—"}</span></div>
                      <div><span className="text-ink/60">CNIC:</span> <span className="font-medium text-navy">{formData.cnic || "—"}</span></div>
                      <div><span className="text-ink/60">Phone:</span> <span className="font-medium text-navy">{formData.phone || "—"}</span></div>
                      <div><span className="text-ink/60">City:</span> <span className="font-medium text-navy">{formData.city || "—"}</span></div>
                    </div>
                  </div>
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3"><Stethoscope className="w-4 h-4 text-navy" /><h3 className="font-semibold text-navy text-sm">Medical Information</h3></div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="col-span-2"><span className="text-ink/60">Diagnosis:</span> <span className="font-medium text-navy">{formData.diagnosis || "—"}</span></div>
                      <div><span className="text-ink/60">Hospital:</span> <span className="font-medium text-navy">{formData.hospital || "—"}</span></div>
                      <div><span className="text-ink/60">Amount:</span> <span className="font-medium text-gold">${formData.requestedAmount || "—"}</span></div>
                    </div>
                  </div>
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3"><DollarSign className="w-4 h-4 text-navy" /><h3 className="font-semibold text-navy text-sm">Financial Information</h3></div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-ink/60">Income:</span> <span className="font-medium text-navy">${formData.monthlyIncome || "—"}</span></div>
                      <div><span className="text-ink/60">Household:</span> <span className="font-medium text-navy">{formData.householdSize || "—"}</span></div>
                      <div><span className="text-ink/60">Employment:</span> <span className="font-medium text-navy">{formData.employmentStatus || "—"}</span></div>
                      <div><span className="text-ink/60">Insurance:</span> <span className="font-medium text-navy">{formData.hasInsurance || "—"}</span></div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-error/10 border border-error/20 rounded-input">
                    <p className="text-error text-sm font-medium">{error}</p>
                  </div>
                )}

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={formData.consentMedical} onChange={(e) => updateField("consentMedical", e.target.checked)} className="mt-1 w-4 h-4 accent-gold" />
                    <span className="text-sm text-ink/80">I consent to DHK LIFT verifying my medical information. *</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={formData.consentPrivacy} onChange={(e) => updateField("consentPrivacy", e.target.checked)} className="mt-1 w-4 h-4 accent-gold" />
                    <span className="text-sm text-ink/80">I agree to the Privacy Policy and Terms of Service. *</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={formData.consentTruth} onChange={(e) => updateField("consentTruth", e.target.checked)} className="mt-1 w-4 h-4 accent-gold" />
                    <span className="text-sm text-ink/80">I confirm that all information is true and accurate. *</span>
                  </label>
                </div>
              </div>
            )}

            {/* NAVIGATION */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
              <button type="button" onClick={handleBack} disabled={currentStep === 1} className="flex items-center gap-2 text-ink/60 hover:text-navy font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>

              {currentStep < steps.length ? (
                <button type="button" onClick={handleNext} className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2">
                  Next Step <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={!formData.consentMedical || !formData.consentPrivacy || !formData.consentTruth || isSubmitting} className="btn-lift bg-gold text-ink font-semibold px-8 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                  ) : (
                    <><Send className="w-5 h-5" /> Submit Application</>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}