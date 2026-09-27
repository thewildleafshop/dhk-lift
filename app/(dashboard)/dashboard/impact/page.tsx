"use client";

import Link from "next/link";
import {
  TrendingUp,
  Heart,
  Users,
  Award,
  ChevronRight,
  DollarSign,
  Utensils,
  BookOpen,
  Stethoscope,
  Home,
  Gift,
  CheckCircle,
  Sparkles,
  Target,
  Globe,
} from "lucide-react";

// ============ DEMO DATA ============
const impactStats = [
  {
    label: "Lifetime Giving",
    value: "$150",
    subtext: "Across 4 donations",
    icon: DollarSign,
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  {
    label: "Lives Impacted",
    value: "45",
    subtext: "Meals provided (est.)",
    icon: Users,
    color: "text-teal",
    bgColor: "bg-teal/10",
  },
  {
    label: "Causes Supported",
    value: "4",
    subtext: "Different programs",
    icon: Heart,
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
  {
    label: "Member Since",
    value: "2025",
    subtext: "Bronze Tier",
    icon: Award,
    color: "text-navy",
    bgColor: "bg-navy/10",
  },
];

const causesSupported = [
  {
    name: "Food Security",
    icon: Utensils,
    color: "text-gold",
    bgColor: "bg-gold/10",
    donated: 50,
    impact: "10 meals provided to families in need",
    progress: 33,
  },
  {
    name: "Education Support",
    icon: BookOpen,
    color: "text-teal",
    bgColor: "bg-teal/10",
    donated: 30,
    impact: "School supplies for 1 child",
    progress: 20,
  },
  {
    name: "Healthcare Access",
    icon: Stethoscope,
    color: "text-teal",
    bgColor: "bg-teal/10",
    donated: 20,
    impact: "Basic medication for 1 patient",
    progress: 13,
  },
  {
    name: "Where Needed Most",
    icon: Sparkles,
    color: "text-gold",
    bgColor: "bg-gold/10",
    donated: 50,
    impact: "Emergency relief support",
    progress: 33,
  },
];

const recentImpact = [
  {
    id: 1,
    title: "Meals Delivered to Families",
    description: "Your donation to Food Security provided 10 nutritious meals to families in Karachi.",
    date: "Apr 15, 2026",
    icon: Utensils,
    color: "text-gold",
    bgColor: "bg-gold/10",
    verified: true,
  },
  {
    id: 2,
    title: "School Supplies Distributed",
    description: "Your donation to Education Support provided books and supplies for 1 child.",
    date: "Apr 2, 2026",
    icon: BookOpen,
    color: "text-teal",
    bgColor: "bg-teal/10",
    verified: true,
  },
  {
    id: 3,
    title: "Medical Aid Provided",
    description: "Your donation to Healthcare Access provided basic medication for 1 patient.",
    date: "Mar 18, 2026",
    icon: Stethoscope,
    color: "text-teal",
    bgColor: "bg-teal/10",
    verified: true,
  },
];

const milestones = [
  { amount: 100, label: "$100", achieved: true },
  { amount: 250, label: "$250", achieved: false },
  { amount: 500, label: "$500", achieved: false },
  { amount: 1000, label: "$1,000", achieved: false },
];

// ============ MAIN COMPONENT ============
export default function MyImpactPage() {
  const currentTotal = 150;
  const nextMilestone = 250;
  const progressToNext = (currentTotal / nextMilestone) * 100;

  return (
    <div className="space-y-6">
      
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
          My Impact
        </h1>
        <p className="text-ink/70 mt-1">
          See how your generosity is changing lives around the world.
        </p>
      </div>

      {/* ================= HERO IMPACT CARD ================= */}
      <div className="bg-gradient-to-br from-navy to-navy/90 rounded-card p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="text-gold font-semibold tracking-wider uppercase text-xs">
              Your Journey of Giving
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            You've Made a Real Difference
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl leading-relaxed">
            Your generosity has supported <span className="text-gold font-bold">4 causes</span> and 
            impacted <span className="text-gold font-bold">45+ lives</span>. Every donation creates 
            a ripple of lasting change.
          </p>

          {/* Progress to Next Milestone */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-gold" />
                <span className="font-semibold text-sm">Next Milestone: $250</span>
              </div>
              <span className="text-gold font-display font-bold text-lg">
                ${currentTotal} / ${nextMilestone}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-gold to-gold/70 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${progressToNext}%` }}
              ></div>
            </div>
            <p className="text-white/70 text-xs mt-3">
              Just ${nextMilestone - currentTotal} more to unlock your next impact milestone!
            </p>
          </div>
        </div>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {impactStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-card p-5 border border-gray-100">
              <div className={`${stat.bgColor} rounded-full p-3 w-fit mb-3`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="font-display text-2xl font-bold text-navy">{stat.value}</p>
              <p className="font-semibold text-navy text-sm mt-1">{stat.label}</p>
              <p className="text-ink/50 text-xs mt-0.5">{stat.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* ================= CAUSES SUPPORTED ================= */}
      <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-gold" />
            <h2 className="font-display font-bold text-navy text-lg">
              Causes You've Supported
            </h2>
          </div>
          <Link
            href="/giving"
            className="text-gold font-semibold text-sm hover:gap-2 transition-all flex items-center gap-1"
          >
            Support More
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {causesSupported.map((cause, i) => {
            const Icon = cause.icon;
            return (
              <div key={i} className="p-4 bg-cloud rounded-card border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className={`${cause.bgColor} rounded-full p-3 shrink-0`}>
                    <Icon className={`w-5 h-5 ${cause.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-navy text-sm">{cause.name}</h3>
                      <span className="font-display font-bold text-gold text-sm shrink-0">
                        ${cause.donated}
                      </span>
                    </div>
                    <p className="text-ink/70 text-xs mb-3">{cause.impact}</p>
                    <div className="w-full bg-white rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-gold to-gold/70 h-1.5 rounded-full transition-all duration-1000"
                        style={{ width: `${cause.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= RECENT IMPACT ================= */}
      <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gold" />
            <h2 className="font-display font-bold text-navy text-lg">
              Recent Impact
            </h2>
          </div>
          <span className="text-ink/50 text-xs">Last 30 days</span>
        </div>

        <div className="space-y-4">
          {recentImpact.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 rounded-card hover:bg-cloud/50 transition-colors"
              >
                <div className={`${item.bgColor} rounded-full p-3 shrink-0`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-navy text-sm">
                      {item.title}
                    </h3>
                    {item.verified && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-ink/70 text-sm mt-1 leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-ink/40 text-xs mt-1">{item.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= MILESTONES ================= */}
      <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-5 h-5 text-gold" />
          <h2 className="font-display font-bold text-navy text-lg">
            Giving Milestones
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {milestones.map((milestone, i) => (
            <div
              key={i}
              className={`p-4 rounded-card border-2 text-center transition-all ${
                milestone.achieved
                  ? "border-gold bg-gold/5"
                  : "border-gray-100 bg-cloud"
              }`}
            >
              <div className={`rounded-full p-3 w-fit mx-auto mb-2 ${
                milestone.achieved ? "bg-gold" : "bg-gray-200"
              }`}>
                {milestone.achieved ? (
                  <CheckCircle className="w-5 h-5 text-ink" />
                ) : (
                  <Award className={`w-5 h-5 ${milestone.achieved ? "text-ink" : "text-ink/30"}`} />
                )}
              </div>
              <p className={`font-display font-bold text-lg ${
                milestone.achieved ? "text-navy" : "text-ink/40"
              }`}>
                {milestone.label}
              </p>
              <p className={`text-xs mt-1 ${
                milestone.achieved ? "text-gold font-semibold" : "text-ink/40"
              }`}>
                {milestone.achieved ? "Achieved" : "Locked"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CTA ================= */}
      <div className="bg-purple rounded-card p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-white/10 rounded-full p-3 shrink-0">
              <Globe className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold">
                Multiply Your Impact
              </h2>
              <p className="text-white/70 mt-1 text-sm">
                Become a member and unlock exclusive benefits while creating even more change.
              </p>
            </div>
          </div>
          <Link
            href="/membership"
            className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 shrink-0"
          >
            <Gift className="w-5 h-5" />
            Explore Membership
          </Link>
        </div>
      </div>

    </div>
  );
}