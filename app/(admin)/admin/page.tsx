"use client";

import Link from "next/link";
import {
  Users,
  FileText,
  Heart,
  Building2,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  ArrowUpRight,
  FolderKanban,
  ShieldCheck,
  Stethoscope,
  DollarSign,
  Eye,
} from "lucide-react";

// ============ KPI STATS ============
const kpis = [
  {
    label: "Total Users",
    value: "12,450",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-navy",
    bgColor: "bg-navy/10",
    href: "/admin/users",
  },
  {
    label: "Pending Applications",
    value: "48",
    change: "+8",
    trend: "up",
    icon: FileText,
    color: "text-warning",
    bgColor: "bg-warning/10",
    href: "/admin/applications",
  },
  {
    label: "Total Donations",
    value: "$2.5M",
    change: "+18%",
    trend: "up",
    icon: Heart,
    color: "text-gold",
    bgColor: "bg-gold/10",
    href: "/admin/donations",
  },
  {
    label: "Verified Partners",
    value: "80",
    change: "+5",
    trend: "up",
    icon: Building2,
    color: "text-teal",
    bgColor: "bg-teal/10",
    href: "/admin/partners",
  },
];

// ============ ACTION REQUIRED ============
const actionRequired = [
  {
    type: "application",
    title: "12 Applications Awaiting Review",
    description: "Applications submitted more than 3 days ago need attention.",
    count: 12,
    priority: "high",
    icon: FileText,
    color: "text-warning",
    bgColor: "bg-warning/10",
    href: "/admin/applications?status=UNDER_REVIEW",
  },
  {
    type: "verification",
    title: "5 Projects Need Verification",
    description: "Project milestones submitted with proof need verification.",
    count: 5,
    priority: "high",
    icon: ShieldCheck,
    color: "text-purple",
    bgColor: "bg-purple/10",
    href: "/admin/verification",
  },
  {
    type: "partner",
    title: "3 Partner Applications Pending",
    description: "New partner applications awaiting document review.",
    count: 3,
    priority: "medium",
    icon: Building2,
    color: "text-teal",
    bgColor: "bg-teal/10",
    href: "/admin/partners?status=APPLICANT",
  },
  {
    type: "claim",
    title: "8 Claims Need Decision",
    description: "Healthcare reimbursement claims awaiting approval.",
    count: 8,
    priority: "medium",
    icon: Stethoscope,
    color: "text-error",
    bgColor: "bg-error/10",
    href: "/admin/healthcare/claims",
  },
];

// ============ RECENT ACTIVITY ============
const recentActivity = [
  {
    id: 1,
    type: "application",
    title: "Application Approved",
    description: "APP-23043012 for Medical Assistance approved by Admin",
    time: "10 min ago",
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    id: 2,
    type: "donation",
    title: "Large Donation Received",
    description: "$5,000 donation to Food Security from anonymous donor",
    time: "25 min ago",
    icon: Heart,
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  {
    id: 3,
    type: "verification",
    title: "Project Verified",
    description: "Clean Water Initiative milestone #3 verified with proof",
    time: "1 hour ago",
    icon: ShieldCheck,
    color: "text-teal",
    bgColor: "bg-teal/10",
  },
  {
    id: 4,
    type: "partner",
    title: "New Partner Registered",
    description: "Al-Noor Foundation submitted partner application",
    time: "2 hours ago",
    icon: Building2,
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
  {
    id: 5,
    type: "user",
    title: "New User Registration",
    description: "12 new users registered in the last hour",
    time: "3 hours ago",
    icon: Users,
    color: "text-navy",
    bgColor: "bg-navy/10",
  },
];

// ============ QUICK STATS ============
const quickStats = [
  { label: "Active Projects", value: "42", icon: FolderKanban, href: "/admin/projects" },
  { label: "This Month", value: "$180K", icon: DollarSign, href: "/admin/donations" },
  { label: "Pending Reviews", value: "28", icon: Clock, href: "/admin/applications" },
  { label: "Total Impact", value: "50K+", icon: TrendingUp, href: "/admin/reports" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
            Admin Dashboard
          </h1>
          <p className="text-ink/70 mt-1">
            Overview of all platform activity and pending actions.
          </p>
        </div>
        <Link
          href="/admin/reports"
          className="btn-lift bg-navy text-white font-semibold px-6 py-3 rounded-input hover:bg-navy/90 transition-colors shadow-sm flex items-center gap-2 w-fit text-sm"
        >
          <Eye className="w-4 h-4" />
          View Reports
        </Link>
      </div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={i}
              href={kpi.href}
              className="card-hover bg-white rounded-card p-5 border border-gray-100 group"
            >
              <div className="flex items-start justify-between">
                <div className={`${kpi.bgColor} rounded-full p-3`}>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${
                  kpi.trend === "up" ? "text-success" : "text-error"
                }`}>
                  {kpi.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </div>
              </div>
              <p className="font-display text-2xl font-bold text-navy mt-4">{kpi.value}</p>
              <p className="text-ink/60 text-sm mt-1">{kpi.label}</p>
            </Link>
          );
        })}
      </div>

      {/* ================= QUICK STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link
              key={i}
              href={stat.href}
              className="bg-white rounded-card p-4 border border-gray-100 hover:border-gold transition-colors flex items-center gap-3"
            >
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

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ================= LEFT: ACTION REQUIRED ================= */}
        <div className="lg:col-span-2 bg-white rounded-card shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              <h2 className="font-display font-bold text-navy text-lg">
                Action Required
              </h2>
              <span className="text-xs font-semibold text-warning bg-warning/10 px-2 py-0.5 rounded-full">
                28 items
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {actionRequired.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  href={item.href}
                  className="flex items-center gap-4 p-5 hover:bg-cloud/50 transition-colors group"
                >
                  <div className={`${item.bgColor} rounded-full p-3 shrink-0`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-navy text-sm truncate">
                        {item.title}
                      </p>
                      {item.priority === "high" && (
                        <span className="text-xs font-semibold text-error bg-error/10 px-2 py-0.5 rounded-full shrink-0">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-ink/60 text-xs mt-1 truncate">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-display font-bold text-navy text-lg">
                      {item.count}
                    </span>
                    <ChevronRight className="w-4 h-4 text-ink/40 group-hover:text-gold transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT: RECENT ACTIVITY ================= */}
        <div className="bg-white rounded-card shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-navy" />
              <h2 className="font-display font-bold text-navy text-lg">
                Recent Activity
              </h2>
            </div>
            <Link
              href="/admin/activity"
              className="text-gold font-semibold text-xs hover:text-gold/80 transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {recentActivity.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-4 hover:bg-cloud/30 transition-colors">
                  <div className={`${activity.bgColor} rounded-full p-2.5 shrink-0 mt-0.5`}>
                    <Icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy text-xs">{activity.title}</p>
                    <p className="text-ink/60 text-xs mt-0.5 line-clamp-2">
                      {activity.description}
                    </p>
                    <p className="text-ink/40 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
        <h2 className="font-display font-bold text-navy text-lg mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Review Applications", href: "/admin/applications", icon: FileText, color: "text-warning" },
            { label: "Verify Projects", href: "/admin/verification", icon: ShieldCheck, color: "text-purple" },
            { label: "Manage Users", href: "/admin/users", icon: Users, color: "text-navy" },
            { label: "View Reports", href: "/admin/reports", icon: TrendingUp, color: "text-gold" },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                href={action.href}
                className="flex flex-col items-center gap-3 p-5 bg-cloud rounded-card border border-gray-100 hover:border-gold hover:bg-gold/5 transition-all group text-center"
              >
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