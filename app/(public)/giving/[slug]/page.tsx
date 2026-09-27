import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
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
  Zap,
  Shield,
  CheckCircle,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";

// Causes Data (Full Details)
const causesData: Record<string, {
  id: string;
  name: string;
  icon: any;
  image: string;
  tagline: string;
  description: string;
  longDescription: string;
  raised: number;
  goal: number;
  donors: number;
  daysLeft: number;
  color: string;
  bgColor: string;
  impactPoints: { amount: string; impact: string }[];
  whyItMatters: string[];
}> = {
  "where-needed-most": {
    id: "where-needed-most",
    name: "Where Needed Most",
    icon: Zap,
    image: "/images/programs/communityVolunteers.png",
    tagline: "Maximum Impact. Maximum Flexibility.",
    description: "Let us direct your donation to the most urgent needs across all programs.",
    longDescription: "When you give to 'Where Needed Most', you allow DHK LIFT to respond quickly to emergencies, fill funding gaps, and direct resources to the areas of greatest need. This is the most powerful way to give — because it ensures your donation goes exactly where it's needed, when it's needed.",
    raised: 45000,
    goal: 100000,
    donors: 342,
    daysLeft: 45,
    color: "text-gold",
    bgColor: "bg-gold/10",
    impactPoints: [
      { amount: "$25", impact: "Provides emergency food for a family for a week" },
      { amount: "$50", impact: "Covers basic medical supplies for a clinic" },
      { amount: "$100", impact: "Funds school supplies for 5 children" },
      { amount: "$500", impact: "Supports a community project for a month" },
    ],
    whyItMatters: [
      "Fastest response to emergencies",
      "Fills critical funding gaps",
      "Supports all 7 LIFT programs",
      "Maximum flexibility, maximum impact",
    ],
  },
  "lift-health": {
    id: "lift-health",
    name: "LIFT Health",
    icon: Stethoscope,
    image: "/images/programs/healthcare.png",
    tagline: "Healthcare for Everyone",
    description: "Provide medical care, disease funds, and healthcare access to those in need.",
    longDescription: "LIFT Health provides access to quality healthcare and medical support for underserved communities. From disease funds to medical equipment, we ensure no one is left behind when it comes to their health. Your donation directly funds treatments, medications, and medical equipment for patients who cannot afford them.",
    raised: 82000,
    goal: 150000,
    donors: 587,
    daysLeft: 30,
    color: "text-teal",
    bgColor: "bg-teal/10",
    impactPoints: [
      { amount: "$25", impact: "Provides basic medication for a patient for a month" },
      { amount: "$50", impact: "Covers a doctor's consultation and tests" },
      { amount: "$100", impact: "Funds a week of treatment for a chronic patient" },
      { amount: "$500", impact: "Provides a wheelchair for a disabled person" },
    ],
    whyItMatters: [
      "12 disease funds actively supporting patients",
      "Verified healthcare provider network",
      "Direct payment to hospitals and pharmacies",
      "Full transparency with medical documentation",
    ],
  },
  "lift-protect": {
    id: "lift-protect",
    name: "LIFT Protect",
    icon: HeartHandshake,
    image: "/images/programs/familu.png",
    tagline: "Safety. Dignity. Hope.",
    description: "Support women and children affected by abuse, exploitation, and trafficking.",
    longDescription: "LIFT Protect offers confidential support for women and children affected by abuse, exploitation, trafficking, and forced marriage. We work with trusted partners to provide safety, legal aid, and rehabilitation. Your donation helps provide safe shelter, counseling, and legal support for survivors.",
    raised: 35000,
    goal: 80000,
    donors: 234,
    daysLeft: 60,
    color: "text-purple",
    bgColor: "bg-purple/10",
    impactPoints: [
      { amount: "$25", impact: "Provides a week of counseling for a survivor" },
      { amount: "$50", impact: "Covers legal aid consultation" },
      { amount: "$100", impact: "Funds a month of safe shelter" },
      { amount: "$500", impact: "Supports a full rehabilitation program" },
    ],
    whyItMatters: [
      "100% confidential case management",
      "Verified partner organizations only",
      "Legal support and advocacy",
      "Complete privacy and dignity protection",
    ],
  },
  "lift-ability": {
    id: "lift-ability",
    name: "LIFT Ability",
    icon: Accessibility,
    image: "/images/programs/disasterRelief.png",
    tagline: "Empowering Every Ability",
    description: "Provide wheelchairs, prosthetics, and medical equipment to those with disabilities.",
    longDescription: "LIFT Ability provides medical equipment, mobility aids, and support for people with disabilities. We help individuals regain independence and live with dignity. Your donation directly funds wheelchairs, prosthetics, and home medical equipment for those who need them.",
    raised: 28000,
    goal: 60000,
    donors: 189,
    daysLeft: 40,
    color: "text-navy",
    bgColor: "bg-navy/10",
    impactPoints: [
      { amount: "$25", impact: "Provides mobility aids (crutches, walkers)" },
      { amount: "$50", impact: "Covers maintenance for medical equipment" },
      { amount: "$100", impact: "Funds a prosthetic limb fitting" },
      { amount: "$500", impact: "Provides a wheelchair for a person in need" },
    ],
    whyItMatters: [
      "Direct equipment delivery to homes",
      "Medical assessment and follow-up",
      "Partner with verified providers",
      "Full tracking from request to delivery",
    ],
  },
  "lift-community": {
    id: "lift-community",
    name: "LIFT Community",
    icon: Users,
    image: "/images/programs/communityVolunteers.png",
    tagline: "Stronger Together",
    description: "Fund community projects and volunteer-led initiatives worldwide.",
    longDescription: "LIFT Community builds stronger communities through local partnerships and volunteer programs. We empower grassroots initiatives to create lasting local change. Your donation funds community projects, volunteer training, and local infrastructure.",
    raised: 15000,
    goal: 50000,
    donors: 98,
    daysLeft: 55,
    color: "text-gold",
    bgColor: "bg-gold/10",
    impactPoints: [
      { amount: "$25", impact: "Provides supplies for a community event" },
      { amount: "$50", impact: "Funds a week of volunteer coordination" },
      { amount: "$100", impact: "Supports a local community project" },
      { amount: "$500", impact: "Funds a full community initiative" },
    ],
    whyItMatters: [
      "Direct support to grassroots organizations",
      "Local ownership and sustainability",
      "Verified partner network",
      "Measurable community impact",
    ],
  },
  "children-families": {
    id: "children-families",
    name: "Children & Families",
    icon: Home,
    image: "/images/stories/volunteer.png",
    tagline: "Building Brighter Futures",
    description: "Support vulnerable children and families with food, shelter, and education.",
    longDescription: "Children & Families program supports vulnerable children and families with food, shelter, education, and essential needs. We focus on breaking the cycle of poverty. Your donation provides direct support to families in crisis — from emergency food to school fees.",
    raised: 67000,
    goal: 120000,
    donors: 423,
    daysLeft: 35,
    color: "text-purple",
    bgColor: "bg-purple/10",
    impactPoints: [
      { amount: "$25", impact: "Provides school supplies for a child" },
      { amount: "$50", impact: "Covers a month of meals for a family" },
      { amount: "$100", impact: "Funds school fees for a child" },
      { amount: "$500", impact: "Provides shelter support for a family" },
    ],
    whyItMatters: [
      "Focus on breaking the cycle of poverty",
      "Support for orphans and vulnerable children",
      "Education as a path to independence",
      "Verified family needs assessment",
    ],
  },
  "food-security": {
    id: "food-security",
    name: "Food Security",
    icon: Utensils,
    image: "/images/programs/foodDonation.png",
    tagline: "No One Goes Hungry",
    description: "Provide nutritious meals to families facing hunger and malnutrition.",
    longDescription: "Food Security program provides nutritious meals to families facing hunger and malnutrition. We partner with local kitchens and food banks to deliver immediate relief. Your donation directly funds meals, food packages, and nutritional supplements for families in need.",
    raised: 95000,
    goal: 150000,
    donors: 712,
    daysLeft: 20,
    color: "text-gold",
    bgColor: "bg-gold/10",
    impactPoints: [
      { amount: "$25", impact: "Provides 10 meals for families in need" },
      { amount: "$50", impact: "Feeds a family for a week" },
      { amount: "$100", impact: "Provides a month of meals for a family" },
      { amount: "$500", impact: "Funds a community kitchen for a day" },
    ],
    whyItMatters: [
      "Immediate relief for hunger",
      "Support for local community kitchens",
      "Focus on child nutrition",
      "Sustainable agricultural support",
    ],
  },
  "education-support": {
    id: "education-support",
    name: "Education Support",
    icon: BookOpen,
    image: "/images/programs/education.png",
    tagline: "Knowledge Changes Everything",
    description: "Help children access quality education and learning resources.",
    longDescription: "Education Support program helps children access quality education and learning resources. We believe education is the most powerful tool to break the cycle of poverty. Your donation funds school fees, supplies, and educational infrastructure for underserved communities.",
    raised: 42000,
    goal: 90000,
    donors: 267,
    daysLeft: 50,
    color: "text-teal",
    bgColor: "bg-teal/10",
    impactPoints: [
      { amount: "$25", impact: "Provides books and supplies for a child" },
      { amount: "$50", impact: "Covers a month of school fees" },
      { amount: "$100", impact: "Funds a full term of education" },
      { amount: "$500", impact: "Supports a classroom for a month" },
    ],
    whyItMatters: [
      "Education breaks the cycle of poverty",
      "Focus on girls' education",
      "Support for crisis-affected regions",
      "Verified school partnerships",
    ],
  },
};

