"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  HeartPulse,
  Droplet,
  Activity,
  Shield,
  Baby,
  Brain,
  Accessibility,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Stethoscope,
  Building2,
  MapPin,
  TrendingUp,
  Lock,
  Loader2,
} from "lucide-react";

// ============ FUND DETAILS DATA (Hardcoded - Specific Content) ============
const fundDetailsData: Record<string, {
  disease: string;
  icon: any;
  color: string;
  bgColor: string;
  longDescription: string;
  eligibility: string[];
  coveredExpenses: string[];
  requiredDocs: string[];
  processingTime: string;
  availableRegions: string[];
  balance: number;
  totalRaised: number;
  applications: number;
  funded: number;
  maxAssistance: number;
  status: "Active" | "Paused";
}> = {
  "cancer-care-fund": {
    disease: "Cancer",
    icon: HeartPulse,
    color: "text-purple",
    bgColor: "bg-purple/10",
    longDescription: "The Cancer Care Fund provides financial assistance to cancer patients who cannot afford the cost of treatment. We cover chemotherapy, radiation therapy, surgeries, medications, and diagnostic tests. All funds are paid directly to verified hospitals and cancer treatment centers.",
    eligibility: ["Diagnosed with any type of cancer", "Unable to afford treatment costs", "Resident of supported regions", "Income below threshold (case-by-case)", "Medical documentation required"],
    coveredExpenses: ["Chemotherapy sessions", "Radiation therapy", "Cancer surgeries", "Diagnostic tests (biopsy, CT, MRI)", "Medications and supportive care"],
    requiredDocs: ["Medical diagnosis report", "Oncologist's treatment plan", "Hospital cost estimate", "ID document (CNIC/Passport)", "Income proof or financial statement"],
    processingTime: "7-10 business days",
    availableRegions: ["Pakistan", "Middle East", "South Asia"],
    balance: 450000, totalRaised: 1200000, applications: 245, funded: 180, maxAssistance: 10000, status: "Active",
  },
  "heart-disease-fund": {
    disease: "Cardiovascular",
    icon: Heart,
    color: "text-error",
    bgColor: "bg-error/10",
    longDescription: "The Heart Disease Fund supports patients requiring cardiac surgeries, heart transplants, pacemaker implants, and ongoing cardiovascular care. We work with leading cardiac hospitals to provide world-class treatment regardless of the patient's financial situation.",
    eligibility: ["Diagnosed with heart disease or condition", "Requires surgical or medical intervention", "Unable to afford treatment costs", "Resident of supported regions", "Cardiologist's recommendation required"],
    coveredExpenses: ["Open heart surgeries", "Angioplasty and stenting", "Pacemaker implantation", "Heart valve replacements", "Cardiac medications"],
    requiredDocs: ["Cardiology diagnosis report", "Recommended treatment plan", "Hospital estimate for surgery", "ID document", "Income proof"],
    processingTime: "5-7 business days",
    availableRegions: ["Pakistan", "Middle East", "South Asia"],
    balance: 280000, totalRaised: 850000, applications: 180, funded: 125, maxAssistance: 15000, status: "Active",
  },
  "kidney-disease-fund": {
    disease: "Renal",
    icon: Droplet,
    color: "text-info",
    bgColor: "bg-info/10",
    longDescription: "The Kidney Disease Fund provides assistance for dialysis treatments, kidney transplants, and related renal care. We understand that kidney disease is a long-term condition requiring consistent support, and we're here to help patients throughout their journey.",
    eligibility: ["Diagnosed with chronic kidney disease", "Requires dialysis or transplant", "Unable to afford treatment costs", "Resident of supported regions", "Nephrologist's recommendation"],
    coveredExpenses: ["Dialysis sessions", "Kidney transplant surgery", "Immunosuppressant medications", "Pre and post-transplant care", "Related diagnostic tests"],
    requiredDocs: ["Nephrology diagnosis report", "Dialysis or transplant recommendation", "Hospital cost estimate", "ID document", "Income proof"],
    processingTime: "7-10 business days",
    availableRegions: ["Pakistan", "Middle East"],
    balance: 150000, totalRaised: 420000, applications: 95, funded: 68, maxAssistance: 12000, status: "Active",
  },
  "diabetes-care-fund": {
    disease: "Diabetes",
    icon: Activity,
    color: "text-teal",
    bgColor: "bg-teal/10",
    longDescription: "The Diabetes Care Fund helps diabetes patients manage their condition with insulin, monitoring equipment, and treatment for diabetes-related complications. We also support education and lifestyle management programs.",
    eligibility: ["Diagnosed with Type 1 or Type 2 diabetes", "Unable to afford insulin or monitoring supplies", "Requires ongoing management support", "Resident of supported regions"],
    coveredExpenses: ["Insulin and diabetes medications", "Glucose monitoring devices", "Test strips and supplies", "Complication treatments", "Diabetes education programs"],
    requiredDocs: ["Diabetes diagnosis report", "Prescription for insulin/medications", "ID document", "Income proof"],
    processingTime: "5-7 business days",
    availableRegions: ["Pakistan", "Middle East", "South Asia"],
    balance: 95000, totalRaised: 280000, applications: 120, funded: 88, maxAssistance: 5000, status: "Active",
  },
  "rare-disease-fund": {
    disease: "Multiple Conditions",
    icon: Shield,
    color: "text-purple",
    bgColor: "bg-purple/10",
    longDescription: "The Rare Disease Fund supports patients with rare and orphan diseases requiring specialized treatment. These conditions often require expensive medications and expert care that is not readily available.",
    eligibility: ["Diagnosed with a rare or orphan disease", "Requires specialized treatment", "Unable to afford treatment costs", "Medical documentation required"],
    coveredExpenses: ["Specialized medications", "Expert consultations", "Diagnostic tests", "Treatment procedures", "Supportive care"],
    requiredDocs: ["Specialist diagnosis report", "Treatment plan", "Hospital cost estimate", "ID document", "Income proof"],
    processingTime: "10-15 business days",
    availableRegions: ["Pakistan", "Middle East"],
    balance: 25000, totalRaised: 100000, applications: 35, funded: 22, maxAssistance: 20000, status: "Paused",
  },
  "children-health-fund": {
    disease: "Pediatric",
    icon: Baby,
    color: "text-teal",
    bgColor: "bg-teal/10",
    longDescription: "The Children Health Fund provides healthcare support for children with critical illnesses and congenital conditions. We believe every child deserves access to quality healthcare regardless of their family's financial situation.",
    eligibility: ["Child under 18 years of age", "Diagnosed with critical illness or congenital condition", "Unable to afford treatment costs", "Parent/guardian consent required"],
    coveredExpenses: ["Pediatric surgeries", "Neonatal care", "Congenital condition treatments", "Vaccinations and preventive care", "Specialized pediatric consultations"],
    requiredDocs: ["Child's medical diagnosis report", "Birth certificate", "Parent/guardian ID", "Hospital cost estimate", "Income proof"],
    processingTime: "5-7 business days",
    availableRegions: ["Pakistan", "Middle East", "South Asia"],
    balance: 180000, totalRaised: 500000, applications: 145, funded: 102, maxAssistance: 12000, status: "Active",
  },
  "thalassemia-fund": {
    disease: "Blood Disorder",
    icon: Droplet,
    color: "text-error",
    bgColor: "bg-error/10",
    longDescription: "The Thalassemia Fund provides lifelong support for thalassemia patients requiring regular blood transfusions and iron chelation therapy. We also support bone marrow transplant procedures where applicable.",
    eligibility: ["Diagnosed with thalassemia", "Requires regular blood transfusions", "Unable to afford treatment costs", "Medical documentation required"],
    coveredExpenses: ["Blood transfusions", "Iron chelation therapy", "Bone marrow transplant", "Related diagnostic tests", "Supportive medications"],
    requiredDocs: ["Thalassemia diagnosis report", "Treatment plan", "Hospital cost estimate", "ID document", "Income proof"],
    processingTime: "7-10 business days",
    availableRegions: ["Pakistan", "Middle East", "South Asia"],
    balance: 80000, totalRaised: 250000, applications: 60, funded: 45, maxAssistance: 8000, status: "Active",
  },
  "mental-health-fund": {
    disease: "Mental Health",
    icon: Brain,
    color: "text-purple",
    bgColor: "bg-purple/10",
    longDescription: "The Mental Health Fund provides counseling, therapy, and psychiatric support for mental health conditions. We believe mental health is just as important as physical health and strive to make treatment accessible to all.",
    eligibility: ["Diagnosed with a mental health condition", "Requires therapy or psychiatric care", "Unable to afford treatment costs", "Confidentiality guaranteed"],
    coveredExpenses: ["Therapy sessions", "Psychiatric consultations", "Medications", "Counseling programs", "Rehabilitation support"],
    requiredDocs: ["Psychiatric/psychological assessment", "Treatment recommendation", "ID document", "Income proof"],
    processingTime: "5-7 business days",
    availableRegions: ["Pakistan", "Middle East"],
    balance: 40000, totalRaised: 120000, applications: 55, funded: 30, maxAssistance: 4000, status: "Active",
  },
  "maternal-health-fund": {
    disease: "Maternal Health",
    icon: Baby,
    color: "text-teal",
    bgColor: "bg-teal/10",
    longDescription: "The Maternal Health Fund provides prenatal, delivery, and postnatal care for mothers and newborns. We ensure that no mother has to choose between her health and her financial stability.",
    eligibility: ["Pregnant woman or new mother", "Unable to afford maternal healthcare", "Resident of supported regions", "Antenatal documentation required"],
    coveredExpenses: ["Prenatal checkups", "Delivery procedures (normal/C-section)", "Postnatal care", "Newborn care", "Medications and supplements"],
    requiredDocs: ["Pregnancy confirmation", "Antenatal care records", "Hospital cost estimate", "ID document", "Income proof"],
    processingTime: "3-5 business days",
    availableRegions: ["Pakistan", "Middle East", "South Asia"],
    balance: 60000, totalRaised: 180000, applications: 78, funded: 52, maxAssistance: 6000, status: "Active",
  },
};

