"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Receipt,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  DollarSign,
  Calendar,
  Building2,
  FileText,
  Download,
  ChevronRight,
  Inbox,
  TrendingUp,
  PlusCircle,
  MessageSquare,
} from "lucide-react";

// ============ TYPES ============
type ClaimStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "ADDITIONAL_INFO"
  | "APPROVED"
  | "PARTIAL"
  | "PAID"
  | "DENIED";

type Claim = {
  id: string;
  claimNumber: string;
  patientName: string;
  patientId: string;
  fund: string;
  fundColor: string;
  fundBg: string;
  treatmentType: string;
  treatmentDate: string;
  amountRequested: number;
  amountApproved: number;
  status: ClaimStatus;
  submittedDate: string;
  lastUpdate: string;
  daysPending: number;
  nextAction?: string;
};

// ============ STATUS CONFIG ============
const statusConfig: Record<ClaimStatus, { label: string; color: string; bg: string; icon: any }> = {
  SUBMITTED: { label: "Submitted", color: "text-info", bg: "bg-info/10", icon: Clock },
  UNDER_REVIEW: { label: "Under Review", color: "text-warning", bg: "bg-warning/10", icon: AlertCircle },
  ADDITIONAL_INFO: { label: "Info Needed", color: "text-warning", bg: "bg-warning/10", icon: AlertCircle },
  APPROVED: { label: "Approved", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  PARTIAL: { label: "Partially Approved", color: "text-teal", bg: "bg-teal/10", icon: CheckCircle },
  PAID: { label: "Paid", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  DENIED: { label: "Denied", color: "text-error", bg: "bg-error/10", icon: XCircle },
};

// ============ DEMO DATA ============
const demoClaims: Claim[] = [
  {
    id: "1",
    claimNumber: "CLM-24001",
    patientName: "Bilal Ahmed",
    patientId: "HLT-24001",
    fund: "Cancer Care Fund",
    fundColor: "text-purple",
    fundBg: "bg-purple/10",
    treatmentType: "Chemotherapy Session",
    treatmentDate: "Apr 2, 2026",
    amountRequested: 3500,
    amountApproved: 3200,
    status: "APPROVED",
    submittedDate: "Apr 3, 2026",
    lastUpdate: "1 day ago",
    daysPending: 0,
    nextAction: "Payment will be processed within 3 business days.",
  },
  {
    id: "2",
    claimNumber: "CLM-24002",
    patientName: "Ayesha Khan",
    patientId: "HLT-24002",
    fund: "Heart Disease Fund",
    fundColor: "text-error",
    fundBg: "bg-error/10",
    treatmentType: "Cardiac Surgery",
    treatmentDate: "Apr 5, 2026",
    amountRequested: 8200,
    amountApproved: 0,
    status: "UNDER_REVIEW",
    submittedDate: "Apr 6, 2026",
    lastUpdate: "2 hours ago",
    daysPending: 3,
  },
  {
    id: "3",
    claimNumber: "CLM-24003",
    patientName: "Hassan Ali",
    patientId: "HLT-24003",
    fund: "Diabetes Care Fund",
    fundColor: "text-teal",
    fundBg: "bg-teal/10",
    treatmentType: "Insulin & Supplies",
    treatmentDate: "Apr 1, 2026",
    amountRequested: 450,
    amountApproved: 450,
    status: "PAID",
    submittedDate: "Apr 2, 2026",
    lastUpdate: "5 days ago",
    daysPending: 0,
  },
  {
    id: "4",
    claimNumber: "CLM-24004",
    patientName: "Fatima Bibi",
    patientId: "HLT-24004",
    fund: "Kidney Disease Fund",
    fundColor: "text-info",
    fundBg: "bg-info/10",
    treatmentType: "Dialysis Sessions (4x)",
    treatmentDate: "Mar 28, 2026",
    amountRequested: 1200,
    amountApproved: 0,
    status: "ADDITIONAL_INFO",
    submittedDate: "Mar 30, 2026",
    lastUpdate: "3 days ago",
    daysPending: 8,
    nextAction: "Please upload updated dialysis receipts.",
  },
  {
    id: "5",
    claimNumber: "CLM-24005",
    patientName: "Ahmed Khan",
    patientId: "HLT-24005",
    fund: "Cancer Care Fund",
    fundColor: "text-purple",
    fundBg: "bg-purple/10",
    treatmentType: "Radiation Therapy",
    treatmentDate: "Mar 20, 2026",
    amountRequested: 5000,
    amountApproved: 4500,
    status: "PARTIAL",
    submittedDate: "Mar 22, 2026",
    lastUpdate: "1 week ago",
    daysPending: 0,
    nextAction: "Partial approval: $4,500 of $5,000 approved.",
  },
  {
    id: "6",
    claimNumber: "CLM-24006",
    patientName: "Sara Ahmed",
    patientId: "HLT-24006",
    fund: "Eye Care Fund",
    fundColor: "text-teal",
    fundBg: "bg-teal/10",
    treatmentType: "Cataract Surgery",
    treatmentDate: "Mar 15, 2026",
    amountRequested: 800,
    amountApproved: 0,
    status: "DENIED",
    submittedDate: "Mar 17, 2026",
    lastUpdate: "2 weeks ago",
    daysPending: 0,
    nextAction: "Claim denied: Patient not eligible for this fund.",
  },
];

// ============ FILTER TABS ============
const filterTabs: { id: ClaimStatus | "ALL"; label: string }[] = [
  { id: "ALL", label: "All Claims" },
  { id: "SUBMITTED", label: "Submitted" },
  { id: "UNDER_REVIEW", label: "Under Review" },
  { id: "ADDITIONAL_INFO", label: "Info Needed" },
  { id: "APPROVED", label: "Approved" },
  { id: "PAID", label: "Paid" },
  { id: "DENIED", label: "Denied" },
];

// ============ MAIN COMPONENT ============
export default function ClaimStatusPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClaimStatus | "ALL">("ALL");

  const filteredClaims = demoClaims.filter((claim) => {
    const matchesSearch =
      claim.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.patientId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: demoClaims.length,
    pending: demoClaims.filter((c) => ["SUBMITTED", "UNDER_REVIEW", "ADDITIONAL_INFO"].includes(c.status)).length,
    approved: demoClaims.filter((c) => ["APPROVED", "PARTIAL", "PAID"].includes(c.status)).length,
    totalAmount: demoClaims
      .filter((c) => ["APPROVED", "PARTIAL", "PAID"].includes(c.status))
      .reduce((sum, c) => sum + c.amountApproved, 0),
  };

  return (
    <main className="min-h-screen bg-cloud">

      {/* ================= HEADER SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-12 md:py-16 relative z-10">
          
          <div className="flex items-center gap-2 text-white/60 text-sm mb-6 flex-wrap">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/healthcare/funds" className="hover:text-gold transition-colors">Healthcare</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">Claim Status</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gold/20 rounded-full p-2.5">
                  <Receipt className="w-6 h-6 text-gold" />
                </div>
                <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
                  Provider Portal
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Track Your Claims
              </h1>
              <p className="text-white/80 mt-3 max-w-2xl">
                View the status of all your submitted claims and track payment processing.
              </p>
            </div>

            <Link
              href="/healthcare/claims/submit"
              className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 shrink-0 text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Submit New Claim
            </Link>
          </div>
        </div>
      </section>

      {/* ================= STATS BAR ================= */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-navy">{stats.total}</p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Total Claims</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-warning">{stats.pending}</p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Pending</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-success">{stats.approved}</p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Approved</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-gold">
                ${(stats.totalAmount / 1000).toFixed(1)}K
              </p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Total Approved</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FILTERS ================= */}
      <section className="max-w-container mx-auto px-6 py-8">
        <div className="bg-white rounded-card p-4 shadow-sm border border-gray-100 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by claim number, patient name, or application ID..."
              className="w-full pl-12 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink text-sm"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  statusFilter === tab.id
                    ? "bg-navy text-white shadow-sm"
                    : "bg-cloud text-ink/70 hover:bg-navy/5 hover:text-navy"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLAIMS LIST ================= */}
      <section className="max-w-container mx-auto px-6 pb-16 md:pb-24">
        {filteredClaims.length > 0 ? (
          <div className="space-y-4">
            {filteredClaims.map((claim) => {
              const status = statusConfig[claim.status];
              const StatusIcon = status.icon;
              const progress = claim.amountRequested > 0
                ? Math.round((claim.amountApproved / claim.amountRequested) * 100)
                : 0;

              return (
                <div
                  key={claim.id}
                  className="card-hover bg-white rounded-card p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    
                    {/* Left: Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4">
                        <div className={`${claim.fundBg} rounded-full p-3 shrink-0`}>
                          <Receipt className={`w-6 h-6 ${claim.fundColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-display font-bold text-navy text-lg">
                              {claim.claimNumber}
                            </h3>
                            <span className={`text-xs font-semibold ${status.color} ${status.bg} px-3 py-1 rounded-full flex items-center gap-1`}>
                              <StatusIcon className="w-3 h-3" />
                              {status.label}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mt-3 text-sm">
                            <div className="flex items-center gap-2 text-ink/70">
                              <span className="text-ink/50">Patient:</span>
                              <span className="font-semibold text-navy">{claim.patientName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-ink/70">
                              <span className="text-ink/50">App ID:</span>
                              <span className="font-semibold text-navy">{claim.patientId}</span>
                            </div>
                            <div className="flex items-center gap-2 text-ink/70">
                              <span className="text-ink/50">Fund:</span>
                              <span className={`text-xs font-semibold ${claim.fundColor} ${claim.fundBg} px-2 py-0.5 rounded-full`}>
                                {claim.fund}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-ink/70">
                              <Calendar className="w-3.5 h-3.5 text-ink/50" />
                              <span>{claim.treatmentDate}</span>
                            </div>
                          </div>

                          <p className="text-ink/70 text-sm mt-3">
                            <span className="text-ink/50">Treatment:</span>{" "}
                            <span className="font-medium text-navy">{claim.treatmentType}</span>
                          </p>

                          {/* Next Action */}
                          {claim.nextAction && (
                            <div className={`flex items-start gap-2 mt-3 p-3 rounded-input ${
                              claim.status === "APPROVED" || claim.status === "PAID"
                                ? "bg-success/5 border border-success/20"
                                : claim.status === "DENIED"
                                ? "bg-error/5 border border-error/20"
                                : "bg-warning/5 border border-warning/20"
                            }`}>
                              {claim.status === "APPROVED" || claim.status === "PAID" ? (
                                <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                              ) : claim.status === "DENIED" ? (
                                <XCircle className="w-4 h-4 text-error mt-0.5 shrink-0" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                              )}
                              <p className={`text-xs ${
                                claim.status === "APPROVED" || claim.status === "PAID"
                                  ? "text-success"
                                  : claim.status === "DENIED"
                                  ? "text-error"
                                  : "text-warning"
                              }`}>
                                {claim.nextAction}
                              </p>
                            </div>
                          )}

                          {/* Progress Bar for partial/approved */}
                          {claim.amountApproved > 0 && (
                            <div className="mt-3">
                              <div className="flex justify-between text-xs text-ink/60 mb-1">
                                <span>Approved: ${claim.amountApproved.toLocaleString()}</span>
                                <span>Requested: ${claim.amountRequested.toLocaleString()}</span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className="bg-success h-1.5 rounded-full transition-all duration-1000"
                                  style={{ width: `${Math.min(progress, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Amount + Actions */}
                    <div className="flex flex-col lg:items-end gap-3 shrink-0">
                      <div className="text-right">
                        <p className="text-xs text-ink/50">Claim Amount</p>
                        <p className="font-display text-2xl font-bold text-navy">
                          ${claim.amountRequested.toLocaleString()}
                        </p>
                        {claim.amountApproved > 0 && claim.status !== "PARTIAL" && (
                          <p className="text-xs text-success font-semibold mt-1">
                            Approved: ${claim.amountApproved.toLocaleString()}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/healthcare/claims/${claim.id}`}
                          className="btn-lift bg-navy text-white font-semibold px-5 py-2.5 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-2 text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </Link>
                        {claim.status === "PAID" && (
                          <button className="btn-lift border-2 border-navy/20 text-navy p-2.5 rounded-input hover:bg-navy/5 transition-colors" title="Download Receipt">
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                      </div>
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
              No Claims Found
            </h3>
            <p className="text-ink/60 mt-2 max-w-md mx-auto">
              {searchQuery || statusFilter !== "ALL"
                ? "Try adjusting your filters or search query."
                : "You haven't submitted any claims yet."}
            </p>
            <Link
              href="/healthcare/claims/submit"
              className="btn-lift inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg mt-6"
            >
              <PlusCircle className="w-5 h-5" />
              Submit Your First Claim
            </Link>
          </div>
        )}
      </section>

      {/* ================= HELP SECTION ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <div className="bg-gradient-to-br from-navy to-navy/90 rounded-card p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-white/10 rounded-full p-3 w-fit mb-4">
                  <TrendingUp className="w-7 h-7 text-gold" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Claim Processing Overview
                </h2>
                <p className="text-white/80 mt-4 leading-relaxed">
                  All claims go through a 5-step verification process. Average processing 
                  time is 5-7 business days with direct payment upon approval.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/healthcare/claims/submit"
                    className="btn-lift bg-gold text-ink font-semibold px-6 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 text-sm"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Submit New Claim
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-lift border-2 border-white/30 text-white font-semibold px-6 py-3.5 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2 text-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Contact Claims Team
                  </Link>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "5-7", label: "Days Processing", icon: Clock },
                    { value: "100%", label: "Verified Claims", icon: CheckCircle },
                    { value: "Direct", label: "Bank Payment", icon: DollarSign },
                    { value: "24/7", label: "Status Tracking", icon: TrendingUp },
                  ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div key={i} className="text-center p-4 bg-white/5 rounded-input">
                        <Icon className="w-6 h-6 text-gold mx-auto mb-2" />
                        <p className="font-display text-xl font-bold">{stat.value}</p>
                        <p className="text-white/60 text-xs mt-1">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}