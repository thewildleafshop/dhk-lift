"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FolderKanban,
  PlusCircle,
  DollarSign,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  MapPin,
  Loader2,
  ShieldCheck,
  Ban,
} from "lucide-react";

// ============ TYPES ============
type ProjectStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "APPROVED"
  | "FUNDRAISING"
  | "FUNDED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "VERIFIED";

interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  status: ProjectStatus;
  goal: number;
  raised: number;
  milestones: { completed: number; total: number };
  createdAt: string;
}

interface Partner {
  id: string;
  orgName: string;
  orgType: string;
  country: string;
  website: string | null;
  mission: string | null;
  status: "APPLICANT" | "VERIFIED" | "TRUSTED" | "SUSPENDED";
  verifiedAt: string | null;
  user: { id: string; name: string; email: string };
  projectCount: number;
}

// ============ STATUS CONFIG ============
const projectStatusConfig: Record<ProjectStatus, { label: string; color: string; bg: string }> = {
  DRAFT: { label: "Draft", color: "text-ink/70", bg: "bg-gray-100" },
  SUBMITTED: { label: "Submitted", color: "text-info", bg: "bg-info/10" },
  APPROVED: { label: "Approved", color: "text-teal", bg: "bg-teal/10" },
  FUNDRAISING: { label: "Fundraising", color: "text-gold", bg: "bg-gold/10" },
  FUNDED: { label: "Funded", color: "text-teal", bg: "bg-teal/10" },
  IN_PROGRESS: { label: "In Progress", color: "text-info", bg: "bg-info/10" },
  COMPLETED: { label: "Completed", color: "text-success", bg: "bg-success/10" },
  VERIFIED: { label: "Verified", color: "text-success", bg: "bg-success/10" },
};

const partnerStatusConfig: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  APPLICANT: { label: "Applicant", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  VERIFIED: { label: "Verified", color: "text-teal", bg: "bg-teal/10", icon: CheckCircle },
  TRUSTED: { label: "Trusted Partner", color: "text-success", bg: "bg-success/10", icon: ShieldCheck },
  SUSPENDED: { label: "Suspended", color: "text-error", bg: "bg-error/10", icon: Ban },
};

export default function PartnerDashboardPage() {
  const [partner, setPartner] = useState<Partner | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [partnerRes, projectsRes] = await Promise.all([
          fetch("/api/partners"),
          fetch("/api/projects"),
        ]);

        if (!partnerRes.ok || !projectsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const partnerData = await partnerRes.json();
        const projectsData = await projectsRes.json();

        setPartner(partnerData[0] || null);
        setProjects(projectsData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-navy animate-spin mx-auto mb-4" />
          <p className="text-ink/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !partner) {
    return (
      <div className="bg-white rounded-card p-12 text-center border border-gray-100">
        <p className="text-error font-semibold mb-2">Error loading dashboard</p>
        <p className="text-ink/60 text-sm">{error || "Partner profile not found"}</p>
      </div>
    );
  }

  // ============ STATS CALCULATION ============
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) =>
    ["IN_PROGRESS", "FUNDRAISING", "FUNDED"].includes(p.status)
  ).length;
  const totalRaised = projects.reduce((sum, p) => sum + p.raised, 0);
  const recentProjects = projects.slice(0, 3);

  const partnerStatus = partnerStatusConfig[partner.status] || partnerStatusConfig.APPLICANT;
  const PartnerStatusIcon = partnerStatus.icon;

  return (
    <div className="space-y-6">
      
      {/* WELCOME BANNER */}
      <div className="bg-navy rounded-card p-6 md:p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
            Welcome back, {partner.orgName}!
          </h1>
          <p className="text-white/80 max-w-2xl">
            Here is an overview of your organization's projects, funding, and verification status.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-card p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-navy/10 rounded-lg text-navy">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <p className="text-ink/60 text-sm">Total Projects</p>
          <p className="font-display text-2xl font-bold text-navy">{totalProjects}</p>
        </div>

        <div className="bg-white rounded-card p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-info/10 rounded-lg text-info">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-ink/60 text-sm">Active Projects</p>
          <p className="font-display text-2xl font-bold text-navy">{activeProjects}</p>
        </div>

        <div className="bg-white rounded-card p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-gold/10 rounded-lg text-gold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-ink/60 text-sm">Total Raised</p>
          <p className="font-display text-2xl font-bold text-navy">
            ${(totalRaised / 1000).toFixed(0)}K
          </p>
        </div>

        <div className="bg-white rounded-card p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${partnerStatus.bg} ${partnerStatus.color}`}>
              <PartnerStatusIcon className="w-5 h-5" />
            </div>
          </div>
          <p className="text-ink/60 text-sm">Verification Status</p>
          <p className={`font-display text-lg font-bold mt-1 ${partnerStatus.color}`}>
            {partnerStatus.label}
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h2 className="font-display text-lg font-bold text-navy mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/partner/projects/submit" 
            className="bg-gold/10 border border-gold/20 rounded-card p-5 hover:bg-gold/20 transition-colors flex items-center justify-between group"
          >
            <div>
              <h3 className="font-bold text-navy mb-1">Submit New Project</h3>
              <p className="text-sm text-ink/60">Start a new project proposal for review.</p>
            </div>
            <div className="bg-gold p-3 rounded-full text-ink group-hover:scale-110 transition-transform">
              <PlusCircle className="w-5 h-5" />
            </div>
          </Link>

          <Link 
            href="/partner/funding" 
            className="bg-teal/10 border border-teal/20 rounded-card p-5 hover:bg-teal/20 transition-colors flex items-center justify-between group"
          >
            <div>
              <h3 className="font-bold text-navy mb-1">Request Funding</h3>
              <p className="text-sm text-ink/60">Submit a new funding request for an existing project.</p>
            </div>
            <div className="bg-teal p-3 rounded-full text-white group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
          </Link>
        </div>
      </div>

      {/* RECENT PROJECTS */}
      {recentProjects.length > 0 ? (
        <div className="bg-white rounded-card border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-navy">Recent Projects</h2>
            <Link href="/partner/projects" className="text-sm font-medium text-teal hover:text-teal/80 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentProjects.map((project) => {
              const status = projectStatusConfig[project.status] || projectStatusConfig.SUBMITTED;
              return (
                <div key={project.id} className="p-5 flex items-center justify-between hover:bg-cloud/50 transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="bg-navy/5 p-3 rounded-full shrink-0">
                      <FolderKanban className="w-5 h-5 text-navy" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-navy truncate">{project.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-ink/60">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {project.location}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full font-medium ${status.color} ${status.bg}`}>
                          {status.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="font-bold text-navy text-sm">
                      ${project.raised.toLocaleString()}
                    </p>
                    <p className="text-xs text-ink/50">of ${project.goal.toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-card p-12 text-center border border-gray-100">
          <div className="bg-cloud rounded-full p-6 w-fit mx-auto mb-4">
            <FolderKanban className="w-12 h-12 text-ink/30" />
          </div>
          <h3 className="font-display text-xl font-bold text-navy">No Projects Yet</h3>
          <p className="text-ink/60 mt-2 max-w-md mx-auto">
            Start by submitting your first project proposal.
          </p>
          <Link
            href="/partner/projects/submit"
            className="btn-lift inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg mt-6"
          >
            <PlusCircle className="w-5 h-5" />
            Submit Your First Project
          </Link>
        </div>
      )}

    </div>
  );
}