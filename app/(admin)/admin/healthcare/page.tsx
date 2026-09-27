"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Stethoscope,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Users,
  FileText,
  Pill,
  Building2,
  TrendingUp,
  Download,
  Inbox,
  Heart,
  Activity,
  ChevronRight,
} from "lucide-react";

// ============ TYPES ============
type ClaimStatus = "SUBMITTED" | "UNDER_REVIEW" | "ADDITIONAL_INFO" | "APPROVED" | "PARTIAL" | "DENIED" | "PAID";
type FundStatus = "ACTIVE" | "PAUSED" | "CLOSED";
type TabType = "claims" | "funds" | "providers";

// ============ CLAIM STATUS CONFIG ============
const claimStatusConfig: Record<ClaimStatus, { label: string; color: string; bg: string; icon: any }> = {
  SUBMITTED: { label: "Submitted", color: "text-info", bg: "bg-info/10", icon: Clock },
  UNDER_REVIEW: { label: "Under Review", color: "text-warning", bg: "bg-warning/10", icon: AlertCircle },
  ADDITIONAL_INFO: { label: "Info Needed", color: "text-warning", bg: "bg-warning/10", icon: AlertCircle },
  APPROVED: { label: "Approved", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  PARTIAL: { label: "Partially Approved", color: "text-teal", bg: "bg-teal/10", icon: CheckCircle },
  DENIED: { label: "Denied", color: "text-error", bg: "bg-error/10", icon: XCircle },
  PAID: { label: "Paid", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
};

// ============ DEMO CLAIMS ============
const demoClaims = [
  {
    id: "1",
    claimNumber: "CLM-24001",
    patientName: "Bilal Ahmed",
    provider: "Aga Khan Hospital",
    fund: "Cancer Care Fund",
    amount: 3500,
    status: "UNDER_REVIEW" as ClaimStatus,
    submittedDate: "Apr 8, 2026",
    daysPending: 2,
    invoiceCount: 3,
  },
  {
    id: "2",
    claimNumber: "CLM-24002",
    patientName: "Ayesha Khan",
    provider: "Shifa International",
    fund: "Heart Disease Fund",
    amount: 8200,
    status: "SUBMITTED" as ClaimStatus,
    submittedDate: "Apr 7, 2026",
    daysPending: 3,
    invoiceCount: 5,
  },
  {
    id: "3",
    claimNumber: "CLM-24003",
    patientName: "Hassan Ali",
    provider: "MedPlus Pharmacy",
    fund: "Diabetes Care Fund",
    amount: 450,
    status: "APPROVED" as ClaimStatus,
    submittedDate: "Apr 5, 2026",
    daysPending: 5,
    invoiceCount: 2,
  },
  {
    id: "4",
    claimNumber: "CLM-24004",
    patientName: "Fatima Bibi",
    provider: "Indus Hospital",
    fund: "Kidney Disease Fund",
    amount: 12000,
    status: "ADDITIONAL_INFO" as ClaimStatus,
    submittedDate: "Apr 2, 2026",
    daysPending: 8,
    invoiceCount: 8,
  },
  {
    id: "5",
    claimNumber: "CLM-24005",
    patientName: "Ahmed Khan",
    provider: "Aga Khan Hospital",
    fund: "Cancer Care Fund",
    amount: 5000,
    status: "PAID" as ClaimStatus,
    submittedDate: "Mar 28, 2026",
    daysPending: 0,
    invoiceCount: 4,
  },
];

// ============ DEMO FUNDS ============
const demoFunds = [
  {
    id: "1",
    name: "Cancer Care Fund",
    disease: "Cancer",
    status: "ACTIVE" as FundStatus,
    balance: 450000,
    committed: 320000,
    totalRaised: 1200000,
    applications: 245,
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
  {
    id: "2",
    name: "Heart Disease Fund",
    disease: "Cardiovascular",
    status: "ACTIVE" as FundStatus,
    balance: 280000,
    committed: 180000,
    totalRaised: 850000,
    applications: 180,
    color: "text-error",
    bgColor: "bg-error/10",
  },
  {
    id: "3",
    name: "Kidney Disease Fund",
    disease: "Renal",
    status: "ACTIVE" as FundStatus,
    balance: 150000,
    committed: 95000,
    totalRaised: 420000,
    applications: 95,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    id: "4",
    name: "Diabetes Care Fund",
    disease: "Diabetes",
    status: "ACTIVE" as FundStatus,
    balance: 95000,
    committed: 48000,
    totalRaised: 280000,
    applications: 120,
    color: "text-teal",
    bgColor: "bg-teal/10",
  },
  {
    id: "5",
    name: "Rare Disease Fund",
    disease: "Multiple",
    status: "PAUSED" as FundStatus,
    balance: 25000,
    committed: 25000,
    totalRaised: 120000,
    applications: 35,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

// ============ DEMO PROVIDERS ============
const demoProviders = [
  {
    id: "1",
    name: "Aga Khan Hospital",
    type: "Hospital",
    location: "Karachi, Pakistan",
    verified: true,
    totalClaims: 45,
    totalAmount: 285000,
    pendingClaims: 8,
  },
  {
    id: "2",
    name: "Shifa International",
    type: "Hospital",
    location: "Islamabad, Pakistan",
    verified: true,
    totalClaims: 32,
    totalAmount: 195000,
    pendingClaims: 5,
  },
  {
    id: "3",
    name: "Indus Hospital",
    type: "Hospital",
    location: "Karachi, Pakistan",
    verified: true,
    totalClaims: 28,
    totalAmount: 165000,
    pendingClaims: 3,
  },
  {
    id: "4",
    name: "MedPlus Pharmacy",
    type: "Pharmacy",
    location: "Lahore, Pakistan",
    verified: true,
    totalClaims: 120,
    totalAmount: 45000,
    pendingClaims: 12,
  },
  {
    id: "5",
    name: "Care Pharmacy",
    type: "Pharmacy",
    location: "Karachi, Pakistan",
    verified: false,
    totalClaims: 15,
    totalAmount: 8000,
    pendingClaims: 2,
  },
];

export default function AdminHealthcarePage() {
  const [activeTab, setActiveTab] = useState<TabType>("claims");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClaimStatus | "ALL">("ALL");

  const filteredClaims = demoClaims.filter((claim) => {
    const matchesSearch =
      claim.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.claimNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalClaims: demoClaims.length,
    pendingClaims: demoClaims.filter((c) => ["SUBMITTED", "UNDER_REVIEW", "ADDITIONAL_INFO"].includes(c.status)).length,
    activeFunds: demoFunds.filter((f) => f.status === "ACTIVE").length,
    totalBalance: demoFunds.reduce((sum, f) => sum + f.balance, 0),
  };

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
                onChange={(e) => setStatusFilter(e.target.value as any)}
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
                  const status = claimStatusConfig[claim.status];
                  const StatusIcon = status.icon;
                  return (
                    <div key={claim.id} className="px-6 py-5 hover:bg-cloud/30 transition-colors">
                      <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4 flex items-center gap-3">
                          <div className="bg-navy/5 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                            <span className="font-display font-bold text-navy text-sm">
                              {claim.patientName.charAt(0)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-navy text-sm truncate">
                              {claim.patientName}
                            </p>
                            <p className="text-ink/50 text-xs truncate">
                              {claim.claimNumber} • {claim.provider}
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
                            ${claim.amount.toLocaleString()}
                          </p>
                          <p className="text-ink/50 text-xs">{claim.invoiceCount} invoices</p>
                        </div>
                        <div className="col-span-2">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                          {claim.daysPending > 0 && (
                            <p className="text-ink/50 text-xs mt-1">{claim.daysPending} days pending</p>
                          )}
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
                                {claim.patientName.charAt(0)}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-navy text-sm truncate">
                                {claim.patientName}
                              </p>
                              <p className="text-ink/50 text-xs truncate">{claim.claimNumber}</p>
                            </div>
                          </div>
                          <p className="font-display font-bold text-navy shrink-0">
                            ${claim.amount.toLocaleString()}
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
          {demoFunds.map((fund) => {
            const utilization = (fund.committed / fund.totalRaised) * 100;
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
            {demoProviders.map((provider) => (
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