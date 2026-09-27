import Link from "next/link";
import Image from "next/image";
import {
  Gift,
  Ticket,
  QrCode,
  MapPin,
  Calendar,
  ChevronRight,
  Star,
  Crown,
  Award,
  Zap,
  Percent,
  Coffee,
  Plane,
  Hotel,
  ShoppingBag,
  Heart,
  Search,
  Filter,
  Clock,
} from "lucide-react";

// ============ TIER FILTERS ============
const tierFilters = [
  { id: "all", label: "All Tiers", icon: Award },
  { id: "bronze", label: "Bronze", icon: Award },
  { id: "silver", label: "Silver", icon: Star },
  { id: "gold", label: "Gold", icon: Crown },
  { id: "platinum", label: "Platinum", icon: Zap },
];

// ============ CATEGORY FILTERS ============
const categoryFilters = [
  { id: "all", label: "All Categories", icon: Gift },
  { id: "travel", label: "Travel", icon: Plane },
  { id: "hotel", label: "Hotels", icon: Hotel },
  { id: "dining", label: "Dining", icon: Coffee },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
  { id: "tickets", label: "Tickets", icon: Ticket },
];

// ============ DEMO BENEFITS DATA ============
const benefits = [
  {
    id: 1,
    title: "20% Off Flight Bookings",
    partner: "Global Air",
    category: "travel",
    tier: "silver",
    discount: "20% OFF",
    description: "Get 20% off on all domestic and international flight bookings.",
    validUntil: "Dec 31, 2026",
    location: "Online",
    icon: Plane,
    color: "text-teal",
    bgColor: "bg-teal/10",
    image: "/images/programs/communityVolunteers.png",
    hasQR: true,
  },
  {
    id: 2,
    title: "Free Night at Partner Hotels",
    partner: "LuxStay Hotels",
    category: "hotel",
    tier: "gold",
    discount: "FREE NIGHT",
    description: "Book 2 nights and get the 3rd night absolutely free at any partner hotel.",
    validUntil: "Nov 30, 2026",
    location: "Pakistan, UAE",
    icon: Hotel,
    color: "text-gold",
    bgColor: "bg-gold/10",
    image: "/images/programs/disasterRelief.png",
    hasQR: true,
  },
  {
    id: 3,
    title: "Buy 1 Get 1 Coffee",
    partner: "Brew Haven",
    category: "dining",
    tier: "bronze",
    discount: "BOGO",
    description: "Buy one coffee and get another absolutely free at Brew Haven outlets.",
    validUntil: "Oct 15, 2026",
    location: "Karachi, Lahore",
    icon: Coffee,
    color: "text-gold",
    bgColor: "bg-gold/10",
    image: "/images/programs/foodDonation.png",
    hasQR: true,
  },
  {
    id: 4,
    title: "15% Off All Purchases",
    partner: "StyleMart",
    category: "shopping",
    tier: "silver",
    discount: "15% OFF",
    description: "Exclusive 15% discount on all clothing and accessories at StyleMart.",
    validUntil: "Jan 31, 2027",
    location: "Online & In-Store",
    icon: ShoppingBag,
    color: "text-purple",
    bgColor: "bg-purple/10",
    image: "/images/programs/education.png",
    hasQR: false,
  },
  {
    id: 5,
    title: "Free Entry to Charity Gala",
    partner: "DHK LIFT Events",
    category: "tickets",
    tier: "platinum",
    discount: "FREE ENTRY",
    description: "Complimentary VIP entry to our annual charity gala and fundraising events.",
    validUntil: "Dec 15, 2026",
    location: "Dubai, UAE",
    icon: Ticket,
    color: "text-purple",
    bgColor: "bg-purple/10",
    image: "/images/programs/healthcare.png",
    hasQR: true,
  },
  {
    id: 6,
    title: "30% Off Spa Services",
    partner: "Serenity Spa",
    category: "dining",
    tier: "gold",
    discount: "30% OFF",
    description: "Relax and unwind with 30% off all spa and wellness services.",
    validUntil: "Feb 28, 2027",
    location: "Karachi",
    icon: Heart,
    color: "text-purple",
    bgColor: "bg-purple/10",
    image: "/images/stories/volunteer.png",
    hasQR: true,
  },
];

// ============ TIER BADGE HELPER ============
const tierBadge: Record<string, { color: string; bg: string; icon: any }> = {
  bronze: { color: "text-navy", bg: "bg-navy/10", icon: Award },
  silver: { color: "text-teal", bg: "bg-teal/10", icon: Star },
  gold: { color: "text-gold", bg: "bg-gold/10", icon: Crown },
  platinum: { color: "text-purple", bg: "bg-purple/10", icon: Zap },
};

