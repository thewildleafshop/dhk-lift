"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  BookOpen,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Inbox,
  Loader2,
  Send,
  User,
  Tag,
} from "lucide-react";

// ============ TYPES ============
type StoryStatus = "PENDING" | "APPROVED" | "PUBLISHED" | "REJECTED";

interface Story {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  status: StoryStatus;
  authorName: string | null;
  isAnonymous: boolean;
  imageUrl: string | null;
  submittedAt: string | null;
  publishedAt: string | null;
  createdAt: string;
  user: { id: string; name: string | null; email: string } | null;
}

// ============ STATUS CONFIG ============
const statusConfig: Record<StoryStatus, { label: string; color: string; bg: string; icon: any }> = {
  PENDING: { label: "Pending", color: "text-warning", bg: "bg-warning/10", icon: Clock },
  APPROVED: { label: "Approved", color: "text-teal", bg: "bg-teal/10", icon: CheckCircle },
  PUBLISHED: { label: "Published", color: "text-success", bg: "bg-success/10", icon: Send },
  REJECTED: { label: "Rejected", color: "text-error", bg: "bg-error/10", icon: XCircle },
};

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StoryStatus | "ALL">("ALL");

  useEffect(() => {
    async function fetchStories() {
      try {
        setLoading(true);
        const res = await fetch("/api/stories");
        if (res.ok) {
          const data = await res.json();
          setStories(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStories();
  }, []);

  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (story.authorName || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || story.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: stories.length,
    pending: stories.filter((s) => s.status === "PENDING").length,
    approved: stories.filter((s) => s.status === "APPROVED").length,
    published: stories.filter((s) => s.status === "PUBLISHED").length,
  };

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
            Stories Management
          </h1>
          <p className="text-ink/70 mt-1">
            Review, approve, and publish community stories.
          </p>
        </div>
        <button className="btn-lift bg-navy text-white font-semibold px-6 py-3 rounded-input hover:bg-navy/90 transition-colors shadow-sm flex items-center gap-2 w-fit text-sm">
          <Download className="w-4 h-4" />
          Export Stories
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-navy" />
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
            <CheckCircle className="w-4 h-4 text-teal" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Approved</p>
          </div>
          <p className="font-display text-2xl font-bold text-teal">{stats.approved}</p>
        </div>
        <div className="bg-white rounded-card p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Send className="w-4 h-4 text-success" />
            <p className="text-ink/60 text-xs font-medium uppercase tracking-wider">Published</p>
          </div>
          <p className="font-display text-2xl font-bold text-success">{stats.published}</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-card p-4 border border-gray-100 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or author..."
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
            <option value="APPROVED">Approved</option>
            <option value="PUBLISHED">Published</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* STORIES TABLE */}
      {filteredStories.length > 0 ? (
        <div className="bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-cloud border-b border-gray-100 text-xs font-semibold text-ink/60 uppercase tracking-wider">
            <div className="col-span-5">Story</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Date</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredStories.map((story) => {
              const status = statusConfig[story.status] || statusConfig.PENDING;
              const StatusIcon = status.icon;

              return (
                <div key={story.id} className="px-6 py-5 hover:bg-cloud/30 transition-colors">
                  
                  {/* Desktop */}
                  <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-input overflow-hidden bg-navy/10 shrink-0">
                        <img
                          src={story.imageUrl || "https://placehold.co/100x100/0B468F/FFFFFF?text=Story"}
                          alt={story.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-navy text-sm truncate">{story.title}</p>
                        <p className="text-ink/50 text-xs truncate flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {story.isAnonymous ? "Anonymous" : (story.authorName || "Unknown")}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <span className="text-xs font-semibold text-navy bg-navy/10 px-2.5 py-1 rounded-full">
                        {story.category}
                      </span>
                    </div>

                    <div className="col-span-2">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>

                    <div className="col-span-1">
                      <p className="text-xs text-ink/60">
                        {new Date(story.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </div>

                    <div className="col-span-2 flex items-center justify-end">
                      <Link
                        href={`/admin/stories/${story.slug}`}
                        className="btn-lift bg-navy text-white font-semibold px-4 py-2 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-1.5 text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Review
                      </Link>
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="lg:hidden space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-input overflow-hidden bg-navy/10 shrink-0">
                        <img
                          src={story.imageUrl || "https://placehold.co/100x100/0B468F/FFFFFF?text=Story"}
                          alt={story.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-navy text-sm line-clamp-2">{story.title}</p>
                        <p className="text-ink/50 text-xs mt-1">
                          {story.isAnonymous ? "Anonymous" : (story.authorName || "Unknown")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-navy bg-navy/10 px-2.5 py-1 rounded-full">
                        {story.category}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <p className="text-xs text-ink/50">
                        {new Date(story.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      <Link
                        href={`/admin/stories/${story.slug}`}
                        className="btn-lift bg-navy text-white font-semibold px-4 py-2 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-1.5 text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Review
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-card p-12 text-center border border-gray-100">
          <div className="bg-cloud rounded-full p-6 w-fit mx-auto mb-4">
            <Inbox className="w-12 h-12 text-ink/30" />
          </div>
          <h3 className="font-display text-xl font-bold text-navy">No Stories Found</h3>
          <p className="text-ink/60 mt-2">Try adjusting your filters or search query.</p>
        </div>
      )}

    </div>
  );
}