"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Heart,
  ChevronRight,
  Utensils,
  BookOpen,
  Stethoscope,
  Home,
  HeartHandshake,
  Accessibility,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Loader2,
} from "lucide-react";

// Icon mapping (database se icon nahi aata, isliye manually map karenge)
const iconMap: Record<string, any> = {
  "Where Needed Most": Zap,
  "LIFT Health": Stethoscope,
  "LIFT Protect": HeartHandshake,
  "LIFT Ability": Accessibility,
  "LIFT Community": Users,
  "Children & Families": Home,
  "Food Security": Utensils,
  "Education Support": BookOpen,
  "Disaster Relief": Home,
  "Cancer Care Fund": Heart,
  "Heart Disease Fund": Heart,
  "Kidney Dialysis Fund": Stethoscope,
  "Diabetes Care Fund": Stethoscope,
  "Thalassemia Fund": Heart,
  "Mental Health Fund": Heart,
  "Disability Support Fund": Accessibility,
  "Emergency Medical Fund": Zap,
  "Maternal Health Fund": Heart,
  "Kidney Disease Fund": Stethoscope,
  "Rare Disease Fund": Heart,
  "Children Health Fund": Heart,
};

const colorMap: Record<string, { color: string; bgColor: string }> = {
  "Where Needed Most": { color: "text-gold", bgColor: "bg-gold/10" },
  "LIFT Health": { color: "text-teal", bgColor: "bg-teal/10" },
  "LIFT Protect": { color: "text-purple", bgColor: "bg-purple/10" },
  "LIFT Ability": { color: "text-navy", bgColor: "bg-navy/10" },
  "LIFT Community": { color: "text-gold", bgColor: "bg-gold/10" },
  "Children & Families": { color: "text-purple", bgColor: "bg-purple/10" },
  "Food Security": { color: "text-gold", bgColor: "bg-gold/10" },
  "Education Support": { color: "text-teal", bgColor: "bg-teal/10" },
  "Disaster Relief": { color: "text-navy", bgColor: "bg-navy/10" },
  "Cancer Care Fund": { color: "text-purple", bgColor: "bg-purple/10" },
  "Heart Disease Fund": { color: "text-error", bgColor: "bg-error/10" },
  "Kidney Dialysis Fund": { color: "text-teal", bgColor: "bg-teal/10" },
  "Diabetes Care Fund": { color: "text-gold", bgColor: "bg-gold/10" },
  "Thalassemia Fund": { color: "text-purple", bgColor: "bg-purple/10" },
  "Mental Health Fund": { color: "text-info", bgColor: "bg-info/10" },
  "Disability Support Fund": { color: "text-navy", bgColor: "bg-navy/10" },
  "Emergency Medical Fund": { color: "text-error", bgColor: "bg-error/10" },
  "Maternal Health Fund": { color: "text-purple", bgColor: "bg-purple/10" },
  "Kidney Disease Fund": { color: "text-teal", bgColor: "bg-teal/10" },
  "Rare Disease Fund": { color: "text-purple", bgColor: "bg-purple/10" },
  "Children Health Fund": { color: "text-gold", bgColor: "bg-gold/10" },
};

// Image mapping
const imageMap: Record<string, string> = {
  "Where Needed Most": "/images/programs/communityVolunteers.png",
  "LIFT Health": "/images/programs/healthcare.png",
  "LIFT Protect": "/images/programs/familu.png",
  "LIFT Ability": "/images/programs/disasterRelief.png",
  "LIFT Community": "/images/programs/communityVolunteers.png",
  "Children & Families": "/images/stories/volunteer.png",
  "Food Security": "/images/programs/foodDonation.png",
  "Education Support": "/images/programs/education.png",
  "Disaster Relief": "/images/programs/disasterRelief.png",
};

