"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Stethoscope,
  Heart,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Calendar,
  Building2,
  Pill,
  Upload,
  Download,
  MessageSquare,
  ChevronRight,
  Activity,
  PlusCircle,
} from "lucide-react";

// ============ TYPES ============
type ApplicationStatus = "PENDING" | "UNDER_REVIEW" | "APPROVED" | "DENIED" | "PAID";

type PatientApplication = {
  id: string;
  fundName: string;
  fundColor: string;
  fundBg: string;
  status: ApplicationStatus;
  amountRequested: number;
  amountApproved: number;
  submittedDate: string;
  lastUpdate: string;
  hospital: string;
  nextAction?: string;
};

type Claim = {
  id: string;
  claimNumber: string;
  provider: string;
  amount: number;
  status: "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "PAID";
  date: string;
};

// ============ STATUS CONFIG ============
const statusConfig: Record<ApplicationStatus, { label: string; color: string; bg: string; icon: any }> = {
  PENDING: { label: "Pending", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  UNDER_REVIEW: { label: "Under Review", color: "text-info", bg: "bg-info/10", icon: AlertCircle },
  APPROVED: { label: "Approved", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  DENIED: { label: "Denied", color: "text-error", bg: "bg-error/10", icon: XCircle },
  PAID: { label: "Paid", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
};

const claimStatusConfig: Record<string, { label: string; color: string; bg: string }> = {
  SUBMITTED: { label: "Submitted", color: "text-info", bg: "bg-info/10" },
  UNDER_REVIEW: { label: "Under Review", color: "text-warning", bg: "bg-warning/10" },
  APPROVED: { label: "Approved", color: "text-success", bg: "bg-success/10" },
  PAID: { label: "Paid", color: "text-success", bg: "bg-success/10" },
};

// ============ DEMO DATA ============
const demoApplications: PatientApplication[] = [
  {
    id: "HLT-24001",
    fundName: "Cancer Care Fund",
    fundColor: "text-purple",
    fundBg: "bg-purple/10",
    status: "APPROVED",
    amountRequested: 5000,
    amountApproved: 4500,
    submittedDate: "Apr 5, 2026",
    lastUpdate: "2 days ago",
    hospital: "Aga Khan Hospital",
    nextAction: "Funds will be disbursed to hospital within 5 business days.",
  },
  {
    id: "HLT-24002",
    fundName: "Heart Disease Fund",
    fundColor: "text-error",
    fundBg: "bg-error/10",
    status: "UNDER_REVIEW",
    amountRequested: 8000,
    amountApproved: 0,
    submittedDate: "Apr 8, 2026",
    lastUpdate: "1 day ago",
    hospital: "Shifa International",
  },
  {
    id: "HLT-24003",
    fundName: "Kidney Disease Fund",
    fundColor: "text-info",
    fundBg: "bg-info/10",
    status: "PAID",
    amountRequested: 3000,
    amountApproved: 3000,
    submittedDate: "Mar 15, 2026",
    lastUpdate: "3 weeks ago",
    hospital: "Indus Hospital",
  },
];

const demoClaims: Claim[] = [
  {
    id: "1",
    claimNumber: "CLM-24001",
    provider: "Aga Khan Hospital",
    amount: 1200,
    status: "PAID",
    date: "Apr 1, 2026",
  },
  {
    id: "2",
    claimNumber: "CLM-24002",
    provider: "MedPlus Pharmacy",
    amount: 350,
    status: "APPROVED",
    date: "Apr 5, 2026",
  },
  {
    id: "3",
    claimNumber: "CLM-24003",
    provider: "Indus Hospital",
    amount: 850,
    status: "UNDER_REVIEW",
    date: "Apr 9, 2026",
  },
];

// ============ MAIN COMPONENT ============
export default function PatientAssistanceDashboard() {
  const stats = {
    totalApplications: demoApplications.length,
    approved: demoApplications.filter((a) => a.status === "APPROVED" || a.status === "PAID").length,
    totalApproved: demoApplications.reduce((sum, a) => sum + a.amountApproved, 0),
    activeClaims: demoClaims.filter((c) => c.status === "UNDER_REVIEW").length,
  };

  return (
    <div className="space-y-6">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
            Patient Assistance
          </h1>
          <p className="text-ink/70 mt-1">
            Track your disease fund applications and medical claims.
          </p>
        </div>
        <Link
          href="/healthcare/funds"
          className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 w-fit text-sm"
        >
          <PlusCircle className="w-4 h-4" />
          New Application
        </Link>
      </div>

      {/* ================= STATS ROW ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-navy" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Applications</p>
          </div>
          <p className="font-display text-2xl font-bold text-navy">{stats.totalApplications}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-success" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Approved</p>
          </div>
          <p className="font-display text-2xl font-bold text-success">{stats.approved}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-gold" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Total Aid</p>
          </div>
          <p className="font-display text-2xl font-bold text-gold">
            ${stats.totalApproved.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-warning" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Active Claims</p>
          </div>
          <p className="font-display text-2xl font-bold text-warning">{stats.activeClaims}</p>
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ================= LEFT: APPLICATIONS ================= */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Applications List */}
          <div className="bg-white rounded-card shadow-sm border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-gold" />
                <h2 className="font-display font-bold text-navy text-lg">
                  My Applications
                </h2>
              </div>
              <Link
                href="/healthcare/funds"
                className="text-gold font-semibold text-sm hover:gap-2 transition-all flex items-center gap-1"
              >
                Browse Funds
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="divide-y divide-gray-100">
              {demoApplications.map((app) => {
                const status = statusConfig[app.status];
                const StatusIcon = status.icon;
                return (
                  <div key={app.id} className="p-6 hover:bg-cloud/30 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className={`${app.fundBg} rounded-full p-3 shrink-0`}>
                          <Heart className={`w-5 h-5 ${app.fundColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-navy text-sm">
                              {app.fundName}
                            </h3>
                            <span className={`text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full flex items-center gap-1`}>
                              <StatusIcon className="w-3 h-3" />
                              {status.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-ink/60">
                            <span className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {app.id}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              {app.hospital}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {app.submittedDate}
                            </span>
                          </div>
                          {app.nextAction && (
                            <div className="flex items-start gap-2 mt-3 p-3 bg-success/5 border border-success/20 rounded-input">
                              <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                              <p className="text-xs text-success">{app.nextAction}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-right md:text-right shrink-0">
                        <p className="text-xs text-ink/50">Requested</p>
                        <p className="font-display font-bold text-navy">
                          ${app.amountRequested.toLocaleString()}
                        </p>
                        {app.amountApproved > 0 && (
                          <>
                            <p className="text-xs text-ink/50 mt-1">Approved</p>
                            <p className="font-display font-bold text-success">
                              ${app.amountApproved.toLocaleString()}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Claims Section */}
          <div className="bg-white rounded-card shadow-sm border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-gold" />
                <h2 className="font-display font-bold text-navy text-lg">
                  Medical Claims
                </h2>
              </div>
              <span className="text-xs text-ink/50">Last 30 days</span>
            </div>

            <div className="divide-y divide-gray-100">
              {demoClaims.map((claim) => {
                const status = claimStatusConfig[claim.status];
                return (
                  <div key={claim.id} className="flex items-center justify-between p-5 hover:bg-cloud/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="bg-teal/10 rounded-full p-2.5 shrink-0">
                        <Pill className="w-4 h-4 text-teal" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-navy text-sm truncate">
                          {claim.provider}
                        </p>
                        <p className="text-ink/50 text-xs">
                          {claim.claimNumber} • {claim.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-display font-bold text-navy text-sm">
                        ${claim.amount.toLocaleString()}
                      </p>
                      <span className={`text-xs font-semibold ${status.color} ${status.bg} px-2 py-0.5 rounded-full`}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= RIGHT: SIDEBAR ================= */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-navy text-base mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {[
                { label: "Browse Disease Funds", href: "/healthcare/funds", icon: Stethoscope },
                { label: "Submit New Claim", href: "/healthcare/claims/submit", icon: PlusCircle },
                { label: "Upload Documents", href: "/dashboard/patient/documents", icon: Upload },
                { label: "Contact Healthcare Team", href: "/dashboard/messages", icon: MessageSquare },
              ].map((action, i) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={i}
                    href={action.href}
                    className="flex items-center gap-3 p-3 bg-cloud rounded-input hover:bg-navy/5 transition-colors group"
                  >
                    <div className="bg-white rounded-full p-2 shrink-0">
                      <Icon className="w-4 h-4 text-navy" />
                    </div>
                    <span className="text-sm font-medium text-navy flex-1">{action.label}</span>
                    <ChevronRight className="w-4 h-4 text-ink/40 group-hover:text-gold transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Patient Support Card */}
          <div className="bg-gradient-to-br from-teal to-teal/90 rounded-card p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 w-fit mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-lg">
                Patient Support
              </h3>
              <p className="text-white/80 text-xs mt-2 leading-relaxed">
                Our healthcare team is available to help you with your applications 
                and answer any questions.
              </p>
              <Link
                href="/contact"
                className="btn-lift inline-flex items-center gap-2 bg-white text-teal font-semibold px-5 py-3 rounded-input hover:bg-white/90 transition-colors shadow-lg mt-4 text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Get Help
              </Link>
            </div>
          </div>

          {/* Transparency */}
          <div className="bg-navy text-white rounded-card p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h3 className="font-display font-bold text-base mb-3">
                100% Transparent
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Approved</span>
                  <span className="font-semibold text-gold">
                    ${stats.totalApproved.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Applications</span>
                  <span className="font-semibold text-white">{stats.totalApplications}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Active Claims</span>
                  <span className="font-semibold text-white">{demoClaims.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}