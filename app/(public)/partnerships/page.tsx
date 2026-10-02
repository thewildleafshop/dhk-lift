"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Globe,
  Users,
  ChevronRight,
  CheckCircle,
  Shield,
  TrendingUp,
  FileText,
  Heart,
  Handshake,
  Award,
  Building2,
  Stethoscope,
  Pill,
  GraduationCap,
  DollarSign,
  MapPin,
  Loader2,
} from "lucide-react";

// ============ PARTNER TYPES ============
const partnerTypes = [
  {
    icon: Building2,
    title: "NGOs & Nonprofits",
    description: "Community organizations, foundations, and humanitarian groups.",
    color: "text-navy",
    bgColor: "bg-navy/10",
  },
  {
    icon: Stethoscope,
    title: "Healthcare Providers",
    description: "Hospitals, clinics, and medical professionals serving communities.",
    color: "text-teal",
    bgColor: "bg-teal/10",
  },
  {
    icon: Pill,
    title: "Pharmacies",
    description: "Licensed pharmacies supporting medication access programs.",
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
  {
    icon: GraduationCap,
    title: "Educational Institutions",
    description: "Schools, colleges, and training centers advancing education.",
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
];

// ============ VERIFICATION STEPS ============
const verificationSteps = [
  {
    step: "01",
    title: "Application",
    description: "Submit your organization profile, documents, and mission statement.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Verification",
    description: "Our team reviews your credentials, references, and track record.",
    icon: Shield,
  },
  {
    step: "03",
    title: "Approval",
    description: "Upon approval, you gain access to the partner dashboard and funding.",
    icon: CheckCircle,
  },
  {
    step: "04",
    title: "Trusted Partner",
    description: "Build trust through successful projects and verified impact.",
    icon: Award,
  },
];

// ============ BENEFITS ============
const benefits = [
  {
    icon: DollarSign,
    title: "Access to Funding",
    description: "Submit funding requests for your projects and receive direct support from donors.",
  },
  {
    icon: Users,
    title: "Global Network",
    description: "Connect with verified partners, healthcare providers, and organizations worldwide.",
  },
  {
    icon: TrendingUp,
    title: "Impact Tracking",
    description: "Track project progress, upload proof of impact, and build donor trust.",
  },
  {
    icon: Heart,
    title: "Resource Support",
    description: "Receive medical equipment, supplies, and operational resources.",
  },
  {
    icon: Shield,
    title: "Verified Status",
    description: "Get a verified partner badge that builds credibility and donor confidence.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Expand your impact across borders with our global donor network.",
  },
];

// ============ MAIN COMPONENT ============
export default function PartnershipsPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch verified partners from database
  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then((data) => {
        setPartners(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching partners:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Dynamic stats
  const stats = [
    { value: `${partners.length || 80}+`, label: "Verified Partners" },
    { value: "25+", label: "Countries" },
    { value: "$5M+", label: "Distributed" },
    { value: "500+", label: "Projects Completed" },
  ];

  return (
    <main className="min-h-screen bg-cloud">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-container mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <div className="bg-gold/20 rounded-full p-4 w-fit mx-auto mb-6 animate-fade-in">
            <Globe className="w-10 h-10 text-gold" />
          </div>
          <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm animate-fade-in">
            Global Partnerships
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4 animate-fade-in-up">
            Partner With Us. <br />
            <span className="text-gradient-gold">Scale Your Impact.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-in-up delay-100">
            Join our global network of verified NGOs, healthcare providers, and community
            organizations working together to create lasting change.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-8 animate-fade-in-up delay-200">
            <Link
              href="/partnerships/apply"
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <Handshake className="w-5 h-5" />
              Apply as Partner
            </Link>
            <Link
              href="/login"
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              Partner Login
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= STATS BAR ================= */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <p className="font-display text-3xl md:text-4xl font-bold text-navy">
                  {stat.value}
                </p>
                <p className="text-ink/70 mt-1 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR VERIFIED PARTNERS (DATABASE) ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Our Verified Partners
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
            Meet the organizations we trust to deliver aid where it's needed most.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-navy animate-spin" />
          </div>
        ) : partners.length === 0 ? (
          <div className="bg-white rounded-card p-12 text-center border border-gray-100">
            <Building2 className="w-12 h-12 text-ink/30 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-navy">
              No Verified Partners Yet
            </h3>
            <p className="text-ink/60 mt-2">
              Be the first to join our global network.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="card-hover bg-white rounded-card p-6 shadow-sm border border-gray-100 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-navy/10 rounded-full p-3">
                    <Building2 className="w-7 h-7 text-navy" />
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      partner.status === "TRUSTED"
                        ? "text-purple bg-purple/10"
                        : "text-success bg-success/10"
                    }`}
                  >
                    {partner.status === "TRUSTED" ? "Trusted" : "Verified"}
                  </span>
                </div>

                <h3 className="font-display font-bold text-navy text-lg">
                  {partner.orgName}
                </h3>
                <p className="text-ink/50 text-xs mt-1">{partner.orgType}</p>

                <div className="flex items-center gap-1 text-xs text-ink/60 mt-3">
                  <MapPin className="w-3 h-3" />
                  {partner.country}
                </div>

                <p className="text-ink/70 text-sm mt-3 leading-relaxed line-clamp-3 flex-1">
                  {partner.mission || "Working to create lasting change in communities."}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-ink/50">
                    {partner.projectCount} project
                    {partner.projectCount !== 1 ? "s" : ""}
                  </span>
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold font-semibold text-xs hover:text-gold/80 transition-colors flex items-center gap-1"
                    >
                      Visit Website
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= PARTNER TYPES ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Who Can Partner
            </h2>
            <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
              We work with a diverse network of organizations across healthcare, education,
              and community development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerTypes.map((type, i) => {
              const Icon = type.icon;
              return (
                <div
                  key={i}
                  className="card-hover bg-cloud rounded-card p-6 border border-gray-100 text-center"
                >
                  <div className={`${type.bgColor} rounded-full p-4 w-fit mx-auto mb-4`}>
                    <Icon className={`w-7 h-7 ${type.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-navy text-base">
                    {type.title}
                  </h3>
                  <p className="text-ink/70 text-sm mt-2 leading-relaxed">
                    {type.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= VERIFICATION WORKFLOW ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Partner Verification Process
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
            We verify every partner to build trust and ensure transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {verificationSteps.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="relative">
                <div className="bg-white rounded-card p-6 border border-gray-100 text-center h-full">
                  <div className="bg-navy text-white font-display font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <Icon className="w-7 h-7 text-gold mx-auto mb-3" />
                  <h3 className="font-display font-bold text-navy text-base">
                    {item.title}
                  </h3>
                  <p className="text-ink/70 text-sm mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {i < verificationSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                    <ChevronRight className="w-6 h-6 text-gold" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Partner Benefits
            </h2>
            <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
              As a verified partner, you gain access to funding, resources, and a global network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={i}
                  className="card-hover bg-cloud rounded-card p-6 border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/10 rounded-full p-3 shrink-0">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-navy text-base">
                        {benefit.title}
                      </h3>
                      <p className="text-ink/70 text-sm mt-2 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-purple text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white/10 rounded-full p-3 w-fit mb-6">
                <Handshake className="w-8 h-8 text-gold" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Ready to Partner With DHK LIFT?
              </h2>
              <p className="text-white/80 mt-4 leading-relaxed">
                Submit your application today and join our global network of change-makers.
                Our team will review your application within 5-7 business days.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/partnerships/apply"
                  className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Start Application
                </Link>
                <Link
                  href="/contact"
                  className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  Contact Team
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-card p-8 border border-white/20">
              <h3 className="font-display font-bold text-xl mb-6">What You'll Need</h3>
              <ul className="space-y-4">
                {[
                  "Organization registration documents",
                  "Mission and vision statement",
                  "Leadership team information",
                  "Previous project records",
                  "Financial documents",
                  "References from partners",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <span className="text-white/90 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}