export default function GivingPage() {
  const [causes, setCauses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/causes")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item: any) => ({
          id: item.slug,
          name: item.name,
          icon: iconMap[item.name] || Heart,
          image: imageMap[item.name] || "/images/programs/communityVolunteers.png",
          description: item.description,
          raised: item.raised || 0,
          goal: item.goal || 0,
          ...(colorMap[item.name] || { color: "text-gold", bgColor: "bg-gold/10" }),
          href: `/giving/${item.slug}`,
        }));
        setCauses(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching causes:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-cloud">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm animate-fade-in">
            Give With Purpose
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4 animate-fade-in-up">
            Your Gift. <br />
            <span className="text-gradient-gold">Their Future.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-in-up delay-100">
            Choose a cause that matters to you. Every donation — big or small — creates
            lasting change in the lives of those who need it most.
          </p>
        </div>
      </section>

      {/* ================= IMPACT STATS ================= */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in-up">
              <p className="font-display text-4xl md:text-5xl font-bold text-navy">$2.5M+</p>
              <p className="text-ink/70 mt-2">Total Raised</p>
            </div>
            <div className="animate-fade-in-up delay-100">
              <p className="font-display text-4xl md:text-5xl font-bold text-navy">50,000+</p>
              <p className="text-ink/70 mt-2">Lives Impacted</p>
            </div>
            <div className="animate-fade-in-up delay-200">
              <p className="font-display text-4xl md:text-5xl font-bold text-navy">100%</p>
              <p className="text-ink/70 mt-2">Transparency</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CAUSES GRID ================= */}
      <section id="causes" className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Choose Your Cause
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
            Browse our programs and special campaigns. Select one or multiple causes to support.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-navy animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {causes.map((cause) => {
              const Icon = cause.icon;
              const progress = cause.goal > 0 ? Math.round((cause.raised / cause.goal) * 100) : 0;

              return (
                <div
                  key={cause.id}
                  className="card-hover bg-white rounded-card shadow-sm overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden group">
                    <img
                      src={cause.image}
                      alt={cause.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute top-4 left-4 ${cause.bgColor} backdrop-blur-sm rounded-full p-3`}>
                      <Icon className={`w-5 h-5 ${cause.color}`} />
                    </div>
                    <div className="absolute top-4 right-4 bg-navy/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      {progress}% Funded
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-navy text-xl">
                      {cause.name}
                    </h3>
                    <p className="text-ink/70 text-sm mt-3 leading-relaxed flex-1">
                      {cause.description}
                    </p>

                    <div className="mt-5">
                      <div className="flex justify-between text-xs text-ink/60 mb-2">
                        <span className="font-semibold text-navy">
                          ${cause.raised.toLocaleString()} raised
                        </span>
                        <span>of ${cause.goal.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-gold to-gold/70 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Link
                        href={`${cause.href}#donate`}
                        className="btn-lift flex-1 bg-gold text-ink font-semibold px-4 py-3 rounded-input hover:bg-gold/90 transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        <Heart className="w-4 h-4" />
                        Donate
                      </Link>
                      <Link
                        href={cause.href}
                        className="flex-1 border border-navy/20 text-navy font-semibold px-4 py-3 rounded-input hover:bg-navy/5 transition-colors flex items-center justify-center gap-1 text-sm"
                      >
                        Learn More
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= WHY GIVE ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Why Give Through DHK LIFT
            </h2>
            <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
              We're committed to transparency, accountability, and real impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "100% Transparent",
                desc: "Track exactly where your donation goes. Every project is verified and publicly documented."
              },
              {
                icon: TrendingUp,
                title: "Verified Impact",
                desc: "Our partners provide proof of progress with receipts, photos, and milestone reports."
              },
              {
                icon: Heart,
                title: "Direct Support",
                desc: "Your donation goes directly to the cause — with minimal administrative overhead."
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-cloud rounded-card p-8 border border-gray-100 card-hover text-center"
              >
                <div className="bg-navy/5 rounded-full p-4 w-fit mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-navy" />
                </div>
                <h3 className="font-display font-bold text-navy text-lg">{item.title}</h3>
                <p className="text-ink/70 text-sm mt-3 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-purple text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Every Gift Creates Ripple Effects
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            When you give, you're not just donating — you're changing lives, building
            communities, and creating a better world.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="#causes"
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Start Giving
            </Link>
            <Link
              href="/membership"
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              Become a Member
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}