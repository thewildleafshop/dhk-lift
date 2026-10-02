"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import {
  Heart,
  Search,
  ChevronRight,
  Stethoscope,
  Activity,
  Pill,
  HeartPulse,
  Brain,
  Bone,
  Eye,
  Baby,
  Droplet,
  Shield,
  CheckCircle,
  Users,
  DollarSign,
  Building2,
  Loader2,
} from "lucide-react";

// ============ ICON MAPPING ============
const iconMap: Record<string, any> = {
  "Cancer Care Fund": { icon: HeartPulse, color: "text-purple", bgColor: "bg-purple/10" },
  "Heart Disease Fund": { icon: Heart, color: "text-error", bgColor: "bg-error/10" },
  "Kidney Disease Fund": { icon: Droplet, color: "text-info", bgColor: "bg-info/10" },
  "Kidney Dialysis Fund": { icon: Droplet, color: "text-info", bgColor: "bg-info/10" },
  "Diabetes Care Fund": { icon: Activity, color: "text-teal", bgColor: "bg-teal/10" },
  "Rare Disease Fund": { icon: Shield, color: "text-warning", bgColor: "bg-warning/10" },
  "Children Health Fund": { icon: Baby, color: "text-gold", bgColor: "bg-gold/10" },
  "Mental Health Fund": { icon: Brain, color: "text-navy", bgColor: "bg-navy/10" },
  "Thalassemia Fund": { icon: Droplet, color: "text-error", bgColor: "bg-error/10" },
  "Disability Support Fund": { icon: Bone, color: "text-success", bgColor: "bg-success/10" },
  "Emergency Medical Fund": { icon: Activity, color: "text-error", bgColor: "bg-error/10" },
  "Maternal Health Fund": { icon: Baby, color: "text-purple", bgColor: "bg-purple/10" },
};

// ============ CATEGORIES ============
const categories = [
  { id: "all", label: "All Funds" },
  { id: "active", label: "Active Funds" },
  { id: "paused", label: "Paused" },
];

