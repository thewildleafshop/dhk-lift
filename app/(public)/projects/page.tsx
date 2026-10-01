"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import {
  Search,
  MapPin,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  ChevronRight,
  Globe,
  Target,
  FileText,
  Shield,
  Award,
  Loader2,
} from "lucide-react";

// ============ PROJECT STATUS ============
const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  DRAFT: { label: "Draft", color: "text-ink/60", bg: "bg-gray-100" },
  SUBMITTED: { label: "Submitted", color: "text-info", bg: "bg-info/10" },
  APPROVED: { label: "Approved", color: "text-teal", bg: "bg-teal/10" },
  FUNDRAISING: { label: "Fundraising", color: "text-gold", bg: "bg-gold/10" },
  FUNDED: { label: "Funded", color: "text-teal", bg: "bg-teal/10" },
  IN_PROGRESS: { label: "In Progress", color: "text-info", bg: "bg-info/10" },
  COMPLETED: { label: "Completed", color: "text-success", bg: "bg-success/10" },
  VERIFIED: { label: "Verified", color: "text-success", bg: "bg-success/10" },
};

// ============ CATEGORY FILTERS ============
const categories = [
  "All Projects",
  "Healthcare",
  "Education",
  "Food Security",
  "Water & Sanitation",
  "Disability Support",
  "Children & Families",
  "Emergency Relief",
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Projects");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          location: p.location,
          partner: p.partner,
          status: p.status,
          category: p.category || "General",
          raised: p.raised || 0,
          goal: p.goal || 0,
          beneficiaries: p.beneficiaries || 0,
          image: p.image || "/images/programs/disasterRelief.png",
          verified: p.verified !== false,
        }));
        setProjects(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.partner.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All Projects" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, activeCategory]);

  return (
    <main className="min-h-screen bg-cloud">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-container mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <div className="bg-gold/20 rounded-full p-4 w-fit mx-auto mb-6 animate-fade-in">
            <Target className="w-10 h-10 text-gold" />
          </div>
          <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm animate-fade-in">
            Verified Projects
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4 animate-fade-in-up">
            Real Projects. <br />
            <span className="text-gradient-gold">Verified Impact.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-in-up delay-100">
            Explore our active and completed projects. Every project is verified,
            tracked, and transparently documented.
          </p>

          <div className="max-w-2xl mx-auto mt-8 animate-fade-in-up delay-200">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, location, or category..."
                className="w-full pl-14 pr-32 py-4 md:py-5 rounded-input border-0 bg-white text-ink placeholder:text-ink/40 focus:outline-none focus:ring-4 focus:ring-gold/30 shadow-2xl text-base"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors text-sm">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS BAR ================= */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-navy">
                {projects.length}+
              </p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Active Projects</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-navy">$5M+</p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Funds Distributed</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-navy">25+</p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Countries</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-navy">100%</p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Verified Impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FILTERS ================= */}
      <section className="max-w-container mx-auto px-6 py-8">
        <div className="bg-white rounded-card p-4 shadow-sm border border-gray-100">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-navy text-white"
                    : "bg-cloud text-ink/70 hover:bg-navy/5 hover:text-navy"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS GRID ================= */}
      <section className="max-w-container mx-auto px-6 pb-16 md:pb-24">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-navy animate-spin" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-white rounded-card p-12 text-center border border-gray-100">
            <Search className="w-12 h-12 text-ink/30 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-navy">No Projects Found</h3>
            <p className="text-ink/60 mt-2">Try adjusting your search or category filter.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All Projects");
              }}
              className="mt-6 text-navy font-semibold hover:text-gold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const status = statusConfig[project.status] || statusConfig.DRAFT;
              const progress =
                project.goal > 0 ? Math.round((project.raised / project.goal) * 100) : 0;

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="card-hover bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className={`absolute top-4 left-4 ${status.bg} backdrop-blur-sm text-xs font-semibold ${status.color} px-3 py-1.5 rounded-full flex items-center gap-1`}
                    >
                      {project.status === "VERIFIED" || project.status === "COMPLETED" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : project.status === "IN_PROGRESS" ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {status.label}
                    </div>
                    {project.verified && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-success p-2 rounded-full shadow-sm">
                        <Shield className="w-4 h-4" />
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 bg-navy/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      {progress}% Funded
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full w-fit">
                      {project.category}
                    </span>

                    <h3 className="font-display font-bold text-navy text-lg mt-3">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-ink/60">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {project.location}
                      </span>
                      {project.beneficiaries > 0 && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {project.beneficiaries.toLocaleString()} beneficiaries
                        </span>
                      )}
                    </div>

                    <p className="text-ink/60 text-xs mt-2">by {project.partner}</p>

                    <div className="mt-4 flex-1 flex flex-col justify-end">
                      <div className="flex justify-between text-xs text-ink/60 mb-2">
                        <span className="font-semibold text-navy">
                          ${project.raised.toLocaleString()} raised
                        </span>
                        <span>of ${project.goal.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-gold to-gold/70 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-2">
                      <div className="flex-1 text-gold font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Project
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= TRANSPARENCY SECTION ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Transparency You Can Trust
            </h2>
            <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
              Every project is verified with evidence, receipts, and progress reports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Verified Partners",
                desc: "All projects are executed by verified partners with proven track records.",
              },
              {
                icon: FileText,
                title: "Documented Proof",
                desc: "Receipts, invoices, and photos provide complete transparency.",
              },
              {
                icon: Award,
                title: "Impact Verification",
                desc: "Every milestone is reviewed and verified by our team before approval.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-cloud rounded-card p-8 border border-gray-100 card-hover text-center"
                >
                  <div className="bg-navy/10 rounded-full p-4 w-fit mx-auto mb-4">
                    <Icon className="w-8 h-8 text-navy" />
                  </div>
                  <h3 className="font-display font-bold text-navy text-lg">{item.title}</h3>
                  <p className="text-ink/70 text-sm mt-3 leading-relaxed">{item.desc}</p>
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
            <Globe className="w-10 h-10 text-gold" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Support a Project Today
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Your donation directly funds verified projects that create real,
            measurable change in communities worldwide.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/giving"
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Donate to a Project
            </Link>
            <Link
              href="/partnerships"
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              Become a Partner
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}