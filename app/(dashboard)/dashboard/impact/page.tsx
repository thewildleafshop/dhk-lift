"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  Gift,
  CheckCircle,
  Sparkles,
  Target,
  Globe,
  Loader2,
} from "lucide-react";

// ============ TYPES ============
interface Allocation {
  id: string;
  amount: number;
  program: { id: string; name: string; slug: string; category: string } | null;
  project: { id: string; title: string; slug: string } | null;
}

interface Donation {
  id: string;
  donorEmail: string;
  totalAmount: number;
  currency: string;
  status: string;
  isRecurring: boolean;
  createdAt: string;
  allocations: Allocation[];
}

// ============ CAUSE ICONS ============
const getCauseIcon = (name: string) => {
  const map: Record<string, any> = {
    "LIFT Health": { icon: Stethoscope, color: "text-teal", bgColor: "bg-teal/10" },
    "LIFT Protect": { icon: Heart, color: "text-purple", bgColor: "bg-purple/10" },
    "LIFT Ability": { icon: Users, color: "text-purple", bgColor: "bg-purple/10" },
    "LIFT Community": { icon: BookOpen, color: "text-gold", bgColor: "bg-gold/10" },
    "Children & Families": { icon: Users, color: "text-navy", bgColor: "bg-navy/10" },
    "Food Security": { icon: Utensils, color: "text-gold", bgColor: "bg-gold/10" },
    "Disaster Relief": { icon: Globe, color: "text-error", bgColor: "bg-error/10" },
  };
  return map[name] || { icon: Heart, color: "text-navy", bgColor: "bg-navy/10" };
};

// ============ IMPACT ESTIMATOR ============
const estimateImpact = (causeName: string, amount: number): string => {
  const map: Record<string, string> = {
    "Food Security": `${Math.floor(amount / 5)} meals provided to families in need`,
    "LIFT Health": `Medical support for ${Math.floor(amount / 100)} patient(s)`,
    "LIFT Ability": `Mobility aids for ${Math.floor(amount / 150)} individual(s)`,
    "LIFT Community": `Community support worth $${amount}`,
    "Children & Families": `Support for ${Math.floor(amount / 50)} child(ren)`,
    "LIFT Protect": `Confidential support worth $${amount}`,
    "Disaster Relief": `Emergency relief worth $${amount}`,
  };
  return map[causeName] || `Impact worth $${amount}`;
};