export default function DiseaseFundsPage() {
  const [funds, setFunds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // ✅ Fetch funds from API
  useEffect(() => {
    fetch("/api/disease-funds")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((fund: any) => {
          const config = iconMap[fund.name] || {
            icon: Stethoscope,
            color: "text-navy",
            bgColor: "bg-navy/10",
          };
          return {
            ...fund,
            ...config,
            disease: fund.name.replace(" Fund", ""),
          };
        });
        setFunds(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching funds:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Filter funds
  const filteredFunds = useMemo(() => {
    return funds.filter((fund) => {
      const matchesSearch =
        fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (fund.description || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "active" && fund.status === "Active") ||
        (activeFilter === "paused" && fund.status === "Paused");

      return matchesSearch && matchesFilter;
    });
  }, [funds, searchQuery, activeFilter]);

  const stats = {
    totalFunds: funds.length,
    activeFunds: funds.filter((f) => f.status === "Active").length,
    totalPatients: funds.reduce((sum, f) => sum + (f.funded || 0), 0),
  };

  return (
    <main className="min-h-screen bg-cloud">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-error/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-container mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <div className="bg-gold/20 rounded-full p-4 w-fit mx-auto mb-6 animate-fade-in">
            <Stethoscope className="w-10 h-10 text-gold" />
          </div>
          <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm animate-fade-in">
            Disease Funds
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4 animate-fade-in-up">
            Healthcare Support. <br />
            <span className="text-gradient-gold">When You Need It Most.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-in-up delay-100">
            DHK LIFT's disease-specific funds provide financial support for medical treatment,
            medication, and healthcare expenses to patients in need.
          </p>

          <div className="max-w-2xl mx-auto mt-8 animate-fade-in-up delay-200">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by disease, condition, or fund name..."
                className="w-full pl-14 pr-32 py-4 md:py-5 rounded-input border-0 bg-white text-ink placeholder:text-ink/40 focus:outline-none focus:ring-4 focus:ring-gold/30 shadow-2xl text-base"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors text-sm"
              >
                Search
              </button>
            </div>
            {searchQuery && (
              <p className="text-white/70 text-sm mt-3">
                Showing {filteredFunds.length} result(s) for "{searchQuery}"
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ================= STATS BAR ================= */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-navy">
                {stats.totalFunds}
              </p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Disease Funds</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-success">
                {stats.activeFunds}
              </p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Active Funds</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-gold">
                $3.2M+
              </p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Total Distributed</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-teal">
                {stats.totalPatients}+
              </p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Patients Funded</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FILTERS ================= */}
      <section className="max-w-container mx-auto px-6 py-8">
        <div className="bg-white rounded-card p-4 shadow-sm border border-gray-100">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-navy text-white shadow-sm"
                      : "bg-cloud text-ink/70 hover:bg-navy/5 hover:text-navy"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FUNDS GRID ================= */}
      <section className="max-w-container mx-auto px-6 pb-16 md:pb-24">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-navy animate-spin" />
          </div>
        ) : filteredFunds.length === 0 ? (
          <div className="bg-white rounded-card p-12 text-center border border-gray-100">
            <Search className="w-12 h-12 text-ink/30 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-navy">
              No Funds Found
            </h3>
            <p className="text-ink/60 mt-2">
              Try a different search term or filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="mt-6 text-navy font-semibold hover:text-gold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFunds.map((fund) => {
              const Icon = fund.icon;
              const utilization = fund.maxAmount > 0 
                ? Math.min((fund.funded / Math.max(fund.applications, 1)) * 100, 100)
                : 0;

              return (
                <Link
                  key={fund.slug}
                  href={`/healthcare/funds/${fund.slug}`}
                  className="card-hover bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden flex flex-col group"
                >
                  <div className="p-6 pb-0">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${fund.bgColor} rounded-full p-3`}>
                        <Icon className={`w-7 h-7 ${fund.color}`} />
                      </div>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          fund.status === "Active"
                            ? "text-success bg-success/10"
                            : "text-warning bg-warning/10"
                        }`}
                      >
                        {fund.status}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-navy text-xl">
                      {fund.name}
                    </h3>
                    <p className="text-ink/50 text-xs mt-1">{fund.disease}</p>
                    <p className="text-ink/70 text-sm mt-3 leading-relaxed line-clamp-3">
                      {fund.description}
                    </p>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-end">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center p-2 bg-cloud rounded-input">
                        <p className="font-display font-bold text-navy text-sm">
                          ${(fund.maxAmount / 1000).toFixed(0)}K
                        </p>
                        <p className="text-ink/50 text-xs mt-0.5">Max Aid</p>
                      </div>
                      <div className="text-center p-2 bg-cloud rounded-input">
                        <p className="font-display font-bold text-teal text-sm">
                          {fund.funded}
                        </p>
                        <p className="text-ink/50 text-xs mt-0.5">Funded</p>
                      </div>
                      <div className="text-center p-2 bg-cloud rounded-input">
                        <p className="font-display font-bold text-gold text-sm">
                          {fund.applications}
                        </p>
                        <p className="text-ink/50 text-xs mt-0.5">Applied</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-ink/60 mb-1">
                        <span>Utilization</span>
                        <span className="font-semibold text-navy">
                          {utilization.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full ${
                            utilization > 80
                              ? "bg-error"
                              : utilization > 60
                              ? "bg-warning"
                              : "bg-gold"
                          }`}
                          style={{ width: `${utilization}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm font-semibold text-navy group-hover:text-gold transition-colors flex items-center gap-1">
                        View Fund Details
                        <ChevronRight className="w-4 h-4" />
                      </span>
                      <span className="text-xs text-ink/50">
                        {fund.status === "Active" ? "Apply Available" : "Currently Paused"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              How Disease Funds Work
            </h2>
            <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
              Simple, transparent, and designed for patient dignity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Find Your Fund", desc: "Browse funds by disease or condition.", icon: Search },
              { step: "02", title: "Check Eligibility", desc: "Review eligibility and required documents.", icon: CheckCircle },
              { step: "03", title: "Apply Online", desc: "Submit your application with supporting documents.", icon: Stethoscope },
              { step: "04", title: "Receive Support", desc: "Approved applications receive direct payment to providers.", icon: Heart },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-cloud rounded-card p-6 border border-gray-100 card-hover text-center"
                >
                  <div className="bg-navy text-white font-display font-bold text-2xl w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <Icon className="w-7 h-7 text-gold mx-auto mb-3" />
                  <h3 className="font-display font-bold text-navy text-base">{item.title}</h3>
                  <p className="text-ink/70 text-sm mt-2 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FOR PROVIDERS CTA ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="bg-gradient-to-br from-teal to-teal/90 rounded-card p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 w-fit mb-4">
                <Stethoscope className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Are You a Healthcare Provider?
              </h2>
              <p className="text-white/80 mt-4 leading-relaxed">
                Register your hospital, clinic, or medical facility to receive patients
                through DHK LIFT's disease fund programs.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/healthcare/providers/register"
                  className="btn-lift bg-white text-teal font-semibold px-6 py-3.5 rounded-input hover:bg-white/90 transition-colors shadow-lg flex items-center gap-2 text-sm"
                >
                  <Building2 className="w-4 h-4" />
                  Register as Provider
                </Link>
                <Link
                  href="/healthcare/pharmacies/register"
                  className="btn-lift border-2 border-white/40 text-white font-semibold px-6 py-3.5 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2 text-sm"
                >
                  <Pill className="w-4 h-4" />
                  Register Pharmacy
                </Link>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/20">
              <h3 className="font-display font-bold text-lg mb-4">
                Provider Benefits
              </h3>
              <ul className="space-y-3">
                {[
                  "Receive patients through DHK LIFT platform",
                  "Direct payment from disease funds",
                  "Reduced paperwork and verification",
                  "Access to global donor network",
                  "Featured as a verified provider",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-white mt-0.5 shrink-0" />
                    <span className="text-white/90 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRANSPARENCY ================= */}
      <section className="max-w-container mx-auto px-6 pb-16 md:pb-24">
        <div className="bg-navy text-white rounded-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="bg-white/10 rounded-full p-3 w-fit mb-4">
                <Shield className="w-7 h-7 text-gold" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                100% Transparent. <br />
                100% Verified.
              </h2>
              <p className="text-white/80 mt-4 leading-relaxed">
                Every disease fund transaction is documented with invoices, receipts, and provider
                verifications. Funds are directly paid to hospitals and pharmacies.
              </p>
              <Link
                href="/transparency"
                className="btn-lift inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg mt-6 text-sm"
              >
                View Transparency Report
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/20">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "$3.2M+", label: "Total Distributed", icon: DollarSign },
                  { value: `${stats.totalPatients}+`, label: "Patients Funded", icon: Users },
                  { value: `${stats.totalFunds}`, label: "Disease Funds", icon: Heart },
                  { value: "100%", label: "Verified Claims", icon: CheckCircle },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="text-center p-4 bg-white/5 rounded-input">
                      <Icon className="w-6 h-6 text-gold mx-auto mb-2" />
                      <p className="font-display text-2xl font-bold">{stat.value}</p>
                      <p className="text-white/60 text-xs mt-1">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-purple text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Support a Disease Fund
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Your donation directly funds medical treatments for patients who cannot afford them.
            Every contribution saves a life.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/giving"
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Donate to a Fund
            </Link>
            <Link
              href="/contact"
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              Contact Healthcare Team
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}