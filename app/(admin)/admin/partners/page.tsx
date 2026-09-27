"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Building2,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  Globe,
  MapPin,
  Download,
  Inbox,
  ShieldCheck,
  Ban,
  Loader2,
} from "lucide-react";

// ============ TYPES ============
type PartnerStatus = "APPLICANT" | "VERIFIED" | "TRUSTED" | "SUSPENDED";

interface Partner {
  id: string;
  userId: string;
  orgName: string;
  orgType: string;
  country: string;
  website: string | null;
  mission: string | null;
  status: PartnerStatus;
  verifiedAt: string | null;
  createdAt: string;
  user: { id: string; name: string; email: string; role: string };
  projectCount: number;
}

// ============ STATUS CONFIG ============
const statusConfig: Record<PartnerStatus, { label: string; color: string; bg: string; icon: any }> = {
  APPLICANT: { label: "Applicant", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  VERIFIED: { label: "Verified", color: "text-teal", bg: "bg-teal/10", icon: CheckCircle },
  TRUSTED: { label: "Trusted Partner", color: "text-success", bg: "bg-success/10", icon: ShieldCheck },
  SUSPENDED: { label: "Suspended", color: "text-error", bg: "bg-error/10", icon: Ban },
};

// ============ TYPE CONFIG ============
const getTypeConfig = (orgType: string) => {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    NGO: { label: "NGO", color: "text-navy", bg: "bg-navy/10" },
    HEALTHCARE: { label: "Healthcare", color: "text-teal", bg: "bg-teal/10" },
    PHARMACY: { label: "Pharmacy", color: "text-gold", bg: "bg-gold/10" },
    EDUCATION: { label: "Education", color: "text-purple", bg: "bg-purple/10" },
    COMMUNITY: { label: "Community", color: "text-info", bg: "bg-info/10" },
  };
  return map[orgType] || { label: orgType, color: "text-navy", bg: "bg-navy/10" };
};

export default function AdminPartnersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PartnerStatus | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");

  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPartners() {
      try {
        setLoading(true);
        const res = await fetch("/api/partners");
        if (!res.ok) throw new Error("Failed to fetch partners");
        const data = await res.json();
        setPartners(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPartners();
  }, []);

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      partner.orgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || partner.status === statusFilter;
    const matchesType = typeFilter === "ALL" || partner.orgType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: partners.length,
    trusted: partners.filter((p) => p.status === "TRUSTED").length,
    verified: partners.filter((p) => p.status === "VERIFIED").length,
    applicants: partners.filter((p) => p.status === "APPLICANT").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-navy animate-spin mx-auto mb-4" />
          <p className="text-ink/60">Loading partners...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-card p-12 text-center border border-gray-100">
        <p className="text-error font-semibold mb-2">Error loading partners</p>
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
            Global Partners
          </h1>
          <p className="text-ink/70 mt-1">
            Manage all partner organizations, verification, and project performance.
          </p>
        </div>
        <button className="btn-lift bg-navy text-white font-semibold px-6 py-3 rounded-input hover:bg-navy/90 transition-colors shadow-sm flex items-center gap-2 w-fit text-sm">
          <Download className="w-4 h-4" />
          Export Partners
        </button>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-4 h-4 text-navy" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Total</p>
          </div>
          <p className="font-display text-2xl font-bold text-navy">{stats.total}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-success" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Trusted</p>
          </div>
          <p className="font-display text-2xl font-bold text-success">{stats.trusted}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-teal" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Verified</p>
          </div>
          <p className="font-display text-2xl font-bold text-teal">{stats.verified}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-warning" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Applicants</p>
          </div>
          <p className="font-display text-2xl font-bold text-warning">{stats.applicants}</p>
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
            placeholder="Search by name, country, or email..."
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
            <option value="TRUSTED">Trusted</option>
            <option value="VERIFIED">Verified</option>
            <option value="APPLICANT">Applicant</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>

        <div className="relative">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="pl-4 pr-8 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-ink text-sm appearance-none cursor-pointer"
          >
            <option value="ALL">All Types</option>
            <option value="NGO">NGO</option>
            <option value="HEALTHCARE">Healthcare</option>
            <option value="PHARMACY">Pharmacy</option>
            <option value="EDUCATION">Education</option>
            <option value="COMMUNITY">Community</option>
          </select>
        </div>
      </div>

      {/* PARTNERS TABLE */}
      {filteredPartners.length > 0 ? (
        <div className="bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-cloud border-b border-gray-100 text-xs font-semibold text-ink/60 uppercase tracking-wider">
            <div className="col-span-4">Partner</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Projects</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredPartners.map((partner) => {
              const status = statusConfig[partner.status] || statusConfig.APPLICANT;
              const type = getTypeConfig(partner.orgType);
              const StatusIcon = status.icon;

              return (
                <div key={partner.id} className="px-6 py-5 hover:bg-cloud/30 transition-colors">
                  
                  {/* Desktop */}
                  <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="bg-navy/10 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                        <span className="font-display font-bold text-navy text-sm">
                          {partner.orgName.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-navy text-sm truncate">
                            {partner.orgName}
                          </p>
                          {(partner.status === "VERIFIED" || partner.status === "TRUSTED") && (
                            <CheckCircle className="w-3.5 h-3.5 text-success shrink-0" />
                          )}
                        </div>
                        <p className="text-ink/50 text-xs truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {partner.country}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <span className={`text-xs font-semibold ${type.color} ${type.bg} px-2.5 py-1 rounded-full`}>
                        {type.label}
                      </span>
                    </div>

                    <div className="col-span-2">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>

                    <div className="col-span-2">
                      <p className="font-display font-bold text-navy text-sm">
                        {partner.projectCount}
                      </p>
                      <p className="text-ink/50 text-xs">
                        total projects
                      </p>
                    </div>

                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/partners/${partner.id}`}
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
                        <div className="bg-navy/10 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                          <span className="font-display font-bold text-navy text-sm">
                            {partner.orgName.charAt(0)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-navy text-sm truncate">
                            {partner.orgName}
                          </p>
                          <p className="text-ink/50 text-xs truncate flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {partner.country}
                          </p>
                        </div>
                      </div>
                      <p className="font-display font-bold text-navy text-sm shrink-0">
                        {partner.projectCount} projects
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-semibold ${type.color} ${type.bg} px-2.5 py-1 rounded-full`}>
                        {type.label}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <p className="text-xs text-ink/50">
                        Joined {new Date(partner.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </p>
                      <Link
                        href={`/admin/partners/${partner.id}`}
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
            No Partners Found
          </h3>
          <p className="text-ink/60 mt-2 max-w-md mx-auto">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}

    </div>
  );
}