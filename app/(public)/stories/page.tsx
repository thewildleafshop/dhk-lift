"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Search,
  ChevronRight,
  Heart,
  User,
  Quote,
  BookOpen,
  Users,
  Filter,
  Star,
  Clock,
  Loader2,
  Inbox,
} from "lucide-react";

// ============ TYPES ============
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
  program: { id: string; name: string; slug: string } | null;
  project: { id: string; title: string; slug: string } | null;
  publishedAt: string | null;
  createdAt: string;
}

// ============ CATEGORY COLOR MAPPING ============
const getCategoryColor = (category: string) => {
  const map: Record<string, { color: string; bg: string }> = {
    "Water & Sanitation": { color: "text-teal", bg: "bg-teal/10" },
    "Disability Support": { color: "text-purple", bg: "bg-purple/10" },
    "Healthcare": { color: "text-teal", bg: "bg-teal/10" },
    "Education": { color: "text-gold", bg: "bg-gold/10" },
    "Food Security": { color: "text-gold", bg: "bg-gold/10" },
    "Community Development": { color: "text-navy", bg: "bg-navy/10" },
    "Emergency Relief": { color: "text-error", bg: "bg-error/10" },
    "Protection": { color: "text-purple", bg: "bg-purple/10" },
    "Family Support": { color: "text-navy", bg: "bg-navy/10" },
  };
  return map[category] || { color: "text-navy", bg: "bg-navy/10" };
};

// ============ MAIN COMPONENT ============
export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  useEffect(() => {
    async function fetchStories() {
      try {
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

  // Get unique categories from stories
  const categories = ["ALL", ...Array.from(new Set(stories.map((s) => s.category)))];

  // Filter stories
  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (story.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (story.authorName || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "ALL" || story.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Featured = first 2 stories, Rest = remaining
  const featuredStories = filteredStories.slice(0, 2);
  const regularStories = filteredStories.slice(2);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cloud">
        <Loader2 className="w-10 h-10 text-navy animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-cloud">

      {/* HERO SECTION */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-container mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <div className="bg-gold/20 rounded-full p-4 w-fit mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-gold" />
          </div>
          <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm">
            Stories of Hope
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4">
            Real People. <br />
            <span className="text-gold">Real Impact.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed">
            Every donation creates a story. Every story changes a life. 
            Read the stories of hope from our global community.
          </p>

          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories by title, author..."
                className="w-full pl-14 pr-4 py-4 md:py-5 rounded-input border-0 bg-white text-ink placeholder:text-ink/40 focus:outline-none focus:ring-4 focus:ring-gold/30 shadow-2xl text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-navy">{stories.length}+</p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Stories Shared</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-navy">50,000+</p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Lives Touched</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-navy">25+</p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Countries</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-navy">100%</p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="max-w-container mx-auto px-6 py-8">
        <div className="bg-white rounded-card p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-4 h-4 text-ink/40 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  categoryFilter === cat
                    ? "bg-navy text-white"
                    : "bg-cloud text-ink/70 hover:bg-navy/5 hover:text-navy"
                }`}
              >
                {cat === "ALL" ? "All Stories" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* NO STORIES */}
      {filteredStories.length === 0 && (
        <section className="max-w-container mx-auto px-6 pb-16">
          <div className="bg-white rounded-card p-12 text-center border border-gray-100">
            <div className="bg-cloud rounded-full p-6 w-fit mx-auto mb-4">
              <Inbox className="w-12 h-12 text-ink/30" />
            </div>
            <h3 className="font-display text-xl font-bold text-navy">No Stories Found</h3>
            <p className="text-ink/60 mt-2">Try adjusting your search or category filter.</p>
          </div>
        </section>
      )}

      {/* FEATURED STORIES */}
      {featuredStories.length > 0 && (
        <section className="max-w-container mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-gold" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy">
              Featured Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredStories.map((story) => {
              const catColors = getCategoryColor(story.category);
              const displayName = story.isAnonymous ? "Anonymous" : (story.authorName || "DHK LIFT");
              return (
                <Link
                  key={story.id}
                  href={`/stories/${story.slug}`}
                  className="card-hover bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden group"
                >
                  <div className="relative h-64 md:h-72 overflow-hidden bg-navy/10">
                    <img
                      src={story.imageUrl || "https://placehold.co/800x600/0B468F/FFFFFF?text=Story"}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`${catColors.bg} backdrop-blur-sm text-xs font-semibold ${catColors.color} px-3 py-1.5 rounded-full`}>
                        {story.category}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-display text-2xl font-bold text-white">
                        {story.title}
                      </h3>
                      <p className="text-white/80 text-sm mt-2 line-clamp-2">
                        {story.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mt-4 text-xs text-white/70">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {displayName}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(story.publishedAt || story.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ALL STORIES */}
      {regularStories.length > 0 && (
        <section className="max-w-container mx-auto px-6 pb-16 md:pb-24">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-navy" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy">
              More Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularStories.map((story) => {
              const catColors = getCategoryColor(story.category);
              const displayName = story.isAnonymous ? "Anonymous" : (story.authorName || "DHK LIFT");
              return (
                <Link
                  key={story.id}
                  href={`/stories/${story.slug}`}
                  className="card-hover bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden bg-navy/10">
                    <img
                      src={story.imageUrl || "https://placehold.co/800x600/0B468F/FFFFFF?text=Story"}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`${catColors.bg} backdrop-blur-sm text-xs font-semibold ${catColors.color} px-3 py-1.5 rounded-full`}>
                        {story.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-navy text-lg line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-ink/70 text-sm mt-3 leading-relaxed flex-1 line-clamp-3">
                      {story.excerpt}
                    </p>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-ink/60">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span className="truncate">{displayName}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3" />
                        {new Date(story.publishedAt || story.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                    </div>

                    <div className="mt-3 text-gold font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Full Story
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* SUBMIT YOUR STORY CTA */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="bg-gradient-to-br from-purple to-purple/90 rounded-card p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <Quote className="w-10 h-10 text-gold mb-4" />
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Share Your Story
                </h2>
                <p className="text-white/80 mt-4 leading-relaxed">
                  Have you been helped by DHK LIFT? Or has your donation created 
                  a story worth sharing? We'd love to hear from you.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/stories/submit"
                    className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    Submit Your Story
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-navy text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Be Part of the Next Story
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Your donation can create the next story of hope. Every contribution matters.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/giving"
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Donate Now
            </Link>
            <Link
              href="/assistance/apply"
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Users className="w-5 h-5" />
              Apply for Assistance
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}