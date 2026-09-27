"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  BookOpen,
  User,
  FileText,
  Tag,
  Image as ImageIcon,
  CheckCircle,
  Send,
  Loader2,
  Shield,
  Lock,
} from "lucide-react";

// ============ CATEGORIES ============
const categories = [
  "Water & Sanitation",
  "Healthcare",
  "Disability Support",
  "Education",
  "Food Security",
  "Community Development",
  "Emergency Relief",
  "Protection",
  "Family Support",
];

// ============ TYPES ============
type FormData = {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  authorName: string;
  isAnonymous: boolean;
  imageUrl: string;
  consent: boolean;
};

export default function SubmitStoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    authorName: "",
    isAnonymous: false,
    imageUrl: "",
    consent: false,
  });

  const updateField = (field: keyof FormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          category: formData.category,
          authorName: formData.isAnonymous ? "Anonymous" : formData.authorName,
          isAnonymous: formData.isAnonymous,
          imageUrl: formData.imageUrl || null,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to submit story");
      }

      router.push("/stories/submit/success");
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const isValid = formData.title && formData.content && formData.category && formData.consent;

  return (
    <main className="min-h-screen bg-cloud">

      {/* HERO */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-12 md:py-16 relative z-10">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Stories
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gold/20 rounded-full p-2.5">
              <BookOpen className="w-6 h-6 text-gold" />
            </div>
            <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
              Share Your Story
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Tell Us Your Story
          </h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            Your story can inspire others and show the real impact of generosity. 
            All stories are reviewed before publishing.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="max-w-container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-card p-6 md:p-10 shadow-sm border border-gray-100 space-y-6">

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                Story Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="e.g., Clean Water Changed My Village"
                required
                className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                Category *
              </label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                <select
                  value={formData.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm appearance-none cursor-pointer"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                Short Summary (Optional)
              </label>
              <input
                type="text"
                value={formData.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                placeholder="A one-line summary of your story"
                className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
              />
              <p className="text-xs text-ink/50 mt-1">Max 150 characters. If empty, we'll use the first 150 characters of your story.</p>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                Your Story *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => updateField("content", e.target.value)}
                rows={10}
                required
                placeholder="Share your story here. Be as detailed as you like. What happened? How did DHK LIFT help? What changed?"
                className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none"
              />
            </div>

            {/* Author Name */}
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={formData.authorName}
                onChange={(e) => updateField("authorName", e.target.value)}
                disabled={formData.isAnonymous}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm disabled:bg-cloud disabled:text-ink/50"
              />
              <label className="flex items-center gap-2 mt-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isAnonymous}
                  onChange={(e) => updateField("isAnonymous", e.target.checked)}
                  className="w-4 h-4 accent-gold"
                />
                <span className="text-sm text-ink/70">Publish my story anonymously</span>
              </label>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                Image URL (Optional)
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => updateField("imageUrl", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                />
              </div>
              <p className="text-xs text-ink/50 mt-1">Leave empty for a default image.</p>
            </div>

            {/* Consent */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => updateField("consent", e.target.checked)}
                  className="mt-1 w-4 h-4 accent-gold"
                  required
                />
                <span className="text-sm text-ink/80">
                  I confirm that this story is true and accurate to the best of my knowledge. 
                  I consent to DHK LIFT reviewing and publishing it. *
                </span>
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-input">
                <p className="text-error text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Info */}
            <div className="flex items-start gap-3 p-4 bg-info/5 border border-info/20 rounded-input">
              <Shield className="w-5 h-5 text-info mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-navy text-sm">Your privacy is protected</p>
                <p className="text-ink/70 text-xs mt-1">
                  All stories are reviewed by our team before publishing. If you choose to publish anonymously, 
                  your name will never be shown publicly.
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-100">
              <Link
                href="/stories"
                className="text-ink/60 hover:text-navy font-medium transition-colors text-sm"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="btn-lift bg-gold text-ink font-semibold px-8 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                ) : (
                  <><Send className="w-5 h-5" /> Submit Story</>
                )}
              </button>
            </div>
          </form>

          {/* Help Box */}
          <div className="mt-6 bg-info/5 border border-info/20 rounded-card p-4 flex items-start gap-3">
            <Lock className="w-5 h-5 text-info mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-navy text-sm">Need Help?</p>
              <p className="text-ink/70 text-xs mt-1">
                Contact us at stories@dhklift.org if you have any questions.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}