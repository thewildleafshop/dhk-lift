import Link from "next/link";
import {
  FileText,
  Shield,
  TrendingUp,
  Award,
  Download,
  ChevronRight,
  CheckCircle,
  DollarSign,
  BarChart3,
  Heart,
  Users,
  Globe,
  Lock,
  Eye,
  Receipt,
  Calendar,
} from "lucide-react";

// ============ REPORT CATEGORIES ============
const reportCategories = [
  { id: "financial", label: "Financial Reports", icon: DollarSign },
  { id: "impact", label: "Impact Reports", icon: TrendingUp },
  { id: "annual", label: "Annual Reports", icon: Calendar },
  { id: "policies", label: "Policies", icon: Shield },
];

// ============ REPORTS DATA ============
const reports = [
  // Financial Reports
  {
    id: 1,
    category: "financial",
    title: "2025 Audited Financial Statements",
    description: "Complete audited financial statements for fiscal year 2025, including balance sheet, income statement, and cash flow.",
    fileSize: "2.4 MB",
    fileType: "PDF",
    date: "Feb 15, 2026",
    icon: DollarSign,
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  {
    id: 2,
    category: "financial",
    title: "2024 Audited Financial Statements",
    description: "Complete audited financial statements for fiscal year 2024.",
    fileSize: "2.1 MB",
    fileType: "PDF",
    date: "Feb 10, 2025",
    icon: DollarSign,
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  {
    id: 3,
    category: "financial",
    title: "Q1 2026 Donations Breakdown",
    description: "Detailed breakdown of all donations received in Q1 2026 by program and cause.",
    fileSize: "1.2 MB",
    fileType: "PDF",
    date: "Apr 5, 2026",
    icon: Receipt,
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  // Impact Reports
  {
    id: 4,
    category: "impact",
    title: "2025 Annual Impact Report",
    description: "Comprehensive report on our 2025 impact across all seven LIFT programs with verified metrics and stories.",
    fileSize: "5.8 MB",
    fileType: "PDF",
    date: "Jan 20, 2026",
    icon: TrendingUp,
    color: "text-teal",
    bgColor: "bg-teal/10",
  },
  {
    id: 5,
    category: "impact",
    title: "Q1 2026 Impact Summary",
    description: "Quarterly impact summary with key metrics and verified project outcomes.",
    fileSize: "3.2 MB",
    fileType: "PDF",
    date: "Apr 10, 2026",
    icon: BarChart3,
    color: "text-teal",
    bgColor: "bg-teal/10",
  },
  {
    id: 6,
    category: "impact",
    title: "LIFT Health Program Report 2025",
    description: "Detailed report on healthcare outcomes, patients served, and disease fund distributions.",
    fileSize: "4.1 MB",
    fileType: "PDF",
    date: "Feb 28, 2026",
    icon: Heart,
    color: "text-teal",
    bgColor: "bg-teal/10",
  },
  // Annual Reports
  {
    id: 7,
    category: "annual",
    title: "2025 Annual Report",
    description: "Full annual report with organizational overview, achievements, financial summary, and future plans.",
    fileSize: "8.5 MB",
    fileType: "PDF",
    date: "Mar 1, 2026",
    icon: Award,
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
  {
    id: 8,
    category: "annual",
    title: "2024 Annual Report",
    description: "2024 annual report with complete organizational and financial overview.",
    fileSize: "7.2 MB",
    fileType: "PDF",
    date: "Mar 5, 2025",
    icon: Award,
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
  // Policies
  {
    id: 9,
    category: "policies",
    title: "Financial Transparency Policy",
    description: "Our commitment to financial transparency, reporting standards, and accountability.",
    fileSize: "450 KB",
    fileType: "PDF",
    date: "Jan 1, 2026",
    icon: Shield,
    color: "text-navy",
    bgColor: "bg-navy/10",
  },
  {
    id: 10,
    category: "policies",
    title: "Safeguarding & Protection Policy",
    description: "Our safeguarding policy for vulnerable individuals, especially in LIFT Protect cases.",
    fileSize: "680 KB",
    fileType: "PDF",
    date: "Jan 1, 2026",
    icon: Lock,
    color: "text-navy",
    bgColor: "bg-navy/10",
  },
  {
    id: 11,
    category: "policies",
    title: "Data Protection & Privacy Policy",
    description: "How we collect, store, and protect your personal data in compliance with international standards.",
    fileSize: "520 KB",
    fileType: "PDF",
    date: "Jan 1, 2026",
    icon: Eye,
    color: "text-navy",
    bgColor: "bg-navy/10",
  },
];

// ============ TRANSPARENCY PILLARS ============
const pillars = [
  {
    icon: Eye,
    title: "Full Visibility",
    description: "Every donation, project, and outcome is publicly visible and verifiable.",
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  {
    icon: FileText,
    title: "Documented Proof",
    description: "Receipts, invoices, photos, and milestone reports for every project.",
    color: "text-teal",
    bgColor: "bg-teal/10",
  },
  {
    icon: Shield,
    title: "Independent Audits",
    description: "Annual third-party audits ensure complete financial accountability.",
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
  {
    icon: CheckCircle,
    title: "Verified Impact",
    description: "Every claim we make is backed by documented, verifiable evidence.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

// ============ KEY STATS ============
const keyStats = [
  { value: "100%", label: "Audited Annually", icon: Shield },
  { value: "0.5%", label: "Admin Fees", icon: DollarSign },
  { value: "99.5%", label: "To Programs", icon: Heart },
  { value: "A+", label: "Charity Rating", icon: Award },
];

// ============ MAIN COMPONENT ============
export default function TransparencyPage() {
  return (
    <main className="min-h-screen bg-cloud">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-container mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <div className="bg-gold/20 rounded-full p-4 w-fit mx-auto mb-6 animate-fade-in">
            <FileText className="w-10 h-10 text-gold" />
          </div>
          <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm animate-fade-in">
            Transparency & Accountability
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4 animate-fade-in-up">
            Open Books. <br />
            <span className="text-gradient-gold">Verified Impact.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-in-up delay-100">
            We believe transparency is the foundation of trust. Access all our financial 
            reports, impact data, and organizational documents — free and open.
          </p>
        </div>
      </section>

      {/* ================= KEY STATS ================= */}
      <section className="max-w-container mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {keyStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-card p-5 md:p-6 shadow-lg border border-gray-100 text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="bg-navy/5 rounded-full p-3 w-fit mx-auto mb-3">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-navy" />
                </div>
                <p className="font-display text-2xl md:text-3xl font-bold text-navy">{stat.value}</p>
                <p className="text-ink/60 text-xs md:text-sm mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= TRANSPARENCY PILLARS ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Our Commitment to Transparency
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
            Four pillars that ensure every dollar is accounted for and every impact is verified.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="card-hover bg-white rounded-card p-6 border border-gray-100 text-center"
              >
                <div className={`${pillar.bgColor} rounded-full p-4 w-fit mx-auto mb-4`}>
                  <Icon className={`w-7 h-7 ${pillar.color}`} />
                </div>
                <h3 className="font-display font-bold text-navy text-base">{pillar.title}</h3>
                <p className="text-ink/70 text-sm mt-3 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= REPORTS SECTION ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Reports & Documents
            </h2>
            <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
              Download our latest reports and policies. All documents are free and publicly available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => {
              const Icon = report.icon;
              return (
                <div
                  key={report.id}
                  className="card-hover bg-cloud rounded-card p-6 border border-gray-100 flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`${report.bgColor} rounded-full p-3 shrink-0`}>
                      <Icon className={`w-6 h-6 ${report.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-navy text-base leading-snug">
                        {report.title}
                      </h3>
                      <p className="text-ink/50 text-xs mt-1">
                        {report.date} • {report.fileType} • {report.fileSize}
                      </p>
                    </div>
                  </div>
                  <p className="text-ink/70 text-sm leading-relaxed flex-1">
                    {report.description}
                  </p>
                  <button className="btn-lift mt-5 bg-navy text-white font-semibold px-5 py-3 rounded-input hover:bg-navy/90 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FINANCIAL BREAKDOWN ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Where Your Money Goes
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
            Complete breakdown of how every dollar is allocated.
          </p>
        </div>

        <div className="bg-white rounded-card p-6 md:p-10 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left: Breakdown */}
            <div className="space-y-6">
              {[
                { label: "Direct Program Support", percentage: 85, color: "bg-gold" },
                { label: "Partner Operations", percentage: 10, color: "bg-teal" },
                { label: "Platform & Technology", percentage: 4, color: "bg-purple" },
                { label: "Administrative Costs", percentage: 1, color: "bg-navy" },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-navy text-sm">{item.label}</span>
                    <span className="font-display font-bold text-navy">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`${item.color} h-3 rounded-full transition-all duration-1000`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Summary */}
            <div className="bg-navy text-white rounded-card p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <DollarSign className="w-10 h-10 text-gold mb-4" />
                <h3 className="font-display text-2xl font-bold">
                  99% Goes to Programs
                </h3>
                <p className="text-white/80 mt-3 leading-relaxed text-sm">
                  We are committed to maximizing the impact of every donation. 
                  Our administrative costs are kept at just 1%, well below the 
                  nonprofit industry average of 15-20%.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20">
                  <div>
                    <p className="font-display text-2xl font-bold text-gold">$2.5M+</p>
                    <p className="text-white/60 text-xs mt-1">Total Distributed</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-gold">$0</p>
                    <p className="text-white/60 text-xs mt-1">Hidden Fees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST BADGES ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Trust & Certifications
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "A+ Rating", subtext: "Charity Navigator" },
              { icon: Shield, title: "100% Audited", subtext: "Independent Audit" },
              { icon: Lock, title: "PCI Compliant", subtext: "Payment Security" },
              { icon: Globe, title: "ISO 27001", subtext: "Data Security" },
            ].map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div
                  key={i}
                  className="bg-cloud rounded-card p-6 border border-gray-100 text-center card-hover"
                >
                  <div className="bg-navy/5 rounded-full p-4 w-fit mx-auto mb-3">
                    <Icon className="w-7 h-7 text-navy" />
                  </div>
                  <p className="font-display font-bold text-navy text-base">{badge.title}</p>
                  <p className="text-ink/60 text-xs mt-1">{badge.subtext}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-purple text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <div className="bg-white/10 rounded-full p-4 w-fit mx-auto mb-6">
            <FileText className="w-10 h-10 text-gold" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Questions About Our Reports?
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Our transparency team is happy to answer any questions about our financials, 
            impact data, or organizational practices.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Contact Transparency Team
            </Link>
            <Link
              href="/impact"
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              View Impact Data
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}