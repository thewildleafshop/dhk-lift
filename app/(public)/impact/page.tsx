import Link from "next/link";
import {
  TrendingUp,
  Users,
  Globe,
  Heart,
  Award,
  CheckCircle,
  ChevronRight,
  DollarSign,
  Target,
  BarChart3,
  Stethoscope,
  Utensils,
  BookOpen,
  Home,
  Accessibility,
  HeartHandshake,
  Shield,
  FileText,
} from "lucide-react";

// ============ OVERALL STATS ============
const overallStats = [
  {
    label: "Total Raised",
    value: "$2.5M+",
    subtext: "Since inception",
    icon: DollarSign,
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  {
    label: "Lives Impacted",
    value: "50,000+",
    subtext: "Across all programs",
    icon: Users,
    color: "text-teal",
    bgColor: "bg-teal/10",
  },
  {
    label: "Countries",
    value: "25+",
    subtext: "Global reach",
    icon: Globe,
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
  {
    label: "Projects Completed",
    value: "500+",
    subtext: "Verified impact",
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

// ============ PROGRAM IMPACT ============
const programImpact = [
  {
    name: "LIFT Health",
    icon: Stethoscope,
    color: "text-teal",
    bgColor: "bg-teal/10",
    stats: [
      { value: "5,000+", label: "Patients Treated" },
      { value: "$2M+", label: "Medical Aid" },
      { value: "12", label: "Disease Funds" },
    ],
  },
  {
    name: "Food Security",
    icon: Utensils,
    color: "text-gold",
    bgColor: "bg-gold/10",
    stats: [
      { value: "500K+", label: "Meals Served" },
      { value: "8,000+", label: "Families Fed" },
      { value: "20+", label: "Kitchens" },
    ],
  },
  {
    name: "Education Support",
    icon: BookOpen,
    color: "text-teal",
    bgColor: "bg-teal/10",
    stats: [
      { value: "5,000+", label: "Students Helped" },
      { value: "200+", label: "Schools" },
      { value: "95%", label: "Completion" },
    ],
  },
  {
    name: "LIFT Ability",
    icon: Accessibility,
    color: "text-navy",
    bgColor: "bg-navy/10",
    stats: [
      { value: "3,500+", label: "Equipment Given" },
      { value: "800+", label: "Wheelchairs" },
      { value: "40+", label: "Countries" },
    ],
  },
  {
    name: "LIFT Protect",
    icon: HeartHandshake,
    color: "text-purple",
    bgColor: "bg-purple/10",
    stats: [
      { value: "1,200+", label: "Lives Protected" },
      { value: "50+", label: "Partners" },
      { value: "24/7", label: "Support" },
    ],
  },
  {
    name: "Children & Families",
    icon: Home,
    color: "text-purple",
    bgColor: "bg-purple/10",
    stats: [
      { value: "10,000+", label: "Families" },
      { value: "5,000+", label: "Children" },
      { value: "1M+", label: "Meals" },
    ],
  },
];

// ============ YEARLY IMPACT ============
const yearlyImpact = [
  { year: "2022", raised: 450000, lives: 12000 },
  { year: "2023", raised: 680000, lives: 18000 },
  { year: "2024", raised: 890000, lives: 25000 },
  { year: "2025", raised: 1250000, lives: 35000 },
  { year: "2026", raised: 2500000, lives: 50000 },
];

// ============ IMPACT HIGHLIGHTS ============
const highlights = [
  {
    icon: Shield,
    title: "100% Verified",
    description: "Every project milestone is documented with photos, receipts, and progress reports.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: FileText,
    title: "Full Transparency",
    description: "All donations are tracked and publicly documented for complete accountability.",
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    icon: TrendingUp,
    title: "Real Impact",
    description: "Our impact reports are updated quarterly with verified results and outcomes.",
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  {
    icon: Award,
    title: "Audited Annually",
    description: "Independent audits ensure every dollar is used efficiently and ethically.",
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
];

// ============ MAIN COMPONENT ============
export default function ImpactPage() {
  return (
    <main className="min-h-screen bg-cloud">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-container mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <div className="bg-gold/20 rounded-full p-4 w-fit mx-auto mb-6 animate-fade-in">
            <TrendingUp className="w-10 h-10 text-gold" />
          </div>
          <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm animate-fade-in">
            Our Impact
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4 animate-fade-in-up">
            Measurable Change. <br />
            <span className="text-gradient-gold">Verified Results.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-in-up delay-100">
            Every donation is tracked, every project is verified, and every result is documented. 
            This is the real impact of our global community.
          </p>
        </div>
      </section>

      {/* ================= OVERALL STATS ================= */}
      <section className="max-w-container mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {overallStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-card p-5 md:p-6 shadow-lg border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`${stat.bgColor} rounded-full p-3 w-fit mb-3`}>
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
                </div>
                <p className="font-display text-2xl md:text-3xl font-bold text-navy">{stat.value}</p>
                <p className="font-semibold text-navy text-sm mt-1">{stat.label}</p>
                <p className="text-ink/50 text-xs mt-0.5">{stat.subtext}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= PROGRAM IMPACT ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Impact by Program
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
            See the measurable impact of each of our seven core programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programImpact.map((program, i) => {
            const Icon = program.icon;
            return (
              <div
                key={i}
                className="card-hover bg-white rounded-card p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`${program.bgColor} rounded-full p-3 shrink-0`}>
                    <Icon className={`w-6 h-6 ${program.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-navy text-lg">
                    {program.name}
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {program.stats.map((stat, j) => (
                    <div key={j} className="text-center p-3 bg-cloud rounded-input">
                      <p className="font-display text-lg md:text-xl font-bold text-navy">
                        {stat.value}
                      </p>
                      <p className="text-ink/60 text-xs mt-1 leading-tight">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= YEARLY GROWTH ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <div className="bg-gold/10 rounded-full p-3 w-fit mx-auto mb-4">
              <BarChart3 className="w-7 h-7 text-gold" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Yearly Growth
            </h2>
            <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
              Our impact has grown consistently year over year, thanks to our global community.
            </p>
          </div>

          <div className="bg-cloud rounded-card p-6 md:p-10 border border-gray-100">
            <div className="space-y-6">
              {yearlyImpact.map((year, i) => {
                const maxRaised = Math.max(...yearlyImpact.map((y) => y.raised));
                const percentage = (year.raised / maxRaised) * 100;

                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-navy text-lg">
                          {year.year}
                        </span>
                        <span className="text-ink/60 text-sm">
                          {year.lives.toLocaleString()} lives
                        </span>
                      </div>
                      <span className="font-display font-bold text-gold text-lg">
                        ${(year.raised / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="w-full bg-white rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-gold to-gold/70 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-navy">5.5x</p>
                <p className="text-ink/60 text-xs md:text-sm mt-1">Growth since 2022</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-navy">4.2x</p>
                <p className="text-ink/60 text-xs md:text-sm mt-1">Lives Impacted</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-navy">500+</p>
                <p className="text-ink/60 text-xs md:text-sm mt-1">Projects Completed</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-navy">100%</p>
                <p className="text-ink/60 text-xs md:text-sm mt-1">Verified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IMPACT HIGHLIGHTS ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Why Trust Our Numbers
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
            Our commitment to transparency and accountability sets us apart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="card-hover bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100 flex items-start gap-4"
              >
                <div className={`${item.bgColor} rounded-full p-4 shrink-0`}>
                  <Icon className={`w-6 h-6 md:w-7 md:h-7 ${item.color}`} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-navy text-lg">
                    {item.title}
                  </h3>
                  <p className="text-ink/70 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= TRANSPARENCY CTA ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <div className="bg-gradient-to-br from-navy to-navy/90 rounded-card p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-gold/20 rounded-full p-3 w-fit mb-4">
                  <FileText className="w-7 h-7 text-gold" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Full Transparency Reports
                </h2>
                <p className="text-white/80 mt-4 leading-relaxed">
                  Download our latest annual report, financial statements, and impact 
                  reports to see exactly how your donations are being used.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/transparency"
                    className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    View Reports
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    Contact Us
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-input">
                      <Award className="w-6 h-6 text-gold mx-auto mb-2" />
                      <p className="font-display text-2xl font-bold">A+</p>
                      <p className="text-white/60 text-xs mt-1">Charity Rating</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-input">
                      <Shield className="w-6 h-6 text-gold mx-auto mb-2" />
                      <p className="font-display text-2xl font-bold">100%</p>
                      <p className="text-white/60 text-xs mt-1">Audited</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-input">
                      <Target className="w-6 h-6 text-gold mx-auto mb-2" />
                      <p className="font-display text-2xl font-bold">0.5%</p>
                      <p className="text-white/60 text-xs mt-1">Admin Fees</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-input">
                      <Heart className="w-6 h-6 text-gold mx-auto mb-2" />
                      <p className="font-display text-2xl font-bold">99.5%</p>
                      <p className="text-white/60 text-xs mt-1">To Programs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-purple text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Be Part of the Impact
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Every donation, every share, every action creates measurable change. 
            Join us in making a difference.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/giving"
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Donate Now
            </Link>
            <Link
              href="/projects"
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              View Projects
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}