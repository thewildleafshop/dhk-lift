"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Heart,
  Search,
  Filter,
  Download,
  Eye,
  DollarSign,
  TrendingUp,
  Gift,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  Inbox,
  Loader2,
} from "lucide-react";

// ============ TYPES ============
type DonationStatus = "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED";

interface Allocation {
  id: string;
  amount: number;
  program: { id: string; name: string; slug: string; category: string } | null;
  project: { id: string; title: string; slug: string } | null;
}

interface Donation {
  id: string;
  donorEmail: string;
  donorName: string | null;
  totalAmount: number;
  currency: string;
  status: DonationStatus;
  isRecurring: boolean;
  receiptUrl: string | null;
  createdAt: string;
  user: { id: string; name: string; email: string } | null;
  allocations: Allocation[];
}

// ============ STATUS HELPERS ============
const statusConfig: Record<DonationStatus, { label: string; color: string; bg: string; icon: any }> = {
  COMPLETED: { label: "Completed", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  PENDING: { label: "Pending", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  FAILED: { label: "Failed", color: "text-error", bg: "bg-error/10", icon: XCircle },
  REFUNDED: { label: "Refunded", color: "text-info", bg: "bg-info/10", icon: RefreshCw },
};

// ============ PROGRAM COLOR ============
const getCauseColor = (name: string) => {
  const map: Record<string, { color: string; bg: string }> = {
    "LIFT Health": { color: "text-teal", bg: "bg-teal/10" },
    "LIFT Protect": { color: "text-purple", bg: "bg-purple/10" },
    "LIFT Ability": { color: "text-purple", bg: "bg-purple/10" },
    "LIFT Community": { color: "text-gold", bg: "bg-gold/10" },
    "Children & Families": { color: "text-navy", bg: "bg-navy/10" },
    "Food Security": { color: "text-gold", bg: "bg-gold/10" },
    "Disaster Relief": { color: "text-error", bg: "bg-error/10" },
  };
  return map[name] || { color: "text-navy", bg: "bg-navy/10" };
};

export default function MyDonationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DonationStatus | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState<"one-time" | "recurring" | "ALL">("ALL");

  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDonations() {
      try {
        setLoading(true);
        const res = await fetch("/api/donations");
        if (!res.ok) throw new Error("Failed to fetch donations");
        const data = await res.json();
        setDonations(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDonations();
  }, []);

  // Flatten donations into allocations (each allocation shows as a row)
  const flattenedDonations = donations.flatMap((donation) =>
    donation.allocations.length > 0
      ? donation.allocations.map((alloc) => ({
          donationId: donation.id,
          allocationId: alloc.id,
          causeName: alloc.program?.name || alloc.project?.title || "General Fund",
          amount: alloc.amount,
          status: donation.status,
          isRecurring: donation.isRecurring,
          date: donation.createdAt,
          receiptUrl: donation.receiptUrl,
        }))
      : [
          {
            donationId: donation.id,
            allocationId: donation.id,
            causeName: "General Fund",
            amount: donation.totalAmount,
            status: donation.status,
            isRecurring: donation.isRecurring,
            date: donation.createdAt,
            receiptUrl: donation.receiptUrl,
          },
        ]
  );

  const filteredDonations = flattenedDonations.filter((d) => {
    const matchesSearch =
      d.causeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.donationId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || d.status === statusFilter;
    const matchesType =
      typeFilter === "ALL" ||
      (typeFilter === "recurring" && d.isRecurring) ||
      (typeFilter === "one-time" && !d.isRecurring);
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    totalDonated: donations
      .filter((d) => d.status === "COMPLETED")
      .reduce((sum, d) => sum + d.totalAmount, 0),
    totalDonations: donations.filter((d) => d.status === "COMPLETED").length,
    recurringCount: donations.filter((d) => d.isRecurring).length,
    causesSupported: new Set(
      donations.flatMap((d) => d.allocations.map((a) => a.program?.name || a.project?.title))
    ).size,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-navy animate-spin mx-auto mb-4" />
          <p className="text-ink/60">Loading your donations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-card p-12 text-center border border-gray-100">
        <p className="text-error font-semibold mb-2">Error loading donations</p>
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
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-cloud border-b border-gray-100 text-xs font-semibold text-ink/60 uppercase tracking-wider">
            <div className="col-span-4">Cause</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredDonations.map((donation) => {
              const status = statusConfig[donation.status] || statusConfig.PENDING;
              const StatusIcon = status.icon;
              const causeColors = getCauseColor(donation.causeName);

              return (
                <div key={donation.allocationId} className="px-6 py-5 hover:bg-cloud/50 transition-colors">
                  
                  {/* Desktop */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 flex items-center gap-3">
                      <div className={`${causeColors.bg} rounded-full p-2.5 shrink-0`}>
                        <Heart className={`w-4 h-4 ${causeColors.color}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-navy text-sm truncate">
                          {donation.causeName}
                        </p>
                        <p className="text-ink/50 text-xs">
                          TXN-{donation.donationId.slice(-8)}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <p className="font-display font-bold text-navy">${donation.amount}</p>
                    </div>

                    <div className="col-span-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        donation.isRecurring ? "text-purple bg-purple/10" : "text-ink/70 bg-gray-100"
                      }`}>
                        {donation.isRecurring ? "Recurring" : "One-Time"}
                      </span>
                    </div>

                    <div className="col-span-2">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>

                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/donations/${donation.donationId}`}
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

                  {/* Mobile */}
                  <div className="md:hidden space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`${causeColors.bg} rounded-full p-2.5 shrink-0`}>
                          <Heart className={`w-4 h-4 ${causeColors.color}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-navy text-sm truncate">
                            {donation.causeName}
                          </p>
                          <p className="text-ink/50 text-xs">
                            TXN-{donation.donationId.slice(-8)}
                          </p>
                        </div>
                      </div>
                      <p className="font-display font-bold text-navy shrink-0">
                        ${donation.amount}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        donation.isRecurring ? "text-purple bg-purple/10" : "text-ink/70 bg-gray-100"
                      }`}>
                        {donation.isRecurring ? "Recurring" : "One-Time"}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <p className="text-xs text-ink/50">
                        {new Date(donation.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      <Link
                        href={`/dashboard/donations/${donation.donationId}`}
                        className="btn-lift bg-navy text-white font-semibold px-4 py-2 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-1.5 text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
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