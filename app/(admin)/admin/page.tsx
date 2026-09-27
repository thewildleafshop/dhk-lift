"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Users,
  FileText,
  Heart,
  Building2,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  FolderKanban,
  ShieldCheck,
  Stethoscope,
  DollarSign,
  Eye,
  Loader2,
  BookOpen,
} from "lucide-react";

// ============ TYPES ============
interface DashboardData {
  stats: {
    totalUsers: number;
    totalRaised: number;
    totalDonations: number;
    totalProjects: number;
    activeProjects: number;
    pendingApplications: number;
    pendingVerifications: number;
    pendingStories: number;
    pendingPartners: number;
  };
  recentDonations: {
    id: string;
    donorName: string | null;
    donorEmail: string;
    totalAmount: number;
    createdAt: string;
  }[];
  recentApplications: {
    id: string;
    confirmationNo: string;
    status: string;
    amountRequested: number | null;
    createdAt: string;
    user: { name: string | null; email: string };
    program: { name: string } | null;
  }[];
}

// ============ STATUS COLORS ============
const getStatusColor = (status: string) => {
  const map: Record<string, { color: string; bg: string }> = {
    SUBMITTED: { color: "text-info", bg: "bg-info/10" },
    UNDER_REVIEW: { color: "text-warning", bg: "bg-warning/10" },
    VERIFICATION: { color: "text-info", bg: "bg-info/10" },
    APPROVED: { color: "text-success", bg: "bg-success/10" },
    DENIED: { color: "text-error", bg: "bg-error/10" },
    COMPLETED: { color: "text-success", bg: "bg-success/10" },
  };
  return map[status] || { color: "text-navy", bg: "bg-navy/10" };
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/admin/dashboard");
        if (res.ok) {
          const result = await res.json();
          setData(result);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-navy animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-card p-12 text-center border border-gray-100">
        <p className="text-error font-semibold">Error loading dashboard</p>
      </div>
    );
  }

  const { stats, recentDonations, recentApplications } = data;

  // KPI Cards
  const kpis = [
    { label: "Total Users", value: stats.totalUsers.toLocaleString(), icon: Users, color: "text-navy", bgColor: "bg-navy/10", href: "/admin/users" },
    { label: "Pending Applications", value: stats.pendingApplications.toString(), icon: FileText, color: "text-warning", bgColor: "bg-warning/10", href: "/admin/applications" },
    { label: "Total Donations", value: stats.totalRaised >= 1000 ? `$${(stats.totalRaised / 1000).toFixed(1)}K` : `$${stats.totalRaised}`, icon: Heart, color: "text-gold", bgColor: "bg-gold/10", href: "/admin/donations" },
    { label: "Total Raised", value: stats.totalRaised >= 1000 ? `$${(stats.totalRaised / 1000).toFixed(1)}K` : `$${stats.totalRaised}`, icon: TrendingUp, href: "/admin/reports" },
  ];

  // Action Required
  const actionRequired = [
    { title: `${stats.pendingApplications} Applications Awaiting Review`, description: "Applications need your attention.", count: stats.pendingApplications, priority: stats.pendingApplications > 3 ? "high" : "medium", icon: FileText, color: "text-warning", bgColor: "bg-warning/10", href: "/admin/applications" },
    { title: `${stats.pendingVerifications} Milestones Need Verification`, description: "Project milestones submitted with proof need verification.", count: stats.pendingVerifications, priority: stats.pendingVerifications > 3 ? "high" : "medium", icon: ShieldCheck, color: "text-purple", bgColor: "bg-purple/10", href: "/admin/verification" },
    { title: `${stats.pendingPartners} Partner Applications Pending`, description: "New partner applications awaiting review.", count: stats.pendingPartners, priority: stats.pendingPartners > 0 ? "high" : "medium", icon: Building2, color: "text-teal", bgColor: "bg-teal/10", href: "/admin/partners" },
    { title: `${stats.pendingStories} Stories Pending Approval`, description: "Community stories awaiting moderation.", count: stats.pendingStories, priority: stats.pendingStories > 0 ? "high" : "medium", icon: BookOpen, color: "text-gold", bgColor: "bg-gold/10", href: "/admin/stories" },
  ];

  // Quick Stats
  const quickStats = [
    { label: "Active Projects", value: stats.activeProjects.toString(), icon: FolderKanban, href: "/admin/projects" },
    { label: "Total Donations", value: stats.totalDonations.toString(), icon: DollarSign, href: "/admin/donations" },
    { label: "Pending Reviews", value: stats.pendingApplications.toString(), icon: Clock, href: "/admin/applications" },
    { label: "Total Raised", value: `$${(stats.totalRaised / 1000).toFixed(1)}K`, icon: TrendingUp, href: "/admin/reports" },
  ];

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">Admin Dashboard</h1>
          <p className="text-ink/70 mt-1">Overview of all platform activity and pending actions.</p>
        </div>
        <Link href="/admin/reports" className="btn-lift bg-navy text-white font-semibold px-6 py-3 rounded-input hover:bg-navy/90 transition-colors shadow-sm flex items-center gap-2 w-fit text-sm">
          <Eye className="w-4 h-4" />
          View Reports
        </Link>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <Link key={i} href={kpi.href} className="card-hover bg-white rounded-card p-5 border border-gray-100 group">
              <div className={`${kpi.bgColor} rounded-full p-3 w-fit`}>
                <Icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <p className="font-display text-2xl font-bold text-navy mt-4">{kpi.value}</p>
              <p className="text-ink/60 text-sm mt-1">{kpi.label}</p>
            </Link>
          );
        })}
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link key={i} href={stat.href} className="bg-white rounded-card p-4 border border-gray-100 hover:border-gold transition-colors flex items-center gap-3">
              <div className="bg-cloud rounded-full p-2.5 shrink-0">
                <Icon className="w-5 h-5 text-navy" />
              </div>
              <div className="min-w-0">
                <p className="font-display font-bold text-navy text-lg leading-tight">{stat.value}</p>
                <p className="text-ink/60 text-xs truncate">{stat.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ACTION REQUIRED */}
        <div className="lg:col-span-2 bg-white rounded-card shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              <h2 className="font-display font-bold text-navy text-lg">Action Required</h2>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {actionRequired.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link key={i} href={item.href} className="flex items-center gap-4 p-5 hover:bg-cloud/50 transition-colors group">
                  <div className={`${item.bgColor} rounded-full p-3 shrink-0`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-navy text-sm truncate">{item.title}</p>
                      {item.priority === "high" && (
                        <span className="text-xs font-semibold text-error bg-error/10 px-2 py-0.5 rounded-full shrink-0">Urgent</span>
                      )}
                    </div>
                    <p className="text-ink/60 text-xs mt-1 truncate">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-display font-bold text-navy text-lg">{item.count}</span>
                    <ChevronRight className="w-4 h-4 text-ink/40 group-hover:text-gold transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* RECENT DONATIONS */}
        <div className="bg-white rounded-card shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-gold" />
              <h2 className="font-display font-bold text-navy text-lg">Recent Donations</h2>
            </div>
            <Link href="/admin/donations" className="text-gold font-semibold text-xs hover:text-gold/80 transition-colors">View All</Link>
          </div>

          {recentDonations.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {recentDonations.map((donation) => (
                <div key={donation.id} className="flex items-center gap-3 p-4 hover:bg-cloud/30 transition-colors">
                  <div className="bg-gold/10 rounded-full p-2.5 shrink-0">
                    <Heart className="w-4 h-4 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy text-xs truncate">
                      {donation.donorName || "Anonymous Donor"}
                    </p>
                    <p className="text-ink/50 text-xs truncate">{donation.donorEmail}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-display font-bold text-navy text-sm">${donation.totalAmount}</p>
                    <p className="text-ink/40 text-xs">
                      {new Date(donation.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-ink/50 text-sm text-center py-8">No donations yet.</p>
          )}
        </div>
      </div>

      {/* RECENT APPLICATIONS */}
      <div className="bg-white rounded-card shadow-sm border border-gray-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-warning" />
            <h2 className="font-display font-bold text-navy text-lg">Recent Applications</h2>
          </div>
          <Link href="/admin/applications" className="text-gold font-semibold text-xs hover:text-gold/80 transition-colors">View All</Link>
        </div>

        {recentApplications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentApplications.map((app) => {
              const statusColor = getStatusColor(app.status);
              return (
                <Link key={app.id} href={`/admin/applications/${app.id}`} className="flex items-center gap-4 p-4 hover:bg-cloud/30 transition-colors">
                  <div className="bg-warning/10 rounded-full p-2.5 shrink-0">
                    <FileText className="w-4 h-4 text-warning" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy text-sm truncate">
                      {app.user.name || app.user.email}
                    </p>
                    <p className="text-ink/50 text-xs truncate">
                      {app.program?.name || "General"} • {app.confirmationNo.slice(0, 8)}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold ${statusColor.color} ${statusColor.bg} px-2.5 py-1 rounded-full shrink-0`}>
                    {app.status.replace("_", " ")}
                  </span>
                  {app.amountRequested && (
                    <p className="font-display font-bold text-navy text-sm shrink-0">
                      ${app.amountRequested.toLocaleString()}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-ink/50 text-sm text-center py-8">No applications yet.</p>
        )}
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
        <h2 className="font-display font-bold text-navy text-lg mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Review Applications", href: "/admin/applications", icon: FileText, color: "text-warning" },
            { label: "Verify Projects", href: "/admin/verification", icon: ShieldCheck, color: "text-purple" },
            { label: "Manage Users", href: "/admin/users", icon: Users, color: "text-navy" },
            { label: "View Reports", href: "/admin/reports", icon: TrendingUp, color: "text-gold" },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <Link key={i} href={action.href} className="flex flex-col items-center gap-3 p-5 bg-cloud rounded-card border border-gray-100 hover:border-gold hover:bg-gold/5 transition-all group text-center">
                <div className="bg-white rounded-full p-3 shadow-sm group-hover:scale-110 transition-transform">
                  <Icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <span className="text-sm font-semibold text-navy">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}