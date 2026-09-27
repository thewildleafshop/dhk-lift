"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  User,
  Building2,
  Download,
  Inbox,
  Loader2,
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

interface Application {
  id: string;
  confirmationNo: string;
  status: ApplicationStatus;
  amountRequested: number | null;
  data: any;
  notes: string | null;
  submittedAt: string | null;
  createdAt: string;
  user: { id: string; name: string; email: string };
  program: { id: string; name: string; slug: string; category: string } | null;
  documentCount: number;
}

// ============ STATUS CONFIG ============
const statusConfig: Record<ApplicationStatus, { label: string; color: string; bg: string; icon: any }> = {
  DRAFT: { label: "Draft", color: "text-ink/70", bg: "bg-gray-100", icon: FileText },
  SUBMITTED: { label: "Submitted", color: "text-info", bg: "bg-info/10", icon: Clock },
  VERIFICATION: { label: "Verification", color: "text-info", bg: "bg-info/10", icon: AlertCircle },
  UNDER_REVIEW: { label: "Under Review", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  ADDITIONAL_INFO: { label: "Info Needed", color: "text-warning", bg: "bg-warning/10", icon: AlertCircle },
  APPROVED: { label: "Approved", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  DENIED: { label: "Denied", color: "text-error", bg: "bg-error/10", icon: XCircle },
  COMPLETED: { label: "Completed", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
};

// ============ PROGRAM COLOR MAPPING ============
const getProgramColor = (programName: string) => {
  const map: Record<string, { color: string; bg: string }> = {
    "LIFT Health": { color: "text-teal", bg: "bg-teal/10" },
    "LIFT Protect": { color: "text-purple", bg: "bg-purple/10" },
    "LIFT Ability": { color: "text-purple", bg: "bg-purple/10" },
    "LIFT Community": { color: "text-gold", bg: "bg-gold/10" },
    "Children & Families": { color: "text-navy", bg: "bg-navy/10" },
    "Food Security": { color: "text-gold", bg: "bg-gold/10" },
    "Disaster Relief": { color: "text-error", bg: "bg-error/10" },
  };
  return map[programName] || { color: "text-navy", bg: "bg-navy/10" };
};

export default function AdminApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "ALL">("ALL");

  // ✅ API se data fetch karne ke liye states
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ API se data fetch karein
  useEffect(() => {
    async function fetchApplications() {
      try {
        setLoading(true);
        const res = await fetch("/api/applications");
        if (!res.ok) throw new Error("Failed to fetch applications");
        const data = await res.json();
        setApplications(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app) => {
    const applicantName = app.data.patientName || app.data.studentName || app.user.name || "";
    const matchesSearch =
      applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.confirmationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.program?.name || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => ["SUBMITTED", "VERIFICATION", "UNDER_REVIEW"].includes(a.status)).length,
    actionNeeded: applications.filter((a) => a.status === "ADDITIONAL_INFO").length,
    approved: applications.filter((a) => ["APPROVED", "COMPLETED"].includes(a.status)).length,
  };

  // ============ LOADING STATE ============
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-navy animate-spin mx-auto mb-4" />
          <p className="text-ink/60">Loading applications...</p>
        </div>
      </div>
    );
  }

  // ============ ERROR STATE ============
  if (error) {
    return (
      <div className="bg-white rounded-card p-12 text-center border border-gray-100">
        <p className="text-error font-semibold mb-2">Error loading applications</p>
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
            Applications Management
          </h1>
          <p className="text-ink/70 mt-1">
            Review, approve, and manage all assistance applications.
          </p>
        </div>
        <button className="btn-lift bg-navy text-white font-semibold px-6 py-3 rounded-input hover:bg-navy/90 transition-colors shadow-sm flex items-center gap-2 w-fit text-sm">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* ================= STATS ROW ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-navy" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Total</p>
          </div>
          <p className="font-display text-2xl font-bold text-navy">{stats.total}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-info" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Pending</p>
          </div>
          <p className="font-display text-2xl font-bold text-info">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-warning" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Action Needed</p>
          </div>
          <p className="font-display text-2xl font-bold text-warning">{stats.actionNeeded}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-success" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Approved</p>
          </div>
          <p className="font-display text-2xl font-bold text-success">{stats.approved}</p>
        </div>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="bg-white rounded-card p-4 border border-gray-100 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, reference, or program..."
            className="w-full pl-12 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink text-sm"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="pl-10 pr-8 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-ink text-sm appearance-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="VERIFICATION">Verification</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="ADDITIONAL_INFO">Action Needed</option>
            <option value="APPROVED">Approved</option>
            <option value="DENIED">Denied</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* ================= APPLICATIONS TABLE ================= */}
      {filteredApplications.length > 0 ? (
        <div className="bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-cloud border-b border-gray-100 text-xs font-semibold text-ink/60 uppercase tracking-wider">
            <div className="col-span-4">Applicant</div>
            <div className="col-span-2">Program</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {filteredApplications.map((app) => {
              const status = statusConfig[app.status] || statusConfig.SUBMITTED;
              const StatusIcon = status.icon;
              const applicantName = app.data.patientName || app.data.studentName || app.user.name || "Unknown";
              const programName = app.program?.name || "N/A";
              const programColors = getProgramColor(programName);

              return (
                <div key={app.id} className="px-6 py-5 hover:bg-cloud/30 transition-colors">
                  
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="bg-navy/5 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                        <span className="font-display font-bold text-navy text-sm">
                          {applicantName.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-navy text-sm truncate">
                          {applicantName}
                        </p>
                        <p className="text-ink/50 text-xs truncate">
                          {app.user.email}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <span className={`text-xs font-semibold ${programColors.color} ${programColors.bg} px-2.5 py-1 rounded-full`}>
                        {programName}
                      </span>
                    </div>

                    <div className="col-span-2">
                      <p className="font-display font-bold text-navy">
                        {app.amountRequested ? `$${app.amountRequested.toLocaleString()}` : "—"}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>

                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/applications/${app.id}`}
                        className="btn-lift bg-navy text-white font-semibold px-4 py-2 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-1.5 text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Review
                      </Link>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="lg:hidden space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="bg-navy/5 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                          <span className="font-display font-bold text-navy text-sm">
                            {applicantName.charAt(0)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-navy text-sm truncate">
                            {applicantName}
                          </p>
                          <p className="text-ink/50 text-xs truncate">
                            {app.user.email}
                          </p>
                        </div>
                      </div>
                      <p className="font-display font-bold text-navy shrink-0">
                        {app.amountRequested ? `$${app.amountRequested.toLocaleString()}` : "—"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-semibold ${programColors.color} ${programColors.bg} px-2.5 py-1 rounded-full`}>
                        {programName}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <p className="text-xs text-ink/50">
                        {new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      <Link
                        href={`/admin/applications/${app.id}`}
                        className="btn-lift bg-navy text-white font-semibold px-4 py-2 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-1.5 text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Review
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
              : "No applications have been submitted yet."}
          </p>
        </div>
      )}

    </div>
  );
}