// ============ MAIN COMPONENT ============
export default function DiseaseFundDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [fund, setFund] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFund() {
      try {
        const res = await fetch(`/api/disease-funds/${slug}`);
        if (res.ok) {
          const data = await res.json();
          // Merge API data (name, description, maxAmount) with static details
          const details = fundDetailsData[slug];
          if (details) {
            setFund({ ...data, ...details });
          } else {
            setFund({ ...data, disease: "General", icon: Stethoscope, color: "text-navy", bgColor: "bg-navy/10", longDescription: data.description, eligibility: [], coveredExpenses: [], requiredDocs: [], processingTime: "7-10 business days", availableRegions: ["Global"], balance: 0, totalRaised: 0, applications: 0, funded: 0, maxAssistance: data.maxAmount || 5000, status: "Active" });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchFund();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-navy animate-spin" />
      </div>
    );
  }

  if (!fund) {
    notFound();
  }

  const Icon = fund.icon;
  const utilization = fund.totalRaised > 0 ? (fund.balance / fund.totalRaised) * 100 : 0;

  return (
    <main className="min-h-screen bg-cloud">

      {/* HERO SECTION */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-12 md:py-16 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-sm mb-6 flex-wrap">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/healthcare/funds" className="hover:text-gold transition-colors">Disease Funds</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold truncate">{fund.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Info */}
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 ${
                  fund.status === "Active" ? "text-success bg-success/20" : "text-warning bg-warning/20"
                }`}>
                  <CheckCircle className="w-3 h-3" />
                  {fund.status}
                </span>
                <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1.5 rounded-full">
                  {fund.disease}
                </span>
              </div>

              <div className={`${fund.bgColor} rounded-full p-4 w-fit mb-4`}>
                <Icon className={`w-10 h-10 ${fund.color}`} />
              </div>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {fund.name}
              </h1>

              <p className="text-lg text-white/80 mt-6 leading-relaxed">
                {fund.longDescription}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-input p-3 text-center">
                  <p className="font-display text-xl font-bold text-gold">
                    ${(fund.balance / 1000).toFixed(0)}K
                  </p>
                  <p className="text-white/60 text-xs mt-0.5">Available</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-input p-3 text-center">
                  <p className="font-display text-xl font-bold text-teal">
                    {fund.funded}
                  </p>
                  <p className="text-white/60 text-xs mt-0.5">Funded</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-input p-3 text-center">
                  <p className="font-display text-xl font-bold text-gold">
                    {fund.applications}
                  </p>
                  <p className="text-white/60 text-xs mt-0.5">Applied</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-input p-3 text-center">
                  <p className="font-display text-xl font-bold text-gold">
                    ${(fund.maxAssistance / 1000).toFixed(0)}K
                  </p>
                  <p className="text-white/60 text-xs mt-0.5">Max Aid</p>
                </div>
              </div>
            </div>

            {/* Right: Apply Card */}
            <div className="bg-white rounded-card p-6 md:p-8 shadow-2xl text-ink">
              <div className="mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-display text-3xl font-bold text-navy">
                    ${fund.totalRaised.toLocaleString()}
                  </span>
                  <span className="text-ink/60 text-sm">Total Raised</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-gold to-gold/70 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(utilization, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-ink/60 mt-2">
                  <span>{utilization.toFixed(0)}% utilized</span>
                  <span>{fund.funded} patients funded</span>
                </div>
              </div>

              <div className="bg-cloud rounded-input p-4 mb-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-navy shrink-0" />
                  <div>
                    <p className="text-ink/60 text-xs">Processing Time</p>
                    <p className="font-semibold text-navy">{fund.processingTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-navy shrink-0" />
                  <div>
                    <p className="text-ink/60 text-xs">Available Regions</p>
                    <p className="font-semibold text-navy">{fund.availableRegions.join(", ")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <DollarSign className="w-4 h-4 text-navy shrink-0" />
                  <div>
                    <p className="text-ink/60 text-xs">Maximum Assistance</p>
                    <p className="font-semibold text-gold">${fund.maxAssistance.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {fund.status === "Active" ? (
                <>
                  <Link
                    href={`/healthcare/funds/${fund.slug}/apply`}
                    className="btn-lift w-full bg-gold text-ink font-bold px-6 py-4 rounded-input hover:bg-gold/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <FileText className="w-5 h-5" />
                    Apply for Assistance
                  </Link>
                  <p className="text-xs text-ink/50 text-center mt-3 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    All applications are confidential
                  </p>
                </>
              ) : (
                <div className="bg-warning/10 border border-warning/20 rounded-input p-4 text-center">
                  <AlertCircle className="w-5 h-5 text-warning mx-auto mb-2" />
                  <p className="font-semibold text-warning text-sm">This fund is temporarily paused</p>
                  <p className="text-ink/60 text-xs mt-1">Please check back later</p>
                </div>
              )}

              <Link
                href={`/giving?fund=${fund.slug}`}
                className="btn-lift w-full mt-3 border-2 border-navy/20 text-navy font-semibold px-6 py-3.5 rounded-input hover:bg-navy/5 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Heart className="w-4 h-4" />
                Donate to This Fund
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            {/* Eligibility */}
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-gold" />
                Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {fund.eligibility.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
                    <span className="text-ink/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Covered Expenses */}
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-gold" />
                What's Covered
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fund.coveredExpenses.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-cloud rounded-input">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                    <span className="text-ink/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gold" />
                Required Documents
              </h2>
              <div className="space-y-3">
                {fund.requiredDocs.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-warning/5 border border-warning/10 rounded-input">
                    <div className="bg-warning/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-warning shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-ink/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
              <h3 className="font-display font-bold text-navy text-base mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gold" />
                Application Steps
              </h3>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Submit Application", desc: "Fill the online form with your details" },
                  { step: "2", title: "Document Verification", desc: "We verify your medical and financial documents" },
                  { step: "3", title: "Medical Review", desc: "Our medical team reviews your case" },
                  { step: "4", title: "Approval & Payment", desc: "Direct payment to your hospital" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="bg-navy text-white font-display font-bold text-xs w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-sm">{item.title}</p>
                      <p className="text-ink/60 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy text-white rounded-card p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <Shield className="w-8 h-8 text-gold mb-3" />
                <h3 className="font-display font-bold text-base">100% Confidential</h3>
                <p className="text-white/80 text-xs mt-2 leading-relaxed">
                  Your medical information and application details are strictly confidential. 
                  Only authorized team members can access your data.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100 text-center">
              <div className="bg-teal/10 rounded-full p-3 w-fit mx-auto mb-3">
                <Stethoscope className="w-6 h-6 text-teal" />
              </div>
              <h3 className="font-display font-bold text-navy text-base mb-2">Need Help?</h3>
              <p className="text-ink/60 text-xs mb-4">
                Contact our healthcare team for assistance.
              </p>
              <Link
                href="/contact"
                className="btn-lift w-full bg-teal text-white font-semibold px-4 py-3 rounded-input hover:bg-teal/90 transition-colors text-sm flex items-center justify-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                Contact Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BACK LINK */}
      <section className="max-w-container mx-auto px-6 pb-16 text-center">
        <Link
          href="/healthcare/funds"
          className="inline-flex items-center gap-2 text-ink/60 hover:text-navy font-medium transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to All Disease Funds
        </Link>
      </section>

      {/* CTA SECTION */}
      <section className="bg-purple text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Support {fund.name}
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Your donation to this fund directly helps patients receive life-saving treatment. 
            Every contribution matters.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href={`/giving?fund=${fund.slug}`}
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Donate Now
            </Link>
            <Link
              href="/healthcare/funds"
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              View All Funds
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}