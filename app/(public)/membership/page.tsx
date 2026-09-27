import Link from "next/link";
import {
  Users,
  ChevronRight,
  CheckCircle,
  Heart,
  Gift,
  Award,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Ticket,
  Globe,
  Crown,
} from "lucide-react";

// ============ TIERS DATA ============
const tiers = [
  {
    id: "bronze",
    name: "Bronze",
    icon: Award,
    price: "Free",
    requirement: "Sign up and start giving",
    color: "text-navy",
    bgColor: "bg-navy/10",
    borderColor: "border-navy/20",
    benefits: [
      "Track your donation history",
      "Receive impact updates",
      "Access member dashboard",
      "Basic newsletter access",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    icon: Star,
    price: "$100+",
    requirement: "Lifetime giving of $100+",
    color: "text-teal",
    bgColor: "bg-teal/10",
    borderColor: "border-teal/30",
    popular: false,
    benefits: [
      "All Bronze benefits",
      "Exclusive partner deals",
      "Early access to campaigns",
      "Quarterly impact reports",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    icon: Crown,
    price: "$500+",
    requirement: "Lifetime giving of $500+",
    color: "text-gold",
    bgColor: "bg-gold/10",
    borderColor: "border-gold",
    popular: true,
    benefits: [
      "All Silver benefits",
      "Premium partner vouchers",
      "Priority support response",
      "Invitation to exclusive events",
      "Recognition in annual report",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    icon: Zap,
    price: "$2,500+",
    requirement: "Lifetime giving of $2,500+",
    color: "text-purple",
    bgColor: "bg-purple/10",
    borderColor: "border-purple/30",
    benefits: [
      "All Gold benefits",
      "Personal account manager",
      "Custom impact reports",
      "VIP event access",
      "Named project recognition",
    ],
  },
];

// ============ BENEFIT CATEGORIES ============
const benefitCategories = [
  {
    icon: Ticket,
    title: "Deals & Vouchers",
    description: "Exclusive discounts from verified partners on travel, dining, and shopping.",
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  {
    icon: Globe,
    title: "Partner Offers",
    description: "Special offers from our global network of NGOs and healthcare providers.",
    color: "text-teal",
    bgColor: "bg-teal/10",
  },
  {
    icon: TrendingUp,
    title: "Impact Tracking",
    description: "Real-time tracking of your donations and their verified impact.",
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
  {
    icon: Shield,
    title: "Priority Support",
    description: "Faster response times and dedicated support for higher tiers.",
    color: "text-navy",
    bgColor: "bg-navy/10",
  },
];

// ============ MAIN COMPONENT ============
export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-cloud">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-container mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <div className="bg-gold/20 rounded-full p-4 w-fit mx-auto mb-6 animate-fade-in">
            <Users className="w-10 h-10 text-gold" />
          </div>
          <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm animate-fade-in">
            Membership Program
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4 animate-fade-in-up">
            Give More. <br />
            <span className="text-gradient-gold">Get More.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-in-up delay-100">
            Join a community of change-makers. Unlock exclusive benefits, track your impact,
            and access partner deals — all while creating lasting change.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-8 animate-fade-in-up delay-200">
            <Link
              href="#tiers"
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <Award className="w-5 h-5" />
              View Membership Tiers
            </Link>
            <Link
              href="/register"
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              Join Now
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TIERS SECTION ================= */}
      <section id="tiers" className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Choose Your Tier
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
            Your membership tier is based on your lifetime giving. The more you give, 
            the more benefits you unlock.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className={`card-hover bg-white rounded-card p-6 shadow-sm border-2 flex flex-col relative ${
                  tier.popular ? tier.borderColor : "border-gray-100"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-ink text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                )}

                {/* Icon */}
                <div className={`${tier.bgColor} rounded-full p-3 w-fit mb-4`}>
                  <Icon className={`w-7 h-7 ${tier.color}`} />
                </div>

                {/* Name */}
                <h3 className="font-display text-2xl font-bold text-navy">
                  {tier.name}
                </h3>

                {/* Price */}
                <p className={`font-display text-3xl font-bold mt-2 ${tier.color}`}>
                  {tier.price}
                </p>
                <p className="text-ink/60 text-xs mt-1">{tier.requirement}</p>

                {/* Divider */}
                <div className="border-t border-gray-100 my-5"></div>

                {/* Benefits */}
                <ul className="space-y-3 flex-1">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${tier.color}`} />
                      <span className="text-ink/80 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/register"
                  className={`btn-lift w-full mt-6 font-semibold px-6 py-3 rounded-input transition-colors flex items-center justify-center gap-2 ${
                    tier.popular
                      ? "bg-gold text-ink hover:bg-gold/90"
                      : "bg-navy/5 text-navy hover:bg-navy/10"
                  }`}
                >
                  Get Started
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= BENEFIT CATEGORIES ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Member Benefits
            </h2>
            <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
              As a DHK LIFT member, you gain access to exclusive benefits across four categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitCategories.map((category, i) => {
              const Icon = category.icon;
              return (
                <div
                  key={i}
                  className="card-hover bg-cloud rounded-card p-6 border border-gray-100 text-center"
                >
                  <div className={`${category.bgColor} rounded-full p-4 w-fit mx-auto mb-4`}>
                    <Icon className={`w-7 h-7 ${category.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-navy text-lg">
                    {category.title}
                  </h3>
                  <p className="text-ink/70 text-sm mt-3 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            How It Works
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
            Becoming a member is simple. Just follow these three steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Create Account",
              description: "Sign up for free and join the DHK LIFT community.",
              icon: Users,
            },
            {
              step: "02",
              title: "Start Giving",
              description: "Donate to causes you care about and track your impact.",
              icon: Heart,
            },
            {
              step: "03",
              title: "Unlock Benefits",
              description: "As you give more, unlock higher tiers and exclusive benefits.",
              icon: Gift,
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-card p-8 border border-gray-100 card-hover text-center"
              >
                <div className="bg-navy text-white font-display font-bold text-2xl w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <Icon className="w-8 h-8 text-gold mx-auto mb-3" />
                <h3 className="font-display font-bold text-navy text-lg">{item.title}</h3>
                <p className="text-ink/70 text-sm mt-2 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-purple text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Ready to Join the Movement?
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Become a DHK LIFT member today and start unlocking exclusive benefits 
            while creating real change in the world.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/register"
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <Users className="w-5 h-5" />
              Join Now
            </Link>
            <Link
              href="/giving"
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Start Giving
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}