"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  User,
  Ban,
  Download,
  Inbox,
  Award,
  Crown,
  Star,
  Zap,
  MoreVertical,
} from "lucide-react";

// ============ TYPES ============
type UserRole = "ADMIN" | "MEMBER" | "APPLICANT" | "PARTNER" | "PROVIDER" | "PHARMACY" | "VOLUNTEER";
type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION";
type MembershipTier = "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  tier: MembershipTier;
  joinedDate: string;
  lastActive: string;
  totalDonated: number;
  verified: boolean;
};

// ============ ROLE CONFIG ============
const roleConfig: Record<UserRole, { label: string; color: string; bg: string }> = {
  ADMIN: { label: "Admin", color: "text-purple", bg: "bg-purple/10" },
  MEMBER: { label: "Member", color: "text-navy", bg: "bg-navy/10" },
  APPLICANT: { label: "Applicant", color: "text-warning", bg: "bg-warning/10" },
  PARTNER: { label: "Partner", color: "text-teal", bg: "bg-teal/10" },
  PROVIDER: { label: "Provider", color: "text-info", bg: "bg-info/10" },
  PHARMACY: { label: "Pharmacy", color: "text-gold", bg: "bg-gold/10" },
  VOLUNTEER: { label: "Volunteer", color: "text-success", bg: "bg-success/10" },
};

