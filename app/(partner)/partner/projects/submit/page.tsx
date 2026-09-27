"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Target,
  DollarSign,
  Users,
  Calendar,
  Upload,
  CheckCircle,
  MapPin,
  Image as ImageIcon,
  AlertCircle,
  Shield,
  Building2,
} from "lucide-react";

// ============ TYPES ============
type FormData = {
  // Step 1: Basic Info
  title: string;
  category: string;
  location: string;
  beneficiaries: string;

  // Step 2: Problem & Solution
  problem: string;
  solution: string;
  description: string;

  // Step 3: Budget & Timeline
  goal: string;
  timeline: string;
  startDate: string;
  endDate: string;

  // Step 4: Milestones
  milestones: { title: string; amount: string; description: string }[];

  // Step 5: Media & Documents
  coverImage: File | null;
  supportingDocs: File | null;

  // Step 6: Consent
  consent: boolean;
};

// ============ STEPS ============
const steps = [
  { id: 1, name: "Basic Info", icon: FileText },
  { id: 2, name: "Problem & Solution", icon: Target },
  { id: 3, name: "Budget & Timeline", icon: DollarSign },
  { id: 4, name: "Milestones", icon: CheckCircle },
  { id: 5, name: "Media", icon: ImageIcon },
  { id: 6, name: "Review", icon: Shield },
];

// ============ CATEGORIES ============
const categories = [
  "Healthcare",
  "Education",
  "Food Security",
  "Water & Sanitation",
  "Disability Support",
  "Children & Families",
  "Community Development",
  "Disaster Relief",
];

