"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Award,
  Crown,
  Star,
  Sparkles,
  Gift,
  TrendingUp,
  CheckCircle,
  Lock,
  ChevronRight,
  Loader2,
  Percent,
  Ticket,
  Plane,
  Heart,
  Users,
} from "lucide-react";

// ============ TYPES ============
type Tier = "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";

interface Membership {
  id: string;
  userId: string;
  tier: Tier;
  totalDonated: number;
  joinedAt: string;
  expiresAt: string | null;
  user: { id: string; name: string; email: string; role: string };
}

// ============ TIER CONFIG ============
const tierConfig: Record<Tier, { label: string; color: string; bg: string; icon: any; minAmount: number; nextTier: Tier | null }> = {
  BRONZE: { label: "Bronze", color: "text-gold", bg: "bg-gold/10", icon: Award, minAmount: 0, nextTier: "SILVER" },
  SILVER: { label: "Silver", color: "text-navy", bg: "bg-navy/10", icon: Star, minAmount: 1000, nextTier: "GOLD" },
  GOLD: { label: "Gold", color: "text-gold", bg: "bg-gold/10", icon: Crown, minAmount: 5000, nextTier: "PLATINUM" },
  PLATINUM: { label: "Platinum", color: "text-purple", bg: "bg-purple/10", icon: Sparkles, minAmount: 10000, nextTier: null },
};

const tierAmounts: Record<Tier, number> = {
  BRONZE: 0,
  SILVER: 1000,
  GOLD: 5000,
  PLATINUM: 10000,
};

// ============ BENEFITS DATA (Hardcoded - Baad mein DB se aayega) ============
const benefitsByTier: Record<Tier, { title: string; description: string; icon: any; color: string; bg: string }[]> = {
  BRONZE: [
    { title: "Welcome Kit", description: "Digital welcome pack with DHK LIFT branding", icon: Gift, color: "text-gold", bg: "bg-gold/10" },
    { title: "Monthly Newsletter", description: "Get updates on your impact and new projects", icon: Heart, color: "text-teal", bg: "bg-teal/10" },
    { title: "Impact Reports", description: "Access to detailed impact reports", icon: TrendingUp, color: "text-navy", bg: "bg-navy/10" },
  ],
  SILVER: [
    { title: "5% Partner Discounts", description: "Discounts at selected partner pharmacies and clinics", icon: Percent, color: "text-gold", bg: "bg-gold/10" },
    { title: "Priority Support", description: "Faster response from our support team", icon: Users, color: "text-teal", bg: "bg-teal/10" },
    { title: "Event Invitations", description: "Invitations to DHK LIFT community events", icon: Ticket, color: "text-purple", bg: "bg-purple/10" },
  ],
  GOLD: [
    { title: "10% Partner Discounts", description: "Higher discounts at all partner locations", icon: Percent, color: "text-gold", bg: "bg-gold/10" },
    { title: "Travel Benefits", description: "Discounted hotel and travel bookings", icon: Plane, color: "text-navy", bg: "bg-navy/10" },
    { title: "Exclusive Events", description: "VIP access to donor events and galas", icon: Ticket, color: "text-purple", bg: "bg-purple/10" },
    { title: "Named Recognition", description: "Your name on selected project pages", icon: Award, color: "text-gold", bg: "bg-gold/10" },
  ],
  PLATINUM: [
    { title: "15% Partner Discounts", description: "Maximum discounts at all partner locations", icon: Percent, color: "text-gold", bg: "bg-gold/10" },
    { title: "Premium Travel", description: "Exclusive hotel and travel benefits", icon: Plane, color: "text-navy", bg: "bg-navy/10" },
    { title: "Dedicated Manager", description: "Personal account manager for your giving", icon: Users, color: "text-teal", bg: "bg-teal/10" },
    { title: "Project Naming Rights", description: "Name a project after yourself or your organization", icon: Sparkles, color: "text-purple", bg: "bg-purple/10" },
    { title: "Annual Impact Report", description: "Personalized annual impact report", icon: TrendingUp, color: "text-gold", bg: "bg-gold/10" },
  ],
};

