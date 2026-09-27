"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Calendar,
  Clock,
  Heart,
  Share2,
  Quote,
  Tag,
  Users,
  Loader2,
  FileText,
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

// ============ CATEGORY COLOR ============
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

export default function StoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [story, setStory] = useState<Story | null>(null);
  const [relatedStories, setRelatedStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`/api/stories/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setStory(data);

          // Fetch related stories (same category, exclude current)
          const relatedRes = await fetch(`/api/stories`);
          if (relatedRes.ok) {
            const allStories = await relatedRes.json();
            const related = allStories
              .filter((s: Story) => s.slug !== slug && s.category === data.category)
              .slice(0, 2);
            setRelatedStories(related);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cloud">
        <Loader2 className="w-10 h-10 text-navy animate-spin" />
      </div>
    );
  }

    if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cloud px-6">
        <div className="bg-white rounded-card p-12 text-center border border-gray-100 max-w-md w-full">
          <div className="bg-error/10 rounded-full p-6 w-fit mx-auto mb-4">
            <FileText className="w-12 h-12 text-error" />
          </div>
          <h1 className="font-display text-2xl font-bold text-navy mb-2">Story Not Found</h1>
          <p className="text-ink/60 mb-6">
            The story you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/stories"
            className="btn-lift inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  const catColors = getCategoryColor(story.category);
  const displayName = story.isAnonymous ? "Anonymous" : (story.authorName || "DHK LIFT");
  const paragraphs = story.content.split("\n\n").filter((p) => p.trim());

  return (
    <main className="min-h-screen bg-cloud">

      {/* HERO SECTION */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-12 md:py-16 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-sm mb-6 flex-wrap">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/stories" className="hover:text-gold transition-colors">Stories</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold truncate">{story.title}</span>
          </div>

          <div className="max-w-3xl">
            <span className={`${catColors.bg} text-xs font-semibold ${catColors.color} px-3 py-1.5 rounded-full`}>
              {story.category}
            </span>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mt-4">
              {story.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium text-white">{displayName}</span>
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(story.publishedAt || story.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {Math.ceil(story.content.split(" ").length / 200)} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-container mx-auto px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* LEFT: ARTICLE */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Featured Image */}
            <div className="relative h-[300px] md:h-[450px] rounded-card overflow-hidden shadow-xl bg-navy/10">
              <img
                src={story.imageUrl || "https://placehold.co/800x600/0B468F/FFFFFF?text=Story"}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <article className="bg-white rounded-card p-6 md:p-10 shadow-sm border border-gray-100">
              <div className="prose prose-lg max-w-none">
                {paragraphs.map((paragraph, i) => (
                  <p key={i} className="text-ink/80 leading-relaxed mb-6 text-base md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Share Row */}
              <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-ink/40" />
                  <span className="text-sm text-ink/60">Share this story</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-navy/5 hover:bg-navy/10 text-navy rounded-full transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-3 bg-gold/10 hover:bg-gold/20 text-gold rounded-full transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* RIGHT: SIDEBAR */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Author Card */}
            <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
              <h3 className="font-display font-bold text-navy text-base mb-4">
                About the Author
              </h3>
              <div className="flex items-center gap-3">
                <div className="bg-gold rounded-full w-14 h-14 flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-ink text-xl">
                    {displayName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">{displayName}</p>
                  <p className="text-ink/60 text-xs">DHK LIFT Community Member</p>
                </div>
              </div>
            </div>

            {/* Related Program */}
            {story.program && (
              <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
                <h3 className="font-display font-bold text-navy text-base mb-4">
                  Related Program
                </h3>
                <Link
                  href={`/programs/${story.program.slug}`}
                  className="flex items-center gap-3 p-3 bg-cloud rounded-input hover:bg-navy/5 transition-colors group"
                >
                  <div className="bg-gold/10 rounded-full p-2.5 shrink-0">
                    <Users className="w-4 h-4 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy text-sm truncate">{story.program.name}</p>
                    <p className="text-ink/60 text-xs">View program details</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-ink/40 group-hover:text-gold transition-colors shrink-0" />
                </Link>
              </div>
            )}

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-purple to-purple/90 rounded-card p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <Heart className="w-8 h-8 text-gold mb-3" />
                <h3 className="font-display font-bold text-lg">
                  Create the Next Story
                </h3>
                <p className="text-white/80 text-sm mt-2 leading-relaxed">
                  Your donation can change a life. Be part of the next story of hope.
                </p>
                <Link
                  href="/giving"
                  className="btn-lift inline-flex items-center gap-2 bg-gold text-ink font-semibold px-5 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg mt-4 text-sm"
                >
                  Donate Now
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Related Stories */}
            {relatedStories.length > 0 && (
              <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
                <h3 className="font-display font-bold text-navy text-base mb-4">
                  Related Stories
                </h3>
                <div className="space-y-4">
                  {relatedStories.map((rel) => {
                    const relColors = getCategoryColor(rel.category);
                    return (
                      <Link
                        key={rel.slug}
                        href={`/stories/${rel.slug}`}
                        className="flex items-start gap-3 group"
                      >
                        <div className="relative w-16 h-16 rounded-input overflow-hidden shrink-0 bg-navy/10">
                          <img
                            src={rel.imageUrl || "https://placehold.co/100x100/0B468F/FFFFFF?text=Story"}
                            alt={rel.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-navy text-sm line-clamp-2 group-hover:text-gold transition-colors">
                            {rel.title}
                          </p>
                          <p className={`text-xs mt-1 ${relColors.color}`}>
                            {rel.category}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BACK TO STORIES */}
        <div className="mt-12 text-center">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-ink/60 hover:text-navy font-medium transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to All Stories
          </Link>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-navy text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Every Story Starts With a Gift
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Your generosity can write the next chapter of hope. Be part of the story.
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
              href="/stories/submit"
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              Share Your Story
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}