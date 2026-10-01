"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  Globe,
  Heart,
  Award,
  CheckCircle,
  ChevronRight,
  DollarSign,
  BarChart3,
  Stethoscope,
  Utensils,
  BookOpen,
  Home,
  Accessibility,
  HeartHandshake,
  Shield,
  FileText,
  Loader2,
} from "lucide-react";

// ============ TYPES ============
interface ImpactData {
  overall: {
    totalRaised: number;
    livesImpacted: number;
    countriesCount: number;
    projectsCompleted: number;
    totalDonations: number;
  };
  programImpact: {
    name: string;
    slug: string;
    category: string;
    applicationsCount: number;
    totalRaised: number;
    projectCount: number;
  }[];
}

// ============ PROGRAM ICONS ============
const getProgramIcon = (slug: string) => {
  const map: Record<string, any> = {
    "lift-health": { icon: Stethoscope, color: "text-teal", bgColor: "bg-teal/10" },
    "food-security": { icon: Utensils, color: "text-gold", bgColor: "bg-gold/10" },
    "lift-community": { icon: BookOpen, color: "text-teal", bgColor: "bg-teal/10" },
    "lift-ability": { icon: Accessibility, color: "text-navy", bgColor: "bg-navy/10" },
    "lift-protect": { icon: HeartHandshake, color: "text-purple", bgColor: "bg-purple/10" },
    "children-families": { icon: Home, color: "text-purple", bgColor: "bg-purple/10" },
    "disaster-relief": { icon: Shield, color: "text-error", bgColor: "bg-error/10" },
  };
  return map[slug] || { icon: Heart, color: "text-navy", bgColor: "bg-navy/10" };
};

// ============ YEARLY IMPACT (Hardcoded - Historical Data) ============
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

export default function ImpactPage() {
  const [data, setData] = useState<ImpactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImpact() {
      try {
        const res = await fetch("/api/impact");
        if (res.ok) {
          const result = await res.json();
          setData(result);
        }
      } catch (err) {
        console.error("Error fetching impact:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchImpact();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cloud">
        <Loader2 className="w-10 h-10 text-navy animate-spin" />
      </div>
    );
  }

  const overall = data?.overall || {
    totalRaised: 0,
    livesImpacted: 0,
    countriesCount: 25,
    projectsCompleted: 0,
    totalDonations: 0,
  };

  const overallStats = [
    {
      label: "Total Raised",
      value:
        overall.totalRaised >= 1000
          ? `$${(overall.totalRaised / 1000).toFixed(1)}K+`
          : `$${overall.totalRaised}+`,
      subtext: `${overall.totalDonations} donations`,
      icon: DollarSign,
      color: "text-gold",
      bgColor: "bg-gold/10",
    },
    {
      label: "Lives Impacted",
      value: `${overall.livesImpacted.toLocaleString()}+`,
      subtext: "Across all programs",
      icon: Users,
      color: "text-teal",
      bgColor: "bg-teal/10",
    },
    {
      label: "Countries",
      value: `${overall.countriesCount}+`,
      subtext: "Global reach",
      icon: Globe,
      color: "text-purple",
      bgColor: "bg-purple/10",
    },
    {
      label: "Projects Completed",
      value: `${overall.projectsCompleted}+`,
      subtext: "Verified impact",
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  return (
    <main className="min-h-screen bg-cloud">
      {/* HERO */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <div className="bg-gold/20 rounded-full p-4 w-fit mx-auto mb-6">
            <TrendingUp className="w-10 h-10 text-gold" />
          </div>
          <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm">
            Our Impact
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4">
            Measurable Change. <br />
            <span className="text-gold">Verified Results.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed">
            Every donation is tracked, every project is verified, and every result is
            documented. This is the real impact of our global community.
          </p>
        </div>
      </section>

      {/* OVERALL STATS */}
      <section className="max-w-container mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {overallStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-card p-5 md:p-6 shadow-lg border border-gray-100"
              >
                <div className={`${stat.bgColor} rounded-full p-3 w-fit mb-3`}>
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
                </div>
                <p className="font-display text-2xl md:text-3xl font-bold text-navy">
                  {stat.value}
                </p>
                <p className="font-semibold text-navy text-sm mt-1">{stat.label}</p>
                <p className="text-ink/50 text-xs mt-0.5">{stat.subtext}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROGRAM IMPACT */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Impact by Program
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
            See the measurable impact of each of our core programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.programImpact.map((program, i) => {
            const config = getProgramIcon(program.slug);
            const Icon = config.icon;
            return (
              <div
                key={i}
                className="card-hover bg-white rounded-card p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`${config.bgColor} rounded-full p-3 shrink-0`}>
                    <Icon className={`w-6 h-6 ${config.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-navy text-lg">
                    {program.name}
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-cloud rounded-input">
                    <p className="font-display text-lg font-bold text-navy">
                      {program.applicationsCount}
                    </p>
                    <p className="text-ink/60 text-xs mt-1">Applications</p>
                  </div>
                  <div className="text-center p-3 bg-cloud rounded-input">
                    <p className="font-display text-lg font-bold text-navy">
                      ${program.totalRaised >= 1000
                        ? `${(program.totalRaised / 1000).toFixed(1)}K`
                        : program.totalRaised}
                    </p>
                    <p className="text-ink/60 text-xs mt-1">Raised</p>
                  </div>
                  <div className="text-center p-3 bg-cloud rounded-input">
                    <p className="font-display text-lg font-bold text-navy">
                      {program.projectCount}
                    </p>
                    <p className="text-ink/60 text-xs mt-1">Projects</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* YEARLY GROWTH (Hardcoded) */}
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
              Our impact has grown consistently year over year.
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
                        className="bg-gradient-to-r from-gold to-gold/70 h-3 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Why Trust Our Numbers
          </h2>
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
                  <p className="text-ink/70 mt-2 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-purple text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Be Part of the Impact
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Every donation, every share, every action creates measurable change.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/giving"
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <Heart className="w-5 h-5" /> Donate Now
            </Link>
            <Link
              href="/projects"
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              View Projects <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}