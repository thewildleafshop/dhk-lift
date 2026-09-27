"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Heart,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  DollarSign,
  TrendingUp,
  Download,
  Inbox,
  User,
  Layers,
  AlertCircle,
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

// ============ STATUS CONFIG ============
const statusConfig: Record<DonationStatus, { label: string; color: string; bg: string; icon: any }> = {
  COMPLETED: { label: "Completed", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  PENDING: { label: "Pending", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  FAILED: { label: "Failed", color: "text-error", bg: "bg-error/10", icon: XCircle },
  REFUNDED: { label: "Refunded", color: "text-info", bg: "bg-info/10", icon: RefreshCw },
};

export default function AdminDonationsPage() {
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

  const filteredDonations = donations.filter((donation) => {
    const donorName = donation.donorName || "Guest Donor";
    const matchesSearch =
      donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.donorEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || donation.status === statusFilter;
    const matchesType =
      typeFilter === "ALL" ||
      (typeFilter === "recurring" && donation.isRecurring) ||
      (typeFilter === "one-time" && !donation.isRecurring);
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    totalRaised: donations.filter((d) => d.status === "COMPLETED").reduce((sum, d) => sum + d.totalAmount, 0),
    totalDonations: donations.filter((d) => d.status === "COMPLETED").length,
    recurring: donations.filter((d) => d.isRecurring).length,
    failed: donations.filter((d) => d.status === "FAILED").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-navy animate-spin mx-auto mb-4" />
          <p className="text-ink/60">Loading donations...</p>
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
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
            Donations Management
          </h1>
          <p className="text-ink/70 mt-1">
            Track all donations, transactions, and multi-cause allocations.
          </p>
        </div>
        <button className="btn-lift bg-navy text-white font-semibold px-6 py-3 rounded-input hover:bg-navy/90 transition-colors shadow-sm flex items-center gap-2 w-fit text-sm">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-gold" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Total Raised</p>
          </div>
          <p className="font-display text-2xl font-bold text-navy">
            ${stats.totalRaised.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-4 h-4 text-teal" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Donations</p>
          </div>
          <p className="font-display text-2xl font-bold text-navy">{stats.totalDonations}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <RefreshCw className="w-4 h-4 text-purple" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Recurring</p>
          </div>
          <p className="font-display text-2xl font-bold text-navy">{stats.recurring}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-error" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Failed</p>
          </div>
          <p className="font-display text-2xl font-bold text-error">{stats.failed}</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-card p-4 border border-gray-100 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by donor, email, or transaction..."
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

      {/* DONATIONS TABLE */}
      {filteredDonations.length > 0 ? (
        <div className="bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-cloud border-b border-gray-100 text-xs font-semibold text-ink/60 uppercase tracking-wider">
            <div className="col-span-4">Donor</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredDonations.map((donation) => {
              const status = statusConfig[donation.status] || statusConfig.PENDING;
              const StatusIcon = status.icon;
              const donorName = donation.donorName || "Guest Donor";
              const isAnonymous = !donation.user && !donation.donorName;
              const allocationsCount = donation.allocations.length;

              return (
                <div key={donation.id} className="px-6 py-5 hover:bg-cloud/30 transition-colors">
                  
                  {/* Desktop */}
                  <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 flex items-center gap-3">
                      <div className={`rounded-full w-10 h-10 flex items-center justify-center shrink-0 ${
                        isAnonymous ? "bg-gray-100" : "bg-gold"
                      }`}>
                        {isAnonymous ? (
                          <User className="w-5 h-5 text-ink/40" />
                        ) : (
                          <span className="font-display font-bold text-ink text-sm">
                            {donorName.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-navy text-sm truncate">
                            {donorName}
                          </p>
                          {allocationsCount > 1 && (
                            <span className="text-xs font-semibold text-purple bg-purple/10 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                              <Layers className="w-3 h-3" />
                              {allocationsCount}
                            </span>
                          )}
                        </div>
                        <p className="text-ink/50 text-xs truncate">
                          TXN-{donation.id.slice(-8)} • {donation.donorEmail}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <p className="font-display font-bold text-navy">
                        ${donation.totalAmount.toLocaleString()}
                      </p>
                      <p className="text-ink/50 text-xs">
                        {new Date(donation.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
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

                    <div className="col-span-2 flex items-center justify-end">
                      <Link
                        href={`/admin/donations/${donation.id}`}
                        className="btn-lift bg-navy text-white font-semibold px-4 py-2 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-1.5 text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </Link>
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="lg:hidden space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`rounded-full w-10 h-10 flex items-center justify-center shrink-0 ${
                          isAnonymous ? "bg-gray-100" : "bg-gold"
                        }`}>
                          {isAnonymous ? (
                            <User className="w-5 h-5 text-ink/40" />
                          ) : (
                            <span className="font-display font-bold text-ink text-sm">
                              {donorName.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-navy text-sm truncate">{donorName}</p>
                          <p className="text-ink/50 text-xs truncate">TXN-{donation.id.slice(-8)}</p>
                        </div>
                      </div>
                      <p className="font-display font-bold text-navy shrink-0">
                        ${donation.totalAmount.toLocaleString()}
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
                      {allocationsCount > 1 && (
                        <span className="text-xs font-semibold text-purple bg-purple/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          {allocationsCount} causes
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <p className="text-xs text-ink/50">
                        {new Date(donation.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      <Link
                        href={`/admin/donations/${donation.id}`}
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
          <h3 className="font-display text-xl font-bold text-navy">No Donations Found</h3>
          <p className="text-ink/60 mt-2 max-w-md mx-auto">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}

    </div>
  );
}