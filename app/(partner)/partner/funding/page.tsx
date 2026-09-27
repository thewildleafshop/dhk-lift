"use client";

import Link from "next/link";
import { useState } from "react";
import {
  DollarSign,
  PlusCircle,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  TrendingUp,
  Calendar,
  FolderKanban,
  ChevronRight,
  Inbox,
  Download,
  Send,
  X,
} from "lucide-react";

// ============ TYPES ============
type FundingStatus = "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "DISBURSED";

// ============ STATUS CONFIG ============
const statusConfig: Record<FundingStatus, { label: string; color: string; bg: string; icon: any }> = {
  PENDING: { label: "Pending", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  UNDER_REVIEW: { label: "Under Review", color: "text-info", bg: "bg-info/10", icon: AlertCircle },
  APPROVED: { label: "Approved", color: "text-teal", bg: "bg-teal/10", icon: CheckCircle },
  REJECTED: { label: "Rejected", color: "text-error", bg: "bg-error/10", icon: XCircle },
  DISBURSED: { label: "Disbursed", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
};

// ============ DEMO DATA ============
const demoRequests = [
  {
    id: "FND-24001",
    project: "Clean Water for Rural Sindh",
    projectId: "PROJ-24001",
    amount: 15000,
    status: "UNDER_REVIEW" as FundingStatus,
    submittedDate: "Apr 5, 2026",
    daysPending: 3,
    purpose: "Equipment procurement for well installation",
    milestone: "Milestone 2: Equipment Procurement",
  },
  {
    id: "FND-24002",
    project: "Mobile Medical Clinics",
    projectId: "PROJ-24002",
    amount: 25000,
    status: "APPROVED" as FundingStatus,
    submittedDate: "Mar 28, 2026",
    daysPending: 0,
    purpose: "Medical supplies and vehicle maintenance",
    milestone: "Milestone 3: Operations",
  },
  {
    id: "FND-24003",
    project: "School Renovation Project",
    projectId: "PROJ-24003",
    amount: 8000,
    status: "PENDING" as FundingStatus,
    submittedDate: "Apr 8, 2026",
    daysPending: 1,
    purpose: "Construction materials and labor",
    milestone: "Milestone 1: Construction Started",
  },
  {
    id: "FND-24004",
    project: "Emergency Food Distribution",
    projectId: "PROJ-24004",
    amount: 12000,
    status: "DISBURSED" as FundingStatus,
    submittedDate: "Mar 10, 2026",
    daysPending: 0,
    purpose: "Food packages for 500 families",
    milestone: "Milestone 4: 500 Families Served",
  },
  {
    id: "FND-24005",
    project: "Wheelchair Distribution Drive",
    projectId: "PROJ-24005",
    amount: 5000,
    status: "REJECTED" as FundingStatus,
    submittedDate: "Feb 25, 2026",
    daysPending: 0,
    purpose: "Purchase of 50 wheelchairs",
    milestone: "Milestone 2: Wheelchair Purchase",
  },
];

export default function PartnerFundingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<FundingStatus | "ALL">("ALL");
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);

  const filteredRequests = demoRequests.filter((req) => {
    const matchesSearch =
      req.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: demoRequests.length,
    pending: demoRequests.filter((r) => ["PENDING", "UNDER_REVIEW"].includes(r.status)).length,
    approved: demoRequests.filter((r) => r.status === "APPROVED").length,
    totalAmount: demoRequests
      .filter((r) => ["APPROVED", "DISBURSED"].includes(r.status))
      .reduce((sum, r) => sum + r.amount, 0),
  };

  return (
    <div className="space-y-6">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
            Funding Requests
          </h1>
          <p className="text-ink/70 mt-1">
            Submit and track funding requests for your approved projects.
          </p>
        </div>
        <button
          onClick={() => setShowNewRequestModal(true)}
          className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 w-fit text-sm"
        >
          <PlusCircle className="w-4 h-4" />
          New Funding Request
        </button>
      </div>

      {/* ================= STATS ROW ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <FolderKanban className="w-4 h-4 text-navy" />
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
            <CheckCircle className="w-4 h-4 text-success" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Approved</p>
          </div>
          <p className="font-display text-2xl font-bold text-success">{stats.approved}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-gold" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Received</p>
          </div>
          <p className="font-display text-2xl font-bold text-gold">
            ${(stats.totalAmount / 1000).toFixed(0)}K
          </p>
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
            placeholder="Search by project or request ID..."
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
            <option value="APPROVED">Approved</option>
            <option value="DISBURSED">Disbursed</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* ================= REQUESTS LIST ================= */}
      {filteredRequests.length > 0 ? (
        <div className="space-y-4">
          {filteredRequests.map((request) => {
            const status = statusConfig[request.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={request.id}
                className="card-hover bg-white rounded-card p-6 shadow-sm border border-gray-100"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4">
                      <div className="bg-gold/10 rounded-full p-3 shrink-0">
                        <DollarSign className="w-6 h-6 text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display font-bold text-navy text-lg">
                            ${request.amount.toLocaleString()}
                          </h3>
                          <span className={`text-xs font-semibold ${status.color} ${status.bg} px-3 py-1 rounded-full flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </div>
                        <p className="font-semibold text-navy text-sm mt-2">
                          {request.project}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-ink/60">
                          <span className="flex items-center gap-1">
                            <FolderKanban className="w-3.5 h-3.5" />
                            {request.id}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {request.submittedDate}
                          </span>
                          {request.daysPending > 0 && (
                            <span className="flex items-center gap-1 font-semibold text-warning">
                              <Clock className="w-3.5 h-3.5" />
                              {request.daysPending} days pending
                            </span>
                          )}
                        </div>
                        <div className="mt-3 p-3 bg-cloud rounded-input">
                          <p className="text-xs text-ink/50 mb-1">Purpose</p>
                          <p className="text-sm text-ink/80">{request.purpose}</p>
                          <p className="text-xs text-ink/50 mt-2">Milestone</p>
                          <p className="text-xs font-semibold text-navy mt-0.5">{request.milestone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col lg:items-end gap-2 shrink-0">
                    <Link
                      href={`/partner/funding/${request.id}`}
                      className="btn-lift bg-navy text-white font-semibold px-5 py-2.5 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                    {request.status === "DISBURSED" && (
                      <button className="btn-lift border-2 border-navy/20 text-navy font-semibold px-5 py-2.5 rounded-input hover:bg-navy/5 transition-colors flex items-center gap-2 text-sm">
                        <Download className="w-4 h-4" />
                        Receipt
                      </button>
                    )}
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
            No Funding Requests Found
          </h3>
          <p className="text-ink/60 mt-2 max-w-md mx-auto">
            {searchQuery || statusFilter !== "ALL"
              ? "Try adjusting your filters."
              : "You haven't submitted any funding requests yet."}
          </p>
          <button
            onClick={() => setShowNewRequestModal(true)}
            className="btn-lift inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg mt-6"
          >
            <PlusCircle className="w-5 h-5" />
            Create Your First Request
          </button>
        </div>
      )}

      {/* ================= NEW REQUEST MODAL ================= */}
      {showNewRequestModal && (
        <div
          className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setShowNewRequestModal(false)}
        >
          <div
            className="bg-white rounded-card w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-gold/10 rounded-full p-2.5">
                  <DollarSign className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-display font-bold text-navy text-lg">
                  New Funding Request
                </h3>
              </div>
              <button
                onClick={() => setShowNewRequestModal(false)}
                className="p-2 text-ink/40 hover:text-navy hover:bg-cloud rounded-input transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Select Project *</label>
                <select className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm">
                  <option value="">Choose a project</option>
                  <option>Clean Water for Rural Sindh (PROJ-24001)</option>
                  <option>Mobile Medical Clinics (PROJ-24002)</option>
                  <option>School Renovation Project (PROJ-24003)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Milestone *</label>
                <select className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm">
                  <option value="">Select milestone</option>
                  <option>Milestone 1: Site Survey</option>
                  <option>Milestone 2: Equipment Procurement</option>
                  <option>Milestone 3: Installation Phase 1</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Amount Requested (USD) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                  <input
                    type="number"
                    placeholder="e.g., 15000"
                    className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Purpose *</label>
                <textarea
                  rows={3}
                  placeholder="Describe what the funds will be used for..."
                  className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none"
                />
              </div>

              <div className="flex items-start gap-3 p-3 bg-info/5 border border-info/20 rounded-input">
                <AlertCircle className="w-4 h-4 text-info mt-0.5 shrink-0" />
                <p className="text-xs text-ink/70">
                  Funding requests are reviewed within 3-5 business days. You'll be notified via email.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
              <button
                onClick={() => setShowNewRequestModal(false)}
                className="btn-lift border-2 border-navy/20 text-navy font-semibold px-5 py-2.5 rounded-input hover:bg-navy/5 transition-colors text-sm"
              >
                Cancel
              </button>
              <button className="btn-lift bg-gold text-ink font-semibold px-6 py-2.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 text-sm">
                <Send className="w-4 h-4" />
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}