// ============ STATUS CONFIG ============
const statusConfig: Record<UserStatus, { label: string; color: string; bg: string; icon: any }> = {
  ACTIVE: { label: "Active", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  INACTIVE: { label: "Inactive", color: "text-ink/60", bg: "bg-gray-100", icon: Clock },
  SUSPENDED: { label: "Suspended", color: "text-error", bg: "bg-error/10", icon: Ban },
  PENDING_VERIFICATION: { label: "Pending", color: "text-warning", bg: "bg-warning/10", icon: AlertCircle },
};

// ============ TIER CONFIG ============
const tierConfig: Record<MembershipTier, { label: string; color: string; bg: string; icon: any }> = {
  BRONZE: { label: "Bronze", color: "text-navy", bg: "bg-navy/10", icon: Award },
  SILVER: { label: "Silver", color: "text-teal", bg: "bg-teal/10", icon: Star },
  GOLD: { label: "Gold", color: "text-gold", bg: "bg-gold/10", icon: Crown },
  PLATINUM: { label: "Platinum", color: "text-purple", bg: "bg-purple/10", icon: Zap },
};

// ============ DEMO DATA ============
const demoUsers: User[] = [
  {
    id: "1",
    name: "Raazia Bibi",
    email: "raazia@example.com",
    phone: "+92 300 1234567",
    role: "MEMBER",
    status: "ACTIVE",
    tier: "SILVER",
    joinedDate: "Apr 5, 2025",
    lastActive: "2 hours ago",
    totalDonated: 150,
    verified: true,
  },
  {
    id: "2",
    name: "Ahmed Khan",
    email: "ahmed@example.com",
    phone: "+92 300 2345678",
    role: "APPLICANT",
    status: "ACTIVE",
    tier: "BRONZE",
    joinedDate: "Mar 20, 2026",
    lastActive: "1 day ago",
    totalDonated: 0,
    verified: true,
  },
  {
    id: "3",
    name: "Fatima Ali",
    email: "fatima@example.com",
    phone: "+92 300 3456789",
    role: "MEMBER",
    status: "ACTIVE",
    tier: "GOLD",
    joinedDate: "Jan 10, 2025",
    lastActive: "30 min ago",
    totalDonated: 850,
    verified: true,
  },
  {
    id: "4",
    name: "Al-Khidmat Foundation",
    email: "contact@alkhidmat.org",
    phone: "+92 21 1234567",
    role: "PARTNER",
    status: "ACTIVE",
    tier: "PLATINUM",
    joinedDate: "Feb 15, 2024",
    lastActive: "3 hours ago",
    totalDonated: 0,
    verified: true,
  },
  {
    id: "5",
    name: "Edhi Foundation",
    email: "info@edhi.org",
    phone: "+92 21 7654321",
    role: "PARTNER",
    status: "PENDING_VERIFICATION",
    tier: "BRONZE",
    joinedDate: "Apr 1, 2026",
    lastActive: "1 day ago",
    totalDonated: 0,
    verified: false,
  },
  {
    id: "6",
    name: "Sarah Ahmed",
    email: "sarah@example.com",
    phone: "+971 50 1234567",
    role: "MEMBER",
    status: "ACTIVE",
    tier: "SILVER",
    joinedDate: "Jun 5, 2025",
    lastActive: "5 hours ago",
    totalDonated: 320,
    verified: true,
  },
  {
    id: "7",
    name: "Dr. Imran Siddiqui",
    email: "dr.imran@hospital.pk",
    phone: "+92 300 4567890",
    role: "PROVIDER",
    status: "ACTIVE",
    tier: "BRONZE",
    joinedDate: "Mar 1, 2026",
    lastActive: "1 hour ago",
    totalDonated: 0,
    verified: true,
  },
  {
    id: "8",
    name: "MedPlus Pharmacy",
    email: "info@medplus.pk",
    phone: "+92 21 9876543",
    role: "PHARMACY",
    status: "SUSPENDED",
    tier: "BRONZE",
    joinedDate: "Jan 15, 2026",
    lastActive: "2 weeks ago",
    totalDonated: 0,
    verified: false,
  },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "ALL">("ALL");
  const [tierFilter, setTierFilter] = useState<MembershipTier | "ALL">("ALL");

  const filteredUsers = demoUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
    const matchesStatus = statusFilter === "ALL" || user.status === statusFilter;
    const matchesTier = tierFilter === "ALL" || user.tier === tierFilter;
    return matchesSearch && matchesRole && matchesStatus && matchesTier;
  });

  const stats = {
    total: demoUsers.length,
    active: demoUsers.filter((u) => u.status === "ACTIVE").length,
    pending: demoUsers.filter((u) => u.status === "PENDING_VERIFICATION").length,
    suspended: demoUsers.filter((u) => u.status === "SUSPENDED").length,
  };

  return (
    <div className="space-y-6">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
            Users & Members
          </h1>
          <p className="text-ink/70 mt-1">
            Manage all platform users, roles, and account statuses.
          </p>
        </div>
        <button className="btn-lift bg-navy text-white font-semibold px-6 py-3 rounded-input hover:bg-navy/90 transition-colors shadow-sm flex items-center gap-2 w-fit text-sm">
          <Download className="w-4 h-4" />
          Export Users
        </button>
      </div>

      {/* ================= STATS ROW ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-navy" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Total Users</p>
          </div>
          <p className="font-display text-2xl font-bold text-navy">{stats.total}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-success" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Active</p>
          </div>
          <p className="font-display text-2xl font-bold text-success">{stats.active}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-warning" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Pending</p>
          </div>
          <p className="font-display text-2xl font-bold text-warning">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Ban className="w-4 h-4 text-error" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Suspended</p>
          </div>
          <p className="font-display text-2xl font-bold text-error">{stats.suspended}</p>
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
            placeholder="Search by name or email..."
            className="w-full pl-12 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink text-sm"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="pl-10 pr-8 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-ink text-sm appearance-none cursor-pointer"
          >
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="MEMBER">Member</option>
            <option value="APPLICANT">Applicant</option>
            <option value="PARTNER">Partner</option>
            <option value="PROVIDER">Provider</option>
            <option value="PHARMACY">Pharmacy</option>
            <option value="VOLUNTEER">Volunteer</option>
          </select>
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="pl-4 pr-8 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-ink text-sm appearance-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="PENDING_VERIFICATION">Pending</option>
          </select>
        </div>

        <div className="relative">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value as any)}
            className="pl-4 pr-8 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-ink text-sm appearance-none cursor-pointer"
          >
            <option value="ALL">All Tiers</option>
            <option value="BRONZE">Bronze</option>
            <option value="SILVER">Silver</option>
            <option value="GOLD">Gold</option>
            <option value="PLATINUM">Platinum</option>
          </select>
        </div>
      </div>

      {/* ================= USERS TABLE ================= */}
      {filteredUsers.length > 0 ? (
        <div className="bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-cloud border-b border-gray-100 text-xs font-semibold text-ink/60 uppercase tracking-wider">
            <div className="col-span-4">User</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Tier</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {filteredUsers.map((user) => {
              const role = roleConfig[user.role];
              const status = statusConfig[user.status];
              const tier = tierConfig[user.tier];
              const StatusIcon = status.icon;
              const TierIcon = tier.icon;

              return (
                <div key={user.id} className="px-6 py-5 hover:bg-cloud/30 transition-colors">
                  
                  {/* Desktop */}
                  <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                    {/* User */}
                    <div className="col-span-4 flex items-center gap-3">
                      <div className={`rounded-full w-10 h-10 flex items-center justify-center shrink-0 ${
                        user.role === "PARTNER" || user.role === "PROVIDER" || user.role === "PHARMACY"
                          ? "bg-navy/10"
                          : "bg-gold"
                      }`}>
                        <span className={`font-display font-bold text-sm ${
                          user.role === "PARTNER" || user.role === "PROVIDER" || user.role === "PHARMACY"
                            ? "text-navy"
                            : "text-ink"
                        }`}>
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-navy text-sm truncate">
                            {user.name}
                          </p>
                          {user.verified && (
                            <CheckCircle className="w-3.5 h-3.5 text-success shrink-0" />
                          )}
                        </div>
                        <p className="text-ink/50 text-xs truncate">{user.email}</p>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="col-span-2">
                      <span className={`text-xs font-semibold ${role.color} ${role.bg} px-2.5 py-1 rounded-full`}>
                        {role.label}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>

                    {/* Tier */}
                    <div className="col-span-2">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${tier.color} ${tier.bg} px-2.5 py-1 rounded-full`}>
                        <TierIcon className="w-3 h-3" />
                        {tier.label}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/users/${user.id}`}
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
                          user.role === "PARTNER" || user.role === "PROVIDER" || user.role === "PHARMACY"
                            ? "bg-navy/10"
                            : "bg-gold"
                        }`}>
                          <span className={`font-display font-bold text-sm ${
                            user.role === "PARTNER" || user.role === "PROVIDER" || user.role === "PHARMACY"
                              ? "text-navy"
                              : "text-ink"
                          }`}>
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-navy text-sm truncate">
                              {user.name}
                            </p>
                            {user.verified && (
                              <CheckCircle className="w-3.5 h-3.5 text-success shrink-0" />
                            )}
                          </div>
                          <p className="text-ink/50 text-xs truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-semibold ${role.color} ${role.bg} px-2.5 py-1 rounded-full`}>
                        {role.label}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${tier.color} ${tier.bg} px-2.5 py-1 rounded-full`}>
                        <TierIcon className="w-3 h-3" />
                        {tier.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <p className="text-xs text-ink/50">
                        Joined {user.joinedDate}
                      </p>
                      <Link
                        href={`/admin/users/${user.id}`}
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
            No Users Found
          </h3>
          <p className="text-ink/60 mt-2 max-w-md mx-auto">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}

    </div>
  );
}