"use client";

import Link from "next/link";
import {
  FolderKanban,
  PlusCircle,
  DollarSign,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Users,
  MapPin,
} from "lucide-react";

// Demo data for the dashboard overview
const recentProjects = [
  {
    id: "PROJ-24001",
    title: "Clean Water for Rural Sindh",
    status: "IN_PROGRESS",
    location: "Sindh, Pakistan",
    raised: 45000,
    goal: 60000,
    statusColor: "text-info bg-info/10",
  },
  {
    id: "PROJ-24003",
    title: "School Renovation Project",
    status: "FUNDRAISING",
    location: "Karachi, Pakistan",
    raised: 25000,
    goal: 50000,
    statusColor: "text-gold bg-gold/10",
  },
  {
    id: "PROJ-24005",
    title: "Wheelchair Distribution Drive",
    status: "SUBMITTED",
    location: "Lahore, Pakistan",
    raised: 0,
    goal: 30000,
    statusColor: "text-teal bg-teal/10",
  },
];

export default function PartnerDashboardPage() {
  return (
    <div className="space-y-6">
      
      {/* ================= WELCOME BANNER ================= */}
      <div className="bg-navy rounded-card p-6 md:p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
            Welcome back, Partner!
          </h1>
          <p className="text-white/80 max-w-2xl">
            Here is an overview of your organization's projects, funding, and verification status.
          </p>
        </div>
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-card p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-navy/10 rounded-lg text-navy">
              <FolderKanban className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-success bg-success/10 px-2 py-1 rounded-full">+2 this month</span>
          </div>
          <p className="text-ink/60 text-sm">Total Projects</p>
          <p className="font-display text-2xl font-bold text-navy">6</p>
        </div>

        <div className="bg-white rounded-card p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-info/10 rounded-lg text-info">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-ink/60 text-sm">Active Projects</p>
          <p className="font-display text-2xl font-bold text-navy">2</p>
        </div>

        <div className="bg-white rounded-card p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-gold/10 rounded-lg text-gold">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-success bg-success/10 px-2 py-1 rounded-full">+$15K</span>
          </div>
          <p className="text-ink/60 text-sm">Total Raised</p>
          <p className="font-display text-2xl font-bold text-navy">$185K</p>
        </div>

        <div className="bg-white rounded-card p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-success/10 rounded-lg text-success">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-ink/60 text-sm">Verification Status</p>
          <p className="font-display text-lg font-bold text-success mt-1">Verified</p>
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
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

      {/* ================= RECENT PROJECTS ================= */}
      <div className="bg-white rounded-card border border-gray-100 shadow-sm">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-navy">Recent Projects</h2>
          <Link href="/partner/projects" className="text-sm font-medium text-teal hover:text-teal/80 flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {recentProjects.map((project) => (
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
                    <span className={`px-2 py-0.5 rounded-full font-medium ${project.statusColor}`}>
                      {project.status.replace("_", " ")}
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
          ))}
        </div>
      </div>

    </div>
  );
}