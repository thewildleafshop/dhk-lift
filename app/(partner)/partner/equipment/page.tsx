"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Package,
  PlusCircle,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Truck,
  Calendar,
  Accessibility,
  ChevronRight,
  Inbox,
  X,
  Send,
  Wind,
  Home,
  Stethoscope,
  Activity,
} from "lucide-react";

// ============ TYPES ============
type RequestStatus = "PENDING" | "UNDER_REVIEW" | "APPROVED" | "SHIPPED" | "DELIVERED" | "REJECTED";

// ============ STATUS CONFIG ============
const statusConfig: Record<RequestStatus, { label: string; color: string; bg: string; icon: any }> = {
  PENDING: { label: "Pending", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  UNDER_REVIEW: { label: "Under Review", color: "text-info", bg: "bg-info/10", icon: AlertCircle },
  APPROVED: { label: "Approved", color: "text-teal", bg: "bg-teal/10", icon: CheckCircle },
  SHIPPED: { label: "Shipped", color: "text-purple", bg: "bg-purple/10", icon: Truck },
  DELIVERED: { label: "Delivered", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  REJECTED: { label: "Rejected", color: "text-error", bg: "bg-error/10", icon: XCircle },
};

// ============ EQUIPMENT TYPES ============
const equipmentTypes = [
  { id: "wheelchair", label: "Wheelchair", icon: Accessibility },
  { id: "walker", label: "Walker / Mobility Aid", icon: Activity },
  { id: "bed", label: "Hospital Bed", icon: Home },
  { id: "oxygen", label: "Oxygen Concentrator", icon: Wind },
  { id: "prosthetic", label: "Prosthetic Limb", icon: Stethoscope },
  { id: "other", label: "Other Equipment", icon: Package },
];

// ============ DEMO DATA ============
const demoRequests = [
  {
    id: "EQP-24001",
    equipment: "Wheelchairs",
    equipmentType: "Wheelchair",
    icon: Accessibility,
    quantity: 50,
    status: "SHIPPED" as RequestStatus,
    project: "Wheelchair Distribution Drive",
    projectId: "PROJ-24005",
    submittedDate: "Mar 20, 2026",
    expectedDelivery: "Apr 15, 2026",
    trackingNumber: "TRK-9876543210",
    purpose: "For distribution to 50 disabled individuals in Lahore region.",
  },
  {
    id: "EQP-24002",
    equipment: "Oxygen Concentrators",
    equipmentType: "Oxygen Concentrator",
    icon: Wind,
    quantity: 10,
    status: "APPROVED" as RequestStatus,
    project: "Mobile Medical Clinics",
    projectId: "PROJ-24002",
    submittedDate: "Apr 1, 2026",
    expectedDelivery: "Apr 20, 2026",
    trackingNumber: "—",
    purpose: "For respiratory patients at mobile clinics in Punjab.",
  },
  {
    id: "EQP-24003",
    equipment: "Hospital Beds",
    equipmentType: "Hospital Bed",
    icon: Home,
    quantity: 5,
    status: "UNDER_REVIEW" as RequestStatus,
    project: "Home Care Support",
    projectId: "PROJ-24007",
    submittedDate: "Apr 8, 2026",
    expectedDelivery: "Pending",
    trackingNumber: "—",
    purpose: "For elderly and bedridden patients in Karachi.",
  },
  {
    id: "EQP-24004",
    equipment: "Walking Frames",
    equipmentType: "Walker / Mobility Aid",
    icon: Activity,
    quantity: 30,
    status: "PENDING" as RequestStatus,
    project: "Elderly Mobility Support",
    projectId: "PROJ-24008",
    submittedDate: "Apr 10, 2026",
    expectedDelivery: "Pending",
    trackingNumber: "—",
    purpose: "For elderly rehabilitation patients in Islamabad.",
  },
  {
    id: "EQP-24005",
    equipment: "Prosthetic Legs",
    equipmentType: "Prosthetic Limb",
    icon: Stethoscope,
    quantity: 15,
    status: "DELIVERED" as RequestStatus,
    project: "Amputee Rehabilitation",
    projectId: "PROJ-24009",
    submittedDate: "Feb 15, 2026",
    expectedDelivery: "Mar 25, 2026",
    trackingNumber: "TRK-1234567890",
    purpose: "For below-knee amputees in Sindh region.",
  },
  {
    id: "EQP-24006",
    equipment: "Wheelchairs",
    equipmentType: "Wheelchair",
    icon: Accessibility,
    quantity: 100,
    status: "REJECTED" as RequestStatus,
    project: "Wheelchair Distribution Drive",
    projectId: "PROJ-24005",
    submittedDate: "Jan 20, 2026",
    expectedDelivery: "—",
    trackingNumber: "—",
    purpose: "For nationwide distribution.",
  },
];

export default function PartnerEquipmentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "ALL">("ALL");
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);

  const filteredRequests = demoRequests.filter((req) => {
    const matchesSearch =
      req.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: demoRequests.length,
    pending: demoRequests.filter((r) => ["PENDING", "UNDER_REVIEW"].includes(r.status)).length,
    inTransit: demoRequests.filter((r) => r.status === "SHIPPED").length,
    delivered: demoRequests.filter((r) => r.status === "DELIVERED").length,
  };

  return (
    <div className="space-y-6">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
            Equipment Requests
          </h1>
          <p className="text-ink/70 mt-1">
            Request medical equipment and track delivery status.
          </p>
        </div>
        <button
          onClick={() => setShowNewRequestModal(true)}
          className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 w-fit text-sm"
        >
          <PlusCircle className="w-4 h-4" />
          New Equipment Request
        </button>
      </div>

      {/* ================= STATS ROW ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-4 h-4 text-navy" />
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
            <Truck className="w-4 h-4 text-purple" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">In Transit</p>
          </div>
          <p className="font-display text-2xl font-bold text-purple">{stats.inTransit}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-success" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Delivered</p>
          </div>
          <p className="font-display text-2xl font-bold text-success">{stats.delivered}</p>
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
            placeholder="Search by equipment, project, or request ID..."
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
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
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
            const EquipmentIcon = request.icon;

            return (
              <div
                key={request.id}
                className="card-hover bg-white rounded-card p-6 shadow-sm border border-gray-100"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple/10 rounded-full p-3 shrink-0">
                        <EquipmentIcon className="w-6 h-6 text-purple" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display font-bold text-navy text-lg">
                            {request.quantity}x {request.equipment}
                          </h3>
                          <span className={`text-xs font-semibold ${status.color} ${status.bg} px-3 py-1 rounded-full flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-ink/60">
                          <span className="flex items-center gap-1">
                            <Package className="w-3.5 h-3.5" />
                            {request.id}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {request.submittedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="text-ink/50">Project:</span>
                            <span className="font-semibold text-navy">{request.project}</span>
                          </span>
                        </div>

                        <div className="mt-3 p-3 bg-cloud rounded-input">
                          <p className="text-xs text-ink/50 mb-1">Purpose</p>
                          <p className="text-sm text-ink/80">{request.purpose}</p>

                          {(request.status === "SHIPPED" || request.status === "DELIVERED") && (
                            <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-2 gap-3">
                              <div>
                                <p className="text-xs text-ink/50">Expected Delivery</p>
                                <p className="text-xs font-semibold text-navy mt-0.5">
                                  {request.expectedDelivery}
                                </p>
                              </div>
                              {request.trackingNumber !== "—" && (
                                <div>
                                  <p className="text-xs text-ink/50">Tracking</p>
                                  <p className="text-xs font-semibold text-purple mt-0.5">
                                    {request.trackingNumber}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col lg:items-end gap-2 shrink-0">
                    <Link
                      href={`/partner/equipment/${request.id}`}
                      className="btn-lift bg-navy text-white font-semibold px-5 py-2.5 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                    {request.status === "SHIPPED" && (
                      <span className="text-xs text-purple font-semibold flex items-center gap-1 lg:justify-end">
                        <Truck className="w-3.5 h-3.5" />
                        In transit
                      </span>
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
            No Equipment Requests Found
          </h3>
          <p className="text-ink/60 mt-2 max-w-md mx-auto">
            {searchQuery || statusFilter !== "ALL"
              ? "Try adjusting your filters."
              : "You haven't requested any equipment yet."}
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
                <div className="bg-purple/10 rounded-full p-2.5">
                  <Package className="w-5 h-5 text-purple" />
                </div>
                <h3 className="font-display font-bold text-navy text-lg">
                  New Equipment Request
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
                  <option>Wheelchair Distribution Drive (PROJ-24005)</option>
                  <option>Mobile Medical Clinics (PROJ-24002)</option>
                  <option>Elderly Mobility Support (PROJ-24008)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Equipment Type *</label>
                <div className="grid grid-cols-3 gap-2">
                  {equipmentTypes.map((eq) => {
                    const Icon = eq.icon;
                    return (
                      <button
                        key={eq.id}
                        type="button"
                        className="flex flex-col items-center gap-2 p-3 rounded-input border-2 border-gray-200 hover:border-gold hover:bg-gold/5 transition-all"
                      >
                        <Icon className="w-5 h-5 text-navy" />
                        <span className="text-xs font-medium text-navy text-center leading-tight">
                          {eq.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Quantity *</label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                  <input
                    type="number"
                    placeholder="e.g., 50"
                    className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Purpose *</label>
                <textarea
                  rows={3}
                  placeholder="Describe how the equipment will be used..."
                  className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none"
                />
              </div>

              <div className="flex items-start gap-3 p-3 bg-info/5 border border-info/20 rounded-input">
                <AlertCircle className="w-4 h-4 text-info mt-0.5 shrink-0" />
                <p className="text-xs text-ink/70">
                  Equipment requests are reviewed within 3-5 business days. Delivery typically takes 2-3 weeks.
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