export default function MyImpactPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDonations() {
      try {
        setLoading(true);
        const res = await fetch("/api/donations");
        if (!res.ok) throw new Error("Failed to fetch donations");
        const data = await res.json();
        setDonations(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDonations();
  }, []);

  // ============ CALCULATIONS ============
  const completedDonations = donations.filter((d) => d.status === "COMPLETED");
  
  const totalDonated = completedDonations.reduce((sum, d) => sum + d.totalAmount, 0);
  const totalDonationsCount = completedDonations.length;

  // Group allocations by cause
  const causeMap: Record<string, { donated: number; count: number }> = {};
  completedDonations.forEach((donation) => {
    donation.allocations.forEach((alloc) => {
      const causeName = alloc.program?.name || alloc.project?.title || "General Fund";
      if (!causeMap[causeName]) {
        causeMap[causeName] = { donated: 0, count: 0 };
      }
      causeMap[causeName].donated += alloc.amount;
      causeMap[causeName].count += 1;
    });
  });

  const causesSupported = Object.entries(causeMap).map(([name, data]) => ({
    name,
    donated: data.donated,
    impact: estimateImpact(name, data.donated),
    ...getCauseIcon(name),
  }));

  const causesCount = causesSupported.length;

  // Estimate lives impacted (rough calculation)
  const livesImpacted = Math.round(totalDonated / 3.33); // $10 = 3 meals roughly

  // Recent impact (last 5 allocations)
  const recentImpact = completedDonations
    .flatMap((d) =>
      d.allocations.map((a) => ({
        id: a.id,
        causeName: a.program?.name || a.project?.title || "General Fund",
        amount: a.amount,
        date: d.createdAt,
      }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // Milestones
  const milestonesData = [
    { amount: 100, label: "$100" },
    { amount: 250, label: "$250" },
    { amount: 500, label: "$500" },
    { amount: 1000, label: "$1,000" },
  ];
  const milestones = milestonesData.map((m) => ({
    ...m,
    achieved: totalDonated >= m.amount,
  }));

  // Next milestone
  const nextMilestone = milestonesData.find((m) => totalDonated < m.amount)?.amount || totalDonated;
  const progressToNext = nextMilestone > 0 ? Math.min((totalDonated / nextMilestone) * 100, 100) : 100;

  // Member since (earliest donation year)
  const memberSince = completedDonations.length > 0
    ? new Date(Math.min(...completedDonations.map((d) => new Date(d.createdAt).getTime()))).getFullYear()
    : new Date().getFullYear();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-navy animate-spin mx-auto mb-4" />
          <p className="text-ink/60">Loading your impact...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-card p-12 text-center border border-gray-100">
        <p className="text-error font-semibold mb-2">Error loading impact data</p>
        <p className="text-ink/60 text-sm">{error}</p>
      </div>
    );
  }

  // No donations yet
  if (completedDonations.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">My Impact</h1>
          <p className="text-ink/70 mt-1">See how your generosity is changing lives around the world.</p>
        </div>
        <div className="bg-white rounded-card p-12 text-center border border-gray-100">
          <div className="bg-cloud rounded-full p-6 w-fit mx-auto mb-4">
            <Heart className="w-12 h-12 text-ink/30" />
          </div>
          <h3 className="font-display text-xl font-bold text-navy">No Impact Yet</h3>
          <p className="text-ink/60 mt-2 max-w-md mx-auto">
            You haven't made any completed donations yet. Start giving today and see your impact grow.
          </p>
          <Link
            href="/giving"
            className="btn-lift inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg mt-6"
          >
            <Heart className="w-5 h-5" />
            Make Your First Donation
          </Link>
        </div>
      </div>
    );
  }

  const impactStats = [
    { label: "Lifetime Giving", value: `$${totalDonated}`, subtext: `Across ${totalDonationsCount} donation(s)`, icon: DollarSign, color: "text-gold", bgColor: "bg-gold/10" },
    { label: "Lives Impacted", value: `${livesImpacted}`, subtext: "Estimated (meals/patients)", icon: Users, color: "text-teal", bgColor: "bg-teal/10" },
    { label: "Causes Supported", value: `${causesCount}`, subtext: "Different programs", icon: Heart, color: "text-purple", bgColor: "bg-purple/10" },
    { label: "Member Since", value: `${memberSince}`, subtext: "Active Donor", icon: Award, color: "text-navy", bgColor: "bg-navy/10" },
  ];

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
          My Impact
        </h1>
        <p className="text-ink/70 mt-1">
          See how your generosity is changing lives around the world.
        </p>
      </div>

      {/* HERO IMPACT CARD */}
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
            Your generosity has supported <span className="text-gold font-bold">{causesCount} cause(s)</span> and 
            impacted <span className="text-gold font-bold">{livesImpacted}+ lives</span>. Every donation creates 
            a ripple of lasting change.
          </p>

          {/* Progress to Next Milestone */}
          {nextMilestone > totalDonated && (
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-gold" />
                  <span className="font-semibold text-sm">Next Milestone: ${nextMilestone}</span>
                </div>
                <span className="text-gold font-display font-bold text-lg">
                  ${totalDonated} / ${nextMilestone}
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-gold to-gold/70 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${progressToNext}%` }}
                ></div>
              </div>
              <p className="text-white/70 text-xs mt-3">
                Just ${nextMilestone - totalDonated} more to unlock your next impact milestone!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* STATS CARDS */}
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

      {/* CAUSES SUPPORTED */}
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
            const progress = totalDonated > 0 ? (cause.donated / totalDonated) * 100 : 0;
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
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECENT IMPACT */}
      <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gold" />
            <h2 className="font-display font-bold text-navy text-lg">
              Recent Impact
            </h2>
          </div>
          <span className="text-ink/50 text-xs">Last donations</span>
        </div>

        <div className="space-y-4">
          {recentImpact.map((item) => {
            const causeInfo = getCauseIcon(item.causeName);
            const Icon = causeInfo.icon;
            return (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 rounded-card hover:bg-cloud/50 transition-colors"
              >
                <div className={`${causeInfo.bgColor} rounded-full p-3 shrink-0`}>
                  <Icon className={`w-5 h-5 ${causeInfo.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-navy text-sm">
                      ${item.amount} to {item.causeName}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                  <p className="text-ink/70 text-sm mt-1 leading-relaxed">
                    {estimateImpact(item.causeName, item.amount)}
                  </p>
                  <p className="text-ink/40 text-xs mt-1">
                    {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MILESTONES */}
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

      {/* CTA */}
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