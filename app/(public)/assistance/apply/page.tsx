"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Users,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Stethoscope,
  Utensils,
  BookOpen,
  Home,
  HeartHandshake,
  Accessibility,
  Shield,
  Lock,
} from "lucide-react";
import FileUploader from "@/components/uploads/FileUploader";

// ============ TYPES ============
type FormData = {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  maritalStatus: string;
  householdSize: string;
  dependents: string;
  monthlyIncome: string;
  program: string;
  assistanceType: string;
  urgency: string;
  situation: string;
  requestedAmount: string;
  idDocument: string;
  proofOfIncome: string;
  medicalReport: string;
  additionalDocs: string[];
  consentData: boolean;
  consentPrivacy: boolean;
  consentTruth: boolean;
};

// ============ STEPS ============
const steps = [
  { id: 1, name: "Personal Info", icon: User },
  { id: 2, name: "Household", icon: Users },
  { id: 3, name: "Assistance Details", icon: FileText },
  { id: 4, name: "Documents", icon: Upload },
  { id: 5, name: "Review & Submit", icon: CheckCircle },
];

// ============ PROGRAMS ============
const programs = [
  { id: "lift-health", name: "LIFT Health", icon: Stethoscope },
  { id: "food-security", name: "Food Security", icon: Utensils },
  { id: "education-support", name: "Education Support", icon: BookOpen },
  { id: "lift-ability", name: "LIFT Ability", icon: Accessibility },
  { id: "lift-protect", name: "LIFT Protect", icon: HeartHandshake },
  { id: "children-families", name: "Children & Families", icon: Home },
];

