"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  FileText,
  Image as ImageIcon,
  Receipt,
  MapPin,
  Calendar,
  ChevronRight,
  Inbox,
  Building2,
  Loader2,
} from "lucide-react";

// ============ TYPES ============
type VerificationStatus = "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "NEEDS_INFO";

type Verification = {
  id: string;
  projectId: string;
  projectTitle: string;
  projectSlug: string;
  partner: string;
  partnerVerified: boolean;
  milestone: string;
  location: string;
  submittedDate: string;
  status: VerificationStatus;
  evidenceCount: number;
  evidenceTypes: string[];
  amount: number;
};

// ============ STATUS CONFIG ============
const statusConfig: Record<VerificationStatus, { label: string; color: string; bg: string; icon: any }> = {
  PENDING: { label: "Pending", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  UNDER_REVIEW: { label: "Under Review", color: "text-info", bg: "bg-info/10", icon: AlertCircle },
  APPROVED: { label: "Approved", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  REJECTED: { label: "Rejected", color: "text-error", bg: "bg-error/10", icon: XCircle },
  NEEDS_INFO: { label: "Info Needed", color: "text-warning", bg: "bg-warning/10", icon: AlertCircle },
};

// ============ EVIDENCE TYPE CONFIG ============
const evidenceTypeConfig: Record<string, { label: string; icon: any }> = {
  PHOTO: { label: "Photos", icon: ImageIcon },
  RECEIPT: { label: "Receipts", icon: Receipt },
  INVOICE: { label: "Invoices", icon: FileText },
  DELIVERY: { label: "Delivery", icon: MapPin },
  REPORT: { label: "Reports", icon: FileText },
  INSPECTION: { label: "Inspection", icon: ShieldCheck },
};

export default function AdminVerificationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<VerificationStatus | "ALL">("ALL");

  // ✅ API se data fetch karne ke liye states
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ API se data fetch karein
  useEffect(() => {
    async function fetchVerifications() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/verifications");
        if (!res.ok) throw new Error("Failed to fetch verifications");
        const data = await res.json();
        setVerifications(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchVerifications();
  }, []);

  const filteredVerifications = verifications.filter((v) => {
    const matchesSearch =
      v.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.milestone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: verifications.length,
    pending: verifications.filter((v) => ["PENDING", "UNDER_REVIEW"].includes(v.status)).length,
    needsInfo: verifications.filter((v) => v.status === "NEEDS_INFO").length,
    approved: verifications.filter((v) => v.status === "APPROVED").length,
  };

  // ============ LOADING STATE ============
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-navy animate-spin mx-auto mb-4" />
          <p className="text-ink/60">Loading verifications...</p>
        </div>
      </div>
    );
  }

  // ============ ERROR STATE ============
  if (error) {
    return (
      <div className="bg-white rounded-card p-12 text-center border border-gray-100">
        <p className="text-error font-semibold mb-2">Error loading verifications</p>
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
            Verification Center
          </h1>
          <p className="text-ink/70 mt-1">
            Review and verify project milestones, evidence, and proof of progress.
          </p>
        </div>
        <Link
          href="/admin/verification/history"
          className="btn-lift bg-navy text-white font-semibold px-6 py-3 rounded-input hover:bg-navy/90 transition-colors shadow-sm flex items-center gap-2 w-fit text-sm"
        >
          <Clock className="w-4 h-4" />
          View History
        </Link>
      </div>

      {/* ================= STATS ROW ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-navy" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Total</p>
          </div>
          <p className="font-display text-2xl font-bold text-navy">{stats.total}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-warning" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Pending</p>
          </div>
          <p className="font-display text-2xl font-bold text-warning">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-info" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Needs Info</p>
          </div>
          <p className="font-display text-2xl font-bold text-info">{stats.needsInfo}</p>
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
            placeholder="Search by project, partner, or milestone..."
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
            <option value="PENDING">Pending</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="NEEDS_INFO">Info Needed</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* ================= VERIFICATION LIST ================= */}
      {filteredVerifications.length > 0 ? (
        <div className="space-y-4">
          {filteredVerifications.map((v) => {
            const status = statusConfig[v.status] || statusConfig.PENDING;
            const StatusIcon = status.icon;

            return (
              <div
                key={v.id}
                className="card-hover bg-white rounded-card p-6 shadow-sm border border-gray-100"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left: Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4">
                      <div className="bg-navy/5 rounded-full p-3 shrink-0">
                        <ShieldCheck className="w-6 h-6 text-navy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display font-bold text-navy text-lg">
                            {v.projectTitle}
                          </h3>
                          <span className={`text-xs font-semibold ${status.color} ${status.bg} px-3 py-1 rounded-full flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-ink/60">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5" />
                            {v.partner}
                            {v.partnerVerified && (
                              <CheckCircle className="w-3 h-3 text-success" />
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {v.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(v.submittedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                        </div>

                        <p className="text-ink/70 text-sm mt-3">
                          <span className="font-semibold text-navy">Milestone:</span> {v.milestone}
                        </p>

                        {/* Evidence Types */}
                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                          <span className="text-xs text-ink/50 font-semibold">Evidence:</span>
                          {v.evidenceTypes.length > 0 ? (
                            v.evidenceTypes.map((type, i) => {
                              const typeConfig = evidenceTypeConfig[type] || { label: type, icon: FileText };
                              const TypeIcon = typeConfig.icon;
                              return (
                                <span
                                  key={i}
                                  className="inline-flex items-center gap-1 text-xs font-medium text-navy bg-cloud px-2.5 py-1 rounded-full"
                                >
                                  <TypeIcon className="w-3 h-3" />
                                  {typeConfig.label}
                                </span>
                              );
                            })
                          ) : (
                            <span className="text-xs text-ink/40 italic">No evidence uploaded</span>
                          )}
                          <span className="text-xs font-semibold text-gold">
                            {v.evidenceCount} files
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col lg:items-end gap-3 shrink-0">
                    <div className="text-right">
                      <p className="font-display font-bold text-navy text-lg">
                        ${v.amount.toLocaleString()}
                      </p>
                    </div>
                    <Link
                      href={`/admin/verification/${v.id}`}
                      className="btn-lift bg-navy text-white font-semibold px-6 py-3 rounded-input hover:bg-navy/90 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Review Evidence
                      <ChevronRight className="w-4 h-4" />
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
            No Verifications Found
          </h3>
          <p className="text-ink/60 mt-2 max-w-md mx-auto">
            {searchQuery || statusFilter !== "ALL"
              ? "Try adjusting your filters or search query."
              : "No verification requests are pending at the moment."}
          </p>
        </div>
      )}

    </div>
  );
}