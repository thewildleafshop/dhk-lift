"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ShieldCheck,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  FileText,
  Image as ImageIcon,
  Receipt,
  Download,
  MapPin,
  Building2,
  DollarSign,
  Camera,
  ZoomIn,
  Loader2,
  Ban,
  CheckCheck,
} from "lucide-react";

// ============ TYPES ============
type Evidence = {
  id: string;
  type: string;
  fileUrl: string;
  description: string | null;
  visibility: string;
};

type MilestoneDetail = {
  id: string;
  projectId: string;
  projectTitle: string;
  projectSlug: string;
  partner: string;
  partnerVerified: boolean;
  milestone: string;
  location: string;
  submittedDate: string;
  status: string;
  evidenceCount: number;
  evidenceTypes: string[];
  amount: number;
  evidence: Evidence[];
};

const evidenceTypeConfig: Record<string, { label: string; icon: any; color: string; bg: string }> = {
  PHOTO: { label: "Photo", icon: ImageIcon, color: "text-teal", bg: "bg-teal/10" },
  RECEIPT: { label: "Receipt", icon: Receipt, color: "text-gold", bg: "bg-gold/10" },
  INVOICE: { label: "Invoice", icon: FileText, color: "text-purple", bg: "bg-purple/10" },
  DELIVERY: { label: "Delivery", icon: MapPin, color: "text-navy", bg: "bg-navy/10" },
  REPORT: { label: "Report", icon: FileText, color: "text-info", bg: "bg-info/10" },
  INSPECTION: { label: "Inspection", icon: ShieldCheck, color: "text-success", bg: "bg-success/10" },
};

