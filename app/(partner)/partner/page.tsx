"use client";

import { useState, useEffect } from "react";
import FileUploader from "@/components/uploads/FileUploader";
import {
  ShieldCheck,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  FileText,
  Award,
  Calendar,
  TrendingUp,
  Send,
  MessageSquare,
  Loader2,
  ChevronRight,
} from "lucide-react";

// ============ VERIFICATION STEPS ============
const verificationSteps = [
  { id: 1, title: "Application Submitted", description: "Organization details, mission, and initial documents received.", status: "completed", date: "Feb 15, 2024" },
  { id: 2, title: "Documents Verified", description: "Registration, financial, and tax documents verified by our team.", status: "completed", date: "Feb 22, 2024" },
  { id: 3, title: "Reference Checks", description: "References contacted and verified by DHK LIFT team.", status: "completed", date: "Mar 1, 2024" },
  { id: 4, title: "Verification Approved", description: "Organization approved as a verified partner.", status: "completed", date: "Mar 10, 2024" },
  { id: 5, title: "Trusted Partner Status", description: "After successful projects, upgraded to trusted partner.", status: "completed", date: "Jan 15, 2025" },
];

// ============ DHK REQUESTS ============
const dhkRequests = [
  { id: 1, title: "Upload Annual Report 2025", description: "Please upload your organization's annual report for 2025.", priority: "medium", dueDate: "Apr 30, 2026" },
  { id: 2, title: "Update Leadership Information", description: "One of your leadership members has changed. Please update.", priority: "low", dueDate: "Apr 15, 2026" },
];

// ============ DEFAULT REQUIRED DOCS ============
const defaultDocs = [
  { id: "reg-cert", name: "Organization Registration Certificate", status: "pending" },
  { id: "tax-cert", name: "Tax Exemption Certificate", status: "pending" },
  { id: "fin-stmt", name: "Financial Statements (Last 2 Years)", status: "pending" },
  { id: "leadership-id", name: "Leadership Team ID Documents", status: "pending" },
  { id: "annual-report", name: "Annual Report 2025", status: "pending" },
];

// ============ TYPES ============
interface UploadedDoc {
  id: string;
  docId?: string;
  name: string;
  status: "verified" | "pending" | "rejected";
  uploadedDate?: string;
  verifiedDate?: string;
  fileUrl?: string;
}

