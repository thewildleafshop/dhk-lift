"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  FileText,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Eye,
  MessageSquare,
  Shield,
  Users,
  Home,
  Send,
  Save,
  CheckCheck,
  Ban,
  ArrowRight,
} from "lucide-react";

// ============ TYPES ============
type ApplicationStatus =
  | "SUBMITTED"
  | "VERIFICATION"
  | "UNDER_REVIEW"
  | "ADDITIONAL_INFO"
  | "APPROVED"
  | "DENIED"
  | "COMPLETED";

// ============ STATUS CONFIG ============
const statusConfig: Record<ApplicationStatus, { label: string; color: string; bg: string; icon: any }> = {
  SUBMITTED: { label: "Submitted", color: "text-info", bg: "bg-info/10", icon: Clock },
  VERIFICATION: { label: "Verification", color: "text-info", bg: "bg-info/10", icon: AlertCircle },
  UNDER_REVIEW: { label: "Under Review", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  ADDITIONAL_INFO: { label: "Info Needed", color: "text-warning", bg: "bg-warning/10", icon: AlertCircle },
  APPROVED: { label: "Approved", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  DENIED: { label: "Denied", color: "text-error", bg: "bg-error/10", icon: XCircle },
  COMPLETED: { label: "Completed", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
};

// ============ DEMO DATA ============
const demoApplication = {
  id: "1",
  referenceNumber: "APP-23043012",
  status: "UNDER_REVIEW" as ApplicationStatus,
  submittedDate: "Apr 5, 2026 - 10:30 AM",
  lastUpdate: "Apr 9, 2026 - 02:15 PM",
  amountRequested: 500,
  urgency: "Urgent",
  program: "Financial Assistance",
  programColor: "text-gold",
  programBg: "bg-gold/10",
  assistanceType: "Medical treatment support",
  situation: "I am a single mother of three children and recently lost my job due to a medical condition. I need financial assistance to cover my treatment expenses and support my family until I recover.",
  
  // Applicant Info
  applicant: {
    name: "Raazia Bibi",
    email: "raazia@example.com",
    phone: "+92 300 1234567",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    address: "House #12, Street 5, Block A",
    city: "Karachi",
    country: "Pakistan",
  },

  // Household Info
  household: {
    maritalStatus: "Widowed",
    householdSize: 4,
    dependents: 3,
    monthlyIncome: 150,
  },

  // Documents
  documents: [
    { id: 1, name: "ID_Document.pdf", size: "1.2 MB", status: "verified", uploadedDate: "Apr 5, 2026" },
    { id: 2, name: "Medical_Report.pdf", size: "2.4 MB", status: "verified", uploadedDate: "Apr 5, 2026" },
    { id: 3, name: "Proof_of_Income.pdf", size: "890 KB", status: "pending", uploadedDate: "Apr 5, 2026" },
    { id: 4, name: "Bank_Statement.pdf", size: "1.8 MB", status: "verified", uploadedDate: "Apr 5, 2026" },
  ],

  // Internal Notes
  internalNotes: [
    {
      id: 1,
      author: "Sarah Admin",
      note: "Initial review complete. Documents look authentic. Medical report confirms the condition.",
      date: "Apr 7, 2026 - 11:20 AM",
    },
    {
      id: 2,
      author: "Ahmed Manager",
      note: "Requested additional verification from the hospital. Waiting for response.",
      date: "Apr 8, 2026 - 03:45 PM",
    },
  ],

  // Status History
  statusHistory: [
    { status: "Submitted", date: "Apr 5, 2026 - 10:30 AM", by: "Applicant" },
    { status: "Verification", date: "Apr 6, 2026 - 09:00 AM", by: "System" },
    { status: "Under Review", date: "Apr 9, 2026 - 02:15 PM", by: "Sarah Admin" },
  ],
};

export default function AdminApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const app = demoApplication;

  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState(app.internalNotes);
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>(app.status);
  const [showActionModal, setShowActionModal] = useState(false);

  const status = statusConfig[app.status];
  const StatusIcon = status.icon;

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const note = {
      id: notes.length + 1,
      author: "You (Admin)",
      note: newNote,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setNotes([...notes, note]);
    setNewNote("");
  };

  return (
    <div className="space-y-6">
      
      {/* ================= BACK BUTTON ================= */}
      <Link
        href="/admin/applications"
        className="inline-flex items-center gap-2 text-ink/60 hover:text-navy font-medium transition-colors text-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Applications
      </Link>

      {/* ================= HEADER CARD ================= */}
      <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`${app.programBg} rounded-full p-4 shrink-0`}>
              <FileText className={`w-8 h-8 ${app.programColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
                  {app.referenceNumber}
                </h1>
                <span className={`text-xs font-semibold ${status.color} ${status.bg} px-3 py-1 rounded-full flex items-center gap-1`}>
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </span>
                {app.urgency === "Urgent" && (
                  <span className="text-xs font-semibold text-error bg-error/10 px-3 py-1 rounded-full">
                    URGENT
                  </span>
                )}
              </div>
              <p className="text-ink/60 mt-2 text-sm">
                {app.program} • Submitted: {app.submittedDate}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm">
                <span className="flex items-center gap-1.5 text-ink/70">
                  <User className="w-4 h-4" />
                  {app.applicant.name}
                </span>
                <span className="flex items-center gap-1.5 text-ink/70">
                  <Mail className="w-4 h-4" />
                  {app.applicant.email}
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-gold">
                  <DollarSign className="w-4 h-4" />
                  ${app.amountRequested}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ================= LEFT: DETAILS ================= */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Applicant Information */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-gold" />
              Applicant Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {[
                { label: "Full Name", value: app.applicant.name, icon: User },
                { label: "Email", value: app.applicant.email, icon: Mail },
                { label: "Phone", value: app.applicant.phone, icon: Phone },
                { label: "Date of Birth", value: app.applicant.dateOfBirth, icon: Calendar },
                { label: "Gender", value: app.applicant.gender, icon: User },
                { label: "Location", value: `${app.applicant.city}, ${app.applicant.country}`, icon: MapPin },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="bg-cloud rounded-full p-2 shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-navy" />
                    </div>
                    <div>
                      <p className="text-ink/50 text-xs">{item.label}</p>
                      <p className="font-semibold text-navy text-sm mt-0.5 break-all">{item.value}</p>
                    </div>
                  </div>
                );
              })}
              <div className="md:col-span-2 flex items-start gap-3">
                <div className="bg-cloud rounded-full p-2 shrink-0 mt-0.5">
                  <Home className="w-4 h-4 text-navy" />
                </div>
                <div>
                  <p className="text-ink/50 text-xs">Address</p>
                  <p className="font-semibold text-navy text-sm mt-0.5">{app.applicant.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Household Information */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-gold" />
              Household Information
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Marital Status", value: app.household.maritalStatus },
                { label: "Household Size", value: app.household.householdSize },
                { label: "Dependents", value: app.household.dependents },
                { label: "Monthly Income", value: `$${app.household.monthlyIncome}` },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-cloud rounded-input text-center">
                  <p className="text-ink/50 text-xs">{item.label}</p>
                  <p className="font-display font-bold text-navy text-lg mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Assistance Details */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold" />
              Assistance Details
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-ink/50 text-xs">Program</p>
                <span className={`inline-block mt-1 text-xs font-semibold ${app.programColor} ${app.programBg} px-3 py-1 rounded-full`}>
                  {app.program}
                </span>
              </div>
              <div>
                <p className="text-ink/50 text-xs">Assistance Type</p>
                <p className="font-semibold text-navy text-sm mt-1">{app.assistanceType}</p>
              </div>
              <div>
                <p className="text-ink/50 text-xs">Amount Requested</p>
                <p className="font-display font-bold text-gold text-2xl mt-1">${app.amountRequested}</p>
              </div>
              <div>
                <p className="text-ink/50 text-xs">Situation</p>
                <p className="text-ink/80 text-sm mt-2 leading-relaxed bg-cloud p-4 rounded-input">
                  {app.situation}
                </p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold" />
              Documents ({app.documents.length})
            </h2>
            <div className="space-y-3">
              {app.documents.map((doc) => (
                <div key={doc.id} className="flex items-center gap-3 p-4 bg-cloud rounded-input">
                  <div className={`rounded-full p-2.5 shrink-0 ${
                    doc.status === "verified" ? "bg-success/10" : doc.status === "pending" ? "bg-warning/10" : "bg-error/10"
                  }`}>
                    <FileText className={`w-4 h-4 ${
                      doc.status === "verified" ? "text-success" : doc.status === "pending" ? "text-warning" : "text-error"
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy text-sm truncate">{doc.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-ink/50 text-xs">{doc.size}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        doc.status === "verified" ? "text-success bg-success/10" :
                        doc.status === "pending" ? "text-warning bg-warning/10" : "text-error bg-error/10"
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button className="p-2 text-ink/60 hover:text-navy hover:bg-white rounded-input transition-colors" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-ink/60 hover:text-navy hover:bg-white rounded-input transition-colors" title="Download">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Notes */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gold" />
              Internal Notes
              <span className="text-xs font-semibold text-purple bg-purple/10 px-2 py-0.5 rounded-full">
                Admin Only
              </span>
            </h2>

            <div className="space-y-4 mb-6">
              {notes.map((note) => (
                <div key={note.id} className="p-4 bg-cloud rounded-input">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <p className="font-semibold text-navy text-sm">{note.author}</p>
                    <p className="text-ink/50 text-xs">{note.date}</p>
                  </div>
                  <p className="text-ink/80 text-sm leading-relaxed">{note.note}</p>
                </div>
              ))}
            </div>

            {/* Add Note */}
            <div className="flex gap-3">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
                placeholder="Add an internal note..."
                className="flex-1 px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
              />
              <button
                onClick={handleAddNote}
                disabled={!newNote.trim()}
                className="btn-lift bg-navy text-white font-semibold px-5 py-3 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <Send className="w-4 h-4" />
                Add Note
              </button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: ACTIONS ================= */}
        <div className="space-y-6">
          
          {/* Decision Panel */}
          <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100 lg:sticky lg:top-24">
            <h3 className="font-display font-bold text-navy text-base mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold" />
              Decision Panel
            </h3>

            {/* Status Selector */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-ink mb-2">
                Update Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as ApplicationStatus)}
                className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-ink text-sm"
              >
                <option value="VERIFICATION">Verification</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="ADDITIONAL_INFO">Additional Info Needed</option>
                <option value="APPROVED">Approve</option>
                <option value="DENIED">Deny</option>
                <option value="COMPLETED">Mark as Completed</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button className="btn-lift w-full bg-success text-white font-semibold px-5 py-3 rounded-input hover:bg-success/90 transition-colors flex items-center justify-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4" />
                Approve Application
              </button>
              <button className="btn-lift w-full bg-warning text-white font-semibold px-5 py-3 rounded-input hover:bg-warning/90 transition-colors flex items-center justify-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4" />
                Request More Info
              </button>
              <button className="btn-lift w-full bg-error text-white font-semibold px-5 py-3 rounded-input hover:bg-error/90 transition-colors flex items-center justify-center gap-2 text-sm">
                <Ban className="w-4 h-4" />
                Deny Application
              </button>
              <button className="btn-lift w-full bg-navy text-white font-semibold px-5 py-3 rounded-input hover:bg-navy/90 transition-colors flex items-center justify-center gap-2 text-sm">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-ink/50 text-xs flex items-center gap-2">
                <Shield className="w-3 h-3" />
                All actions are logged in the audit trail.
              </p>
            </div>
          </div>

          {/* Status History */}
          <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-navy text-base mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold" />
              Status History
            </h3>
            <div className="space-y-3">
              {app.statusHistory.map((history, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="bg-cloud rounded-full p-2 shrink-0 mt-0.5">
                    <CheckCheck className="w-3.5 h-3.5 text-navy" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-navy text-xs">{history.status}</p>
                    <p className="text-ink/50 text-xs mt-0.5">{history.date}</p>
                    <p className="text-ink/40 text-xs">by {history.by}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-navy text-white rounded-card p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h3 className="font-display font-bold text-base mb-3">Quick Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Days Pending</span>
                  <span className="font-semibold">4 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Last Update</span>
                  <span className="font-semibold">Apr 9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Priority</span>
                  <span className="text-gold font-semibold">High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}