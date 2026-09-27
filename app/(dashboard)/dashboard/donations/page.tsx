"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Heart,
  Search,
  Filter,
  ChevronRight,
  Download,
  Eye,
  Calendar,
  DollarSign,
  TrendingUp,
  Gift,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  Receipt,
  Inbox,
} from "lucide-react";

// ============ TYPES ============
type DonationStatus = "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED";
type DonationType = "one-time" | "recurring";

type Donation = {
  id: string;
  transactionNumber: string;
  cause: string;
  causeColor: string;
  causeBg: string;
  amount: number;
  type: DonationType;
  status: DonationStatus;
  date: string;
  paymentMethod: string;
  isAnonymous: boolean;
};

// ============ STATUS HELPERS ============
const statusConfig: Record<DonationStatus, { label: string; color: string; bg: string; icon: any }> = {
  COMPLETED: { label: "Completed", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  PENDING: { label: "Pending", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  FAILED: { label: "Failed", color: "text-error", bg: "bg-error/10", icon: XCircle },
  REFUNDED: { label: "Refunded", color: "text-info", bg: "bg-info/10", icon: RefreshCw },
};

// ============ DEMO DATA ============
const demoDonations: Donation[] = [
  {
    id: "1",
    transactionNumber: "TXN-23043012",
    cause: "Food Security",
    causeColor: "text-gold",
    causeBg: "bg-gold/10",
    amount: 50,
    type: "one-time",
    status: "COMPLETED",
    date: "Apr 12, 2026",
    paymentMethod: "Visa •••• 4242",
    isAnonymous: false,
  },
  {
    id: "2",
    transactionNumber: "TXN-23031987",
    cause: "Education Support",
    causeColor: "text-teal",
    causeBg: "bg-teal/10",
    amount: 30,
    type: "recurring",
    status: "COMPLETED",
    date: "Mar 28, 2026",
    paymentMethod: "Visa •••• 4242",
    isAnonymous: false,
  },
  {
    id: "3",
    transactionNumber: "TXN-23028765",
    cause: "Healthcare Access",
    causeColor: "text-teal",
    causeBg: "bg-teal/10",
    amount: 20,
    type: "one-time",
    status: "COMPLETED",
    date: "Mar 10, 2026",
    paymentMethod: "Mastercard •••• 8888",
    isAnonymous: true,
  },
  {
    id: "4",
    transactionNumber: "TXN-23015432",
    cause: "Where Needed Most",
    causeColor: "text-gold",
    causeBg: "bg-gold/10",
    amount: 100,
    type: "one-time",
    status: "COMPLETED",
    date: "Feb 22, 2026",
    paymentMethod: "Visa •••• 4242",
    isAnonymous: false,
  },
  {
    id: "5",
    transactionNumber: "TXN-23014211",
    cause: "LIFT Protect",
    causeColor: "text-purple",
    causeBg: "bg-purple/10",
    amount: 25,
    type: "one-time",
    status: "PENDING",
    date: "Feb 15, 2026",
    paymentMethod: "Bank Transfer",
    isAnonymous: false,
  },
];

// ============ MAIN COMPONENT ============
export default function MyDonationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DonationStatus | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState<DonationType | "ALL">("ALL");

  const filteredDonations = demoDonations.filter((donation) => {
    const matchesSearch =
      donation.cause.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.transactionNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || donation.status === statusFilter;
    const matchesType = typeFilter === "ALL" || donation.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    totalDonated: demoDonations
      .filter((d) => d.status === "COMPLETED")
      .reduce((sum, d) => sum + d.amount, 0),
    totalDonations: demoDonations.filter((d) => d.status === "COMPLETED").length,
    recurringCount: demoDonations.filter((d) => d.type === "recurring").length,
    causesSupported: new Set(demoDonations.map((d) => d.cause)).size,
  };

  return (
    <div className="space-y-6">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
            My Donations
          </h1>
          <p className="text-ink/70 mt-1">
            View all your donations, download receipts, and manage recurring gifts.
          </p>
        </div>
        <Link
          href="/giving"
          className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 w-fit"
        >
          <Heart className="w-5 h-5" />
          Make a Donation
        </Link>
      </div>

      {/* ================= STATS ROW ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-gold" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Total Given</p>
          </div>
          <p className="font-display text-2xl font-bold text-navy">${stats.totalDonated}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Gift className="w-4 h-4 text-teal" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Donations</p>
          </div>
          <p className="font-display text-2xl font-bold text-navy">{stats.totalDonations}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <RefreshCw className="w-4 h-4 text-purple" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Recurring</p>
          </div>
          <p className="font-display text-2xl font-bold text-navy">{stats.recurringCount}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-gold" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Causes</p>
          </div>
          <p className="font-display text-2xl font-bold text-navy">{stats.causesSupported}</p>
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
            placeholder="Search by cause or transaction number..."
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
            <option value="COMPLETED">Completed</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>

        {/* Type Filter */}
        <div className="relative">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="pl-4 pr-8 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-ink text-sm appearance-none cursor-pointer"
          >
            <option value="ALL">All Types</option>
            <option value="one-time">One-Time</option>
            <option value="recurring">Recurring</option>
          </select>
        </div>
      </div>

      {/* ================= DONATIONS LIST ================= */}
      {filteredDonations.length > 0 ? (
        <div className="bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-cloud border-b border-gray-100 text-xs font-semibold text-ink/60 uppercase tracking-wider">
            <div className="col-span-4">Cause</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {filteredDonations.map((donation) => {
              const status = statusConfig[donation.status];
              const StatusIcon = status.icon;
              return (
                <div
                  key={donation.id}
                  className="px-6 py-5 hover:bg-cloud/50 transition-colors"
                >
                  {/* Desktop Layout */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                    {/* Cause */}
                    <div className="col-span-4 flex items-center gap-3">
                      <div className={`${donation.causeBg} rounded-full p-2.5 shrink-0`}>
                        <Heart className={`w-4 h-4 ${donation.causeColor}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-navy text-sm truncate">
                          {donation.cause}
                        </p>
                        <p className="text-ink/50 text-xs">
                          {donation.transactionNumber}
                          {donation.isAnonymous && " • Anonymous"}
                        </p>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="col-span-2">
                      <p className="font-display font-bold text-navy">
                        ${donation.amount}
                      </p>
                    </div>

                    {/* Type */}
                    <div className="col-span-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        donation.type === "recurring"
                          ? "text-purple bg-purple/10"
                          : "text-ink/70 bg-gray-100"
                      }`}>
                        {donation.type === "recurring" ? "Recurring" : "One-Time"}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/donations/${donation.id}`}
                        className="p-2 text-ink/60 hover:text-navy hover:bg-cloud rounded-input transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        className="p-2 text-ink/60 hover:text-navy hover:bg-cloud rounded-input transition-colors"
                        title="Download Receipt"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`${donation.causeBg} rounded-full p-2.5 shrink-0`}>
                          <Heart className={`w-4 h-4 ${donation.causeColor}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-navy text-sm truncate">
                            {donation.cause}
                          </p>
                          <p className="text-ink/50 text-xs">
                            {donation.transactionNumber}
                          </p>
                        </div>
                      </div>
                      <p className="font-display font-bold text-navy shrink-0">
                        ${donation.amount}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        donation.type === "recurring"
                          ? "text-purple bg-purple/10"
                          : "text-ink/70 bg-gray-100"
                      }`}>
                        {donation.type === "recurring" ? "Recurring" : "One-Time"}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <p className="text-xs text-ink/50">{donation.date}</p>
                      <div className="flex gap-2">
                        <Link
                          href={`/dashboard/donations/${donation.id}`}
                          className="p-2 text-ink/60 hover:text-navy hover:bg-cloud rounded-input transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button className="p-2 text-ink/60 hover:text-navy hover:bg-cloud rounded-input transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
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
            No Donations Found
          </h3>
          <p className="text-ink/60 mt-2 max-w-md mx-auto">
            {searchQuery || statusFilter !== "ALL" || typeFilter !== "ALL"
              ? "Try adjusting your filters or search query."
              : "You haven't made any donations yet. Start giving today."}
          </p>
          <Link
            href="/giving"
            className="btn-lift inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg mt-6"
          >
            <Heart className="w-5 h-5" />
            Make Your First Donation
          </Link>
        </div>
      )}

    </div>
  );
}