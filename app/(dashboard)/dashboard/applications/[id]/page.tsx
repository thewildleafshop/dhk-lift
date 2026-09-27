"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  DollarSign,
  MessageSquare,
  Download,
  Upload,
  Eye,
  User,
  Loader2,
} from "lucide-react";

// ============ TYPES ============
type ApplicationStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "VERIFICATION"
  | "UNDER_REVIEW"
  | "ADDITIONAL_INFO"
  | "APPROVED"
  | "DENIED"
  | "COMPLETED";

interface ApplicationDetail {
  id: string;
  confirmationNo: string;
  status: ApplicationStatus;
  amountRequested: number | null;
  data: any;
  notes: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user: { id: string; name: string; email: string; phone: string | null; country: string | null };
  program: { id: string; name: string; slug: string; category: string } | null;
  documents: {
    id: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    createdAt: string;
  }[];
}

// ============ STATUS HELPERS ============
const statusConfig: Record<ApplicationStatus, { label: string; color: string; bg: string; icon: any }> = {
  DRAFT: { label: "Draft", color: "text-ink/70", bg: "bg-gray-100", icon: FileText },
  SUBMITTED: { label: "Submitted", color: "text-info", bg: "bg-info/10", icon: Clock },
  VERIFICATION: { label: "Verification", color: "text-info", bg: "bg-info/10", icon: AlertCircle },
  UNDER_REVIEW: { label: "Under Review", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  ADDITIONAL_INFO: { label: "Action Needed", color: "text-warning", bg: "bg-warning/10", icon: AlertCircle },
  APPROVED: { label: "Approved", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  DENIED: { label: "Denied", color: "text-error", bg: "bg-error/10", icon: XCircle },
  COMPLETED: { label: "Completed", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
};

// ============ PROGRAM COLOR ============
const getProgramColor = (programName: string) => {
  const map: Record<string, { color: string; bg: string }> = {
    "LIFT Health": { color: "text-teal", bg: "bg-teal/10" },
    "LIFT Protect": { color: "text-purple", bg: "bg-purple/10" },
    "LIFT Ability": { color: "text-purple", bg: "bg-purple/10" },
    "LIFT Community": { color: "text-gold", bg: "bg-gold/10" },
    "Children & Families": { color: "text-navy", bg: "bg-navy/10" },
    "Food Security": { color: "text-gold", bg: "bg-gold/10" },
    "Disaster Relief": { color: "text-error", bg: "bg-error/10" },
  };
  return map[programName] || { color: "text-navy", bg: "bg-navy/10" };
};

// ============ TIMELINE GENERATOR ============
const generateTimeline = (status: ApplicationStatus, submittedAt: string | null, reviewedAt: string | null, createdAt: string) => {
  const steps = [
    { key: "SUBMITTED", title: "Application Submitted", desc: "Your application has been successfully submitted." },
    { key: "VERIFICATION", title: "Document Verification", desc: "Your documents are being verified." },
    { key: "UNDER_REVIEW", title: "Under Review", desc: "Our team is reviewing your application." },
    { key: "APPROVED", title: "Decision", desc: "Final decision on your application." },
    { key: "COMPLETED", title: "Assistance Disbursed", desc: "Funds have been disbursed." },
  ];

  const statusOrder = ["DRAFT", "SUBMITTED", "VERIFICATION", "UNDER_REVIEW", "ADDITIONAL_INFO", "APPROVED", "COMPLETED"];
  const currentIndex = statusOrder.indexOf(status);

  return steps.map((step, i) => {
    const stepIndex = statusOrder.indexOf(step.key);
    let stepStatus: "completed" | "current" | "pending" = "pending";
    
    if (status === "DENIED") {
      stepStatus = i === 0 ? "completed" : "pending";
    } else if (stepIndex < currentIndex) {
      stepStatus = "completed";
    } else if (stepIndex === currentIndex || (status === "ADDITIONAL_INFO" && step.key === "UNDER_REVIEW")) {
      stepStatus = "current";
    }

    return {
      id: i + 1,
      title: step.title,
      description: step.desc,
      date: stepStatus === "completed" ? new Date(submittedAt || createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Pending",
      status: stepStatus,
    };
  });
};

// ============ MAIN COMPONENT ============
export default function ApplicationDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [application, setApplication] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApplication() {
      try {
        setLoading(true);
        const res = await fetch(`/api/applications/${id}`);
        if (!res.ok) throw new Error("Failed to fetch application");
        const data = await res.json();
        setApplication(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchApplication();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-navy animate-spin" />
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="bg-white rounded-card p-12 text-center border border-gray-100">
        <p className="text-error font-semibold mb-2">Error loading application</p>
        <p className="text-ink/60 text-sm">{error}</p>
        <Link href="/dashboard/applications" className="text-navy underline mt-4 inline-block">
          Back to My Applications
        </Link>
      </div>
    );
  }

  const status = statusConfig[application.status] || statusConfig.SUBMITTED;
  const StatusIcon = status.icon;
  const programName = application.program?.name || "General Assistance";
  const programColors = getProgramColor(programName);
  const timeline = generateTimeline(application.status, application.submittedAt, application.reviewedAt, application.createdAt);

  return (
    <div className="space-y-6">
      
      {/* BACK BUTTON */}
      <Link
        href="/dashboard/applications"
        className="inline-flex items-center gap-2 text-ink/60 hover:text-navy font-medium transition-colors text-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to My Applications
      </Link>

      {/* HEADER CARD */}
      <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`${programColors.bg} rounded-full p-4 shrink-0`}>
              <FileText className={`w-8 h-8 ${programColors.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
                  {programName}
                </h1>
                <span className={`text-xs font-semibold ${status.color} ${status.bg} px-3 py-1 rounded-full flex items-center gap-1`}>
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </span>
              </div>
              <p className="text-ink/60 mt-2 text-sm">
                Reference: <span className="font-semibold text-navy">{application.confirmationNo.slice(0, 12)}</span>
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-ink/60">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Submitted: {application.submittedAt ? new Date(application.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Not submitted"}
                </span>
                {application.amountRequested && (
                  <span className="flex items-center gap-1 font-semibold text-navy">
                    <DollarSign className="w-3.5 h-3.5" />
                    ${application.amountRequested.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT: TIMELINE & MESSAGES */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* TIMELINE */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold" />
              Application Timeline
            </h2>

            <div className="relative">
              {timeline.map((event, index) => {
                const isLast = index === timeline.length - 1;
                return (
                  <div key={event.id} className="relative flex gap-4 pb-8 last:pb-0">
                    {!isLast && (
                      <div className={`absolute left-5 top-10 w-0.5 h-full ${
                        event.status === "completed" ? "bg-success" : "bg-gray-200"
                      }`}></div>
                    )}

                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      event.status === "completed"
                        ? "bg-success text-white"
                        : event.status === "current"
                        ? "bg-gold text-ink"
                        : "bg-gray-100 text-ink/30"
                    }`}>
                      {event.status === "completed" ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : event.status === "current" ? (
                        <Clock className="w-5 h-5" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-ink/30"></div>
                      )}
                    </div>

                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`font-semibold text-sm ${
                          event.status === "pending" ? "text-ink/40" : "text-navy"
                        }`}>
                          {event.title}
                        </h3>
                        {event.status === "current" && (
                          <span className="text-xs font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className={`text-xs mt-1 ${
                        event.status === "pending" ? "text-ink/40" : "text-ink/60"
                      }`}>
                        {event.description}
                      </p>
                      <p className={`text-xs mt-1 font-medium ${
                        event.status === "pending" ? "text-ink/30" : "text-ink/50"
                      }`}>
                        {event.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NOTES FROM ADMIN */}
          {application.notes && (
            <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="font-display font-bold text-navy text-lg mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gold" />
                Message from DHK LIFT
              </h2>
              <div className={`p-4 rounded-input ${
                application.status === "APPROVED" ? "bg-success/5 border border-success/20" :
                application.status === "ADDITIONAL_INFO" ? "bg-warning/5 border border-warning/20" :
                "bg-cloud"
              }`}>
                <p className="text-sm text-ink/80 leading-relaxed">{application.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: DETAILS & DOCUMENTS */}
        <div className="space-y-6">
          
          {/* APPLICANT DETAILS */}
          <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-navy text-base mb-4">
              Applicant Details
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-ink/50 text-xs">Name</p>
                <p className="font-semibold text-navy">{application.data.patientName || application.data.studentName || application.user.name}</p>
              </div>
              <div>
                <p className="text-ink/50 text-xs">Email</p>
                <p className="font-semibold text-navy break-all">{application.user.email}</p>
              </div>
              {application.data.contactPhone && (
                <div>
                  <p className="text-ink/50 text-xs">Phone</p>
                  <p className="font-semibold text-navy">{application.data.contactPhone}</p>
                </div>
              )}
              {application.user.country && (
                <div>
                  <p className="text-ink/50 text-xs">Country</p>
                  <p className="font-semibold text-navy">{application.user.country}</p>
                </div>
              )}
            </div>
          </div>

          {/* ASSISTANCE DETAILS */}
          <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-navy text-base mb-4">
              Assistance Details
            </h3>
            <div className="space-y-3 text-sm">
              {application.data.assistanceType && (
                <div>
                  <p className="text-ink/50 text-xs">Type</p>
                  <p className="font-semibold text-navy">{application.data.assistanceType}</p>
                </div>
              )}
              {application.data.monthlyIncome && (
                <div>
                  <p className="text-ink/50 text-xs">Monthly Income</p>
                  <p className="font-semibold text-navy">PKR {application.data.monthlyIncome.toLocaleString()}</p>
                </div>
              )}
              {application.data.householdSize && (
                <div>
                  <p className="text-ink/50 text-xs">Household Size</p>
                  <p className="font-semibold text-navy">{application.data.householdSize} members</p>
                </div>
              )}
              {application.amountRequested && (
                <div>
                  <p className="text-ink/50 text-xs">Amount Requested</p>
                  <p className="font-display font-bold text-gold text-lg">${application.amountRequested.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* DOCUMENTS */}
          <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-navy text-base mb-4">
              Documents ({application.documents.length})
            </h3>
            {application.documents.length > 0 ? (
              <div className="space-y-3">
                {application.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-3 p-3 bg-cloud rounded-input">
                    <div className="bg-white rounded p-2 shrink-0">
                      <FileText className="w-4 h-4 text-navy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-navy text-xs truncate">{doc.fileName}</p>
                      <p className="text-ink/50 text-xs">{(doc.fileSize / 1024).toFixed(0)} KB</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-ink/60 hover:text-navy hover:bg-white rounded transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={doc.fileUrl}
                        download
                        className="p-1.5 text-ink/60 hover:text-navy hover:bg-white rounded transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-ink/50 text-sm italic text-center py-4">No documents uploaded yet.</p>
            )}
          </div>

          {/* SITUATION */}
          {application.data.condition && (
            <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
              <h3 className="font-display font-bold text-navy text-base mb-3">
                Medical Condition
              </h3>
              <p className="text-ink/70 text-sm leading-relaxed">
                {application.data.condition}
              </p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}