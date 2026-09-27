"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Building2,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Globe,
  MapPin,
  Users,
  FolderKanban,
  TrendingUp,
  Download,
  Inbox,
  ShieldCheck,
  Ban,
  Mail,
  Star,
} from "lucide-react";

// ============ TYPES ============
type PartnerStatus = "APPLICANT" | "VERIFIED" | "TRUSTED" | "SUSPENDED";
type PartnerType = "NGO" | "HEALTHCARE" | "PHARMACY" | "EDUCATION" | "COMMUNITY";

type Partner = {
  id: string;
  name: string;
  type: PartnerType;
  status: PartnerStatus;
  country: string;
  city: string;
  email: string;
  website: string;
  joinedDate: string;
  projectsCompleted: number;
  projectsActive: number;
  totalFunding: number;
  verified: boolean;
};

// ============ STATUS CONFIG ============
const statusConfig: Record<PartnerStatus, { label: string; color: string; bg: string; icon: any }> = {
  APPLICANT: { label: "Applicant", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  VERIFIED: { label: "Verified", color: "text-teal", bg: "bg-teal/10", icon: CheckCircle },
  TRUSTED: { label: "Trusted Partner", color: "text-success", bg: "bg-success/10", icon: ShieldCheck },
  SUSPENDED: { label: "Suspended", color: "text-error", bg: "bg-error/10", icon: Ban },
};

// ============ TYPE CONFIG ============
const typeConfig: Record<PartnerType, { label: string; color: string; bg: string }> = {
  NGO: { label: "NGO", color: "text-navy", bg: "bg-navy/10" },
  HEALTHCARE: { label: "Healthcare", color: "text-teal", bg: "bg-teal/10" },
  PHARMACY: { label: "Pharmacy", color: "text-gold", bg: "bg-gold/10" },
  EDUCATION: { label: "Education", color: "text-purple", bg: "bg-purple/10" },
  COMMUNITY: { label: "Community", color: "text-info", bg: "bg-info/10" },
};

// ============ DEMO DATA ============
const demoPartners: Partner[] = [
  {
    id: "1",
    name: "Al-Khidmat Foundation",
    type: "NGO",
    status: "TRUSTED",
    country: "Pakistan",
    city: "Karachi",
    email: "contact@alkhidmat.org",
    website: "alkhidmat.org",
    joinedDate: "Feb 15, 2024",
    projectsCompleted: 25,
    projectsActive: 3,
    totalFunding: 250000,
    verified: true,
  },
  {
    id: "2",
    name: "Edhi Foundation",
    type: "NGO",
    status: "TRUSTED",
    country: "Pakistan",
    city: "Karachi",
    email: "info@edhi.org",
    website: "edhi.org",
    joinedDate: "Jan 10, 2024",
    projectsCompleted: 42,
    projectsActive: 5,
    totalFunding: 380000,
    verified: true,
  },
  {
    id: "3",
    name: "Sindh Education Trust",
    type: "EDUCATION",
    status: "VERIFIED",
    country: "Pakistan",
    city: "Hyderabad",
    email: "info@set.org.pk",
    website: "set.org.pk",
    joinedDate: "Mar 5, 2025",
    projectsCompleted: 12,
    projectsActive: 2,
    totalFunding: 85000,
    verified: true,
  },
  {
    id: "4",
    name: "Aga Khan Hospital",
    type: "HEALTHCARE",
    status: "VERIFIED",
    country: "Pakistan",
    city: "Karachi",
    email: "info@akh.org",
    website: "akh.org",
    joinedDate: "Apr 20, 2025",
    projectsCompleted: 8,
    projectsActive: 4,
    totalFunding: 120000,
    verified: true,
  },
  {
    id: "5",
    name: "MedPlus Pharmacy",
    type: "PHARMACY",
    status: "SUSPENDED",
    country: "Pakistan",
    city: "Lahore",
    email: "contact@medplus.pk",
    website: "medplus.pk",
    joinedDate: "Jun 15, 2025",
    projectsCompleted: 3,
    projectsActive: 0,
    totalFunding: 15000,
    verified: false,
  },
  {
    id: "6",
    name: "Al-Noor Foundation",
    type: "NGO",
    status: "APPLICANT",
    country: "Pakistan",
    city: "Islamabad",
    email: "info@alnoor.org",
    website: "alnoor.org",
    joinedDate: "Apr 1, 2026",
    projectsCompleted: 0,
    projectsActive: 0,
    totalFunding: 0,
    verified: false,
  },
  {
    id: "7",
    name: "Global Health Initiative",
    type: "HEALTHCARE",
    status: "APPLICANT",
    country: "UAE",
    city: "Dubai",
    email: "contact@ghi.ae",
    website: "ghi.ae",
    joinedDate: "Apr 5, 2026",
    projectsCompleted: 0,
    projectsActive: 0,
    totalFunding: 0,
    verified: false,
  },
  {
    id: "8",
    name: "Hope Community Services",
    type: "COMMUNITY",
    status: "VERIFIED",
    country: "Pakistan",
    city: "Lahore",
    email: "info@hopecommunity.pk",
    website: "hopecommunity.pk",
    joinedDate: "Sep 10, 2025",
    projectsCompleted: 6,
    projectsActive: 2,
    totalFunding: 45000,
    verified: true,
  },
];

export default function AdminPartnersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PartnerStatus | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState<PartnerType | "ALL">("ALL");

  const filteredPartners = demoPartners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || partner.status === statusFilter;
    const matchesType = typeFilter === "ALL" || partner.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: demoPartners.length,
    trusted: demoPartners.filter((p) => p.status === "TRUSTED").length,
    verified: demoPartners.filter((p) => p.status === "VERIFIED").length,
    applicants: demoPartners.filter((p) => p.status === "APPLICANT").length,
  };

  return (
    <div className="space-y-6">
      
      {/* ================= HEADER ================= */}
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

      {/* ================= STATS ROW ================= */}
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

      {/* ================= FILTERS ================= */}
      <div className="bg-white rounded-card p-4 border border-gray-100 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, country, or city..."
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
            onChange={(e) => setTypeFilter(e.target.value as any)}
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

      {/* ================= PARTNERS TABLE ================= */}
      {filteredPartners.length > 0 ? (
        <div className="bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-cloud border-b border-gray-100 text-xs font-semibold text-ink/60 uppercase tracking-wider">
            <div className="col-span-4">Partner</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Projects</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {filteredPartners.map((partner) => {
              const status = statusConfig[partner.status];
              const type = typeConfig[partner.type];
              const StatusIcon = status.icon;

              return (
                <div key={partner.id} className="px-6 py-5 hover:bg-cloud/30 transition-colors">
                  
                  {/* Desktop */}
                  <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                    {/* Partner */}
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="bg-navy/10 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                        <span className="font-display font-bold text-navy text-sm">
                          {partner.name.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-navy text-sm truncate">
                            {partner.name}
                          </p>
                          {partner.verified && (
                            <CheckCircle className="w-3.5 h-3.5 text-success shrink-0" />
                          )}
                        </div>
                        <p className="text-ink/50 text-xs truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {partner.city}, {partner.country}
                        </p>
                      </div>
                    </div>

                    {/* Type */}
                    <div className="col-span-2">
                      <span className={`text-xs font-semibold ${type.color} ${type.bg} px-2.5 py-1 rounded-full`}>
                        {type.label}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>

                    {/* Projects */}
                    <div className="col-span-2">
                      <p className="font-display font-bold text-navy text-sm">
                        {partner.projectsCompleted + partner.projectsActive}
                      </p>
                      <p className="text-ink/50 text-xs">
                        {partner.projectsActive} active
                      </p>
                    </div>

                    {/* Actions */}
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
                            {partner.name.charAt(0)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-navy text-sm truncate">
                              {partner.name}
                            </p>
                            {partner.verified && (
                              <CheckCircle className="w-3.5 h-3.5 text-success shrink-0" />
                            )}
                          </div>
                          <p className="text-ink/50 text-xs truncate flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {partner.city}, {partner.country}
                          </p>
                        </div>
                      </div>
                      <p className="font-display font-bold text-navy text-sm shrink-0">
                        {partner.projectsCompleted + partner.projectsActive} projects
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
                        Joined {partner.joinedDate}
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
        /* ================= EMPTY STATE ================= */
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