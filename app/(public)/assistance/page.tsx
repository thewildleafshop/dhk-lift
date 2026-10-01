"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ChevronRight,
  Utensils,
  BookOpen,
  Stethoscope,
  Home,
  HeartHandshake,
  Accessibility,
  Users,
  FileText,
  Shield,
  Clock,
  MapPin,
  CheckCircle,
  Loader2,
} from "lucide-react";

// Icon mapping (database se icon nahi aata, isliye manually map karenge)
const iconMap: Record<string, any> = {
  "LIFT Health": Stethoscope,
  "LIFT Protect": HeartHandshake,
  "LIFT Ability": Accessibility,
  "LIFT Community": Users,
  "Children & Families": Home,
  "Food Security": Utensils,
  "Education Support": BookOpen,
  "Disaster Relief": Home,
};

const colorMap: Record<string, { color: string; bgColor: string }> = {
  "LIFT Health": { color: "text-teal", bgColor: "bg-teal/10" },
  "LIFT Protect": { color: "text-purple", bgColor: "bg-purple/10" },
  "LIFT Ability": { color: "text-navy", bgColor: "bg-navy/10" },
  "LIFT Community": { color: "text-gold", bgColor: "bg-gold/10" },
  "Children & Families": { color: "text-purple", bgColor: "bg-purple/10" },
  "Food Security": { color: "text-gold", bgColor: "bg-gold/10" },
  "Education Support": { color: "text-teal", bgColor: "bg-teal/10" },
  "Disaster Relief": { color: "text-navy", bgColor: "bg-navy/10" },
};

// Quick search tags
const quickTags = [
  { label: "Medical", query: "medical" },
  { label: "Food", query: "food" },
  { label: "Education", query: "education" },
  { label: "Disability", query: "disability" },
  { label: "Protection", query: "protection" },
];

export default function AssistancePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch programs from API
  useEffect(() => {
    fetch("/api/programs")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((p: any) => ({
          id: p.slug,
          name: p.name,
          icon: iconMap[p.name] || FileText,
          description: p.description,
          ...(colorMap[p.name] || { color: "text-navy", bgColor: "bg-navy/10" }),
          programHref: `/programs/${p.slug}`,
          applyHref: `/assistance/apply?program=${p.slug}`,
          assistanceTypes: [p.category],
        }));
        setPrograms(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching programs:", err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/assistance/finder?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/assistance/finder");
    }
  };

  return (
    <main className="min-h-screen bg-cloud">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-container mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm animate-fade-in">
            Get the Help You Need
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4 animate-fade-in-up">
            Find Assistance. <br />
            <span className="text-gradient-gold">Restore Hope.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-in-up delay-100">
            DHK LIFT provides assistance through seven core programs.
            Search, apply, and track your application — all in one place.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mt-8 animate-fade-in-up delay-200">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by need, program, or location..."
                className="w-full pl-14 pr-32 py-4 md:py-5 rounded-input border-0 bg-white text-ink placeholder:text-ink/40 focus:outline-none focus:ring-4 focus:ring-gold/30 shadow-2xl text-base"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors text-sm"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-2 justify-center mt-6 animate-fade-in-up delay-300">
            <span className="text-white/60 text-sm mr-2">Quick:</span>
            {quickTags.map((tag) => (
              <Link
                key={tag.label}
                href={`/assistance/finder?q=${tag.query}`}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full transition-colors border border-white/10"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRUST BAR ================= */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-container mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-teal shrink-0" />
              <span className="text-ink/70 text-sm font-medium">Verified Programs</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-teal shrink-0" />
              <span className="text-ink/70 text-sm font-medium">Fast Review</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-teal shrink-0" />
              <span className="text-ink/70 text-sm font-medium">100% Free</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-teal shrink-0" />
              <span className="text-ink/70 text-sm font-medium">Global Reach</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROGRAMS GRID ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Browse Assistance Programs
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
            Select a program to see eligibility, required documents, and start your application.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-navy animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <div
                  key={program.id}
                  className="card-hover bg-white rounded-card p-6 shadow-sm border border-gray-100 flex flex-col"
                >
                  <div className={`${program.bgColor} rounded-full p-4 w-fit mb-5`}>
                    <Icon className={`w-8 h-8 ${program.color}`} />
                  </div>

                  <h3 className="font-display font-bold text-navy text-xl">
                    {program.name}
                  </h3>
                  <p className="text-ink/70 text-sm mt-3 leading-relaxed flex-1">
                    {program.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {program.assistanceTypes.map((type: string) => (
                      <span
                        key={type}
                        className="text-xs font-medium text-navy bg-navy/5 px-3 py-1 rounded-full"
                      >
                        {type}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 pt-5 border-t border-gray-100 flex flex-wrap gap-2">
                    <Link
                      href={program.applyHref}
                      className="btn-lift flex-1 min-w-fit bg-gold text-ink font-semibold px-4 py-2.5 rounded-input hover:bg-gold/90 transition-colors flex items-center justify-center gap-1.5 text-sm"
                    >
                      <FileText className="w-4 h-4 shrink-0" />
                      Apply Now
                    </Link>
                    <Link
                      href={program.programHref}
                      className="btn-lift flex-1 min-w-fit border-2 border-navy/20 text-navy font-semibold px-4 py-2.5 rounded-input hover:bg-navy/5 transition-colors flex items-center justify-center gap-1.5 text-sm"
                    >
                      Learn More
                      <ChevronRight className="w-4 h-4 shrink-0" />
                    </Link>
                  </div>
                </div>
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
              How It Works
            </h2>
            <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
              Getting assistance is simple. Here are the four steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Find Program",
                desc: "Browse our 7 LIFT programs and find the one that matches your need.",
              },
              {
                step: "02",
                title: "Check Eligibility",
                desc: "Review the eligibility criteria and required documents.",
              },
              {
                step: "03",
                title: "Submit Application",
                desc: "Fill the multi-step form and upload required documents.",
              },
              {
                step: "04",
                title: "Track Status",
                desc: "Monitor your application status in real-time through your dashboard.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-cloud rounded-card p-6 border border-gray-100 card-hover text-center"
              >
                <div className="bg-navy text-white font-display font-bold text-2xl w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-display font-bold text-navy text-lg">{item.title}</h3>
                <p className="text-ink/70 text-sm mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEED HELP CTA ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="bg-gradient-to-br from-navy to-navy/90 rounded-card p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Not Sure Which Program to Choose?
            </h2>
            <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
              Our Assistance Finder will help you identify the right program based on your
              specific needs and location.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link
                href="/assistance/finder"
                className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Use Assistance Finder
              </Link>
              <Link
                href="/contact"
                className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                Contact Support
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}