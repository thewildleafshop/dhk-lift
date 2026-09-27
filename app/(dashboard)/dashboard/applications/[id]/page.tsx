"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
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
  Home,
  Stethoscope,
  Users,
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

type TimelineEvent = {
  id: number;
  title: string;
  description: string;
  date: string;
  status: "completed" | "current" | "pending";
};

type ApplicationDetail = {
  id: string;
  referenceNumber: string;
  program: string;
  programColor: string;
  programBg: string;
  status: ApplicationStatus;
  submittedDate: string;
  lastUpdate: string;
  amountRequested: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  city: string;
  country: string;
  assistanceType: string;
  urgency: string;
  situation: string;
  timeline: TimelineEvent[];
  documents: {
    name: string;
    size: string;
    status: "verified" | "pending" | "rejected";
    uploadedDate: string;
  }[];
  messages: {
    id: number;
    sender: "user" | "admin";
    senderName: string;
    message: string;
    date: string;
  }[];
};

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

// ============ DEMO DATA ============
const demoApplication: ApplicationDetail = {
  id: "1",
  referenceNumber: "APP-23043012",
  program: "Financial Assistance",
  programColor: "text-gold",
  programBg: "bg-gold/10",
  status: "UNDER_REVIEW",
  submittedDate: "Apr 5, 2026",
  lastUpdate: "2 days ago",
  amountRequested: "$500",
  applicantName: "Raazia Bibi",
  applicantEmail: "raazia@example.com",
  applicantPhone: "+92 300 1234567",
  city: "Karachi",
  country: "Pakistan",
  assistanceType: "Medical treatment support",
  urgency: "Urgent",
  situation: "I am a single mother of three children and recently lost my job due to a medical condition. I need financial assistance to cover my treatment expenses and support my family until I recover.",
  timeline: [
    {
      id: 1,
      title: "Application Submitted",
      description: "Your application has been successfully submitted and is awaiting initial review.",
      date: "Apr 5, 2026 - 10:30 AM",
      status: "completed",
    },
    {
      id: 2,
      title: "Document Verification",
      description: "Your documents have been verified. All required information is complete.",
      date: "Apr 7, 2026 - 02:15 PM",
      status: "completed",
    },
    {
      id: 3,
      title: "Under Review",
      description: "Our team is currently reviewing your application. This typically takes 3-5 business days.",
      date: "Apr 9, 2026 - 09:00 AM",
      status: "current",
    },
    {
      id: 4,
      title: "Decision",
      description: "You will be notified of the final decision via email and dashboard.",
      date: "Pending",
      status: "pending",
    },
    {
      id: 5,
      title: "Assistance Disbursed",
      description: "If approved, funds will be disbursed within 5 business days of approval.",
      date: "Pending",
      status: "pending",
    },
  ],
  documents: [
    { name: "ID_Document.pdf", size: "1.2 MB", status: "verified", uploadedDate: "Apr 5, 2026" },
    { name: "Medical_Report.pdf", size: "2.4 MB", status: "verified", uploadedDate: "Apr 5, 2026" },
    { name: "Proof_of_Income.pdf", size: "890 KB", status: "verified", uploadedDate: "Apr 5, 2026" },
  ],
  messages: [
    {
      id: 1,
      sender: "admin",
      senderName: "DHK LIFT Support",
      message: "Thank you for submitting your application. We have received all your documents and will begin our review shortly.",
      date: "Apr 5, 2026 - 10:45 AM",
    },
    {
      id: 2,
      sender: "user",
      senderName: "You",
      message: "Thank you. Please let me know if you need any additional information.",
      date: "Apr 6, 2026 - 09:20 AM",
    },
    {
      id: 3,
      sender: "admin",
      senderName: "DHK LIFT Support",
      message: "Your application has moved to the review stage. Our team is evaluating your case. Expected decision: Apr 14, 2026.",
      date: "Apr 9, 2026 - 09:05 AM",
    },
  ],
};

