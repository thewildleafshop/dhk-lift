"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  Stethoscope,
  Upload,
  CheckCircle,
  Shield,
  Send,
  AlertCircle,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Award,
  Users,
  Lock,
  Briefcase,
} from "lucide-react";

// ============ TYPES ============
type FormData = {
  // Step 1: Organization Info
  orgName: string;
  orgType: string;
  licenseNumber: string;
  establishedYear: string;
  website: string;

  // Step 2: Location & Contact
  primaryContact: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  city: string;
  country: string;

  // Step 3: Services & Capacity
  specialties: string[];
  bedCapacity: string;
  monthlyPatients: string;
  servicesOffered: string;

  // Step 4: Documents
  licenseDoc: File | null;
  accreditationDoc: File | null;
  taxDoc: File | null;
  additionalDocs: File | null;

  // Step 5: Consent
  consentVerify: boolean;
  consentTruth: boolean;
  consentAgreement: boolean;
};

// ============ STEPS ============
const steps = [
  { id: 1, name: "Organization", icon: Building2 },
  { id: 2, name: "Location", icon: MapPin },
  { id: 3, name: "Services", icon: Stethoscope },
  { id: 4, name: "Documents", icon: Upload },
  { id: 5, name: "Review", icon: CheckCircle },
];

// ============ ORG TYPES ============
const orgTypes = [
  "Hospital",
  "Clinic",
  "Diagnostic Center",
  "Laboratory",
  "Nursing Home",
  "Rehabilitation Center",
];

// ============ SPECIALTIES ============
const specialtiesList = [
  "Oncology (Cancer)",
  "Cardiology (Heart)",
  "Nephrology (Kidney)",
  "Endocrinology (Diabetes)",
  "Pediatrics",
  "Orthopedics",
  "Neurology",
  "Psychiatry",
  "General Medicine",
  "Emergency Care",
];

