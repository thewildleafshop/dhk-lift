import Link from "next/link";
import Image from "next/image";
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
  Zap
} from "lucide-react";

// Causes Data (Programs + Special Campaigns)
const causes = [
  {
    id: "where-needed-most",
    name: "Where Needed Most",
    icon: Zap,
    image: "/images/programs/communityVolunteers.png",
    description: "Let us direct your donation to the most urgent needs across all programs.",
    raised: 45000,
    goal: 100000,
    color: "text-gold",
    bgColor: "bg-gold/10",
    href: "/giving/where-needed-most",
  },
  {
    id: "lift-health",
    name: "LIFT Health",
    icon: Stethoscope,
    image: "/images/programs/healthcare.png",
    description: "Provide medical care, disease funds, and healthcare access to those in need.",
    raised: 82000,
    goal: 150000,
    color: "text-teal",
    bgColor: "bg-teal/10",
    href: "/giving/lift-health",
  },
  {
    id: "lift-protect",
    name: "LIFT Protect",
    icon: HeartHandshake,
    image: "/images/programs/familu.png",
    description: "Support women and children affected by abuse, exploitation, and trafficking.",
    raised: 35000,
    goal: 80000,
    color: "text-purple",
    bgColor: "bg-purple/10",
    href: "/giving/lift-protect",
  },
  {
    id: "lift-ability",
    name: "LIFT Ability",
    icon: Accessibility,
    image: "/images/programs/disasterRelief.png",
    description: "Provide wheelchairs, prosthetics, and medical equipment to those with disabilities.",
    raised: 28000,
    goal: 60000,
    color: "text-navy",
    bgColor: "bg-navy/10",
    href: "/giving/lift-ability",
  },
  {
    id: "lift-community",
    name: "LIFT Community",
    icon: Users,
    image: "/images/programs/communityVolunteers.png",
    description: "Fund community projects and volunteer-led initiatives worldwide.",
    raised: 15000,
    goal: 50000,
    color: "text-gold",
    bgColor: "bg-gold/10",
    href: "/giving/lift-community",
  },
  {
    id: "children-families",
    name: "Children & Families",
    icon: Home,
    image: "/images/stories/volunteer.png",
    description: "Support vulnerable children and families with food, shelter, and education.",
    raised: 67000,
    goal: 120000,
    color: "text-purple",
    bgColor: "bg-purple/10",
    href: "/giving/children-families",
  },
  {
    id: "food-security",
    name: "Food Security",
    icon: Utensils,
    image: "/images/programs/foodDonation.png",
    description: "Provide nutritious meals to families facing hunger and malnutrition.",
    raised: 95000,
    goal: 150000,
    color: "text-gold",
    bgColor: "bg-gold/10",
    href: "/giving/food-security",
  },
  {
    id: "education-support",
    name: "Education Support",
    icon: BookOpen,
    image: "/images/programs/education.png",
    description: "Help children access quality education and learning resources.",
    raised: 42000,
    goal: 90000,
    color: "text-teal",
    bgColor: "bg-teal/10",
    href: "/giving/education-support",
  },
];

export default function GivingPage() {
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
      {/* ✅ id="causes" add kiya taake Start Giving button yahan scroll kare */}
      <section id="causes" className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Choose Your Cause
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
            Browse our programs and special campaigns. Select one or multiple causes to support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {causes.map((cause) => {
            const Icon = cause.icon;
            const progress = Math.round((cause.raised / cause.goal) * 100);
            
            return (
              <div
                key={cause.id}
                className="card-hover bg-white rounded-card shadow-sm overflow-hidden border border-gray-100 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden group">
                  <img
                    src={cause.image}
                    alt={cause.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Icon Badge */}
                  <div className={`absolute top-4 left-4 ${cause.bgColor} backdrop-blur-sm rounded-full p-3`}>
                    <Icon className={`w-5 h-5 ${cause.color}`} />
                  </div>
                  {/* Progress Badge */}
                  <div className="absolute top-4 right-4 bg-navy/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {progress}% Funded
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-navy text-xl">
                    {cause.name}
                  </h3>
                  <p className="text-ink/70 text-sm mt-3 leading-relaxed flex-1">
                    {cause.description}
                  </p>

                  {/* Progress Bar */}
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

                  {/* Actions */}
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
            {/* ✅ href="#causes" kar diya taake Choose Your Cause section par scroll ho */}
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