export default function ApplyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: "", dateOfBirth: "", gender: "", phone: "", email: "",
    address: "", city: "", country: "",
    maritalStatus: "", householdSize: "", dependents: "", monthlyIncome: "",
    program: "", assistanceType: "", urgency: "", situation: "", requestedAmount: "",
    idDocument: "", proofOfIncome: "", medicalReport: "", additionalDocs: [],
    consentData: false, consentPrivacy: false, consentTruth: false,
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
    setError(null);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountRequested: parseFloat(formData.requestedAmount) || null,
          data: {
            fullName: formData.fullName,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            country: formData.country,
            maritalStatus: formData.maritalStatus,
            householdSize: formData.householdSize,
            dependents: formData.dependents,
            monthlyIncome: formData.monthlyIncome,
            program: formData.program,
            assistanceType: formData.assistanceType,
            urgency: formData.urgency,
            situation: formData.situation,
            requestedAmount: formData.requestedAmount,
            documents: {
              idDocument: formData.idDocument,
              proofOfIncome: formData.proofOfIncome,
              medicalReport: formData.medicalReport,
              additionalDocs: formData.additionalDocs,
            },
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to submit application");
      router.push("/assistance/apply/success");
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
          <Link href="/assistance" className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm mb-4">
            <ChevronLeft className="w-4 h-4" /> Back to Assistance
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Assistance Application</h1>
          <p className="text-white/80 mt-2 max-w-2xl">Apply for support and take the next step towards a better future.</p>
        </div>
      </section>

      {/* STEPPER */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-container mx-auto px-6 py-4">
          <div className="hidden md:flex items-center justify-between">
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
                    <div className="hidden lg:block">
                      <p className={`text-xs font-semibold ${isActive ? "text-gold" : isComplete ? "text-success" : "text-ink/40"}`}>Step {step.id}</p>
                      <p className={`text-sm font-medium ${isActive || isComplete ? "text-navy" : "text-ink/40"}`}>{step.name}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${isComplete ? "bg-success" : "bg-gray-200"}`}></div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="md:hidden">
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

            {/* STEP 1: PERSONAL INFO */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Personal Information</h2>
                  <p className="text-ink/70 mt-1">Tell us about yourself.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Full Name *</label>
                    <input type="text" value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} placeholder="Enter your full name" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Date of Birth *</label>
                    <input type="date" value={formData.dateOfBirth} onChange={(e) => updateField("dateOfBirth", e.target.value)} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Gender *</label>
                    <select value={formData.gender} onChange={(e) => updateField("gender", e.target.value)} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white">
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Phone Number *</label>
                    <input type="tel" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+92 300 1234567" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Email Address *</label>
                    <input type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Address *</label>
                    <input type="text" value={formData.address} onChange={(e) => updateField("address", e.target.value)} placeholder="House #, Street, Area" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">City *</label>
                    <input type="text" value={formData.city} onChange={(e) => updateField("city", e.target.value)} placeholder="Karachi" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Country *</label>
                    <input type="text" value={formData.country} onChange={(e) => updateField("country", e.target.value)} placeholder="Pakistan" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: HOUSEHOLD */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Household Information</h2>
                  <p className="text-ink/70 mt-1">Tell us about your family and financial situation.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Marital Status *</label>
                    <select value={formData.maritalStatus} onChange={(e) => updateField("maritalStatus", e.target.value)} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white">
                      <option value="">Select status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Household Size *</label>
                    <input type="number" value={formData.householdSize} onChange={(e) => updateField("householdSize", e.target.value)} placeholder="e.g., 5" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Number of Dependents *</label>
                    <input type="number" value={formData.dependents} onChange={(e) => updateField("dependents", e.target.value)} placeholder="e.g., 3" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Monthly Income (USD) *</label>
                    <input type="number" value={formData.monthlyIncome} onChange={(e) => updateField("monthlyIncome", e.target.value)} placeholder="e.g., 200" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: ASSISTANCE DETAILS */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Assistance Details</h2>
                  <p className="text-ink/70 mt-1">Tell us what kind of help you need.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-3">Select Program *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {programs.map((program) => {
                      const Icon = program.icon;
                      const isSelected = formData.program === program.id;
                      return (
                        <button key={program.id} type="button" onClick={() => updateField("program", program.id)} className={`flex flex-col items-center gap-2 p-4 rounded-input border-2 transition-all ${isSelected ? "border-gold bg-gold/5" : "border-gray-200 hover:border-gray-300"}`}>
                          <Icon className={`w-6 h-6 ${isSelected ? "text-gold" : "text-ink/60"}`} />
                          <span className={`text-xs font-medium text-center ${isSelected ? "text-navy" : "text-ink/70"}`}>{program.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Type of Assistance Needed *</label>
                  <input type="text" value={formData.assistanceType} onChange={(e) => updateField("assistanceType", e.target.value)} placeholder="e.g., Medical treatment, School fees, Food packages" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Urgency Level *</label>
                  <select value={formData.urgency} onChange={(e) => updateField("urgency", e.target.value)} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white">
                    <option value="">Select urgency</option>
                    <option value="emergency">Emergency (within 24-48 hours)</option>
                    <option value="urgent">Urgent (within a week)</option>
                    <option value="soon">Soon (within a month)</option>
                    <option value="planning">Planning ahead (flexible)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Estimated Amount Needed (USD)</label>
                  <input type="number" value={formData.requestedAmount} onChange={(e) => updateField("requestedAmount", e.target.value)} placeholder="e.g., 500" className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Describe Your Situation *</label>
                  <textarea value={formData.situation} onChange={(e) => updateField("situation", e.target.value)} rows={5} placeholder="Please describe your situation and why you need assistance..." className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy resize-none" />
                </div>
              </div>
            )}

            {/* STEP 4: DOCUMENTS */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Required Documents</h2>
                  <p className="text-ink/70 mt-1">Upload the following documents to support your application.</p>
                </div>

                <div className="space-y-6">
                  {/* ID Document */}
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">ID Document (CNIC / Passport) *</label>
                    {formData.idDocument ? (
                      <div className="relative p-4 bg-success/5 border border-success/20 rounded-input flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-success shrink-0" />
                        <a href={formData.idDocument} target="_blank" rel="noopener noreferrer" className="text-sm text-navy truncate flex-1 hover:underline">View Uploaded File</a>
                        <button onClick={() => updateField("idDocument", "")} className="text-error text-xs font-semibold">Remove</button>
                      </div>
                    ) : (
                      <FileUploader endpoint="documentUploader" onUploadComplete={(urls) => updateField("idDocument", urls[0])} onUploadError={(err) => setError("Upload failed: " + err.message)} />
                    )}
                  </div>

                  {/* Proof of Income */}
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Proof of Income / Salary Slip *</label>
                    {formData.proofOfIncome ? (
                      <div className="relative p-4 bg-success/5 border border-success/20 rounded-input flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-success shrink-0" />
                        <a href={formData.proofOfIncome} target="_blank" rel="noopener noreferrer" className="text-sm text-navy truncate flex-1 hover:underline">View Uploaded File</a>
                        <button onClick={() => updateField("proofOfIncome", "")} className="text-error text-xs font-semibold">Remove</button>
                      </div>
                    ) : (
                      <FileUploader endpoint="documentUploader" onUploadComplete={(urls) => updateField("proofOfIncome", urls[0])} onUploadError={(err) => setError("Upload failed: " + err.message)} />
                    )}
                  </div>

                  {/* Medical Report */}
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Medical Report (if applicable)</label>
                    {formData.medicalReport ? (
                      <div className="relative p-4 bg-success/5 border border-success/20 rounded-input flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-success shrink-0" />
                        <a href={formData.medicalReport} target="_blank" rel="noopener noreferrer" className="text-sm text-navy truncate flex-1 hover:underline">View Uploaded File</a>
                        <button onClick={() => updateField("medicalReport", "")} className="text-error text-xs font-semibold">Remove</button>
                      </div>
                    ) : (
                      <FileUploader endpoint="documentUploader" onUploadComplete={(urls) => updateField("medicalReport", urls[0])} onUploadError={(err) => setError("Upload failed: " + err.message)} />
                    )}
                  </div>

                  {/* Additional Docs */}
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Additional Supporting Documents (Multiple)</label>
                    <FileUploader
                      endpoint="documentUploader"
                      multiple={true}
                      existingFiles={formData.additionalDocs}
                      onUploadComplete={(urls) => updateField("additionalDocs", [...formData.additionalDocs, ...urls])}
                      onRemove={(url) => updateField("additionalDocs", formData.additionalDocs.filter((u) => u !== url))}
                      onUploadError={(err) => setError("Upload failed: " + err.message)}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-info/5 border border-info/20 rounded-input">
                  <AlertCircle className="w-5 h-5 text-info mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-navy text-sm">Documents are secure</p>
                    <p className="text-ink/70 text-xs mt-1">Your documents are encrypted and only accessible to authorized DHK LIFT staff.</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: REVIEW */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Review & Submit</h2>
                  <p className="text-ink/70 mt-1">Please review your information before submitting.</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3"><User className="w-4 h-4 text-navy" /><h3 className="font-semibold text-navy text-sm">Personal Information</h3></div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-ink/60">Name:</span> <span className="font-medium text-navy">{formData.fullName || "—"}</span></div>
                      <div><span className="text-ink/60">Phone:</span> <span className="font-medium text-navy">{formData.phone || "—"}</span></div>
                      <div className="col-span-2"><span className="text-ink/60">Address:</span> <span className="font-medium text-navy">{formData.city || "—"}, {formData.country || "—"}</span></div>
                    </div>
                  </div>

                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3"><FileText className="w-4 h-4 text-navy" /><h3 className="font-semibold text-navy text-sm">Assistance Details</h3></div>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-ink/60">Program:</span> <span className="font-medium text-navy">{formData.program || "—"}</span></div>
                      <div><span className="text-ink/60">Amount Requested:</span> <span className="font-medium text-navy">${formData.requestedAmount || "—"}</span></div>
                    </div>
                  </div>

                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3"><Upload className="w-4 h-4 text-navy" /><h3 className="font-semibold text-navy text-sm">Documents</h3></div>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-ink/60">ID Document:</span> <span className="font-medium text-navy">{formData.idDocument ? "Uploaded" : "Not uploaded"}</span></div>
                      <div><span className="text-ink/60">Proof of Income:</span> <span className="font-medium text-navy">{formData.proofOfIncome ? "Uploaded" : "Not uploaded"}</span></div>
                      <div><span className="text-ink/60">Medical Report:</span> <span className="font-medium text-navy">{formData.medicalReport ? "Uploaded" : "Not uploaded"}</span></div>
                      <div><span className="text-ink/60">Additional:</span> <span className="font-medium text-navy">{formData.additionalDocs.length} file(s)</span></div>
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
                    <input type="checkbox" checked={formData.consentData} onChange={(e) => updateField("consentData", e.target.checked)} className="mt-1 w-4 h-4 accent-gold" />
                    <span className="text-sm text-ink/80">I consent to DHK LIFT collecting and processing my personal data. *</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={formData.consentPrivacy} onChange={(e) => updateField("consentPrivacy", e.target.checked)} className="mt-1 w-4 h-4 accent-gold" />
                    <span className="text-sm text-ink/80">I have read and agree to the Privacy Policy. *</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={formData.consentTruth} onChange={(e) => updateField("consentTruth", e.target.checked)} className="mt-1 w-4 h-4 accent-gold" />
                    <span className="text-sm text-ink/80">I confirm all information is true and accurate. *</span>
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
                <button type="button" onClick={handleSubmit} disabled={!formData.consentData || !formData.consentPrivacy || !formData.consentTruth || isSubmitting} className="btn-lift bg-gold text-ink font-semibold px-8 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <><div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin"></div> Submitting...</>
                  ) : (
                    <><CheckCircle className="w-5 h-5" /> Submit Application</>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 bg-info/5 border border-info/20 rounded-card p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-info mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-navy text-sm">Need Help?</p>
              <p className="text-ink/70 text-xs mt-1">Contact us at support@dhklift.org</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}