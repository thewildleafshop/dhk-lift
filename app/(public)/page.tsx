"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Heart,
  HandHeart,
  ChevronRight,
  Users,
  Globe,
  CheckCircle,
  Accessibility,
  Loader2,
} from "lucide-react";

export default function HomePage() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // ✅ Stats State (Database se aayega)
  const [stats, setStats] = useState({
    familiesHelped: 10000,
    communitiesSupported: 50,
    keyPrograms: 7,
    equipmentDelivered: 3500,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  // ✅ Featured Programs State
  const [featuredPrograms, setFeaturedPrograms] = useState<any[]>([]);
  const [programsLoading, setProgramsLoading] = useState(true);

  // ✅ Featured Stories State
  const [featuredStories, setFeaturedStories] = useState<any[]>([]);
  const [storiesLoading, setStoriesLoading] = useState(true);

  // ✅ Fetch Stats
  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setStatsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
        setStatsLoading(false);
      });
  }, []);

  // ✅ Fetch Featured Programs
  useEffect(() => {
    fetch("/api/programs")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedPrograms(data.slice(0, 4));
        setProgramsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching programs:", err);
        setProgramsLoading(false);
      });
  }, []);

  // ✅ Fetch Featured Stories
  useEffect(() => {
    fetch("/api/stories")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedStories(data.slice(0, 3));
        setStoriesLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stories:", err);
        setStoriesLoading(false);
      });
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setNewsletterStatus("error");
      return;
    }

    setNewsletterStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (res.ok) {
        setNewsletterStatus("success");
        setNewsletterEmail("");
      } else {
        setNewsletterStatus("error");
      }
    } catch (error) {
      setNewsletterStatus("error");
    }
  };

  // Program images mapping
  const programImages: Record<string, string> = {
    "Food Security": "/images/programs/foodDonation.png",
    "Education Support": "/images/programs/education.png",
    "LIFT Health": "/images/programs/healthcare.png",
    "Disaster Relief": "/images/programs/disasterRelief.png",
    "LIFT Ability": "/images/programs/wheelchair.png",
    "Children & Families": "/images/programs/familu.png",
    "LIFT Community": "/images/programs/communityVolunteers.png",
    "LIFT Protect": "/images/programs/educationChildren.png",
  };

  return (
    <main className="min-h-screen bg-cloud">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-container mx-auto px-6 py-16 md:py-24 lg:py-32 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 text-center lg:text-left animate-slide-in-left">
            <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm">
              Together for a Brighter Tomorrow
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Real Help. <br />
              <span className="text-gradient-gold">Lasting Change.</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              DHK LIFT is a humanitarian platform connecting kind hearts with real needs.
              Your support empowers families, builds communities, and creates a better future.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4 pt-4 justify-center lg:justify-start">
              <Link
                href="/giving"
                className="btn-lift bg-gold text-ink font-semibold px-6 md:px-8 py-3.5 md:py-4 rounded-input hover:bg-gold/90 transition-colors flex items-center gap-2 shadow-lg text-sm md:text-base"
              >
                <Heart className="w-5 h-5" />
                Donate Now
              </Link>
              <Link
                href="/assistance"
                className="btn-lift bg-purple text-white font-semibold px-6 md:px-8 py-3.5 md:py-4 rounded-input hover:bg-purple/90 transition-colors flex items-center gap-2 shadow-lg text-sm md:text-base"
              >
                <HandHeart className="w-5 h-5" />
                Apply for Assistance
              </Link>
            </div>
          </div>

          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-card overflow-hidden shadow-2xl animate-fade-in delay-300">
            <Image
              src="/images/hero/salah-darwish-us-R2Rdew7E-unsplash.jpg"
              alt="Smiling child holding a book"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white/95 backdrop-blur-sm p-3 md:p-4 rounded-card shadow-lg max-w-[180px] md:max-w-[200px] z-10 animate-float">
              <p className="text-ink text-xs md:text-sm font-semibold">
                "Small contributions. Big dreams."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PROGRAMS SECTION ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="text-center md:text-left">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Featured Programs
            </h2>
            <p className="text-ink/70 mt-2">
              Explore our key initiatives and be part of the change.
            </p>
          </div>
          <Link
            href="/programs"
            className="hidden md:flex items-center gap-1 text-navy font-semibold hover:text-gold transition-colors"
          >
            View All Programs
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {programsLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 text-navy animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPrograms.map((program) => (
              <div
                key={program.id}
                className="card-hover bg-white rounded-card shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="overflow-hidden">
                  <img
                    src={programImages[program.name] || "/images/programs/foodDonation.png"}
                    alt={program.name}
                    className="w-full h-40 object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-navy text-lg">
                    {program.name}
                  </h3>
                  <p className="text-ink/70 text-sm mt-2 line-clamp-2">
                    {program.description}
                  </p>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="inline-flex items-center gap-1 text-gold font-semibold text-sm mt-4 hover:gap-2 transition-all"
                  >
                    Learn More <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1 text-navy font-semibold hover:text-gold transition-colors"
          >
            View All Programs
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ================= IMPACT STATS SECTION ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-12 md:py-16">
          {statsLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 text-navy animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="animate-fade-in-up">
                <p className="font-display text-4xl md:text-5xl font-bold text-navy">
                  {stats.familiesHelped.toLocaleString()}+
                </p>
                <p className="text-ink/70 mt-2">Families Helped</p>
              </div>
              <div className="animate-fade-in-up delay-100">
                <p className="font-display text-4xl md:text-5xl font-bold text-navy">
                  {stats.communitiesSupported}+
                </p>
                <p className="text-ink/70 mt-2">Communities Supported</p>
              </div>
              <div className="animate-fade-in-up delay-200">
                <p className="font-display text-4xl md:text-5xl font-bold text-navy">
                  {stats.keyPrograms}
                </p>
                <p className="text-ink/70 mt-2">Key Programs</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= MEDICAL EQUIPMENT SECTION ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-teal/10 rounded-full p-3 w-fit mb-4">
                <Accessibility className="w-7 h-7 text-teal" />
              </div>
              <p className="text-gold font-semibold tracking-wider uppercase text-xs">
                Medical Equipment
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-3">
                Equipment That <br />
                <span className="text-teal">Restores Independence.</span>
              </h2>
              <p className="text-ink/70 mt-4 leading-relaxed">
                From wheelchairs to oxygen concentrators, we provide essential medical
                equipment to those who need it most — completely free of cost.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Verified suppliers and free delivery",
                  "Wheelchairs, walkers, and mobility aids",
                  "Home medical equipment and respiratory devices",
                  "Full follow-up support and maintenance",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
                    <span className="text-ink/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/equipment"
                  className="btn-lift bg-gold text-ink font-semibold px-6 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 text-sm"
                >
                  <Accessibility className="w-4 h-4" />
                  Browse Equipment
                </Link>
                <Link
                  href="/equipment/request"
                  className="btn-lift border-2 border-navy/20 text-navy font-semibold px-6 py-3.5 rounded-input hover:bg-navy/5 transition-colors flex items-center gap-2 text-sm"
                >
                  Request Equipment
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-navy to-navy/90 rounded-card p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                  <Accessibility className="w-10 h-10 text-gold mb-4" />
                  <h3 className="font-display text-2xl font-bold">
                    {stats.equipmentDelivered.toLocaleString()}+ Equipment Delivered
                  </h3>
                  <p className="text-white/70 mt-3 text-sm leading-relaxed">
                    Across 40+ countries, we've provided life-changing equipment
                    to people with disabilities and medical needs.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20">
                    <div>
                      <p className="font-display text-2xl font-bold text-gold">800+</p>
                      <p className="text-white/60 text-xs mt-1">Wheelchairs</p>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-bold text-gold">500+</p>
                      <p className="text-white/60 text-xs mt-1">Mobility Aids</p>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-bold text-gold">200+</p>
                      <p className="text-white/60 text-xs mt-1">Oxygen Units</p>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-bold text-gold">40+</p>
                      <p className="text-white/60 text-xs mt-1">Countries</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STORIES SECTION ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="text-center md:text-left">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Stories of Hope
            </h2>
            <p className="text-ink/70 mt-2">
              Real people. Real impact. See how your support is changing lives around the world.
            </p>
          </div>
          <Link
            href="/stories"
            className="hidden md:flex items-center gap-1 text-navy font-semibold hover:text-gold transition-colors shrink-0"
          >
            View All Stories
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {storiesLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 text-navy animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredStories.map((story) => {
              const categoryColors: Record<string, string> = {
                Education: "text-teal bg-teal/10",
                Healthcare: "text-purple bg-purple/10",
                "Food Security": "text-gold bg-gold/10",
                "Water & Sanitation": "text-info bg-info/10",
                "Disability Support": "text-navy bg-navy/10",
              };
              const colorClass = categoryColors[story.category] || "text-teal bg-teal/10";

              return (
                <div
                  key={story.id}
                  className="card-hover bg-white rounded-card shadow-sm overflow-hidden border border-gray-100"
                >
                  <div className="overflow-hidden">
                    <img
                      src={story.imageUrl || "/images/stories/volunteer.png"}
                      alt={story.title}
                      className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colorClass}`}>
                      {story.category}
                    </span>
                    <h3 className="font-display font-bold text-navy text-lg mt-3">
                      {story.title}
                    </h3>
                    <p className="text-ink/70 text-sm mt-2 line-clamp-3">
                      {story.excerpt || story.content?.slice(0, 100)}
                    </p>
                    <Link
                      href={`/stories/${story.slug}`}
                      className="inline-flex items-center gap-1 text-navy font-semibold text-sm mt-4 hover:text-gold transition-colors"
                    >
                      Read Story <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/stories"
            className="inline-flex items-center gap-1 text-navy font-semibold hover:text-gold transition-colors"
          >
            View All Stories
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ================= MEMBERSHIP CTA ================= */}
      <section className="bg-purple text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Become a Member. <br />
              <span className="text-gold">Multiply Your Impact.</span>
            </h2>
            <p className="text-white/80 mt-4 max-w-lg leading-relaxed">
              Join a community of change-makers. Get exclusive benefits, track your impact,
              and access partner deals — all while supporting causes you care about.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/membership"
                className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                Join Membership
              </Link>
              <Link
                href="/membership/benefits"
                className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                View Benefits
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-card p-8 border border-white/20">
              <div className="space-y-4">
                {[
                  "Exclusive partner deals & vouchers",
                  "Track your lifetime giving impact",
                  "Priority access to events & experiences",
                  "QR-based instant redemption",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-gold rounded-full p-2 shrink-0">
                      <CheckCircle className="w-5 h-5 text-ink" />
                    </div>
                    <p className="text-white/90">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GLOBAL PARTNERSHIPS ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-navy/5 rounded-card p-8 border border-navy/10">
              <Globe className="w-12 h-12 text-navy mb-4" />
              <h3 className="font-display text-2xl font-bold text-navy">Global Partnerships</h3>
              <p className="text-ink/70 mt-3 leading-relaxed">
                We collaborate with verified NGOs, healthcare providers, and community organizations
                across the globe to deliver aid where it's needed most.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white rounded-card p-4 text-center shadow-sm">
                  <p className="font-display text-2xl font-bold text-navy">
                    {stats.communitiesSupported}+
                  </p>
                  <p className="text-ink/60 text-xs mt-1">Countries</p>
                </div>
                <div className="bg-white rounded-card p-4 text-center shadow-sm">
                  <p className="font-display text-2xl font-bold text-navy">80+</p>
                  <p className="text-ink/60 text-xs mt-1">Verified Partners</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Partner With Us. <br />
              <span className="text-teal">Scale Your Impact.</span>
            </h2>
            <p className="text-ink/70 mt-4 leading-relaxed">
              Are you an NGO, healthcare provider, or community organization? Join our network
              to receive funding, resources, and operational support for your projects.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Verified partner status builds donor trust",
                "Submit projects and track funding in real-time",
                "Upload proof of progress and impact reports",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
                  <span className="text-ink/80">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/partnerships"
              className="btn-lift inline-flex items-center gap-2 bg-navy text-white font-semibold px-8 py-4 rounded-input mt-6 hover:bg-navy/90 transition-colors shadow-lg"
            >
              <Globe className="w-5 h-5" />
              Apply as Partner
            </Link>
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="bg-cloud border-t border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy">
            Stay Connected
          </h2>
          <p className="text-ink/70 mt-3 max-w-xl mx-auto">
            Get updates on projects, impact stories, and ways to help — straight to your inbox.
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 rounded-input border border-gray-200 bg-white text-ink focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
              disabled={newsletterStatus === "loading"}
            />
            <button
              type="submit"
              disabled={newsletterStatus === "loading"}
              className="btn-lift bg-navy text-white font-semibold px-8 py-4 rounded-input hover:bg-navy/90 transition-colors shadow-lg disabled:opacity-50"
            >
              {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {newsletterStatus === "success" && (
            <p className="text-success text-sm mt-4 font-medium">
              ✅ Thank you for subscribing!
            </p>
          )}
          {newsletterStatus === "error" && (
            <p className="text-error text-sm mt-4 font-medium">
              ❌ Please enter a valid email address.
            </p>
          )}
          <p className="text-ink/50 text-xs mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-navy text-white">
        <div className="max-w-container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
            <div>
              <h3 className="font-display text-2xl font-bold">DHK LIFT</h3>
              <p className="text-white/60 text-sm mt-3 leading-relaxed">
                A global humanitarian platform connecting kind hearts with real needs.
              </p>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-4">Platform</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="/assistance" className="hover:text-gold transition-colors">Assistance</Link></li>
                <li><Link href="/equipment" className="hover:text-gold transition-colors">Medical Equipment</Link></li>
                <li><Link href="/giving" className="hover:text-gold transition-colors">Giving</Link></li>
                <li><Link href="/membership" className="hover:text-gold transition-colors">Membership</Link></li>
                <li><Link href="/partnerships" className="hover:text-gold transition-colors">Global Partnerships</Link></li>
                <li><Link href="/projects" className="hover:text-gold transition-colors">Projects</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-4">Organization</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="/about" className="hover:text-gold transition-colors">About Us</Link></li>
                <li><Link href="/transparency" className="hover:text-gold transition-colors">Transparency</Link></li>
                <li><Link href="/stories" className="hover:text-gold transition-colors">Stories</Link></li>
                <li><Link href="/faq" className="hover:text-gold transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-4">For Partners</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="/partnerships" className="hover:text-gold transition-colors">Global Partnerships</Link></li>
                <li><Link href="/partnerships/apply" className="hover:text-gold transition-colors">Become a Partner</Link></li>
                <li><Link href="/healthcare/providers/register" className="hover:text-gold transition-colors">Healthcare Providers</Link></li>
                <li><Link href="/healthcare/pharmacies/register" className="hover:text-gold transition-colors">Pharmacy Registration</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link></li>
                <li><Link href="/accessibility" className="hover:text-gold transition-colors">Accessibility</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} DHK LIFT. All rights reserved.
            </p>
            <p className="text-white/50 text-sm flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-gold" /> for humanity
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}