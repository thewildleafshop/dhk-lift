"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft,
  BookOpen,
  User,
  Mail,
  Upload,
  CheckCircle,
  Shield,
  Send,
  AlertCircle,
  Image as ImageIcon,
  FileText,
  Heart,
} from "lucide-react";

export default function SubmitStoryPage() {
  const [formData, setFormData] = useState({
    storyType: "",
    program: "",
    name: "",
    email: "",
    anonymous: false,
    title: "",
    story: "",
    consent: false,
    image: null as File | null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-cloud">

      {/* ================= HERO ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-10 md:py-12 relative z-10">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Stories
          </Link>
          <div className="bg-gold/20 rounded-full p-3 w-fit mb-4">
            <BookOpen className="w-8 h-8 text-gold" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Share Your Story
          </h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            Your story can inspire others and show the real impact of our community.
          </p>
        </div>
      </section>

      {/* ================= FORM ================= */}
      <section className="max-w-container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">

          {submitted ? (
            /* ================= SUCCESS ================= */
            <div className="bg-white rounded-card p-8 md:p-12 shadow-sm border border-gray-100 text-center">
              <div className="bg-success/10 rounded-full p-6 w-fit mx-auto mb-6 animate-fade-in-up">
                <CheckCircle className="w-16 h-16 text-success" />
              </div>
              <h2 className="font-display text-3xl font-bold text-navy">
                Story Submitted!
              </h2>
              <p className="text-ink/70 mt-4 leading-relaxed max-w-lg mx-auto">
                Thank you for sharing your story. Our team will review it within 5-7 
                business days. If approved, we'll notify you via email before publishing.
              </p>

              <div className="bg-gold/5 border border-gold/20 rounded-card p-4 mt-8 max-w-md mx-auto">
                <AlertCircle className="w-5 h-5 text-gold mx-auto mb-2" />
                <p className="text-ink/80 text-sm">
                  Our team may edit your story for grammar and clarity. 
                  You'll have the chance to review before publishing.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <Link
                  href="/stories"
                  className="btn-lift bg-gold text-ink font-semibold px-6 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Browse Stories
                </Link>
                <Link
                  href="/dashboard"
                  className="btn-lift border-2 border-navy/20 text-navy font-semibold px-6 py-3.5 rounded-input hover:bg-navy/5 transition-colors flex items-center gap-2"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          ) : (
            /* ================= FORM ================= */
            <div className="bg-white rounded-card p-6 md:p-10 shadow-sm border border-gray-100">
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold text-navy">
                  Story Submission Form
                </h2>
                <p className="text-ink/70 mt-1">
                  All submissions are reviewed by our team before publishing.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Story Type */}
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Story Type *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: "beneficiary", label: "Beneficiary", icon: Heart },
                      { id: "donor", label: "Donor", icon: User },
                      { id: "volunteer", label: "Volunteer", icon: User },
                      { id: "partner", label: "Partner", icon: BookOpen },
                    ].map((type) => {
                      const Icon = type.icon;
                      const isSelected = formData.storyType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => handleChange("storyType", type.id)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-input border-2 transition-all ${
                            isSelected
                              ? "border-gold bg-gold/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${isSelected ? "text-gold" : "text-ink/60"}`} />
                          <span className={`text-xs font-medium ${isSelected ? "text-navy" : "text-ink/70"}`}>
                            {type.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Program */}
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Related Program (Optional)</label>
                  <select
                    value={formData.program}
                    onChange={(e) => handleChange("program", e.target.value)}
                    className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                  >
                    <option value="">Select program</option>
                    <option>LIFT Health</option>
                    <option>LIFT Protect</option>
                    <option>LIFT Ability</option>
                    <option>LIFT Community</option>
                    <option>Children & Families</option>
                    <option>Food Security</option>
                    <option>Education Support</option>
                  </select>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-display font-bold text-navy text-base mb-4">
                    About You
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Your Name *</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          required
                          placeholder="Your full name"
                          disabled={formData.anonymous}
                          className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm disabled:bg-gray-50 disabled:text-ink/40"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          required
                          placeholder="you@example.com"
                          className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Anonymous Toggle */}
                  <label className="flex items-start gap-3 mt-4 cursor-pointer p-4 bg-cloud rounded-input">
                    <input
                      type="checkbox"
                      checked={formData.anonymous}
                      onChange={(e) => handleChange("anonymous", e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-gold"
                    />
                    <div>
                      <p className="font-semibold text-navy text-sm">Publish Anonymously</p>
                      <p className="text-ink/60 text-xs mt-0.5">
                        Your name won't be shown publicly. Only our team will know your identity.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Story Content */}
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <h3 className="font-display font-bold text-navy text-base">
                    Your Story
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Story Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      required
                      placeholder="A short, meaningful title for your story"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Your Story *</label>
                    <textarea
                      value={formData.story}
                      onChange={(e) => handleChange("story", e.target.value)}
                      required
                      rows={10}
                      placeholder="Share your experience in detail. What happened? How did DHK LIFT help? What has changed?"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none"
                    />
                    <p className="text-ink/50 text-xs mt-1">
                      {formData.story.length} characters • Minimum 200 characters recommended
                    </p>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-display font-bold text-navy text-base mb-4">
                    Optional Image
                  </h3>
                  <div className="border-2 border-dashed border-gray-200 rounded-input p-6 hover:border-gold transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-navy/5 rounded-full p-3 shrink-0">
                        <ImageIcon className="w-6 h-6 text-navy" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-navy text-sm">
                          Upload a photo (optional)
                        </p>
                        <p className="text-ink/60 text-xs mt-1">JPG, PNG • Max 5MB</p>
                      </div>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleChange("image", e.target.files?.[0] || null)}
                        className="hidden"
                        id="story-image"
                      />
                      <label
                        htmlFor="story-image"
                        className="btn-lift bg-navy text-white font-semibold px-4 py-2 rounded-input hover:bg-navy/90 transition-colors cursor-pointer text-sm"
                      >
                        Upload
                      </label>
                    </div>
                    {formData.image && (
                      <div className="flex items-center gap-2 mt-3 p-2 bg-success/5 rounded-input">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-xs text-success font-medium">{formData.image.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Consent */}
                <div className="pt-4 border-t border-gray-100">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => handleChange("consent", e.target.checked)}
                      required
                      className="mt-0.5 w-4 h-4 accent-gold"
                    />
                    <span className="text-sm text-ink/80">
                      I consent to DHK LIFT reviewing, editing, and publishing my story on 
                      their platform and social media. I confirm that all information is 
                      true and accurate. *
                    </span>
                  </label>
                </div>

                {/* Security Note */}
                <div className="flex items-start gap-3 p-4 bg-info/5 border border-info/20 rounded-input">
                  <Shield className="w-5 h-5 text-info mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-navy text-sm">Your privacy is protected</p>
                    <p className="text-ink/70 text-xs mt-1">
                      Your email will never be published. For LIFT Protect stories, 
                      additional confidentiality measures apply.
                    </p>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.consent}
                    className="btn-lift bg-gold text-ink font-semibold px-8 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Story
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}