// Generate static params
export function generateStaticParams() {
  return Object.keys(causesData).map((slug) => ({
    slug: slug,
  }));
}

export default async function DonationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cause = causesData[slug];

  if (!cause) {
    notFound();
  }

  const Icon = cause.icon;
  const progress = Math.round((cause.raised / cause.goal) * 100);

  return (
    <main className="min-h-screen bg-cloud">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-12 md:py-16 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-sm mb-6 animate-fade-in">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/giving" className="hover:text-gold transition-colors">Giving</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">{cause.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Text */}
            <div className="animate-slide-in-left">
              <div className={`${cause.bgColor} rounded-full p-4 w-fit mb-6`}>
                <Icon className={`w-10 h-10 ${cause.color}`} />
              </div>
              <p className="text-gold font-semibold tracking-wider uppercase text-sm">
                {cause.tagline}
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-3">
                {cause.name}
              </h1>
              <p className="text-lg text-white/80 mt-6 leading-relaxed max-w-lg">
                {cause.longDescription}
              </p>
            </div>

            {/* Right: Donation Card */}
            <div className="bg-white rounded-card shadow-2xl p-6 md:p-8 animate-fade-in delay-200" id="donate">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-display text-3xl font-bold text-navy">
                    ${cause.raised.toLocaleString()}
                  </span>
                  <span className="text-ink/60 text-sm">
                    of ${cause.goal.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-gold to-gold/70 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-ink/60 mt-2">
                  <span>{progress}% funded</span>
                  <span>{cause.donors} donors</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-cloud rounded-card p-3 text-center">
                  <Clock className="w-5 h-5 text-navy mx-auto mb-1" />
                  <p className="font-display text-xl font-bold text-navy">{cause.daysLeft}</p>
                  <p className="text-ink/60 text-xs">Days Left</p>
                </div>
                <div className="bg-cloud rounded-card p-3 text-center">
                  <Users className="w-5 h-5 text-navy mx-auto mb-1" />
                  <p className="font-display text-xl font-bold text-navy">{cause.donors}</p>
                  <p className="text-ink/60 text-xs">Donors</p>
                </div>
              </div>

              {/* Donation Form */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-navy text-lg">
                  Make a Donation
                </h3>

                {/* Amount Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {["$25", "$50", "$100"].map((amount) => (
                    <button
                      key={amount}
                      className="border-2 border-gray-200 text-navy font-semibold py-3 rounded-input hover:border-gold hover:bg-gold/5 transition-all"
                    >
                      {amount}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/60 font-semibold">$</span>
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    className="w-full pl-8 pr-4 py-3.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink"
                  />
                </div>

                {/* Donate Button */}
                <Link
                  href={`/giving/${cause.id}/checkout`}
                  className="btn-lift w-full bg-gold text-ink font-bold px-6 py-4 rounded-input hover:bg-gold/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Heart className="w-5 h-5" />
                  Donate Now
                </Link>

                {/* Security Note */}
                <div className="flex items-center justify-center gap-2 text-xs text-ink/50">
                  <Shield className="w-3 h-3" />
                  <span>Secure payment • 100% goes to cause</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IMPACT POINTS ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Your Impact
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
            See exactly what your donation can achieve.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cause.impactPoints.map((point, i) => (
            <div 
              key={i} 
              className="bg-white rounded-card p-6 border border-gray-100 card-hover text-center"
            >
              <div className="bg-gold/10 rounded-full p-3 w-fit mx-auto mb-4">
                <Award className="w-6 h-6 text-gold" />
              </div>
              <p className="font-display text-2xl font-bold text-navy">{point.amount}</p>
              <p className="text-ink/70 text-sm mt-2 leading-relaxed">{point.impact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY IT MATTERS ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
                Why It Matters
              </h2>
              <p className="text-ink/70 mt-4 leading-relaxed">
                Your support for {cause.name} creates measurable, lasting change. 
                Here's why this cause deserves your attention.
              </p>
              <ul className="mt-6 space-y-4">
                {cause.whyItMatters.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
                    <span className="text-ink/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-card overflow-hidden shadow-2xl">
              <Image
                src={cause.image}
                alt={cause.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRANSPARENCY ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="bg-navy text-white rounded-card p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Shield className="w-10 h-10 text-gold mx-auto mb-4" />
              <h3 className="font-display font-bold text-xl">100% Transparent</h3>
              <p className="text-white/70 text-sm mt-2">
                Track exactly where your donation goes with verified proof.
              </p>
            </div>
            <div>
              <TrendingUp className="w-10 h-10 text-gold mx-auto mb-4" />
              <h3 className="font-display font-bold text-xl">Verified Impact</h3>
              <p className="text-white/70 text-sm mt-2">
                Every project milestone is documented and publicly verifiable.
              </p>
            </div>
            <div>
              <Heart className="w-10 h-10 text-gold mx-auto mb-4" />
              <h3 className="font-display font-bold text-xl">Direct Support</h3>
              <p className="text-white/70 text-sm mt-2">
                Your donation goes directly to the cause with minimal overhead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OTHER CAUSES CTA ================= */}
      <section className="bg-purple text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Explore More Causes
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            There are many ways to make a difference. Discover other programs that 
            align with your values.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link 
              href="/giving" 
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              View All Causes
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