export default function MyBenefitsPage() {
  const [membership, setMembership] = useState<Membership | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMembership() {
      try {
        setLoading(true);
        const res = await fetch("/api/memberships");
        if (!res.ok) throw new Error("Failed to fetch membership");
        const data = await res.json();
        // API returns array, get first one (current user)
        setMembership(data[0] || null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMembership();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-navy animate-spin mx-auto mb-4" />
          <p className="text-ink/60">Loading your benefits...</p>
        </div>
      </div>
    );
  }

  if (error || !membership) {
    return (
      <div className="bg-white rounded-card p-12 text-center border border-gray-100">
        <p className="text-error font-semibold mb-2">Error loading benefits</p>
        <p className="text-ink/60 text-sm">{error || "Membership not found"}</p>
      </div>
    );
  }

  const currentTier = tierConfig[membership.tier];
  const TierIcon = currentTier.icon;
  const nextTierName = currentTier.nextTier;
  const nextTierAmount = nextTierName ? tierAmounts[nextTierName] : 0;
  const progressToNext = nextTierName
    ? Math.min((membership.totalDonated / nextTierAmount) * 100, 100)
    : 100;
  const amountNeeded = nextTierName ? Math.max(nextTierAmount - membership.totalDonated, 0) : 0;

  // Benefits for current tier + all lower tiers
  const tierOrder: Tier[] = ["BRONZE", "SILVER", "GOLD", "PLATINUM"];
  const currentTierIndex = tierOrder.indexOf(membership.tier);
  const accessibleTiers = tierOrder.slice(0, currentTierIndex + 1);
  const allBenefits = accessibleTiers.flatMap((tier) =>
    benefitsByTier[tier].map((b) => ({ ...b, tier }))
  );

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
          My Benefits
        </h1>
        <p className="text-ink/70 mt-1">
          Explore exclusive benefits, deals, and rewards available at your tier.
        </p>
      </div>

      {/* HERO TIER CARD */}
      <div className="bg-gradient-to-br from-navy to-navy/90 rounded-card p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className={`${currentTier.bg} rounded-full p-4 shrink-0 backdrop-blur-sm`}>
                <TierIcon className={`w-10 h-10 ${currentTier.color}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-gold font-semibold tracking-wider uppercase text-xs">
                    Current Tier
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-1">
                  {currentTier.label} Member
                </h2>
                <p className="text-white/70 text-sm mt-1">
                  Member since {new Date(membership.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-white/60 text-xs uppercase tracking-wider">Total Donated</p>
              <p className="font-display text-3xl font-bold text-gold">
                ${membership.totalDonated.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Progress to Next Tier */}
          {nextTierName && (
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gold" />
                  <span className="font-semibold text-sm">
                    Progress to {tierConfig[nextTierName].label}
                  </span>
                </div>
                <span className="text-gold font-display font-bold text-lg">
                  ${membership.totalDonated.toLocaleString()} / ${nextTierAmount.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-gold to-gold/70 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${progressToNext}%` }}
                ></div>
              </div>
              <p className="text-white/70 text-xs mt-3">
                Just <span className="text-gold font-bold">${amountNeeded.toLocaleString()}</span> more to unlock {tierConfig[nextTierName].label} tier benefits!
              </p>
            </div>
          )}

          {!nextTierName && (
            <div className="mt-8 bg-gold/20 backdrop-blur-sm rounded-card p-6 border border-gold/30">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-gold" />
                <div>
                  <p className="font-display font-bold text-lg">You've reached the highest tier!</p>
                  <p className="text-white/70 text-sm">Enjoy all exclusive Platinum benefits.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TIER OVERVIEW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tierOrder.map((tier) => {
          const config = tierConfig[tier];
          const Icon = config.icon;
          const isCurrent = tier === membership.tier;
          const isUnlocked = tierOrder.indexOf(tier) <= currentTierIndex;

          return (
            <div
              key={tier}
              className={`bg-white rounded-card p-5 border-2 transition-all ${
                isCurrent ? "border-gold shadow-md" : isUnlocked ? "border-gray-100" : "border-gray-100 opacity-60"
              }`}
            >
              <div className={`${config.bg} rounded-full p-3 w-fit mb-3`}>
                {isUnlocked ? (
                  <Icon className={`w-5 h-5 ${config.color}`} />
                ) : (
                  <Lock className="w-5 h-5 text-ink/30" />
                )}
              </div>
              <p className="font-display font-bold text-navy">{config.label}</p>
              <p className="text-ink/50 text-xs mt-0.5">
                {config.minAmount === 0 ? "Free" : `$${config.minAmount.toLocaleString()}+`}
              </p>
              {isCurrent && (
                <span className="inline-block mt-2 text-xs font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                  Current
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* BENEFITS LIST */}
      <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-gold" />
            <h2 className="font-display font-bold text-navy text-lg">
              Your Available Benefits
            </h2>
          </div>
          <span className="text-xs font-semibold text-success bg-success/10 px-3 py-1 rounded-full">
            {allBenefits.length} Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allBenefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div
                key={i}
                className="p-5 bg-cloud rounded-card border border-gray-100 hover:border-gold/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`${benefit.bg} rounded-full p-3 shrink-0`}>
                    <Icon className={`w-5 h-5 ${benefit.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-navy text-sm">{benefit.title}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tierConfig[benefit.tier as Tier].bg} ${tierConfig[benefit.tier as Tier].color}`}>
                        {tierConfig[benefit.tier as Tier].label}
                      </span>
                    </div>
                    <p className="text-ink/70 text-xs mt-1">{benefit.description}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-success shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LOCKED BENEFITS */}
      {nextTierName && (
        <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-ink/40" />
            <h2 className="font-display font-bold text-navy text-lg">
              Unlock More Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefitsByTier[nextTierName].map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={i}
                  className="p-5 bg-cloud/50 rounded-card border border-dashed border-gray-200 opacity-70"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 rounded-full p-3 shrink-0">
                      <Icon className="w-5 h-5 text-ink/40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-ink/60 text-sm">{benefit.title}</h3>
                      <p className="text-ink/40 text-xs mt-1">{benefit.description}</p>
                      <p className="text-xs font-semibold text-gold mt-2">
                        Unlocks at {tierConfig[nextTierName].label} (${nextTierAmount.toLocaleString()}+)
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="/giving"
            className="btn-lift inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg mt-6"
          >
            <Heart className="w-5 h-5" />
            Donate to Unlock
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}