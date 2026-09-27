"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  Utensils,
  BookOpen,
  Stethoscope,
  Home,
  HeartHandshake,
  Accessibility,
  Users,
  CheckCircle,
  FileText,
  ArrowRight,
} from "lucide-react";

// ============ TYPE DEFINITIONS ============
type QuestionOption = {
  id: string;
  label: string;
  value: string;
  icon?: any;
};

type Question = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  options: QuestionOption[];
};

// ============ QUESTIONS DATA ============
const questions: Question[] = [
  {
    id: "need",
    title: "What type of assistance do you need?",
    subtitle: "Select the option that best describes your situation.",
    type: "single",
    options: [
      { id: "health", label: "Medical / Healthcare", icon: Stethoscope, value: "lift-health" },
      { id: "food", label: "Food / Nutrition", icon: Utensils, value: "food-security" },
      { id: "education", label: "Education / School", icon: BookOpen, value: "education-support" },
      { id: "disability", label: "Disability / Equipment", icon: Accessibility, value: "lift-ability" },
      { id: "protection", label: "Safety / Protection", icon: HeartHandshake, value: "lift-protect" },
      { id: "family", label: "Family / Children", icon: Home, value: "children-families" },
      { id: "community", label: "Community / Other", icon: Users, value: "lift-community" },
    ],
  },
  {
    id: "urgency",
    title: "How urgent is your need?",
    subtitle: "This helps us prioritize your application.",
    type: "single",
    options: [
      { id: "emergency", label: "Emergency (within 24-48 hours)", value: "emergency" },
      { id: "urgent", label: "Urgent (within a week)", value: "urgent" },
      { id: "soon", label: "Soon (within a month)", value: "soon" },
      { id: "planning", label: "Planning ahead (flexible)", value: "planning" },
    ],
  },
  {
    id: "location",
    title: "Where are you located?",
    subtitle: "We'll match you with programs available in your region.",
    type: "single",
    options: [
      { id: "pakistan", label: "Pakistan", value: "pakistan" },
      { id: "middle-east", label: "Middle East", value: "middle-east" },
      { id: "africa", label: "Africa", value: "africa" },
      { id: "asia", label: "South / Southeast Asia", value: "asia" },
      { id: "other", label: "Other / Global", value: "other" },
    ],
  },
];

// ============ PROGRAM RECOMMENDATIONS ============
const programRecommendations: Record<string, {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  programHref: string;
  applyHref: string;
  why: string;
}> = {
  "lift-health": {
    id: "lift-health",
    name: "LIFT Health",
    description: "Medical care, disease funds, and healthcare access.",
    icon: Stethoscope,
    color: "text-teal",
    bgColor: "bg-teal/10",
    programHref: "/programs/lift-health",
    applyHref: "/assistance/apply?program=lift-health",
    why: "Matches your need for medical or healthcare support.",
  },
  "food-security": {
    id: "food-security",
    name: "Food Security",
    description: "Nutritious meals and food packages for families.",
    icon: Utensils,
    color: "text-gold",
    bgColor: "bg-gold/10",
    programHref: "/programs/food-security",
    applyHref: "/assistance/apply?program=food-security",
    why: "Matches your need for food and nutrition support.",
  },
  "education-support": {
    id: "education-support",
    name: "Education Support",
    description: "School fees, supplies, and educational resources.",
    icon: BookOpen,
    color: "text-teal",
    bgColor: "bg-teal/10",
    programHref: "/programs/education-support",
    applyHref: "/assistance/apply?program=education-support",
    why: "Matches your need for education support.",
  },
  "lift-ability": {
    id: "lift-ability",
    name: "LIFT Ability",
    description: "Mobility aids, prosthetics, and medical equipment.",
    icon: Accessibility,
    color: "text-navy",
    bgColor: "bg-navy/10",
    programHref: "/programs/lift-ability",
    applyHref: "/equipment/request",
    why: "Matches your need for disability or medical equipment support.",
  },
  "lift-protect": {
    id: "lift-protect",
    name: "LIFT Protect",
    description: "Confidential support for women and children.",
    icon: HeartHandshake,
    color: "text-purple",
    bgColor: "bg-purple/10",
    programHref: "/programs/lift-protect",
    applyHref: "/assistance/apply?program=lift-protect",
    why: "Matches your need for safety and protection support.",
  },
  "children-families": {
    id: "children-families",
    name: "Children & Families",
    description: "Support for vulnerable children and families.",
    icon: Home,
    color: "text-purple",
    bgColor: "bg-purple/10",
    programHref: "/programs/children-families",
    applyHref: "/assistance/apply?program=children-families",
    why: "Matches your need for family and children support.",
  },
  "lift-community": {
    id: "lift-community",
    name: "LIFT Community",
    description: "Community development and local partnership support.",
    icon: Users,
    color: "text-gold",
    bgColor: "bg-gold/10",
    programHref: "/programs/lift-community",
    applyHref: "/assistance/apply?program=lift-community",
    why: "Matches your need for community-level support.",
  },
};

