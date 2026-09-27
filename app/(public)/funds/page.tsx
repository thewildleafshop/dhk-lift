"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Heart,
  Stethoscope,
  Activity,
  Droplet,
  Brain,
  Accessibility,
  AlertCircle,
  Baby,
  ChevronRight,
  Loader2,
  Inbox,
} from "lucide-react";

// ============ TYPES ============
interface DiseaseFund {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  status: string;
  maxAmount: number | null;
  geography: string | null;
}

// ============ FUND ICONS ============
const getFundIcon = (slug: string) => {
  const map: Record<string, any> = {
    "cancer-care-fund": { icon: Heart, color: "text-purple", bg: "bg-purple/10" },
    "heart-disease-fund": { icon: Activity, color: "text-error", bg: "bg-error/10" },
    "kidney-dialysis-fund": { icon: Droplet, color: "text-info", bg: "bg-info/10" },
    "diabetes-care-fund": { icon: Stethoscope, color: "text-teal", bg: "bg-teal/10" },
    "thalassemia-fund": { icon: Droplet, color: "text-error", bg: "bg-error/10" },
    "mental-health-fund": { icon: Brain, color: "text-purple", bg: "bg-purple/10" },
    "disability-support-fund": { icon: Accessibility, color: "text-navy", bg: "bg-navy/10" },
    "emergency-medical-fund": { icon: AlertCircle, color: "text-gold", bg: "bg-gold/10" },
    "maternal-health-fund": { icon: Baby, color: "text-teal", bg: "bg-teal/10" },
  };
  return map[slug] || { icon: Stethoscope, color: "text-navy", bg: "bg-navy/10" };
};

export default function DiseaseFundsPage() {
  const [funds, setFunds] = useState<DiseaseFund[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchFunds() {
      try {
        const res = await fetch("/api/disease-funds");
        if (res.ok) {
          const data = await res.json();
          setFunds(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchFunds();
  }, []);

  const filteredFunds = funds.filter((fund) =>
    fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fund.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-navy animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-cloud min-h-screen">
      
      {/* HERO */}
      <section className="bg-navy text-white py-16 md:py-20">
        <div className="max-w-container mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
            <Stethoscope className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold text-gold uppercase tracking-wider">
              Disease Funds
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Find Help for Your Condition
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Explore disease-specific funds that provide financial assistance for medical treatment, medication, and equipment.
          </p>
        </div>
      </section>

      {/* SEARCH */}
      <section className="max-w-container mx-auto px-4 md:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-card p-6 shadow-lg border border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a disease fund..."
              className="w-full pl-12 pr-4 py-4 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink"
            />
          </div>
        </div>
      </section>

      {/* FUNDS GRID */}
      <section className="max-w-container mx-auto px-4 md:px-8 py-12">
        {filteredFunds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFunds.map((fund) => {
              const config = getFundIcon(fund.slug);
              const Icon = config.icon;
              return (
                <Link
                  key={fund.id}
                  href={`/healthcare/funds/${fund.slug}`}
                  className="bg-white rounded-card p-6 border border-gray-100 hover:border-gold/30 hover:shadow-lg transition-all group"
                >
                  <div className={`${config.bg} rounded-full p-3 w-fit mb-4`}>
                    <Icon className={`w-6 h-6 ${config.color}`} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy mb-2">
                    {fund.name}
                  </h3>
                  <p className="text-ink/70 text-sm leading-relaxed mb-4 line-clamp-2">
                    {fund.description}
                  </p>
                  <div className="flex items-center justify-between">
                    {fund.maxAmount && (
                      <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
                        Up to ${fund.maxAmount.toLocaleString()}
                      </span>
                    )}
                    <span className="text-navy font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all ml-auto">
                      Learn More <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-card p-12 text-center border border-gray-100">
            <div className="bg-cloud rounded-full p-6 w-fit mx-auto mb-4">
              <Inbox className="w-12 h-12 text-ink/30" />
            </div>
            <h3 className="font-display text-xl font-bold text-navy">No Funds Found</h3>
            <p className="text-ink/60 mt-2">Try a different search query.</p>
          </div>
        )}
      </section>
    </div>
  );
}