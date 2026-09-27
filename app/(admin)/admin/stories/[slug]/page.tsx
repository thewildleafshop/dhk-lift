"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  Send,
  Clock,
  User,
  Tag,
  Loader2,
  Eye,
  FileText,
} from "lucide-react";

interface Story {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  status: string;
  authorName: string | null;
  isAnonymous: boolean;
  imageUrl: string | null;
  submittedAt: string | null;
  approvedAt: string | null;
  publishedAt: string | null;
  createdAt: string;
  user: { id: string; name: string | null; email: string } | null;
}

export default function AdminStoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchStory() {
      try {
        const res = await fetch(`/api/stories/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setStory(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchStory();
  }, [slug]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!confirm(`Are you sure you want to mark this story as ${newStatus}?`)) return;

    try {
      setUpdating(true);
      const res = await fetch(`/api/stories/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update");
      alert(`✅ Story marked as ${newStatus}`);
      router.push("/admin/stories");
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

  if (!story) {
    return (
      <div className="bg-white rounded-card p-12 text-center border border-gray-100">
        <p className="text-error font-semibold mb-2">Story not found</p>
        <Link href="/admin/stories" className="text-navy underline mt-4 inline-block">
          Back to Stories
        </Link>
      </div>
    );
  }

  const displayName = story.isAnonymous ? "Anonymous" : (story.authorName || "Unknown");
  const paragraphs = story.content.split("\n\n").filter((p) => p.trim());

  return (
    <div className="space-y-6">
      
      {/* BACK */}
      <Link
        href="/admin/stories"
        className="inline-flex items-center gap-2 text-ink/60 hover:text-navy font-medium transition-colors text-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Stories Management
      </Link>

      {/* HEADER */}
      <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-16 h-16 rounded-card overflow-hidden bg-navy/10 shrink-0">
              <img
                src={story.imageUrl || "https://placehold.co/100x100/0B468F/FFFFFF?text=Story"}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl font-bold text-navy">
                {story.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-ink/60">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {displayName}
                </span>
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  {story.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(story.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
            </div>
          </div>
          <span className={`text-xs font-semibold px-4 py-2 rounded-full ${
            story.status === "PUBLISHED" ? "text-success bg-success/10" :
            story.status === "APPROVED" ? "text-teal bg-teal/10" :
            story.status === "REJECTED" ? "text-error bg-error/10" :
            "text-warning bg-warning/10"
          }`}>
            {story.status}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="font-display font-bold text-navy text-lg mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-gold" />
          Story Content
        </h2>
        <div className="space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-ink/80 leading-relaxed">{p}</p>
          ))}
        </div>
      </div>

      {/* DECISION PANEL */}
      <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
        <h2 className="font-display font-bold text-navy text-lg mb-4">
          Admin Decision
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => handleStatusUpdate("APPROVED")}
            disabled={updating || story.status === "APPROVED"}
            className="w-full bg-teal text-white font-semibold py-3.5 rounded-input hover:bg-teal/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="w-5 h-5" />
            Approve
          </button>
          <button
            onClick={() => handleStatusUpdate("PUBLISHED")}
            disabled={updating || story.status === "PUBLISHED"}
            className="w-full bg-success text-white font-semibold py-3.5 rounded-input hover:bg-success/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            Publish
          </button>
          <button
            onClick={() => handleStatusUpdate("REJECTED")}
            disabled={updating || story.status === "REJECTED"}
            className="w-full bg-error text-white font-semibold py-3.5 rounded-input hover:bg-error/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <XCircle className="w-5 h-5" />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}