// ============ MAIN COMPONENT ============
export default function SubmitProjectPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    location: "",
    beneficiaries: "",
    problem: "",
    solution: "",
    description: "",
    goal: "",
    timeline: "",
    startDate: "",
    endDate: "",
    milestones: [
      { title: "", amount: "", description: "" },
    ],
    coverImage: null,
    supportingDocs: null,
    consent: false,
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

  const handleAddMilestone = () => {
    setFormData({
      ...formData,
      milestones: [...formData.milestones, { title: "", amount: "", description: "" }],
    });
  };

  const handleRemoveMilestone = (index: number) => {
    if (formData.milestones.length > 1) {
      setFormData({
        ...formData,
        milestones: formData.milestones.filter((_, i) => i !== index),
      });
    }
  };

  const handleMilestoneChange = (index: number, field: string, value: string) => {
    const updated = [...formData.milestones];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, milestones: updated });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/partner/projects/submit/success");
    }, 2000);
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <main className="space-y-6">
      
      {/* ================= BACK BUTTON ================= */}
      <Link
        href="/partner/projects"
        className="inline-flex items-center gap-2 text-ink/60 hover:text-navy font-medium transition-colors text-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to My Projects
      </Link>

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
          Submit New Project
        </h1>
        <p className="text-ink/70 mt-1">
          Submit a new project for review. Our team will verify and approve it within 5-7 business days.
        </p>
      </div>

      {/* ================= STEPPER ================= */}
      <div className="bg-white rounded-card p-4 shadow-sm border border-gray-100">
        {/* Desktop */}
        <div className="hidden lg:flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isComplete = currentStep > step.id;
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center gap-2">
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

      {/* ================= FORM CONTENT ================= */}
      <div className="bg-white rounded-card p-6 md:p-10 shadow-sm border border-gray-100">

        {/* ================= STEP 1: BASIC INFO ================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Basic Information</h2>
              <p className="text-ink/70 mt-1">Tell us about your project.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Project Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="e.g., Clean Water for Rural Sindh"
                  className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      placeholder="e.g., Sindh, Pakistan"
                      className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Number of Beneficiaries *</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                  <input
                    type="number"
                    value={formData.beneficiaries}
                    onChange={(e) => updateField("beneficiaries", e.target.value)}
                    placeholder="e.g., 2500"
                    className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: PROBLEM & SOLUTION ================= */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Problem & Solution</h2>
              <p className="text-ink/70 mt-1">Describe the problem your project addresses and your solution.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">The Problem *</label>
                <textarea
                  value={formData.problem}
                  onChange={(e) => updateField("problem", e.target.value)}
                  rows={4}
                  placeholder="What problem are you trying to solve? Describe the situation."
                  className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Your Solution *</label>
                <textarea
                  value={formData.solution}
                  onChange={(e) => updateField("solution", e.target.value)}
                  rows={4}
                  placeholder="How will your project solve this problem? What's your approach?"
                  className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Detailed Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={5}
                  placeholder="Provide more details about your project, its scope, and expected impact."
                  className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: BUDGET & TIMELINE ================= */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Budget & Timeline</h2>
              <p className="text-ink/70 mt-1">How much funding do you need and when will the project run?</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Funding Goal (USD) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                  <input
                    type="number"
                    value={formData.goal}
                    onChange={(e) => updateField("goal", e.target.value)}
                    placeholder="e.g., 60000"
                    className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Project Timeline *</label>
                <input
                  type="text"
                  value={formData.timeline}
                  onChange={(e) => updateField("timeline", e.target.value)}
                  placeholder="e.g., 6 months"
                  className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Start Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => updateField("startDate", e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">End Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => updateField("endDate", e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4: MILESTONES ================= */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Project Milestones</h2>
              <p className="text-ink/70 mt-1">
                Break your project into milestones. Each milestone will be verified separately.
              </p>
            </div>

            <div className="space-y-4">
              {formData.milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="p-5 bg-cloud rounded-card border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-navy text-white font-display font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                      <h3 className="font-display font-bold text-navy text-base">
                        Milestone {index + 1}
                      </h3>
                    </div>
                    {formData.milestones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMilestone(index)}
                        className="text-xs font-semibold text-error hover:text-error/80 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1.5">Title</label>
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) => handleMilestoneChange(index, "title", e.target.value)}
                        placeholder="e.g., Site Survey & Planning"
                        className="w-full px-4 py-2.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1.5">Amount (USD)</label>
                      <input
                        type="number"
                        value={milestone.amount}
                        onChange={(e) => handleMilestoneChange(index, "amount", e.target.value)}
                        placeholder="e.g., 5000"
                        className="w-full px-4 py-2.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1.5">Description</label>
                      <textarea
                        value={milestone.description}
                        onChange={(e) => handleMilestoneChange(index, "description", e.target.value)}
                        rows={2}
                        placeholder="What will be done in this milestone?"
                        className="w-full px-4 py-2.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm bg-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddMilestone}
                className="btn-lift w-full border-2 border-dashed border-gray-200 text-ink/60 hover:border-gold hover:text-gold font-medium px-4 py-4 rounded-input transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <CheckCircle className="w-4 h-4" />
                Add Another Milestone
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 5: MEDIA ================= */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Media & Documents</h2>
              <p className="text-ink/70 mt-1">
                Upload a cover image for your project and any supporting documents.
              </p>
            </div>

            <div className="space-y-4">
              {/* Cover Image */}
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Cover Image *</label>
                <div className="border-2 border-dashed border-gray-200 rounded-input p-6 hover:border-gold transition-colors">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-navy/5 rounded-full p-4 mb-3">
                      <ImageIcon className="w-8 h-8 text-navy" />
                    </div>
                    <p className="font-semibold text-navy text-sm">
                      Upload a cover image
                    </p>
                    <p className="text-ink/60 text-xs mt-1">JPG, PNG • Max 5MB • 1200x600 recommended</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => updateField("coverImage", e.target.files?.[0] || null)}
                      className="hidden"
                      id="cover-image"
                    />
                    <label
                      htmlFor="cover-image"
                      className="btn-lift bg-navy text-white font-semibold px-6 py-2.5 rounded-input hover:bg-navy/90 transition-colors cursor-pointer text-sm mt-4"
                    >
                      Choose File
                    </label>
                  </div>
                  {formData.coverImage && (
                    <div className="flex items-center gap-2 mt-3 p-2 bg-success/5 rounded-input justify-center">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-xs text-success font-medium">{formData.coverImage.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Supporting Documents */}
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Supporting Documents (Optional)</label>
                <div className="border-2 border-dashed border-gray-200 rounded-input p-6 hover:border-gold transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-navy/5 rounded-full p-3 shrink-0">
                      <Upload className="w-6 h-6 text-navy" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy text-sm">
                        Upload supporting documents
                      </p>
                      <p className="text-ink/60 text-xs mt-1">PDF, DOCX • Max 10MB</p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => updateField("supportingDocs", e.target.files?.[0] || null)}
                      className="hidden"
                      id="supporting-docs"
                    />
                    <label
                      htmlFor="supporting-docs"
                      className="btn-lift bg-navy text-white font-semibold px-4 py-2 rounded-input hover:bg-navy/90 transition-colors cursor-pointer text-sm"
                    >
                      Upload
                    </label>
                  </div>
                  {formData.supportingDocs && (
                    <div className="flex items-center gap-2 mt-3 p-2 bg-success/5 rounded-input">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-xs text-success font-medium">{formData.supportingDocs.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 6: REVIEW ================= */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Review & Submit</h2>
              <p className="text-ink/70 mt-1">Please review your project details before submitting.</p>
            </div>

            <div className="space-y-4">
              {/* Basic Info Summary */}
              <div className="bg-cloud rounded-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-navy" />
                  <h3 className="font-semibold text-navy text-sm">Basic Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-ink/60">Title:</span> <span className="font-medium text-navy">{formData.title || "—"}</span></div>
                  <div><span className="text-ink/60">Category:</span> <span className="font-medium text-navy">{formData.category || "—"}</span></div>
                  <div><span className="text-ink/60">Location:</span> <span className="font-medium text-navy">{formData.location || "—"}</span></div>
                  <div><span className="text-ink/60">Beneficiaries:</span> <span className="font-medium text-navy">{formData.beneficiaries || "—"}</span></div>
                </div>
              </div>

              {/* Budget Summary */}
              <div className="bg-cloud rounded-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-4 h-4 text-navy" />
                  <h3 className="font-semibold text-navy text-sm">Budget & Timeline</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-ink/60">Goal:</span> <span className="font-medium text-gold">${formData.goal || "—"}</span></div>
                  <div><span className="text-ink/60">Timeline:</span> <span className="font-medium text-navy">{formData.timeline || "—"}</span></div>
                  <div><span className="text-ink/60">Start:</span> <span className="font-medium text-navy">{formData.startDate || "—"}</span></div>
                  <div><span className="text-ink/60">End:</span> <span className="font-medium text-navy">{formData.endDate || "—"}</span></div>
                </div>
              </div>

              {/* Milestones Summary */}
              <div className="bg-cloud rounded-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-navy" />
                  <h3 className="font-semibold text-navy text-sm">Milestones ({formData.milestones.length})</h3>
                </div>
                <div className="space-y-2">
                  {formData.milestones.map((m, i) => (
                    <div key={i} className="flex items-center justify-between text-sm p-2 bg-white rounded-input">
                      <span className="font-medium text-navy">{i + 1}. {m.title || "Untitled"}</span>
                      <span className="font-semibold text-gold">${m.amount || "0"}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consent */}
              <div className="pt-4 border-t border-gray-100">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => updateField("consent", e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-gold"
                  />
                  <span className="text-sm text-ink/80">
                    I confirm that all information provided is accurate and truthful. I understand 
                    that DHK LIFT will verify all project details and milestone evidence before 
                    releasing funds. *
                  </span>
                </label>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gold/5 border border-gold/20 rounded-input">
                <AlertCircle className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-navy text-sm">Review Process</p>
                  <p className="text-ink/70 text-xs mt-1">
                    Your project will be reviewed within 5-7 business days. Our team will 
                    contact you if any additional information is needed.
                  </p>
                </div>
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
              disabled={!formData.consent || isSubmitting}
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
                  Submit Project
                </>
              )}
            </button>
          )}
        </div>
      </div>

    </main>
  );
}