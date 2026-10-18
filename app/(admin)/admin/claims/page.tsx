"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Loader2,
  Eye,
  DollarSign,
  User,
  Calendar,
  AlertCircle,
} from "lucide-react";

// ============ TYPES ============
type ClaimStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "ADDITIONAL_INFO"
  | "APPROVED"
  | "PARTIALLY_APPROVED"
  | "DENIED"
  | "PAID"
  | "COMPLETED";

interface Claim {
  id: string;
  patientName: string;
  patientId: string | null;
  providerName: string;
  serviceDate: string;
  serviceType: string;
  amount: number;
  description: string;
  documents: string[];
  status: ClaimStatus;
  submittedAt: string;
  partner?: {
    orgName: string;
  };
}

// ============ STATUS CONFIG ============
const statusConfig: Record<ClaimStatus, { label: string; color: string; bg: string; icon: any }> = {
  SUBMITTED: { label: "Submitted", color: "text-info", bg: "bg-info/10", icon: Clock },
  UNDER_REVIEW: { label: "Under Review", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  ADDITIONAL_INFO: { label: "Info Needed", color: "text-warning", bg: "bg-warning/10", icon: AlertCircle },
  APPROVED: { label: "Approved", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  PARTIALLY_APPROVED: { label: "Partial", color: "text-teal", bg: "bg-teal/10", icon: CheckCircle },
  DENIED: { label: "Denied", color: "text-error", bg: "bg-error/10", icon: XCircle },
  PAID: { label: "Paid", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  COMPLETED: { label: "Completed", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
};

export default function AdminClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClaimStatus | "ALL">("ALL");

  useEffect(() => {
    async function fetchClaims() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/claims");
        if (!res.ok) throw new Error("Failed to fetch claims");
        const data = await res.json();
        setClaims(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchClaims();
  }, []);

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.patientId?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: claims.length,
    pending: claims.filter((c) => ["SUBMITTED", "UNDER_REVIEW"].includes(c.status)).length,
    approved: claims.filter((c) => c.status === "APPROVED").length,
    denied: claims.filter((c) => c.status === "DENIED").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-navy animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
          Healthcare Claims
        </h1>
        <p className="text-ink/70 mt-1">
          Review and manage healthcare claims submitted by partners.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-navy" />
            <p className="text-ink/60 text-xs font-medium uppercase">Total</p>
          </div>
          <p className="font-display text-2xl font-bold text-navy">{stats.total}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-warning" />
            <p className="text-ink/60 text-xs font-medium uppercase">Pending</p>
          </div>
          <p className="font-display text-2xl font-bold text-warning">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-success" />
            <p className="text-ink/60 text-xs font-medium uppercase">Approved</p>
          </div>
          <p className="font-display text-2xl font-bold text-success">{stats.approved}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="w-4 h-4 text-error" />
            <p className="text-ink/60 text-xs font-medium uppercase">Denied</p>
          </div>
          <p className="font-display text-2xl font-bold text-error">{stats.denied}</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-card p-4 border border-gray-100 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by patient name, provider, or ID..."
            className="w-full pl-12 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["ALL", "SUBMITTED", "UNDER_REVIEW", "APPROVED", "DENIED"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                statusFilter === status
                  ? "bg-navy text-white"
                  : "bg-cloud text-ink/70 hover:bg-navy/5"
              }`}
            >
              {status === "ALL" ? "All" : statusConfig[status]?.label || status}
            </button>
          ))}
        </div>
      </div>

      {/* CLAIMS LIST */}
      {filteredClaims.length === 0 ? (
        <div className="bg-white rounded-card p-12 text-center border border-gray-100">
          <FileText className="w-12 h-12 text-ink/30 mx-auto mb-4" />
          <p className="text-ink/60">No claims found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredClaims.map((claim) => {
            const status = statusConfig[claim.status] || statusConfig.SUBMITTED;
            const StatusIcon = status.icon;

            return (
              <div
                key={claim.id}
                className="bg-white rounded-card p-5 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-bold text-navy">
                        {claim.patientName}
                      </h3>
                      <span className={`text-xs font-semibold ${status.color} ${status.bg} px-2 py-0.5 rounded-full flex items-center gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-ink/60">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {claim.partner?.orgName || "Unknown Partner"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(claim.serviceDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-gold">
                        <DollarSign className="w-3.5 h-3.5" />
                        ${Number(claim.amount).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-ink/50 mt-2 line-clamp-1">
                      {claim.description}
                    </p>
                  </div>
                  <Link
                    href={`/admin/claims/${claim.id}`}
                    className="btn-lift bg-navy text-white font-semibold px-5 py-2.5 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-2 text-sm w-fit"
                  >
                    <Eye className="w-4 h-4" />
                    Review
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}