// ============ MAIN COMPONENT ============
export default function ProviderRegistrationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    orgName: "",
    orgType: "",
    licenseNumber: "",
    establishedYear: "",
    website: "",
    primaryContact: "",
    contactRole: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    city: "",
    country: "",
    specialties: [],
    bedCapacity: "",
    monthlyPatients: "",
    servicesOffered: "",
    licenseDoc: null,
    accreditationDoc: null,
    taxDoc: null,
    additionalDocs: null,
    consentVerify: false,
    consentTruth: false,
    consentAgreement: false,
  });

  const updateField = (field: keyof FormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleSpecialty = (specialty: string) => {
    if (formData.specialties.includes(specialty)) {
      updateField("specialties", formData.specialties.filter((s) => s !== specialty));
    } else {
      updateField("specialties", [...formData.specialties, specialty]);
    }
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
      router.push("/healthcare/providers/register/success");
    }, 2000);
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <main className="min-h-screen bg-cloud">

      {/* ================= HERO ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-10 md:py-12 relative z-10">
          <Link
            href="/healthcare/funds"
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Healthcare
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-teal/20 rounded-full p-2.5">
              <Stethoscope className="w-6 h-6 text-teal" />
            </div>
            <span className="text-xs font-semibold text-teal bg-teal/10 px-3 py-1 rounded-full">
              Provider Registration
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Join Our Healthcare Network
          </h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            Register your hospital, clinic, or medical facility to receive patients 
            through DHK LIFT's disease fund programs.
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

            {/* ================= STEP 1: ORGANIZATION ================= */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Organization Information</h2>
                  <p className="text-ink/70 mt-1">Tell us about your healthcare facility.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Organization Name *</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="text"
                        value={formData.orgName}
                        onChange={(e) => updateField("orgName", e.target.value)}
                        placeholder="Hospital/Clinic name"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Organization Type *</label>
                    <select
                      value={formData.orgType}
                      onChange={(e) => updateField("orgType", e.target.value)}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                    >
                      <option value="">Select type</option>
                      {orgTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">License Number *</label>
                    <input
                      type="text"
                      value={formData.licenseNumber}
                      onChange={(e) => updateField("licenseNumber", e.target.value)}
                      placeholder="Medical license number"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Established Year *</label>
                    <input
                      type="number"
                      value={formData.establishedYear}
                      onChange={(e) => updateField("establishedYear", e.target.value)}
                      placeholder="e.g., 2005"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Website (Optional)</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => updateField("website", e.target.value)}
                      placeholder="https://hospital.org"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 2: LOCATION & CONTACT ================= */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Location & Contact</h2>
                  <p className="text-ink/70 mt-1">How can we reach your facility?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Primary Contact Person *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="text"
                        value={formData.primaryContact}
                        onChange={(e) => updateField("primaryContact", e.target.value)}
                        placeholder="Full name"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Role / Position *</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="text"
                        value={formData.contactRole}
                        onChange={(e) => updateField("contactRole", e.target.value)}
                        placeholder="e.g., Medical Director"
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
                        value={formData.contactEmail}
                        onChange={(e) => updateField("contactEmail", e.target.value)}
                        placeholder="admin@hospital.org"
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
                        value={formData.contactPhone}
                        onChange={(e) => updateField("contactPhone", e.target.value)}
                        placeholder="+92 21 1234567"
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
                        onChange={(e) => updateField("address", e.target.value)}
                        placeholder="Street address, area"
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

            {/* ================= STEP 3: SERVICES ================= */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Services & Capacity</h2>
                  <p className="text-ink/70 mt-1">Help us understand what services you offer.</p>
                </div>

                {/* Specialties */}
                <div>
                  <label className="block text-sm font-semibold text-ink mb-3">Medical Specialties *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {specialtiesList.map((specialty) => {
                      const isSelected = formData.specialties.includes(specialty);
                      return (
                        <button
                          key={specialty}
                          type="button"
                          onClick={() => toggleSpecialty(specialty)}
                          className={`flex items-center gap-2 p-3 rounded-input border-2 text-left transition-all text-xs ${
                            isSelected
                              ? "border-gold bg-gold/5 text-navy"
                              : "border-gray-200 text-ink/70 hover:border-gray-300"
                          }`}
                        >
                          {isSelected && <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />}
                          <span className="font-medium leading-tight">{specialty}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-ink/50 mt-2">
                    {formData.specialties.length} specialties selected
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Bed Capacity</label>
                    <input
                      type="number"
                      value={formData.bedCapacity}
                      onChange={(e) => updateField("bedCapacity", e.target.value)}
                      placeholder="e.g., 200"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Monthly Patients (approx.)</label>
                    <input
                      type="number"
                      value={formData.monthlyPatients}
                      onChange={(e) => updateField("monthlyPatients", e.target.value)}
                      placeholder="e.g., 5000"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Other Services Offered</label>
                    <textarea
                      value={formData.servicesOffered}
                      onChange={(e) => updateField("servicesOffered", e.target.value)}
                      rows={4}
                      placeholder="Describe any additional services (e.g., emergency care, ICU, dialysis, chemotherapy, etc.)"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none"
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
                  <p className="text-ink/70 mt-1">Upload your facility's official documents for verification.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { key: "licenseDoc", label: "Medical License / Registration Certificate *", required: true },
                    { key: "accreditationDoc", label: "Accreditation Certificate *", required: true },
                    { key: "taxDoc", label: "Tax Registration Certificate *", required: true },
                    { key: "additionalDocs", label: "Additional Documents (Optional)", required: false },
                  ].map((doc) => (
                    <div key={doc.key} className="border-2 border-dashed border-gray-200 rounded-input p-6 hover:border-gold transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="bg-teal/10 rounded-full p-3 shrink-0">
                          <Upload className="w-6 h-6 text-teal" />
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
                      Your documents are encrypted and only accessible to our verification team.
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
                  <p className="text-ink/70 mt-1">Please review your information before submitting.</p>
                </div>

                <div className="space-y-4">
                  {/* Org Info */}
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-4 h-4 text-navy" />
                      <h3 className="font-semibold text-navy text-sm">Organization</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-ink/60">Name:</span> <span className="font-medium text-navy">{formData.orgName || "—"}</span></div>
                      <div><span className="text-ink/60">Type:</span> <span className="font-medium text-navy">{formData.orgType || "—"}</span></div>
                      <div><span className="text-ink/60">License:</span> <span className="font-medium text-navy">{formData.licenseNumber || "—"}</span></div>
                      <div><span className="text-ink/60">Location:</span> <span className="font-medium text-navy">{formData.city || "—"}, {formData.country || "—"}</span></div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4 text-navy" />
                      <h3 className="font-semibold text-navy text-sm">Contact Person</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-ink/60">Name:</span> <span className="font-medium text-navy">{formData.primaryContact || "—"}</span></div>
                      <div><span className="text-ink/60">Role:</span> <span className="font-medium text-navy">{formData.contactRole || "—"}</span></div>
                      <div><span className="text-ink/60">Email:</span> <span className="font-medium text-navy">{formData.contactEmail || "—"}</span></div>
                      <div><span className="text-ink/60">Phone:</span> <span className="font-medium text-navy">{formData.contactPhone || "—"}</span></div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Stethoscope className="w-4 h-4 text-navy" />
                      <h3 className="font-semibold text-navy text-sm">Services</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.specialties.length > 0 ? (
                        formData.specialties.map((s, i) => (
                          <span key={i} className="text-xs font-semibold text-teal bg-teal/10 px-2.5 py-1 rounded-full">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-ink/60">No specialties selected</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Consent */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consentVerify}
                      onChange={(e) => updateField("consentVerify", e.target.checked)}
                      className="mt-1 w-4 h-4 accent-gold"
                    />
                    <span className="text-sm text-ink/80">
                      I consent to DHK LIFT verifying my organization's credentials and licenses. *
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

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consentAgreement}
                      onChange={(e) => updateField("consentAgreement", e.target.checked)}
                      className="mt-1 w-4 h-4 accent-gold"
                    />
                    <span className="text-sm text-ink/80">
                      I agree to the Provider Agreement and Terms of Service. *
                    </span>
                  </label>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gold/5 border border-gold/20 rounded-input">
                  <Shield className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-navy text-sm">Verification Process</p>
                    <p className="text-ink/70 text-xs mt-1">
                      Applications are reviewed within 7-10 business days. Our team will 
                      contact you for additional information if needed.
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
                  disabled={!formData.consentVerify || !formData.consentTruth || !formData.consentAgreement || isSubmitting}
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
                      Submit Registration
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-teal/5 border border-teal/20 rounded-card p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-navy text-sm">Why Register?</p>
              <p className="text-ink/70 text-xs mt-1">
                Registered providers receive patients through DHK LIFT's disease fund programs 
                and get direct payments from the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}