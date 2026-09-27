"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Heart,
  TrendingUp,
  FileText,
  Users,
  ChevronRight,
  Clock,
  CheckCircle,
  Gift,
  Award,
  ArrowUpRight,
  Stethoscope,
  DollarSign,
  ClipboardList,
  Pill,
  Activity,
  Briefcase,
} from "lucide-react";

export default function DashboardHome() {
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role || "MEMBER";
  const userName = session?.user?.name?.split(" ")[0] || "User";

  // ============ ROLE-BASED STATS ============
  const getStats = () => {
    switch (userRole) {
      case "MEMBER":
        return [
          { label: "My Donations", value: "$150", subtext: "Total donated", icon: Heart, color: "text-gold", bgColor: "bg-gold/10", href: "/dashboard/donations" },
          { label: "My Impact", value: "45", subtext: "Meals provided", icon: TrendingUp, color: "text-teal", bgColor: "bg-teal/10", href: "/dashboard/impact" },
          { label: "Saved Items", value: "6", subtext: "Bookmarked", icon: Gift, color: "text-purple", bgColor: "bg-purple/10", href: "/dashboard/saved" },
        ];
      case "APPLICANT":
        return [
          { label: "My Applications", value: "2", subtext: "Submitted", icon: FileText, color: "text-purple", bgColor: "bg-purple/10", href: "/dashboard/applications" },
          { label: "Patient Cases", value: "1", subtext: "In progress", icon: Stethoscope, color: "text-teal", bgColor: "bg-teal/10", href: "/dashboard/patient" },
          { label: "Documents", value: "5", subtext: "Uploaded", icon: ClipboardList, color: "text-gold", bgColor: "bg-gold/10", href: "/dashboard/messages" },
        ];
      case "PROVIDER":
        return [
          { label: "Total Claims", value: "45", subtext: "Submitted", icon: ClipboardList, color: "text-navy", bgColor: "bg-navy/10", href: "/healthcare/claims/status" },
          { label: "Pending Claims", value: "8", subtext: "Awaiting review", icon: Clock, color: "text-warning", bgColor: "bg-warning/10", href: "/healthcare/claims/status" },
          { label: "Total Payments", value: "$285K", subtext: "Received", icon: DollarSign, color: "text-success", bgColor: "bg-success/10", href: "/healthcare/claims/status" },
        ];
      case "PHARMACY":
        return [
          { label: "Prescriptions", value: "120", subtext: "Processed", icon: Pill, color: "text-gold", bgColor: "bg-gold/10", href: "/healthcare/claims/submit" },
          { label: "Pending Claims", value: "12", subtext: "Awaiting approval", icon: Clock, color: "text-warning", bgColor: "bg-warning/10", href: "/healthcare/claims/status" },
          { label: "Total Payments", value: "$45K", subtext: "Received", icon: DollarSign, color: "text-success", bgColor: "bg-success/10", href: "/healthcare/claims/status" },
        ];
      case "VOLUNTEER":
        return [
          { label: "Active Tasks", value: "3", subtext: "In progress", icon: ClipboardList, color: "text-teal", bgColor: "bg-teal/10", href: "/dashboard/messages" },
          { label: "Hours Logged", value: "48", subtext: "This month", icon: Clock, color: "text-gold", bgColor: "bg-gold/10", href: "/dashboard/impact" },
          { label: "Events Attended", value: "5", subtext: "Total", icon: Activity, color: "text-purple", bgColor: "bg-purple/10", href: "/stories" },
        ];
      case "PARTNER":
        return [
          { label: "Active Projects", value: "3", subtext: "In progress", icon: Briefcase, color: "text-teal", bgColor: "bg-teal/10", href: "/partner/projects" },
          { label: "Total Funding", value: "$250K", subtext: "Received", icon: DollarSign, color: "text-gold", bgColor: "bg-gold/10", href: "/partner/funding" },
          { label: "Equipment Requests", value: "2", subtext: "Pending", icon: ClipboardList, color: "text-purple", bgColor: "bg-purple/10", href: "/partner/equipment" },
        ];
      case "ADMIN":
        return [
          { label: "Total Users", value: "12,450", subtext: "Registered", icon: Users, color: "text-navy", bgColor: "bg-navy/10", href: "/admin/users" },
          { label: "Pending Apps", value: "48", subtext: "Need review", icon: FileText, color: "text-warning", bgColor: "bg-warning/10", href: "/admin/applications" },
          { label: "Total Donations", value: "$2.5M", subtext: "Platform-wide", icon: Heart, color: "text-gold", bgColor: "bg-gold/10", href: "/admin/donations" },
        ];
      default:
        return [];
    }
  };

  // ============ ROLE-BASED RECENT ACTIVITY ============
  const getRecentActivity = () => {
    switch (userRole) {
      case "MEMBER":
        return [
          { cause: "Food Security", amount: "$50", date: "Apr 12, 2026", status: "Completed" },
          { cause: "Education Support", amount: "$30", date: "Mar 28, 2026", status: "Completed" },
          { cause: "Healthcare Access", amount: "$20", date: "Mar 10, 2026", status: "Completed" },
        ];
      case "APPLICANT":
        return [
          { cause: "Financial Assistance", date: "Apr 5, 2026", status: "Under Review" },
          { cause: "Education Support", date: "Feb 18, 2026", status: "Approved" },
        ];
      case "PROVIDER":
        return [
          { cause: "CLM-24001 (Aga Khan)", amount: "$1,200", date: "Apr 1, 2026", status: "Paid" },
          { cause: "CLM-24002 (Shifa Int.)", amount: "$3,500", date: "Apr 5, 2026", status: "Approved" },
          { cause: "CLM-24003 (Indus)", amount: "$850", date: "Apr 9, 2026", status: "Under Review" },
        ];
      case "PHARMACY":
        return [
          { cause: "RX-24001 (Insulin)", amount: "$450", date: "Apr 2, 2026", status: "Paid" },
          { cause: "RX-24002 (Medications)", amount: "$120", date: "Apr 8, 2026", status: "Approved" },
          { cause: "RX-24003 (Supplies)", amount: "$85", date: "Apr 10, 2026", status: "Pending" },
        ];
      case "VOLUNTEER":
        return [
          { cause: "Food Kitchen - Lahore", date: "Apr 10, 2026", status: "Completed" },
          { cause: "Medical Camp - Karachi", date: "Apr 5, 2026", status: "Completed" },
          { cause: "School Renovation", date: "Mar 28, 2026", status: "Completed" },
        ];
      default:
        return [];
    }
  };

  // ============ ROLE-BASED "VIEW ALL" LINK ============
  const getViewAllLink = () => {
    switch (userRole) {
      case "MEMBER":
        return "/dashboard/donations";
      case "APPLICANT":
        return "/dashboard/applications";
      case "PROVIDER":
      case "PHARMACY":
        return "/healthcare/claims/status";
      case "VOLUNTEER":
        return "/dashboard/messages";
      default:
        return "/dashboard";
    }
  };

  const stats = getStats();
  const recentActivity = getRecentActivity();

  return (
    <div className="space-y-6">
      
      {/* ================= WELCOME BANNER ================= */}
      <div className="bg-gradient-to-br from-navy to-navy/90 rounded-card p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-gold rounded-full w-16 h-16 flex items-center justify-center shrink-0">
              <span className="font-display font-bold text-ink text-2xl">
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold">
                Welcome back, {userName}!
              </h1>
              <p className="text-white/70 mt-1">
                {userRole === "MEMBER" && "Thank you for your continued support."}
                {userRole === "APPLICANT" && "Track your applications and documents here."}
                {userRole === "PROVIDER" && "Manage your claims and patient records."}
                {userRole === "PHARMACY" && "Manage prescriptions and claims."}
                {userRole === "VOLUNTEER" && "Thank you for volunteering with DHK LIFT."}
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-input px-4 py-3 shrink-0">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-gold" />
              <div>
                <p className="text-xs text-white/70">Role</p>
                <p className="font-display font-bold text-white">{userRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="card-hover bg-white rounded-card p-6 shadow-sm border border-gray-100 group"
            >
              <div className="flex items-start justify-between">
                <div className={`${stat.bgColor} rounded-full p-3`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <ArrowUpRight className="w-5 h-5 text-ink/30 group-hover:text-gold transition-colors" />
              </div>
              <p className="font-display text-3xl font-bold text-navy mt-4">
                {stat.value}
              </p>
              <p className="text-ink/60 text-sm mt-1">{stat.subtext}</p>
              <p className="font-semibold text-navy text-xs mt-2">{stat.label}</p>
            </Link>
          );
        })}
      </div>

      {/* ================= RECENT ACTIVITY ================= */}
      <div className="bg-white rounded-card shadow-sm border border-gray-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold" />
            <h2 className="font-display font-bold text-navy text-lg">
              Recent Activity
            </h2>
          </div>
          <Link
            href={getViewAllLink()}
            className="text-gold font-semibold text-sm hover:gap-2 transition-all flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {recentActivity.length > 0 ? (
            recentActivity.map((item: any, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-cloud/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-2.5 ${
                    item.status === "Completed" || item.status === "Approved" || item.status === "Paid"
                      ? "bg-success/10"
                      : "bg-warning/10"
                  }`}>
                    {item.status === "Completed" || item.status === "Approved" || item.status === "Paid" ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <Clock className="w-4 h-4 text-warning" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">{item.cause}</p>
                    <p className="text-ink/60 text-xs">{item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  {item.amount && (
                    <p className="font-display font-bold text-navy">{item.amount}</p>
                  )}
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    item.status === "Completed" || item.status === "Approved" || item.status === "Paid"
                      ? "text-success bg-success/10"
                      : "text-warning bg-warning/10"
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <div className="bg-cloud rounded-full p-6 w-fit mx-auto mb-4">
                <Clock className="w-12 h-12 text-ink/30" />
              </div>
              <p className="text-ink/60 text-sm">No recent activity yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* ================= CTA BANNER ================= */}
      <div className="bg-purple rounded-card p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold">
              {userRole === "MEMBER" && "Together we can make a greater impact."}
              {userRole === "APPLICANT" && "Need more assistance?"}
              {userRole === "PROVIDER" && "Submit a new claim."}
              {userRole === "PHARMACY" && "Submit a new claim."}
              {userRole === "VOLUNTEER" && "Continue your amazing work."}
            </h2>
            <p className="text-white/70 mt-2">
              {userRole === "MEMBER" && "Explore more programs and continue your journey of giving."}
              {userRole === "APPLICANT" && "Browse more assistance programs."}
              {userRole === "PROVIDER" && "Submit claims for patient treatments."}
              {userRole === "PHARMACY" && "Submit claims for prescriptions."}
              {userRole === "VOLUNTEER" && "Find more volunteer opportunities."}
            </p>
          </div>
          <Link
            href={
              userRole === "MEMBER" ? "/giving"
              : userRole === "APPLICANT" ? "/assistance"
              : userRole === "PROVIDER" ? "/healthcare/claims/submit"
              : userRole === "PHARMACY" ? "/healthcare/claims/submit"
              : "/stories"
            }
            className="btn-lift bg-gold text-ink font-semibold px-6 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 shrink-0"
          >
            {userRole === "MEMBER" && <><Heart className="w-5 h-5" /> Explore More Programs</>}
            {userRole === "APPLICANT" && <><Stethoscope className="w-5 h-5" /> Browse Programs</>}
            {userRole === "PROVIDER" && <><ClipboardList className="w-5 h-5" /> Submit New Claim</>}
            {userRole === "PHARMACY" && <><Pill className="w-5 h-5" /> Submit New Claim</>}
            {userRole === "VOLUNTEER" && <><Activity className="w-5 h-5" /> View Opportunities</>}
          </Link>
        </div>
      </div>

    </div>
  );
}