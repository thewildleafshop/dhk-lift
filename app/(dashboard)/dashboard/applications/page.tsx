"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FileText,
  Search,
  Filter,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Eye,
  Plus,
  Inbox,
} from "lucide-react";

// ============ TYPES ============
type ApplicationStatus = 
  | "DRAFT"
  | "SUBMITTED"
  | "VERIFICATION"
  | "UNDER_REVIEW"
  | "ADDITIONAL_INFO"
  | "APPROVED"
  | "DENIED"
  | "COMPLETED";

type Application = {
  id: string;
  referenceNumber: string;
  program: string;
  programColor: string;
  programBg: string;
  status: ApplicationStatus;
  submittedDate: string;
  lastUpdate: string;
  amountRequested?: string;
  nextAction?: string;
};

// ============ STATUS HELPERS ============
const statusConfig: Record<ApplicationStatus, { label: string; color: string; bg: string; icon: any }> = {
  DRAFT: { label: "Draft", color: "text-ink/70", bg: "bg-gray-100", icon: FileText },
  SUBMITTED: { label: "Submitted", color: "text-info", bg: "bg-info/10", icon: Clock },
  VERIFICATION: { label: "Verification", color: "text-info", bg: "bg-info/10", icon: AlertCircle },
  UNDER_REVIEW: { label: "Under Review", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  ADDITIONAL_INFO: { label: "Action Needed", color: "text-warning", bg: "bg-warning/10", icon: AlertCircle },
  APPROVED: { label: "Approved", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  DENIED: { label: "Denied", color: "text-error", bg: "bg-error/10", icon: XCircle },
  COMPLETED: { label: "Completed", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
};

// ============ DEMO DATA ============
const demoApplications: Application[] = [
  {
    id: "1",
    referenceNumber: "APP-23043012",
    program: "Financial Assistance",
    programColor: "text-gold",
    programBg: "bg-gold/10",
    status: "UNDER_REVIEW",
    submittedDate: "Apr 5, 2026",
    lastUpdate: "2 days ago",
    amountRequested: "$500",
  },
  {
    id: "2",
    referenceNumber: "APP-23031987",
    program: "Education Support",
    programColor: "text-teal",
    programBg: "bg-teal/10",
    status: "APPROVED",
    submittedDate: "Feb 18, 2026",
    lastUpdate: "1 week ago",
    amountRequested: "$300",
    nextAction: "Funds will be disbursed within 5 business days.",
  },
  {
    id: "3",
    referenceNumber: "APP-23028765",
    program: "Medical Equipment",
    programColor: "text-purple",
    programBg: "bg-purple/10",
    status: "ADDITIONAL_INFO",
    submittedDate: "Jan 10, 2026",
    lastUpdate: "3 days ago",
    nextAction: "Please upload updated medical report.",
  },
  {
    id: "4",
    referenceNumber: "APP-23015432",
    program: "Food Security",
    programColor: "text-gold",
    programBg: "bg-gold/10",
    status: "COMPLETED",
    submittedDate: "Nov 22, 2025",
    lastUpdate: "1 month ago",
    amountRequested: "$200",
  },
];

// ============ MAIN COMPONENT ============
export default function MyApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "ALL">("ALL");

  const filteredApplications = demoApplications.filter((app) => {
    const matchesSearch = 
      app.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: demoApplications.length,
    inReview: demoApplications.filter(a => ["SUBMITTED", "VERIFICATION", "UNDER_REVIEW"].includes(a.status)).length,
    actionNeeded: demoApplications.filter(a => a.status === "ADDITIONAL_INFO").length,
    approved: demoApplications.filter(a => ["APPROVED", "COMPLETED"].includes(a.status)).length,
  };

  return (
    <div className="space-y-6">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
            My Applications
          </h1>
          <p className="text-ink/70 mt-1">
            Track the status of all your assistance applications.
          </p>
        </div>
        <Link
          href="/assistance/apply"
          className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 w-fit"
        >
          <Plus className="w-5 h-5" />
          New Application
        </Link>
      </div>

      {/* ================= STATS ROW ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Total</p>
          <p className="font-display text-2xl font-bold text-navy mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">In Review</p>
          <p className="font-display text-2xl font-bold text-info mt-1">{stats.inReview}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Action Needed</p>
          <p className="font-display text-2xl font-bold text-warning mt-1">{stats.actionNeeded}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Approved</p>
          <p className="font-display text-2xl font-bold text-success mt-1">{stats.approved}</p>
        </div>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="bg-white rounded-card p-4 border border-gray-100 flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by program or reference number..."
            className="w-full pl-12 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink text-sm"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="pl-10 pr-8 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-ink text-sm appearance-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="ADDITIONAL_INFO">Action Needed</option>
            <option value="APPROVED">Approved</option>
            <option value="DENIED">Denied</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* ================= APPLICATIONS LIST ================= */}
      {filteredApplications.length > 0 ? (
        <div className="space-y-4">
          {filteredApplications.map((app) => {
            const status = statusConfig[app.status];
            const StatusIcon = status.icon;
            return (
              <div
                key={app.id}
                className="card-hover bg-white rounded-card p-6 shadow-sm border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Left: Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`${app.programBg} rounded-full p-3 shrink-0`}>
                      <FileText className={`w-6 h-6 ${app.programColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display font-bold text-navy text-lg">
                          {app.program}
                        </h3>
                        <span className={`text-xs font-semibold ${status.color} ${status.bg} px-3 py-1 rounded-full flex items-center gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-ink/60">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          {app.referenceNumber}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          Submitted: {app.submittedDate}
                        </span>
                        {app.amountRequested && (
                          <span className="font-semibold text-navy">
                            {app.amountRequested}
                          </span>
                        )}
                      </div>
                      {app.nextAction && (
                        <div className={`flex items-start gap-2 mt-3 p-3 rounded-input ${
                          app.status === "APPROVED" ? "bg-success/5 border border-success/20" : "bg-warning/5 border border-warning/20"
                        }`}>
                          <AlertCircle className={`w-4 h-4 mt-0.5 shrink-0 ${
                            app.status === "APPROVED" ? "text-success" : "text-warning"
                          }`} />
                          <p className={`text-xs ${
                            app.status === "APPROVED" ? "text-success" : "text-warning"
                          }`}>
                            {app.nextAction}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-3 shrink-0 md:flex-col md:items-end">
                    <p className="text-xs text-ink/50 md:text-right">
                      Updated {app.lastUpdate}
                    </p>
                    <Link
                      href={`/dashboard/applications/${app.id}`}
                      className="btn-lift bg-navy text-white font-semibold px-5 py-2.5 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ================= EMPTY STATE ================= */
        <div className="bg-white rounded-card p-12 text-center border border-gray-100">
          <div className="bg-cloud rounded-full p-6 w-fit mx-auto mb-4">
            <Inbox className="w-12 h-12 text-ink/30" />
          </div>
          <h3 className="font-display text-xl font-bold text-navy">
            No Applications Found
          </h3>
          <p className="text-ink/60 mt-2 max-w-md mx-auto">
            {searchQuery || statusFilter !== "ALL"
              ? "Try adjusting your filters or search query."
              : "You haven't submitted any applications yet. Start your first application today."}
          </p>
          <Link
            href="/assistance/apply"
            className="btn-lift inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg mt-6"
          >
            <Plus className="w-5 h-5" />
            Start New Application
          </Link>
        </div>
      )}

    </div>
  );
}