export default function AdminVerificationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [milestone, setMilestone] = useState<MilestoneDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Fetch milestone data
  useEffect(() => {
    async function fetchMilestone() {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/verifications/${id}`);
        if (!res.ok) throw new Error("Failed to fetch milestone");
        const data = await res.json();
        setMilestone(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchMilestone();
  }, [id]);

  // Handle approve / reject / request info
  const handleStatusUpdate = async (newStatus: string) => {
    if (!confirm(`Are you sure you want to mark this milestone as ${newStatus.replace("_", " ")}?`)) return;

    try {
      setUpdating(true);
      const res = await fetch(`/api/admin/verifications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update");
      alert(`✅ Milestone marked as ${newStatus.replace("_", " ")}`);
      router.push("/admin/verification");
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

  if (error || !milestone) {
    return (
      <div className="bg-white rounded-card p-12 text-center border border-gray-100">
        <p className="text-error font-semibold mb-2">Error loading milestone</p>
        <p className="text-ink/60 text-sm">{error}</p>
        <Link href="/admin/verification" className="text-navy underline mt-4 inline-block">
          Back to Verification Center
        </Link>
      </div>
    );
  }

  const photoEvidence = milestone.evidence.filter((e) => e.type === "PHOTO");
  const documentEvidence = milestone.evidence.filter((e) => e.type !== "PHOTO");
  const isPending = milestone.status === "PENDING";

  return (
    <div className="space-y-6">
      
      {/* BACK BUTTON */}
      <Link
        href="/admin/verification"
        className="inline-flex items-center gap-2 text-ink/60 hover:text-navy font-medium transition-colors text-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Verification Center
      </Link>

      {/* HEADER CARD */}
      <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="bg-navy/5 rounded-full p-4 shrink-0">
              <ShieldCheck className="w-8 h-8 text-navy" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
                  {milestone.milestone}
                </h1>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${
                  milestone.status === "COMPLETED" ? "text-success bg-success/10" :
                  milestone.status === "NEEDS_INFO" ? "text-warning bg-warning/10" :
                  "text-info bg-info/10"
                }`}>
                  <Clock className="w-3 h-3" />
                  {milestone.status.replace("_", " ")}
                </span>
              </div>
              <p className="text-ink/60 mt-2 text-sm">
                {milestone.projectTitle}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm">
                <span className="flex items-center gap-1.5 text-ink/70">
                  <Building2 className="w-4 h-4" />
                  {milestone.partner}
                  {milestone.partnerVerified && (
                    <CheckCircle className="w-3.5 h-3.5 text-success" />
                  )}
                </span>
                <span className="flex items-center gap-1.5 text-ink/70">
                  <MapPin className="w-4 h-4" />
                  {milestone.location}
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-gold">
                  <DollarSign className="w-4 h-4" />
                  ${milestone.amount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MILESTONE DETAILS */}
      <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="font-display font-bold text-navy text-lg mb-4">Milestone Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-cloud rounded-input text-center">
            <p className="text-ink/50 text-xs">Submitted</p>
            <p className="font-display font-bold text-navy text-sm mt-1">
              {new Date(milestone.submittedDate).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric"
              })}
            </p>
          </div>
          <div className="p-4 bg-cloud rounded-input text-center">
            <p className="text-ink/50 text-xs">Evidence Files</p>
            <p className="font-display font-bold text-navy text-lg mt-1">
              {milestone.evidenceCount}
            </p>
          </div>
          <div className="p-4 bg-cloud rounded-input text-center">
            <p className="text-ink/50 text-xs">Status</p>
            <p className="font-display font-bold text-navy text-sm mt-1">
              {milestone.status.replace("_", " ")}
            </p>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT: EVIDENCE */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* PHOTOS */}
          {photoEvidence.length > 0 && (
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
                <Camera className="w-5 h-5 text-gold" />
                Photo Evidence ({photoEvidence.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photoEvidence.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative rounded-card overflow-hidden border-2 border-gray-200 group cursor-pointer"
                    onClick={() => setPreviewImage(photo.fileUrl)}
                  >
                    <div className="relative h-40">
                      <img
                        src={photo.fileUrl}
                        alt={photo.description || "Evidence"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="p-3 bg-white">
                      <p className="text-xs font-medium text-navy truncate">
                        {photo.description || "Photo Evidence"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DOCUMENTS */}
          {documentEvidence.length > 0 && (
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gold" />
                Documents ({documentEvidence.length})
              </h2>
              <div className="space-y-3">
                {documentEvidence.map((doc) => {
                  const config = evidenceTypeConfig[doc.type] || { label: doc.type, icon: FileText, color: "text-navy", bg: "bg-navy/10" };
                  const Icon = config.icon;
                  return (
                    <div key={doc.id} className="flex items-center gap-3 p-4 rounded-input border border-gray-100 bg-cloud">
                      <div className={`${config.bg} rounded-full p-2.5 shrink-0`}>
                        <Icon className={`w-4 h-4 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-navy text-sm truncate">
                            {doc.description || "Evidence File"}
                          </p>
                          <span className={`text-xs font-semibold ${config.color} ${config.bg} px-2 py-0.5 rounded-full shrink-0`}>
                            {config.label}
                          </span>
                        </div>
                        <p className="text-ink/50 text-xs mt-0.5 truncate">
                          {doc.fileUrl}
                        </p>
                      </div>
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-ink/60 hover:text-navy hover:bg-white rounded-input transition-colors shrink-0"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {milestone.evidence.length === 0 && (
            <div className="bg-white rounded-card p-12 text-center border border-gray-100">
              <p className="text-ink/50 text-sm italic">No evidence uploaded for this milestone.</p>
            </div>
          )}
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="space-y-6">
          
          {/* DECISION PANEL */}
          <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100 lg:sticky lg:top-24">
            <h3 className="font-display font-bold text-navy text-base mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold" />
              Verification Decision
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => handleStatusUpdate("COMPLETED")}
                disabled={updating || !isPending}
                className="w-full bg-success text-white font-semibold px-5 py-3 rounded-input hover:bg-success/90 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-4 h-4" />
                {updating ? "Updating..." : "Approve Milestone"}
              </button>
              <button
                onClick={() => handleStatusUpdate("NEEDS_INFO")}
                disabled={updating || !isPending}
                className="w-full bg-warning text-white font-semibold px-5 py-3 rounded-input hover:bg-warning/90 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AlertCircle className="w-4 h-4" />
                {updating ? "Updating..." : "Request More Info"}
              </button>
              <button
                onClick={() => handleStatusUpdate("PENDING")}
                disabled={updating || !isPending}
                className="w-full bg-error text-white font-semibold px-5 py-3 rounded-input hover:bg-error/90 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Ban className="w-4 h-4" />
                {updating ? "Updating..." : "Reject Milestone"}
              </button>
            </div>

            {!isPending && (
              <p className="text-xs text-ink/50 mt-4 text-center">
                This milestone has already been reviewed.
              </p>
            )}

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-ink/50 text-xs flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" />
                All actions are logged in the audit trail.
              </p>
            </div>
          </div>

          {/* CHECKLIST */}
          <div className="bg-purple text-white rounded-card p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h3 className="font-display font-bold text-base mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gold" />
                Verification Checklist
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  "Photos match milestone description",
                  "Receipts are valid and dated",
                  "Invoices match project amount",
                  "Delivery confirmations are signed",
                  "Impact matches reported numbers",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/90">
                    <CheckCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <span className="text-xs">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-navy/90 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gold transition-colors text-sm font-semibold"
            >
              ✕ Close
            </button>
            <div className="relative h-[80vh] rounded-card overflow-hidden">
              <img
                src={previewImage}
                alt="Evidence preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}