// ============ MAIN COMPONENT ============
export default function ApplicationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const application = demoApplication;
  const status = statusConfig[application.status];
  const StatusIcon = status.icon;

  return (
    <div className="space-y-6">
      
      {/* ================= BACK BUTTON ================= */}
      <Link
        href="/dashboard/applications"
        className="inline-flex items-center gap-2 text-ink/60 hover:text-navy font-medium transition-colors text-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to My Applications
      </Link>

      {/* ================= HEADER CARD ================= */}
      <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`${application.programBg} rounded-full p-4 shrink-0`}>
              <FileText className={`w-8 h-8 ${application.programColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
                  {application.program}
                </h1>
                <span className={`text-xs font-semibold ${status.color} ${status.bg} px-3 py-1 rounded-full flex items-center gap-1`}>
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </span>
              </div>
              <p className="text-ink/60 mt-2 text-sm">
                Reference Number: <span className="font-semibold text-navy">{application.referenceNumber}</span>
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-ink/60">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Submitted: {application.submittedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Updated: {application.lastUpdate}
                </span>
                <span className="flex items-center gap-1 font-semibold text-navy">
                  <DollarSign className="w-3.5 h-3.5" />
                  {application.amountRequested}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ================= LEFT: TIMELINE & MESSAGES ================= */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status Timeline */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold" />
              Application Timeline
            </h2>

            <div className="relative">
              {application.timeline.map((event, index) => {
                const isLast = index === application.timeline.length - 1;
                return (
                  <div key={event.id} className="relative flex gap-4 pb-8 last:pb-0">
                    {/* Vertical Line */}
                    {!isLast && (
                      <div className={`absolute left-5 top-10 w-0.5 h-full ${
                        event.status === "completed" ? "bg-success" : "bg-gray-200"
                      }`}></div>
                    )}

                    {/* Icon */}
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

                    {/* Content */}
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

          {/* Messages */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gold" />
              Messages
            </h2>

            <div className="space-y-4">
              {application.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`rounded-full w-9 h-9 flex items-center justify-center shrink-0 ${
                    msg.sender === "admin" ? "bg-navy text-white" : "bg-gold text-ink"
                  }`}>
                    <User className="w-4 h-4" />
                  </div>
                  <div className={`flex-1 max-w-md ${msg.sender === "user" ? "text-right" : ""}`}>
                    <div className={`inline-block p-4 rounded-card ${
                      msg.sender === "admin"
                        ? "bg-cloud text-ink"
                        : "bg-gold/10 text-navy"
                    }`}>
                      <p className="text-xs font-semibold mb-1">
                        {msg.senderName}
                      </p>
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                    </div>
                    <p className="text-xs text-ink/40 mt-1">{msg.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Box */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                />
                <button className="btn-lift bg-navy text-white font-semibold px-5 py-3 rounded-input hover:bg-navy/90 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: DETAILS & DOCUMENTS ================= */}
        <div className="space-y-6">
          
          {/* Applicant Details */}
          <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-navy text-base mb-4">
              Applicant Details
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-ink/50 text-xs">Name</p>
                <p className="font-semibold text-navy">{application.applicantName}</p>
              </div>
              <div>
                <p className="text-ink/50 text-xs">Email</p>
                <p className="font-semibold text-navy break-all">{application.applicantEmail}</p>
              </div>
              <div>
                <p className="text-ink/50 text-xs">Phone</p>
                <p className="font-semibold text-navy">{application.applicantPhone}</p>
              </div>
              <div>
                <p className="text-ink/50 text-xs">Location</p>
                <p className="font-semibold text-navy">{application.city}, {application.country}</p>
              </div>
            </div>
          </div>

          {/* Assistance Details */}
          <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-navy text-base mb-4">
              Assistance Details
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-ink/50 text-xs">Type</p>
                <p className="font-semibold text-navy">{application.assistanceType}</p>
              </div>
              <div>
                <p className="text-ink/50 text-xs">Urgency</p>
                <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${
                  application.urgency === "Urgent" 
                    ? "text-warning bg-warning/10" 
                    : "text-ink/70 bg-gray-100"
                }`}>
                  {application.urgency}
                </span>
              </div>
              <div>
                <p className="text-ink/50 text-xs">Amount Requested</p>
                <p className="font-display font-bold text-gold text-lg">{application.amountRequested}</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-navy text-base mb-4">
              Documents
            </h3>
            <div className="space-y-3">
              {application.documents.map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-cloud rounded-input">
                  <div className="bg-white rounded p-2 shrink-0">
                    <FileText className="w-4 h-4 text-navy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-navy text-xs truncate">{doc.name}</p>
                    <p className="text-ink/50 text-xs">{doc.size}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button className="p-1.5 text-ink/60 hover:text-navy hover:bg-white rounded transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 text-ink/60 hover:text-navy hover:bg-white rounded transition-colors">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-lift w-full mt-4 border-2 border-dashed border-gray-200 text-ink/60 hover:border-gold hover:text-gold font-medium px-4 py-3 rounded-input transition-colors flex items-center justify-center gap-2 text-sm">
              <Upload className="w-4 h-4" />
              Upload New Document
            </button>
          </div>

          {/* Situation */}
          <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-navy text-base mb-3">
              Your Situation
            </h3>
            <p className="text-ink/70 text-sm leading-relaxed">
              {application.situation}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}