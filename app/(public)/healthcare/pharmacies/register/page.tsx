"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Pill,
  Upload,
  CheckCircle,
  Shield,
  Send,
  AlertCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  FileText,
  Briefcase,
  Lock,
  Clock,
} from "lucide-react";

// ============ TYPES ============
type FormData = {
  // Step 1: Pharmacy Info
  pharmacyName: string;
  licenseNumber: string;
  establishedYear: string;
  pharmacyType: string;

  // Step 2: Contact & Location
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  address: string;
  city: string;
  country: string;

  // Step 3: Services
  servicesOffered: string[];
  operatingHours: string;
  deliveryAvailable: boolean;

  // Step 4: Documents
  licenseDoc: File | null;
  pharmacistLicense: File | null;
  taxDoc: File | null;
  additionalDocs: File | null;

  // Step 5: Consent
  consentVerify: boolean;
  consentTruth: boolean;
  consentAgreement: boolean;
};

// ============ STEPS ============
const steps = [
  { id: 1, name: "Pharmacy Info", icon: Pill },
  { id: 2, name: "Contact & Location", icon: MapPin },
  { id: 3, name: "Services", icon: Building2 },
  { id: 4, name: "Documents", icon: Upload },
  { id: 5, name: "Review", icon: CheckCircle },
];

// ============ PHARMACY TYPES ============
const pharmacyTypes = [
  "Retail Pharmacy",
  "Hospital Pharmacy",
  "Chain Pharmacy",
  "Online Pharmacy",
  "Specialty Pharmacy",
];

// ============ SERVICES ============
const servicesList = [
  "Prescription Medications",
  "Over-the-Counter (OTC) Drugs",
  "Home Delivery",
  "Chronic Disease Medications",
  "Cancer Medications",
  "Insulin & Diabetes Supplies",
  "Medical Equipment",
  "Vaccinations",
];

