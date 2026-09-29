"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  DollarSign,
  FileText,
  Heart,
  Building2,
  Download,
  Inbox,
  Activity,
  ChevronRight,
  Loader2,
} from "lucide-react";

// ============ TYPES ============
type ClaimStatus = "SUBMITTED" | "UNDER_REVIEW" | "ADDITIONAL_INFO" | "APPROVED" | "PARTIAL" | "DENIED" | "PAID";
type FundStatus = "ACTIVE" | "PAUSED" | "CLOSED";
type TabType = "claims" | "funds" | "providers";

// ============ CLAIM STATUS CONFIG ============
const claimStatusConfig: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  SUBMITTED: { label: "Submitted", color: "text-info", bg: "bg-info/10", icon: Clock },
  VERIFICATION: { label: "Verification", color: "text-info", bg: "bg-info/10", icon: AlertCircle },
  UNDER_REVIEW: { label: "Under Review", color: "text-warning", bg: "bg-warning/10", icon: AlertCircle },
  ADDITIONAL_INFO: { label: "Info Needed", color: "text-warning", bg: "bg-warning/10", icon: AlertCircle },
  APPROVED: { label: "Approved", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  PARTIAL: { label: "Partially Approved", color: "text-teal", bg: "bg-teal/10", icon: CheckCircle },
  DENIED: { label: "Denied", color: "text-error", bg: "bg-error/10", icon: XCircle },
  PAID: { label: "Paid", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  COMPLETED: { label: "Paid", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  DRAFT: { label: "Draft", color: "text-ink/70", bg: "bg-gray-100", icon: FileText },
};

// ============ INTERFACES ============
interface Claim {
  id: string;
  confirmationNo: string;
  patientName: string;
  provider: string;
  fund: string;
  amount: number | null;
  status: string;
  submittedAt: string | null;
  documentCount: number;
}

interface Fund {
  id: string;
  name: string;
  disease: string;
  status: FundStatus;
  balance: number;
  committed: number;
  totalRaised: number;
  applications: number;
  color: string;
  bgColor: string;
}

interface Provider {
  id: string;
  name: string;
  type: string;
  location: string;
  verified: boolean;
  totalClaims: number;
  totalAmount: number;
  pendingClaims: number;
}

export default function AdminHealthcarePage() {
  const [activeTab, setActiveTab] = useState<TabType>("claims");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // ✅ States for API data
  const [claims, setClaims] = useState<Claim[]>([]);
  const [funds, setFunds] = useState<Fund[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/healthcare");
        if (!res.ok) throw new Error("Failed to fetch healthcare data");
        const data = await res.json();
        
        setClaims(data.claims || []);
        setFunds(data.funds || []);
        setProviders(data.providers || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter claims
  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      (claim.patientName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (claim.provider || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (claim.confirmationNo || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    totalClaims: claims.length,
    pendingClaims: claims.filter((c) => ["SUBMITTED", "VERIFICATION", "UNDER_REVIEW", "ADDITIONAL_INFO"].includes(c.status)).length,
    activeFunds: funds.filter((f) => f.status === "ACTIVE").length,
    totalBalance: funds.reduce((sum, f) => sum + f.balance, 0),
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-navy animate-spin mx-auto mb-4" />
          <p className="text-ink/60">Loading healthcare data...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-white rounded-card p-12 text-center border border-gray-100">
        <p className="text-error font-semibold mb-2">Error loading healthcare data</p>
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
            Healthcare Management
          </h1>
          <p className="text-ink/70 mt-1">
            Manage disease funds, patient claims, and healthcare providers.
          </p>
        </div>
        <button className="btn-lift bg-navy text-white font-semibold px-6 py-3 rounded-input hover:bg-navy/90 transition-colors shadow-sm flex items-center gap-2 w-fit text-sm">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* ================= STATS ROW ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-navy" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Total Claims</p>
          </div>
          <p className="font-display text-2xl font-bold text-navy">{stats.totalClaims}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-warning" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Pending Claims</p>
          </div>
          <p className="font-display text-2xl font-bold text-warning">{stats.pendingClaims}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-teal" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Active Funds</p>
          </div>
          <p className="font-display text-2xl font-bold text-teal">{stats.activeFunds}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-gold" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Fund Balance</p>
          </div>
          <p className="font-display text-2xl font-bold text-gold">
            ${(stats.totalBalance / 1000).toFixed(0)}K
          </p>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="bg-white rounded-card p-2 shadow-sm border border-gray-100 flex flex-wrap gap-1">
        {[
          { id: "claims" as TabType, label: "Claims & Reimbursements", icon: FileText },
          { id: "funds" as TabType, label: "Disease Funds", icon: Heart },
          { id: "providers" as TabType, label: "Providers & Pharmacies", icon: Building2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-fit flex items-center justify-center gap-2 px-4 py-3 rounded-input font-medium text-sm transition-all ${
                isActive
                  ? "bg-navy text-white shadow-sm"
                  : "text-ink/70 hover:bg-navy/5 hover:text-navy"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ================= CLAIMS TAB ================= */}
      {activeTab === "claims" && (
        <>
          {/* Filters */}
          <div className="bg-white rounded-card p-4 border border-gray-100 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by patient, provider, or claim number..."
                className="w-full pl-12 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink text-sm"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-ink text-sm appearance-none cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="ADDITIONAL_INFO">Info Needed</option>
                <option value="APPROVED">Approved</option>
                <option value="PAID">Paid</option>
                <option value="DENIED">Denied</option>
              </select>
            </div>
          </div>

          {/* Claims Table */}
          {filteredClaims.length > 0 ? (
            <div className="bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden">
              <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-cloud border-b border-gray-100 text-xs font-semibold text-ink/60 uppercase tracking-wider">
                <div className="col-span-4">Patient & Provider</div>
                <div className="col-span-2">Fund</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              <div className="divide-y divide-gray-100">
                {filteredClaims.map((claim) => {
                  const status = claimStatusConfig[claim.status] || claimStatusConfig.SUBMITTED;
                  const StatusIcon = status.icon;
                  return (
                    <div key={claim.id} className="px-6 py-5 hover:bg-cloud/30 transition-colors">
                      <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4 flex items-center gap-3">
                          <div className="bg-navy/5 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                            <span className="font-display font-bold text-navy text-sm">
                              {(claim.patientName || "U").charAt(0)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-navy text-sm truncate">
                              {claim.patientName}
                            </p>
                            <p className="text-ink/50 text-xs truncate">
                              {claim.confirmationNo} • {claim.provider}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <span className="text-xs font-semibold text-purple bg-purple/10 px-2.5 py-1 rounded-full">
                            {claim.fund}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <p className="font-display font-bold text-navy">
                            {claim.amount ? `$${claim.amount.toLocaleString()}` : "—"}
                          </p>
                          <p className="text-ink/50 text-xs">{claim.documentCount} invoices</p>
                        </div>
                        <div className="col-span-2">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </div>
                        <div className="col-span-2 flex items-center justify-end">
                          <Link
                            href={`/admin/healthcare/claims/${claim.id}`}
                            className="btn-lift bg-navy text-white font-semibold px-4 py-2 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-1.5 text-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Review
                          </Link>
                        </div>
                      </div>

                      {/* Mobile */}
                      <div className="lg:hidden space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="bg-navy/5 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                              <span className="font-display font-bold text-navy text-sm">
                                {(claim.patientName || "U").charAt(0)}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-navy text-sm truncate">
                                {claim.patientName}
                              </p>
                              <p className="text-ink/50 text-xs truncate">{claim.confirmationNo}</p>
                            </div>
                          </div>
                          <p className="font-display font-bold text-navy shrink-0">
                            {claim.amount ? `$${claim.amount.toLocaleString()}` : "—"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-purple bg-purple/10 px-2.5 py-1 rounded-full">
                            {claim.fund}
                          </span>
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <p className="text-xs text-ink/50">{claim.provider}</p>
                          <Link
                            href={`/admin/healthcare/claims/${claim.id}`}
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
            <div className="bg-white rounded-card p-12 text-center border border-gray-100">
              <Inbox className="w-12 h-12 text-ink/30 mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-navy">No Claims Found</h3>
              <p className="text-ink/60 mt-2">Try adjusting your filters.</p>
            </div>
          )}
        </>
      )}

      {/* ================= FUNDS TAB ================= */}
      {activeTab === "funds" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {funds.map((fund) => {
            const utilization = fund.totalRaised > 0 ? (fund.committed / fund.totalRaised) * 100 : 0;
            return (
              <div key={fund.id} className="card-hover bg-white rounded-card p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`${fund.bgColor} rounded-full p-3 shrink-0`}>
                      <Heart className={`w-6 h-6 ${fund.color}`} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-navy text-lg">
                        {fund.name}
                      </h3>
                      <p className="text-ink/50 text-xs">{fund.disease}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    fund.status === "ACTIVE" ? "text-success bg-success/10" :
                    fund.status === "PAUSED" ? "text-warning bg-warning/10" :
                    "text-error bg-error/10"
                  }`}>
                    {fund.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-cloud rounded-input">
                    <p className="text-ink/50 text-xs">Available Balance</p>
                    <p className="font-display font-bold text-navy text-lg mt-1">
                      ${(fund.balance / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className="p-3 bg-cloud rounded-input">
                    <p className="text-ink/50 text-xs">Committed</p>
                    <p className="font-display font-bold text-warning text-lg mt-1">
                      ${(fund.committed / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs text-ink/60 mb-2">
                    <span>Utilization</span>
                    <span className="font-semibold text-navy">{utilization.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        utilization > 80 ? "bg-error" : utilization > 60 ? "bg-warning" : "bg-gold"
                      }`}
                      style={{ width: `${Math.min(utilization, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-ink/50 text-xs">Total Raised</p>
                    <p className="font-display font-bold text-navy">
                      ${(fund.totalRaised / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div>
                    <p className="text-ink/50 text-xs">Applications</p>
                    <p className="font-display font-bold text-navy">{fund.applications}</p>
                  </div>
                  <Link
                    href={`/admin/healthcare/funds/${fund.id}`}
                    className="btn-lift bg-navy text-white font-semibold px-4 py-2 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-1.5 text-xs"
                  >
                    Manage
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= PROVIDERS TAB ================= */}
      {activeTab === "providers" && (
        <div className="bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden">
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-cloud border-b border-gray-100 text-xs font-semibold text-ink/60 uppercase tracking-wider">
            <div className="col-span-4">Provider</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Claims</div>
            <div className="col-span-2">Pending</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {providers.map((provider) => (
              <div key={provider.id} className="px-6 py-5 hover:bg-cloud/30 transition-colors">
                <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="bg-navy/10 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-navy" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-navy text-sm truncate">
                          {provider.name}
                        </p>
                        {provider.verified && (
                          <CheckCircle className="w-3.5 h-3.5 text-success shrink-0" />
                        )}
                      </div>
                      <p className="text-ink/50 text-xs truncate">{provider.location}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs font-semibold text-teal bg-teal/10 px-2.5 py-1 rounded-full">
                      {provider.type}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <p className="font-display font-bold text-navy">
                      {provider.totalClaims}
                    </p>
                    <p className="text-ink/50 text-xs">
                      ${(provider.totalAmount / 1000).toFixed(0)}K total
                    </p>
                  </div>
                  <div className="col-span-2">
                    {provider.pendingClaims > 0 ? (
                      <span className="text-xs font-semibold text-warning bg-warning/10 px-2.5 py-1 rounded-full">
                        {provider.pendingClaims} pending
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-success bg-success/10 px-2.5 py-1 rounded-full">
                        Clear
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <Link
                      href={`/admin/healthcare/providers/${provider.id}`}
                      className="btn-lift bg-navy text-white font-semibold px-4 py-2 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-1.5 text-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}