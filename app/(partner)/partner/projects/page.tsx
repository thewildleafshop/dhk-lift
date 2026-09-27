"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FolderKanban,
  PlusCircle,
  Search,
  Eye,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  MapPin,
  Calendar,
  ChevronRight,
  Inbox,
  Loader2,
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
  description: string;
  location: string;
  status: ProjectStatus;
  goal: number;
  raised: number;
  milestones: { completed: number; total: number };
  createdAt: string;
}

// ============ STATUS CONFIG ============
const statusConfig: Record<ProjectStatus, { label: string; color: string; bg: string; icon: any }> = {
  DRAFT: { label: "Draft", color: "text-ink/70", bg: "bg-gray-100", icon: FolderKanban },
  SUBMITTED: { label: "Submitted", color: "text-info", bg: "bg-info/10", icon: Clock },
  APPROVED: { label: "Approved", color: "text-teal", bg: "bg-teal/10", icon: CheckCircle },
  FUNDRAISING: { label: "Fundraising", color: "text-gold", bg: "bg-gold/10", icon: TrendingUp },
  FUNDED: { label: "Funded", color: "text-teal", bg: "bg-teal/10", icon: CheckCircle },
  IN_PROGRESS: { label: "In Progress", color: "text-info", bg: "bg-info/10", icon: TrendingUp },
  COMPLETED: { label: "Completed", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  VERIFIED: { label: "Verified", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
};

// ============ FILTER TABS ============
const filterTabs: { id: ProjectStatus | "ALL"; label: string }[] = [
  { id: "ALL", label: "All Projects" },
  { id: "SUBMITTED", label: "Submitted" },
  { id: "APPROVED", label: "Approved" },
  { id: "FUNDRAISING", label: "Fundraising" },
  { id: "IN_PROGRESS", label: "In Progress" },
  { id: "COMPLETED", label: "Completed" },
  { id: "VERIFIED", label: "Verified" },
];

export default function PartnerProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "ALL">("ALL");

  // ✅ API se data fetch karne ke liye states
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ API se data fetch karein
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: projects.length,
    active: projects.filter((p) => ["IN_PROGRESS", "FUNDRAISING", "FUNDED"].includes(p.status)).length,
    completed: projects.filter((p) => ["COMPLETED", "VERIFIED"].includes(p.status)).length,
    totalRaised: projects.reduce((sum, p) => sum + p.raised, 0),
  };

  // ============ LOADING STATE ============
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-navy animate-spin mx-auto mb-4" />
          <p className="text-ink/60">Loading your projects...</p>
        </div>
      </div>
    );
  }

  // ============ ERROR STATE ============
  if (error) {
    return (
      <div className="bg-white rounded-card p-12 text-center border border-gray-100">
        <p className="text-error font-semibold mb-2">Error loading projects</p>
        <p className="text-ink/60 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
            My Projects
          </h1>
          <p className="text-ink/70 mt-1">
            Manage all your submitted projects and track their progress.
          </p>
        </div>
        <Link
          href="/partner/projects/submit"
          className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 w-fit text-sm"
        >
          <PlusCircle className="w-4 h-4" />
          Submit New Project
        </Link>
      </div>

      {/* ================= STATS ROW ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <FolderKanban className="w-4 h-4 text-navy" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Total</p>
          </div>
          <p className="font-display text-2xl font-bold text-navy">{stats.total}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-info" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Active</p>
          </div>
          <p className="font-display text-2xl font-bold text-info">{stats.active}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-success" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Completed</p>
          </div>
          <p className="font-display text-2xl font-bold text-success">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-gold" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Total Raised</p>
          </div>
          <p className="font-display text-2xl font-bold text-gold">
            ${(stats.totalRaised / 1000).toFixed(0)}K
          </p>
        </div>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="bg-white rounded-card p-4 border border-gray-100 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, location, or description..."
            className="w-full pl-12 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                statusFilter === tab.id
                  ? "bg-navy text-white shadow-sm"
                  : "bg-cloud text-ink/70 hover:bg-navy/5 hover:text-navy"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ================= PROJECTS LIST ================= */}
      {filteredProjects.length > 0 ? (
        <div className="space-y-4">
          {filteredProjects.map((project) => {
            const status = statusConfig[project.status];
            const StatusIcon = status.icon;
            const progress = project.goal > 0 ? Math.round((project.raised / project.goal) * 100) : 0;

            return (
              <div
                key={project.id}
                className="card-hover bg-white rounded-card p-6 shadow-sm border border-gray-100"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4">
                      <div className="bg-navy/5 rounded-full p-3 shrink-0">
                        <FolderKanban className="w-6 h-6 text-navy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display font-bold text-navy text-lg">
                            {project.title}
                          </h3>
                          <span className={`text-xs font-semibold ${status.color} ${status.bg} px-3 py-1 rounded-full flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-ink/60">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {project.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(project.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                        </div>

                        {progress > 0 && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-ink/60 mb-1">
                              <span className="font-semibold text-navy">
                                ${project.raised.toLocaleString()} raised
                              </span>
                              <span>of ${project.goal.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-gold to-gold/70 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:items-end gap-3 shrink-0">
                    <div className="flex items-center gap-3 lg:justify-end">
                      <div className="text-right">
                        <p className="text-xs text-ink/50">Milestones</p>
                        <p className="font-display font-bold text-navy text-sm">
                          {project.milestones.completed}/{project.milestones.total}
                        </p>
                      </div>
                      <div className="w-px h-8 bg-gray-200"></div>
                      <div className="text-right">
                        <p className="text-xs text-ink/50">Progress</p>
                        <p className="font-display font-bold text-gold text-sm">
                          {progress}%
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/partner/projects/${project.id}`}
                      className="btn-lift bg-navy text-white font-semibold px-5 py-2.5 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Manage Project
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-card p-12 text-center border border-gray-100">
          <div className="bg-cloud rounded-full p-6 w-fit mx-auto mb-4">
            <Inbox className="w-12 h-12 text-ink/30" />
          </div>
          <h3 className="font-display text-xl font-bold text-navy">
            No Projects Found
          </h3>
          <p className="text-ink/60 mt-2 max-w-md mx-auto">
            {searchQuery || statusFilter !== "ALL"
              ? "Try adjusting your filters or search query."
              : "You haven't submitted any projects yet."}
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