// ============ MAIN COMPONENT ============
export default function BenefitsPage() {
  return (
    <main className="min-h-screen bg-cloud">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-12 md:py-16 relative z-10">
          
          <Link
            href="/membership"
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm mb-6"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Membership
          </Link>

          <div className="text-center max-w-3xl mx-auto">
            <div className="bg-gold/20 rounded-full p-4 w-fit mx-auto mb-6">
              <Gift className="w-10 h-10 text-gold" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Member Benefits
            </h1>
            <p className="text-white/80 mt-4 leading-relaxed">
              Exclusive deals, vouchers, and offers from our verified partners worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CURRENT TIER BANNER ================= */}
      <section className="max-w-container mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-card p-6 shadow-lg border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-navy/10 rounded-full p-3 shrink-0">
              <Award className="w-6 h-6 text-navy" />
            </div>
            <div>
              <p className="text-ink/60 text-xs uppercase tracking-wider">Your Current Tier</p>
              <p className="font-display font-bold text-navy text-xl">BRONZE</p>
            </div>
          </div>
          <div className="flex-1 max-w-md">
            <div className="flex justify-between text-xs text-ink/60 mb-2">
              <span>Progress to Silver</span>
              <span className="font-semibold text-navy">$150 / $100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-gold to-gold/70 h-2 rounded-full" style={{ width: "100%" }}></div>
            </div>
            <p className="text-xs text-gold font-semibold mt-2">
              🎉 You've qualified for Silver Tier! It will activate on your next login.
            </p>
          </div>
          <Link
            href="/giving"
            className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 shrink-0"
          >
            <Heart className="w-4 h-4" />
            Give More
          </Link>
        </div>
      </section>

      {/* ================= FILTERS ================= */}
      <section className="max-w-container mx-auto px-6 py-8">
        <div className="bg-white rounded-card p-4 shadow-sm border border-gray-100 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
            <input
              type="text"
              placeholder="Search benefits, partners, or deals..."
              className="w-full pl-12 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-2">
            {tierFilters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter.id === "all"
                      ? "bg-navy text-white"
                      : "bg-cloud text-ink/70 hover:bg-navy/5 hover:text-navy"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= BENEFITS GRID ================= */}
      <section className="max-w-container mx-auto px-6 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            const tier = tierBadge[benefit.tier];
            const TierIcon = tier.icon;
            return (
              <div
                key={benefit.id}
                className="card-hover bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden flex flex-col group"
              >
                {/* Image Header */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 bg-gold text-ink text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {benefit.discount}
                  </div>
                  {/* Tier Badge */}
                  <div className={`absolute top-4 right-4 ${tier.bg} backdrop-blur-sm text-xs font-semibold ${tier.color} px-3 py-1.5 rounded-full flex items-center gap-1`}>
                    <TierIcon className="w-3 h-3" />
                    {benefit.tier.charAt(0).toUpperCase() + benefit.tier.slice(1)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className={`${benefit.bgColor} rounded-full p-2.5 w-fit mb-3`}>
                    <Icon className={`w-5 h-5 ${benefit.color}`} />
                  </div>

                  <h3 className="font-display font-bold text-navy text-lg">
                    {benefit.title}
                  </h3>
                  <p className="text-ink/50 text-xs mt-1">
                    by {benefit.partner}
                  </p>
                  <p className="text-ink/70 text-sm mt-3 leading-relaxed flex-1">
                    {benefit.description}
                  </p>

                  {/* Meta Info */}
                  <div className="mt-4 space-y-2 text-xs text-ink/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      Valid until {benefit.validUntil}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {benefit.location}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-5 border-t border-gray-100 flex gap-2">
                    <button className="btn-lift flex-1 bg-navy text-white font-semibold px-4 py-3 rounded-input hover:bg-navy/90 transition-colors flex items-center justify-center gap-2 text-sm">
                      <Percent className="w-4 h-4" />
                      Redeem
                    </button>
                    {benefit.hasQR && (
                      <button
                        className="btn-lift bg-gold text-ink font-semibold p-3 rounded-input hover:bg-gold/90 transition-colors flex items-center justify-center"
                        title="Show QR Code"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= EMPTY STATE / MORE CTA ================= */}
        <div className="mt-12 text-center">
          <p className="text-ink/60 text-sm mb-4">
            Unlock more benefits as you give more.
          </p>
          <Link
            href="/membership"
            className="btn-lift inline-flex items-center gap-2 bg-navy text-white font-semibold px-8 py-3.5 rounded-input hover:bg-navy/90 transition-colors shadow-lg"
          >
            <Crown className="w-5 h-5" />
            Upgrade Your Tier
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ================= HOW REDEMPTION WORKS ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              How to Redeem
            </h2>
            <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
              Redeeming your member benefits is simple and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Choose a Benefit", desc: "Browse available deals and select the one you want.", icon: Gift },
              { step: "02", title: "Generate QR Code", desc: "Click Redeem to get your unique QR code or voucher code.", icon: QrCode },
              { step: "03", title: "Show to Partner", desc: "Present your QR code at the partner outlet or enter the code online.", icon: Percent },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-cloud rounded-card p-8 border border-gray-100 card-hover text-center"
                >
                  <div className="bg-navy text-white font-display font-bold text-2xl w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <Icon className="w-8 h-8 text-gold mx-auto mb-3" />
                  <h3 className="font-display font-bold text-navy text-lg">{item.title}</h3>
                  <p className="text-ink/70 text-sm mt-2 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-purple text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Unlock More Benefits
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            As you give more, you unlock higher tiers with even more exclusive benefits 
            and partner deals.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/giving"
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Give Now
            </Link>
            <Link
              href="/membership"
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              View All Tiers
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}