export default function PartnerVerificationPage() {
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingDocId, setUploadingDocId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ✅ API se documents fetch karein
  useEffect(() => {
    async function fetchDocs() {
      try {
        setLoading(true);
        const res = await fetch("/api/partners/verification-docs");

        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setUploadedDocs(data);
          } else {
            setUploadedDocs(defaultDocs as UploadedDoc[]);
          }
        } else {
          console.warn("API returned error, using defaults");
          setUploadedDocs(defaultDocs as UploadedDoc[]);
        }
      } catch (err) {
        console.error("Error fetching docs:", err);
        setUploadedDocs(defaultDocs as UploadedDoc[]);
      } finally {
        setLoading(false);
      }
    }
    fetchDocs();
  }, []);

  // ✅ Document upload complete hone par
  const handleDocUpload = async (docId: string, urls: string[]) => {
    try {
      setUploadingDocId(docId);
      const res = await fetch("/api/partners/verification-docs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docId, fileUrl: urls[0] }),
      });

      if (!res.ok) throw new Error("Failed to save document");

      // Update local state
      setUploadedDocs((prev) =>
        prev.map((d) =>
          d.id === docId || d.docId === docId
            ? { ...d, status: "pending", uploadedDate: new Date().toLocaleDateString(), fileUrl: urls[0] }
            : d
        )
      );
      setUploadingDocId(null);
    } catch (err: any) {
      setError(err.message);
      setUploadingDocId(null);
    }
  };

  const completedSteps = verificationSteps.filter((s) => s.status === "completed").length;
  const totalSteps = verificationSteps.length;
  const verifiedDocs = uploadedDocs.filter((d) => d.status === "verified").length;
  const totalDocs = uploadedDocs.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-navy animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">Verification Status</h1>
        <p className="text-ink/70 mt-1">Track your organization's verification progress and manage documents.</p>
      </div>

      {/* STATUS BANNER */}
      <div className="bg-gradient-to-br from-success to-success/90 rounded-card p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 shrink-0">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display text-2xl md:text-3xl font-bold">Trusted Partner</h2>
                <span className="text-xs font-semibold text-success bg-white px-3 py-1 rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Highest Status
                </span>
              </div>
              <p className="text-white/80 mt-2 max-w-xl">
                Your organization has achieved the highest verification level.
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-card p-4 shrink-0">
            <div className="text-center">
              <p className="text-white/70 text-xs">Verified Since</p>
              <p className="font-display font-bold text-white text-lg mt-1">Mar 10, 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-success" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Steps</p>
          </div>
          <p className="font-display text-2xl font-bold text-navy">{completedSteps}/{totalSteps}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-teal" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Documents</p>
          </div>
          <p className="font-display text-2xl font-bold text-navy">{verifiedDocs}/{totalDocs}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-warning" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Requests</p>
          </div>
          <p className="font-display text-2xl font-bold text-warning">{dhkRequests.length}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-gold" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Rating</p>
          </div>
          <p className="font-display text-2xl font-bold text-gold">A+</p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Verification Steps */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold" />
              Verification Progress
            </h2>
            <div className="relative">
              {verificationSteps.map((step, index) => {
                const isLast = index === verificationSteps.length - 1;
                return (
                  <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
                    {!isLast && (
                      <div className="absolute left-5 top-10 w-0.5 h-full bg-success"></div>
                    )}
                    <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-success text-white">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="font-semibold text-sm text-navy">{step.title}</h3>
                      <p className="text-xs mt-1 text-ink/60">{step.description}</p>
                      <p className="text-xs mt-1 font-medium text-ink/50">{step.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DHK Requests */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gold" />
              DHK LIFT Requests
              <span className="text-xs font-semibold text-warning bg-warning/10 px-2 py-0.5 rounded-full">
                {dhkRequests.length} pending
              </span>
            </h2>
            <div className="space-y-4">
              {dhkRequests.map((request) => (
                <div key={request.id} className={`p-5 rounded-card border-2 ${request.priority === "medium" ? "border-warning/30 bg-warning/5" : "border-info/30 bg-info/5"}`}>
                  <div className="flex items-start gap-4">
                    <div className={`rounded-full p-3 shrink-0 ${request.priority === "medium" ? "bg-warning/10" : "bg-info/10"}`}>
                      <AlertCircle className={`w-5 h-5 ${request.priority === "medium" ? "text-warning" : "text-info"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-navy text-sm">{request.title}</h3>
                      <p className="text-ink/70 text-sm mt-2">{request.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-ink/60">
                        <span className="flex items-center gap-1 font-semibold text-warning">
                          <Clock className="w-3.5 h-3.5" />
                          Due: {request.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - ✅ DOCUMENTS SECTION WITH FILEUPLOADER */}
        <div className="space-y-6">
          
          {/* ✅ Documents with FileUploader */}
          <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-navy text-base mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold" />
              Documents
            </h3>

            {uploadedDocs.length === 0 ? (
              <p className="text-ink/60 text-xs text-center py-4">No documents loaded.</p>
            ) : (
              <div className="space-y-3">
                {uploadedDocs.map((doc) => (
                  <div key={doc.id} className={`p-3 rounded-input border ${
                    doc.status === "verified" ? "border-success/20 bg-success/5" : "border-warning/20 bg-warning/5"
                  }`}>
                    <div className="flex items-start gap-2">
                      <div className={`rounded-full p-1.5 shrink-0 mt-0.5 ${
                        doc.status === "verified" ? "bg-success/10" : "bg-warning/10"
                      }`}>
                        {doc.status === "verified" ? (
                          <CheckCircle className="w-3.5 h-3.5 text-success" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-warning" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-navy leading-snug">{doc.name}</p>
                        <p className="text-ink/50 text-xs mt-0.5">
                          {doc.status === "verified" ? "Verified" : doc.fileUrl ? "Pending review" : "Not uploaded"}
                        </p>
                      </div>
                    </div>

                    {/* ✅ FileUploader */}
                    {doc.status !== "verified" && !doc.fileUrl && (
                      <div className="mt-3">
                        {uploadingDocId === doc.id ? (
                          <div className="flex items-center gap-2 text-xs text-info">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Uploading...
                          </div>
                        ) : (
                          <FileUploader
                            endpoint="partnerVerificationUploader"
                            onUploadComplete={(urls) => handleDocUpload(doc.id, urls)}
                            onUploadError={(err: Error) => setError(err.message)}
                          />
                        )}
                      </div>
                    )}

                    {/* View uploaded file */}
                    {doc.fileUrl && doc.status !== "verified" && (
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-xs text-teal hover:underline inline-block"
                      >
                        View uploaded file
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="mt-3 p-2 bg-error/10 border border-error/20 rounded-input">
                <p className="text-error text-xs">{error}</p>
              </div>
            )}
          </div>

          {/* Benefits */}
          <div className="bg-navy text-white rounded-card p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="bg-white/10 rounded-full p-3 w-fit mb-4">
                <Award className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display font-bold text-lg mb-3">Verified Partner Benefits</h3>
              <ul className="space-y-2 text-sm">
                {["Priority funding access", "Featured on public platform", "Direct donor connections", "Equipment & resource priority", "Dedicated support team"].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/90">
                    <CheckCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <span className="text-xs">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Support */}
          <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100 text-center">
            <div className="bg-teal/10 rounded-full p-3 w-fit mx-auto mb-3">
              <MessageSquare className="w-6 h-6 text-teal" />
            </div>
            <h3 className="font-display font-bold text-navy text-base mb-2">Need Help?</h3>
            <p className="text-ink/60 text-xs mb-4">Contact our verification team.</p>
            <button className="btn-lift w-full bg-teal text-white font-semibold px-4 py-3 rounded-input hover:bg-teal/90 transition-colors text-sm flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Contact Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}