// ============ FINDER CONTENT COMPONENT ============
function FinderContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  // Auto-detect search query and pre-fill the first answer
  useEffect(() => {
    if (initialQuery) {
      const lower = initialQuery.toLowerCase();
      let matchedValue = "";

      if (lower.includes("medical") || lower.includes("health") || lower.includes("doctor") || lower.includes("hospital")) {
        matchedValue = "lift-health";
      } else if (lower.includes("food") || lower.includes("meal") || lower.includes("nutrition") || lower.includes("hunger")) {
        matchedValue = "food-security";
      } else if (lower.includes("education") || lower.includes("school") || lower.includes("student")) {
        matchedValue = "education-support";
      } else if (lower.includes("disability") || lower.includes("wheelchair") || lower.includes("equipment")) {
        matchedValue = "lift-ability";
      } else if (lower.includes("protect") || lower.includes("safety") || lower.includes("women") || lower.includes("children")) {
        matchedValue = "lift-protect";
      } else if (lower.includes("family") || lower.includes("families")) {
        matchedValue = "children-families";
      } else if (lower.includes("community")) {
        matchedValue = "lift-community";
      }

      if (matchedValue) {
        setAnswers({ need: matchedValue });
      }
    }
  }, [initialQuery]);

  const handleSelect = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const currentQuestion = questions[currentStep];
  const selectedValue = answers[currentQuestion?.id || ""];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const recommendedProgram = programRecommendations[answers["need"]];

  return (
    <main className="min-h-screen bg-cloud">

      {/* ================= HERO ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-12 md:py-16 relative z-10">
          
          <Link
            href="/assistance"
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Assistance
          </Link>

          <div className="text-center max-w-3xl mx-auto">
            <div className="bg-gold/20 rounded-full p-4 w-fit mx-auto mb-6">
              <Search className="w-10 h-10 text-gold" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Assistance Finder
            </h1>
            <p className="text-white/80 mt-4 leading-relaxed">
              {initialQuery
                ? `Showing results for "${initialQuery}"`
                : "Answer 3 simple questions and we'll match you with the right program."}
            </p>
          </div>
        </div>
      </section>

      {/* ================= FINDER FORM ================= */}
      <section className="max-w-container mx-auto px-6 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">

          {!showResults ? (
            <>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-ink/70 mb-2">
                  <span className="font-semibold">Question {currentStep + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-gold to-gold/70 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-card p-6 md:p-10 shadow-sm border border-gray-100">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-navy">
                  {currentQuestion.title}
                </h2>
                <p className="text-ink/70 mt-2">{currentQuestion.subtitle}</p>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                  {currentQuestion.options.map((option) => {
                    const OptionIcon = option.icon;
                    const isSelected = selectedValue === option.value;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleSelect(currentQuestion.id, option.value)}
                        className={`flex items-center gap-3 p-4 rounded-input border-2 text-left transition-all ${
                          isSelected
                            ? "border-gold bg-gold/5 text-navy"
                            : "border-gray-200 text-ink/80 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {OptionIcon && (
                          <div className={`${isSelected ? "bg-gold/20" : "bg-gray-100"} rounded-full p-2 shrink-0`}>
                            <OptionIcon className={`w-5 h-5 ${isSelected ? "text-gold" : "text-ink/60"}`} />
                          </div>
                        )}
                        <span className="font-medium text-sm">{option.label}</span>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-gold ml-auto shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 text-ink/60 hover:text-navy font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!selectedValue}
                    className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentStep === questions.length - 1 ? "See Results" : "Next"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* ================= RESULTS ================= */
            <div className="animate-fade-in">
              {/* Success Header */}
              <div className="text-center mb-8">
                <div className="bg-success/10 rounded-full p-6 w-fit mx-auto mb-4">
                  <CheckCircle className="w-12 h-12 text-success" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
                  We Found a Match!
                </h2>
                <p className="text-ink/70 mt-3 max-w-xl mx-auto">
                  Based on your answers, here's the program that best fits your needs.
                </p>
              </div>

              {/* Recommended Program */}
              {recommendedProgram && (
                <div className="bg-white rounded-card p-6 md:p-8 shadow-lg border-2 border-gold mb-6">
                  <div className="flex items-start gap-4">
                    <div className={`${recommendedProgram.bgColor} rounded-full p-4 shrink-0`}>
                      <recommendedProgram.icon className={`w-8 h-8 ${recommendedProgram.color}`} />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
                        Recommended
                      </span>
                      <h3 className="font-display text-2xl font-bold text-navy mt-3">
                        {recommendedProgram.name}
                      </h3>
                      <p className="text-ink/70 mt-2">
                        {recommendedProgram.description}
                      </p>
                      <div className="flex items-start gap-2 mt-3 p-3 bg-cloud rounded-input">
                        <CheckCircle className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                        <p className="text-ink/70 text-sm">{recommendedProgram.why}</p>
                      </div>

                      {/* Two buttons: Learn More + Apply */}
                      <div className="flex flex-wrap gap-3 mt-5">
                        <Link
                          href={recommendedProgram.applyHref}
                          className="btn-lift inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg"
                        >
                          <FileText className="w-5 h-5" />
                          Start Application
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                          href={recommendedProgram.programHref}
                          className="btn-lift inline-flex items-center gap-2 border-2 border-navy/20 text-navy font-semibold px-6 py-3.5 rounded-input hover:bg-navy/5 transition-colors"
                        >
                          Learn More
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Your Answers Summary */}
              <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100 mb-6">
                <h3 className="font-display font-bold text-navy text-lg mb-4">
                  Your Answers
                </h3>
                <div className="space-y-3">
                  {questions.map((q) => (
                    <div key={q.id} className="flex justify-between text-sm py-2 border-b border-gray-100 last:border-0">
                      <span className="text-ink/60">{q.title}</span>
                      <span className="font-semibold text-navy">
                        {q.options.find(o => o.value === answers[q.id])?.label || "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="btn-lift border-2 border-navy/20 text-navy font-semibold px-6 py-3.5 rounded-input hover:bg-navy/5 transition-colors flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Start Over
                </button>
                <Link
                  href="/assistance"
                  className="btn-lift border-2 border-navy/20 text-navy font-semibold px-6 py-3.5 rounded-input hover:bg-navy/5 transition-colors flex items-center gap-2"
                >
                  Browse All Programs
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}

// ============ MAIN WRAPPER (with Suspense) ============
export default function AssistanceFinderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cloud flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-navy/20 border-t-navy rounded-full animate-spin"></div>
        </div>
      }
    >
      <FinderContent />
    </Suspense>
  );
}