"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  Loader2,
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

interface Application {
  id: string;
  confirmationNo: string;
  status: ApplicationStatus;
  amountRequested: number | null;
  data: any;
  notes: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
  createdAt: string;
  user: { id: string; name: string | null; email: string; phone: string | null; country: string | null };
  program: { id: string; name: string; slug: string; category: string } | null;
  documents: { id: string; fileName: string; fileUrl: string; fileType: string; fileSize: number; createdAt: string }[];
}

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

export default function AdminApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApp() {
      try {
        setLoading(true);
        const res = await fetch(`/api/applications/${id}`);
        if (!res.ok) throw new Error("Failed to fetch application");
        const data = await res.json();
        setApp(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchApp();
  }, [id]);

  const handleStatusUpdate = async (newStatus: ApplicationStatus) => {
    if (!confirm(`Are you sure you want to mark this application as ${newStatus}?`)) return;

    try {
      setUpdating(true);
      const res = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update");
      alert(`✅ Application marked as ${newStatus}`);
      const updatedRes = await fetch(`/api/applications/${id}`);
      if (updatedRes.ok) {
        const data = await updatedRes.json();
        setApp(data);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-navy animate-spin" />
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="bg-white rounded-card p-12 text-center border border-gray-100">
        <p className="text-error font-semibold mb-2">Error loading application</p>
        <p className="text-ink/60 text-sm">{error}</p>
        <Link href="/admin/applications" className="text-navy underline mt-4 inline-block">
          Back to Applications
        </Link>
      </div>
    );
  }

  const status = statusConfig[app.status] || statusConfig.SUBMITTED;
  const StatusIcon = status.icon;

  // Extract data from JSON field
  const appData = app.data || {};
  const applicantName = appData.fullName || appData.patientName || app.user.name || "Unknown";
  const applicantEmail = appData.email || app.user.email;
  const applicantPhone = appData.phone || app.user.phone || "N/A";
  const applicantCity = appData.city || "N/A";
  const applicantCountry = appData.country || app.user.country || "N/A";
  const applicantAddress = appData.address || "N/A";
  const dateOfBirth = appData.dateOfBirth || "N/A";
  const gender = appData.gender || "N/A";
  const maritalStatus = appData.maritalStatus || "N/A";
  const householdSize = appData.householdSize || "N/A";
  const dependents = appData.dependents || "N/A";
  const monthlyIncome = appData.monthlyIncome || "N/A";
  const assistanceType = appData.assistanceType || "N/A";
  const urgency = appData.urgency || "Normal";
  const situation = appData.situation || "No description provided.";

  return (
    <div className="space-y-6">
      
      {/* BACK BUTTON */}
      <Link
        href="/admin/applications"
        className="inline-flex items-center gap-2 text-ink/60 hover:text-navy font-medium transition-colors text-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Applications
      </Link>

      {/* HEADER CARD */}
      <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="bg-gold/10 rounded-full p-4 shrink-0">
              <FileText className="w-8 h-8 text-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
                  {app.confirmationNo.slice(0, 12)}
                </h1>
                <span className={`text-xs font-semibold ${status.color} ${status.bg} px-3 py-1 rounded-full flex items-center gap-1`}>
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </span>
                {urgency === "emergency" && (
                  <span className="text-xs font-semibold text-error bg-error/10 px-3 py-1 rounded-full">
                    URGENT
                  </span>
                )}
              </div>
              <p className="text-ink/60 mt-2 text-sm">
                {app.program?.name || "General Assistance"} • Submitted: {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Not submitted"}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm">
                <span className="flex items-center gap-1.5 text-ink/70">
                  <User className="w-4 h-4" />
                  {applicantName}
                </span>
                <span className="flex items-center gap-1.5 text-ink/70">
                  <Mail className="w-4 h-4" />
                  {applicantEmail}
                </span>
                {app.amountRequested && (
                  <span className="flex items-center gap-1.5 font-semibold text-gold">
                    <DollarSign className="w-4 h-4" />
                    ${app.amountRequested}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT: DETAILS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* APPLICANT INFO */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-gold" />
              Applicant Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {[
                { label: "Full Name", value: applicantName, icon: User },
                { label: "Email", value: applicantEmail, icon: Mail },
                { label: "Phone", value: applicantPhone, icon: Phone },
                { label: "Date of Birth", value: dateOfBirth, icon: Calendar },
                { label: "Gender", value: gender, icon: User },
                { label: "Location", value: `${applicantCity}, ${applicantCountry}`, icon: MapPin },
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
                  <p className="font-semibold text-navy text-sm mt-0.5">{applicantAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* HOUSEHOLD INFO */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-gold" />
              Household Information
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Marital Status", value: maritalStatus },
                { label: "Household Size", value: householdSize },
                { label: "Dependents", value: dependents },
                { label: "Monthly Income", value: monthlyIncome !== "N/A" ? `$${monthlyIncome}` : "N/A" },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-cloud rounded-input text-center">
                  <p className="text-ink/50 text-xs">{item.label}</p>
                  <p className="font-display font-bold text-navy text-lg mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ASSISTANCE DETAILS */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold" />
              Assistance Details
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-ink/50 text-xs">Program</p>
                <span className="inline-block mt-1 text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
                  {app.program?.name || "General"}
                </span>
              </div>
              <div>
                <p className="text-ink/50 text-xs">Assistance Type</p>
                <p className="font-semibold text-navy text-sm mt-1">{assistanceType}</p>
              </div>
              {app.amountRequested && (
                <div>
                  <p className="text-ink/50 text-xs">Amount Requested</p>
                  <p className="font-display font-bold text-gold text-2xl mt-1">${app.amountRequested}</p>
                </div>
              )}
              <div>
                <p className="text-ink/50 text-xs">Situation</p>
                <p className="text-ink/80 text-sm mt-2 leading-relaxed bg-cloud p-4 rounded-input">
                  {situation}
                </p>
              </div>
            </div>
          </div>

          {/* DOCUMENTS */}
          {app.documents.length > 0 && (
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gold" />
                Documents ({app.documents.length})
              </h2>
              <div className="space-y-3">
                {app.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-3 p-4 bg-cloud rounded-input">
                    <div className="bg-success/10 rounded-full p-2.5 shrink-0">
                      <FileText className="w-4 h-4 text-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-navy text-sm truncate">{doc.fileName}</p>
                      <p className="text-ink/50 text-xs">{(doc.fileSize / 1024).toFixed(0)} KB</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-ink/60 hover:text-navy hover:bg-white rounded-input transition-colors">
                        <Eye className="w-4 h-4" />
                      </a>
                      <a href={doc.fileUrl} download className="p-2 text-ink/60 hover:text-navy hover:bg-white rounded-input transition-colors">
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INTERNAL NOTES */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gold" />
              Internal Notes
              <span className="text-xs font-semibold text-purple bg-purple/10 px-2 py-0.5 rounded-full">
                Admin Only
              </span>
            </h2>
            {app.notes ? (
              <div className="p-4 bg-cloud rounded-input mb-4">
                <p className="text-ink/80 text-sm leading-relaxed">{app.notes}</p>
              </div>
            ) : (
              <p className="text-ink/50 text-sm italic mb-4">No internal notes yet.</p>
            )}
            <div className="flex gap-3">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add an internal note..."
                className="flex-1 px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
              />
              <button
                disabled={!newNote.trim()}
                className="btn-lift bg-navy text-white font-semibold px-5 py-3 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <Send className="w-4 h-4" />
                Add Note
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="space-y-6">
          
          {/* DECISION PANEL */}
          <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100 lg:sticky lg:top-24">
            <h3 className="font-display font-bold text-navy text-base mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold" />
              Decision Panel
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => handleStatusUpdate("APPROVED")}
                disabled={updating}
                className="w-full bg-success text-white font-semibold px-5 py-3 rounded-input hover:bg-success/90 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" />
                {updating ? "Updating..." : "Approve Application"}
              </button>
              <button
                onClick={() => handleStatusUpdate("ADDITIONAL_INFO")}
                disabled={updating}
                className="w-full bg-warning text-white font-semibold px-5 py-3 rounded-input hover:bg-warning/90 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                <AlertCircle className="w-4 h-4" />
                Request More Info
              </button>
              <button
                onClick={() => handleStatusUpdate("DENIED")}
                disabled={updating}
                className="w-full bg-error text-white font-semibold px-5 py-3 rounded-input hover:bg-error/90 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                <Ban className="w-4 h-4" />
                Deny Application
              </button>
              <button
                onClick={() => handleStatusUpdate("UNDER_REVIEW")}
                disabled={updating}
                className="w-full bg-navy text-white font-semibold px-5 py-3 rounded-input hover:bg-navy/90 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                <Clock className="w-4 h-4" />
                Mark Under Review
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-ink/50 text-xs flex items-center gap-2">
                <Shield className="w-3 h-3" />
                All actions are logged in the audit trail.
              </p>
            </div>
          </div>

          {/* STATUS INFO */}
          <div className="bg-navy text-white rounded-card p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h3 className="font-display font-bold text-base mb-3">Application Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Status</span>
                  <span className="font-semibold">{status.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Submitted</span>
                  <span className="font-semibold">
                    {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "N/A"}
                  </span>
                </div>
                {app.reviewedAt && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Reviewed</span>
                    <span className="font-semibold">
                      {new Date(app.reviewedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-white/60">Urgency</span>
                  <span className={`font-semibold ${urgency === "emergency" ? "text-error" : "text-gold"}`}>
                    {urgency}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}