// ============ MAIN COMPONENT ============
export default function PharmacyRegistrationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    pharmacyName: "",
    licenseNumber: "",
    establishedYear: "",
    pharmacyType: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    address: "",
    city: "",
    country: "",
    servicesOffered: [],
    operatingHours: "",
    deliveryAvailable: false,
    licenseDoc: null,
    pharmacistLicense: null,
    taxDoc: null,
    additionalDocs: null,
    consentVerify: false,
    consentTruth: false,
    consentAgreement: false,
  });

  const updateField = (field: keyof FormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleService = (service: string) => {
    if (formData.servicesOffered.includes(service)) {
      updateField("servicesOffered", formData.servicesOffered.filter((s) => s !== service));
    } else {
      updateField("servicesOffered", [...formData.servicesOffered, service]);
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
      router.push("/healthcare/pharmacies/register/success");
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
              <Pill className="w-6 h-6 text-gold" />
            </div>
            <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
              Pharmacy Registration
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Join Our Pharmacy Network
          </h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            Register your pharmacy to provide medications to DHK LIFT patients and 
            receive direct payments from disease funds.
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

            {/* ================= STEP 1: PHARMACY INFO ================= */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Pharmacy Information</h2>
                  <p className="text-ink/70 mt-1">Tell us about your pharmacy.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Pharmacy Name *</label>
                    <div className="relative">
                      <Pill className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="text"
                        value={formData.pharmacyName}
                        onChange={(e) => updateField("pharmacyName", e.target.value)}
                        placeholder="e.g., MedPlus Pharmacy"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Pharmacy Type *</label>
                    <select
                      value={formData.pharmacyType}
                      onChange={(e) => updateField("pharmacyType", e.target.value)}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                    >
                      <option value="">Select type</option>
                      {pharmacyTypes.map((type) => (
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
                      placeholder="Pharmacy license number"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Established Year *</label>
                    <input
                      type="number"
                      value={formData.establishedYear}
                      onChange={(e) => updateField("establishedYear", e.target.value)}
                      placeholder="e.g., 2015"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 2: CONTACT & LOCATION ================= */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Contact & Location</h2>
                  <p className="text-ink/70 mt-1">How can we reach you?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Owner / Manager Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="text"
                        value={formData.ownerName}
                        onChange={(e) => updateField("ownerName", e.target.value)}
                        placeholder="Full name"
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
                        value={formData.ownerEmail}
                        onChange={(e) => updateField("ownerEmail", e.target.value)}
                        placeholder="owner@pharmacy.pk"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="tel"
                        value={formData.ownerPhone}
                        onChange={(e) => updateField("ownerPhone", e.target.value)}
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
                  <h2 className="font-display text-2xl font-bold text-navy">Services & Operations</h2>
                  <p className="text-ink/70 mt-1">What services does your pharmacy offer?</p>
                </div>

                {/* Services */}
                <div>
                  <label className="block text-sm font-semibold text-ink mb-3">Services Offered *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {servicesList.map((service) => {
                      const isSelected = formData.servicesOffered.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`flex items-center gap-2 p-3 rounded-input border-2 text-left transition-all text-xs ${
                            isSelected
                              ? "border-gold bg-gold/5 text-navy"
                              : "border-gray-200 text-ink/70 hover:border-gray-300"
                          }`}
                        >
                          {isSelected && <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />}
                          <span className="font-medium">{service}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-ink/50 mt-2">
                    {formData.servicesOffered.length} services selected
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Operating Hours *</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="text"
                        value={formData.operatingHours}
                        onChange={(e) => updateField("operatingHours", e.target.value)}
                        placeholder="e.g., 9 AM - 11 PM"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Home Delivery Available?</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => updateField("deliveryAvailable", true)}
                        className={`p-3 rounded-input border-2 font-semibold transition-all text-sm ${
                          formData.deliveryAvailable === true
                            ? "border-gold bg-gold/5 text-navy"
                            : "border-gray-200 text-ink/70 hover:border-gray-300"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => updateField("deliveryAvailable", false)}
                        className={`p-3 rounded-input border-2 font-semibold transition-all text-sm ${
                          formData.deliveryAvailable === false
                            ? "border-gold bg-gold/5 text-navy"
                            : "border-gray-200 text-ink/70 hover:border-gray-300"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 4: DOCUMENTS ================= */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-navy">Required Documents</h2>
                  <p className="text-ink/70 mt-1">Upload your pharmacy's official documents.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { key: "licenseDoc", label: "Pharmacy License *", required: true },
                    { key: "pharmacistLicense", label: "Pharmacist License *", required: true },
                    { key: "taxDoc", label: "Tax Registration Certificate *", required: true },
                    { key: "additionalDocs", label: "Additional Documents (Optional)", required: false },
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
                  {/* Pharmacy Info */}
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Pill className="w-4 h-4 text-navy" />
                      <h3 className="font-semibold text-navy text-sm">Pharmacy Information</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-ink/60">Name:</span> <span className="font-medium text-navy">{formData.pharmacyName || "—"}</span></div>
                      <div><span className="text-ink/60">Type:</span> <span className="font-medium text-navy">{formData.pharmacyType || "—"}</span></div>
                      <div><span className="text-ink/60">License:</span> <span className="font-medium text-navy">{formData.licenseNumber || "—"}</span></div>
                      <div><span className="text-ink/60">Established:</span> <span className="font-medium text-navy">{formData.establishedYear || "—"}</span></div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4 text-navy" />
                      <h3 className="font-semibold text-navy text-sm">Contact & Location</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-ink/60">Owner:</span> <span className="font-medium text-navy">{formData.ownerName || "—"}</span></div>
                      <div><span className="text-ink/60">Email:</span> <span className="font-medium text-navy">{formData.ownerEmail || "—"}</span></div>
                      <div><span className="text-ink/60">Phone:</span> <span className="font-medium text-navy">{formData.ownerPhone || "—"}</span></div>
                      <div><span className="text-ink/60">Location:</span> <span className="font-medium text-navy">{formData.city || "—"}, {formData.country || "—"}</span></div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="bg-cloud rounded-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-4 h-4 text-navy" />
                      <h3 className="font-semibold text-navy text-sm">Services</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.servicesOffered.length > 0 ? (
                        formData.servicesOffered.map((s, i) => (
                          <span key={i} className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-ink/60">No services selected</span>
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
                      I consent to DHK LIFT verifying my pharmacy's license and credentials. *
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
                      I agree to the Pharmacy Agreement and Terms of Service. *
                    </span>
                  </label>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gold/5 border border-gold/20 rounded-input">
                  <Shield className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-navy text-sm">Verification Process</p>
                    <p className="text-ink/70 text-xs mt-1">
                      Applications are reviewed within 5-7 business days. Our team may 
                      contact you for additional information.
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
          <div className="mt-6 bg-gold/5 border border-gold/20 rounded-card p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-gold mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-navy text-sm">Why Register?</p>
              <p className="text-ink/70 text-xs mt-1">
                Registered pharmacies receive prescriptions from DHK LIFT patients and get 
                direct payment from disease funds.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}