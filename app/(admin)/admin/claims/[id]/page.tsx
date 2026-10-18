"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  User,
  DollarSign,
  Calendar,
  Loader2,
  Send,
} from "lucide-react";

interface Claim {
  id: string;
  patientName: string;
  patientId: string | null;
  providerName: string;
  serviceDate: string;
  serviceType: string;
  amount: number;
  description: string;
  documents: string[];
  status: string;
  notes: string | null;
  submittedAt: string;
  partner?: { orgName: string };
}

export default function AdminClaimDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [claim, setClaim] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClaim() {
      try {
        const res = await fetch(`/api/admin/claims/${params.id}`);
        if (!res.ok) throw new Error("Claim not found");
        const data = await res.json();
        setClaim(data);
        setNotes(data.notes || "");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchClaim();
  }, [params.id]);

  const handleAction = async (status: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/claims/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });
      if (!res.ok) throw new Error("Action failed");
      router.push("/admin/claims");
    } catch (err: any) {
      setError(err.message);
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-navy animate-spin" />
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="bg-white rounded-card p-12 text-center">
        <p className="text-error">Claim not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        href="/admin/claims"
        className="inline-flex items-center gap-2 text-ink/60 hover:text-navy font-medium text-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Claims
      </Link>

      <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-navy">
              Claim: {claim.patientName}
            </h1>
            <p className="text-ink/60 mt-1">
              Submitted by {claim.partner?.orgName || "Unknown"}
            </p>
          </div>
          <span className="text-sm font-semibold bg-info/10 text-info px-3 py-1 rounded-full">
            {claim.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Info */}
          <div className="space-y-3">
            <h2 className="font-bold text-navy text-sm uppercase">Patient Info</h2>
            <div className="text-sm space-y-1">
              <p><span className="text-ink/60">Name:</span> {claim.patientName}</p>
              <p><span className="text-ink/60">ID:</span> {claim.patientId || "—"}</p>
              <p><span className="text-ink/60">Provider:</span> {claim.providerName}</p>
              <p><span className="text-ink/60">Service:</span> {claim.serviceType}</p>
              <p><span className="text-ink/60">Date:</span> {new Date(claim.serviceDate).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-3">
            <h2 className="font-bold text-navy text-sm uppercase">Amount</h2>
            <div className="bg-gold/10 rounded-card p-4">
              <p className="font-display text-3xl font-bold text-gold">
                ${Number(claim.amount).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="font-bold text-navy text-sm uppercase mb-2">Description</h2>
          <p className="text-sm text-ink/80">{claim.description}</p>
        </div>

        {/* Documents */}
        {claim.documents && claim.documents.length > 0 && (
          <div className="mt-6">
            <h2 className="font-bold text-navy text-sm uppercase mb-2">Documents</h2>
            <div className="space-y-2">
              {claim.documents.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 bg-cloud rounded-input text-sm text-teal hover:underline"
                >
                  <FileText className="w-4 h-4" />
                  Document {i + 1}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="mt-6">
          <h2 className="font-bold text-navy text-sm uppercase mb-2">Internal Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Add internal notes..."
            className="w-full px-4 py-3 rounded-input border border-gray-200 text-sm resize-none"
          />
        </div>

        {error && (
          <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-input">
            <p className="text-error text-sm">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={() => handleAction("APPROVED")}
            disabled={actionLoading}
            className="bg-success text-white font-semibold px-6 py-3 rounded-input hover:bg-success/90 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <CheckCircle className="w-4 h-4" />
            Approve
          </button>
          <button
            onClick={() => handleAction("DENIED")}
            disabled={actionLoading}
            className="bg-error text-white font-semibold px-6 py-3 rounded-input hover:bg-error/90 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <XCircle className="w-4 h-4" />
            Deny
          </button>
          <button
            onClick={() => handleAction("ADDITIONAL_INFO")}
            disabled={actionLoading}
            className="bg-warning text-white font-semibold px-6 py-3 rounded-input hover:bg-warning/90 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Clock className="w-4 h-4" />
            Request Info
          </button>
        </div>
      </div>
    </div>
  );
}