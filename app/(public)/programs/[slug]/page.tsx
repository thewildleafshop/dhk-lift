import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Utensils,
  BookOpen,
  Stethoscope,
  Home,
  HeartHandshake,
  Accessibility,
  Users,
  ChevronRight,
  CheckCircle,
  Heart,
  Target,
  TrendingUp,
  FileText,
} from "lucide-react";

// 7 LIFT Programs Data (Full Details)
const programsData: Record<string, {
  id: string;
  name: string;
  icon: any;
  image: string;
  tagline: string;
  description: string;
  color: string;
  bgColor: string;
  whoItHelps: string[];
  assistanceTypes: string[];
  eligibility: string[];
  impact: { stat: string; label: string }[];
}> = {
  "lift-health": {
    id: "lift-health",
    name: "LIFT Health",
    icon: Stethoscope,
    image: "/images/programs/healthcare.png",
    tagline: "Healthcare for Everyone",
    description: "LIFT Health provides access to quality healthcare and medical support for underserved communities. From disease funds to medical equipment, we ensure no one is left behind when it comes to their health.",
    color: "text-teal",
    bgColor: "bg-teal/10",
    whoItHelps: [
      "Patients with chronic or life-threatening diseases",
      "Families unable to afford medical treatment",
      "Communities without healthcare access",
      "Individuals requiring medical equipment",
    ],
    assistanceTypes: [
      "Disease-specific funds (cancer, heart, kidney)",
      "Medical equipment & mobility aids",
      "Healthcare provider partnerships",
      "Prescription medication support",
    ],
    eligibility: [
      "Must be a verified applicant",
      "Medical documentation required",
      "Financial need assessment",
      "Residency in supported regions",
    ],
    impact: [
      { stat: "5,000+", label: "Patients Helped" },
      { stat: "$2M+", label: "Medical Aid Distributed" },
      { stat: "12", label: "Disease Funds Active" },
    ],
  },
  "lift-protect": {
    id: "lift-protect",
    name: "LIFT Protect",
    icon: HeartHandshake,
    image: "/images/programs/familu.png",
    tagline: "Safety. Dignity. Hope.",
    description: "LIFT Protect offers confidential support for women and children affected by abuse, exploitation, trafficking, and forced marriage. We work with trusted partners to provide safety, legal aid, and rehabilitation.",
    color: "text-purple",
    bgColor: "bg-purple/10",
    whoItHelps: [
      "Women and children affected by abuse",
      "Survivors of trafficking and exploitation",
      "Victims of forced or child marriage",
      "Vulnerable individuals in crisis situations",
    ],
    assistanceTypes: [
      "Confidential case management",
      "Legal support and advocacy",
      "Safe shelter and rehabilitation",
      "Counseling and psychological support",
    ],
    eligibility: [
      "Referred by verified partner organizations",
      "Strict confidentiality protocols",
      "Case-by-case assessment",
      "No public disclosure required",
    ],
    impact: [
      { stat: "1,200+", label: "Lives Protected" },
      { stat: "50+", label: "Partner Organizations" },
      { stat: "24/7", label: "Support Available" },
    ],
  },
  "lift-ability": {
    id: "lift-ability",
    name: "LIFT Ability",
    icon: Accessibility,
    image: "/images/programs/disasterRelief.png",
    tagline: "Empowering Every Ability",
    description: "LIFT Ability provides medical equipment, mobility aids, and support for people with disabilities. We help individuals regain independence and live with dignity.",
    color: "text-navy",
    bgColor: "bg-navy/10",
    whoItHelps: [
      "People with physical disabilities",
      "Individuals requiring mobility aids",
      "Patients recovering from injury",
      "Families supporting disabled members",
    ],
    assistanceTypes: [
      "Wheelchairs and mobility equipment",
      "Prosthetics and orthotics",
      "Home medical equipment",
      "Respiratory support devices",
    ],
    eligibility: [
      "Medical assessment required",
      "Equipment request form",
      "Delivery address verification",
      "Follow-up confirmation",
    ],
    impact: [
      { stat: "3,500+", label: "Equipment Provided" },
      { stat: "800+", label: "Wheelchairs Delivered" },
      { stat: "40+", label: "Countries Served" },
    ],
  },
  "lift-community": {
    id: "lift-community",
    name: "LIFT Community",
    icon: Users,
    image: "/images/programs/communityVolunteers.png",
    tagline: "Stronger Together",
    description: "LIFT Community builds stronger communities through local partnerships and volunteer programs. We empower grassroots initiatives to create lasting local change.",
    color: "text-gold",
    bgColor: "bg-gold/10",
    whoItHelps: [
      "Local community organizations",
      "Volunteer-led initiatives",
      "Grassroots NGOs",
      "Community development projects",
    ],
    assistanceTypes: [
      "Community project funding",
      "Volunteer coordination",
      "Local partnership support",
      "Capacity building programs",
    ],
    eligibility: [
      "Registered community organization",
      "Project proposal required",
      "Local impact assessment",
      "Partner verification",
    ],
    impact: [
      { stat: "150+", label: "Community Projects" },
      { stat: "2,000+", label: "Volunteers Active" },
      { stat: "25+", label: "Countries" },
    ],
  },
  "children-families": {
    id: "children-families",
    name: "Children & Families",
    icon: Home,
    image: "/images/stories/volunteer.png",
    tagline: "Building Brighter Futures",
    description: "Children & Families program supports vulnerable children and families with food, shelter, education, and essential needs. We focus on breaking the cycle of poverty.",
    color: "text-purple",
    bgColor: "bg-purple/10",
    whoItHelps: [
      "Orphans and vulnerable children",
      "Single-parent families",
      "Families in crisis",
      "Refugee and displaced families",
    ],
    assistanceTypes: [
      "Food and nutrition support",
      "Shelter and housing aid",
      "School fees and supplies",
      "Essential household items",
    ],
    eligibility: [
      "Family needs assessment",
      "Children's documentation",
      "Financial hardship verification",
      "Local partner referral",
    ],
    impact: [
      { stat: "10,000+", label: "Families Supported" },
      { stat: "5,000+", label: "Children in School" },
      { stat: "1M+", label: "Meals Provided" },
    ],
  },
  "food-security": {
    id: "food-security",
    name: "Food Security",
    icon: Utensils,
    image: "/images/programs/foodDonation.png",
    tagline: "No One Goes Hungry",
    description: "Food Security program provides nutritious meals to families facing hunger and malnutrition. We partner with local kitchens and food banks to deliver immediate relief.",
    color: "text-gold",
    bgColor: "bg-gold/10",
    whoItHelps: [
      "Families facing food insecurity",
      "Malnourished children",
      "Elderly individuals without support",
      "Communities in crisis",
    ],
    assistanceTypes: [
      "Emergency food packages",
      "Community kitchen support",
      "Nutritional supplements",
      "Agricultural support",
    ],
    eligibility: [
      "Household needs assessment",
      "Local community verification",
      "Regular distribution schedule",
      "Partner organization referral",
    ],
    impact: [
      { stat: "500,000+", label: "Meals Served" },
      { stat: "8,000+", label: "Families Fed Monthly" },
      { stat: "20+", label: "Community Kitchens" },
    ],
  },
  "education-support": {
    id: "education-support",
    name: "Education Support",
    icon: BookOpen,
    image: "/images/programs/education.png",
    tagline: "Knowledge Changes Everything",
    description: "Education Support program helps children access quality education and learning resources. We believe education is the most powerful tool to break the cycle of poverty.",
    color: "text-teal",
    bgColor: "bg-teal/10",
    whoItHelps: [
      "Children from low-income families",
      "Orphans and vulnerable youth",
      "Girls facing barriers to education",
      "Students in crisis-affected regions",
    ],
    assistanceTypes: [
      "School fees and tuition",
      "Books, uniforms, and supplies",
      "Scholarships and stipends",
      "School infrastructure support",
    ],
    eligibility: [
      "Student enrollment proof",
      "Family financial assessment",
      "Academic progress tracking",
      "Local school partnership",
    ],
    impact: [
      { stat: "5,000+", label: "Students Supported" },
      { stat: "200+", label: "Schools Partnered" },
      { stat: "95%", label: "Completion Rate" },
    ],
  },
};

// Generate static params for all programs
export function generateStaticParams() {
  return Object.keys(programsData).map((slug) => ({
    slug: slug,
  }));
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programsData[slug];

  if (!program) {
    notFound();
  }

  const Icon = program.icon;

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
            <Link href="/programs" className="hover:text-gold transition-colors">Programs</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">{program.name}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="animate-slide-in-left">
              <div className={`${program.bgColor} rounded-full p-4 w-fit mb-6`}>
                <Icon className={`w-10 h-10 ${program.color}`} />
              </div>
              <p className="text-gold font-semibold tracking-wider uppercase text-sm">
                {program.tagline}
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-3">
                {program.name}
              </h1>
              <p className="text-lg text-white/80 mt-6 leading-relaxed max-w-lg">
                {program.description}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <Link 
                  href={`/assistance?program=${program.id}`}
                  className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Apply for Assistance
                </Link>
                <Link 
                  href={`/giving?program=${program.id}`}
                  className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Donate to This Program
                </Link>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative h-[300px] md:h-[400px] rounded-card overflow-hidden shadow-2xl animate-fade-in delay-300">
              <Image
                src={program.image}
                alt={program.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= IMPACT STATS ================= */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {program.impact.map((item, i) => (
              <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <p className="font-display text-4xl md:text-5xl font-bold text-navy">{item.stat}</p>
                <p className="text-ink/70 mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DETAILS GRID ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Who It Helps */}
          <div className="bg-white rounded-card p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-navy/10 rounded-full p-3">
                <Users className="w-6 h-6 text-navy" />
              </div>
              <h2 className="font-display text-2xl font-bold text-navy">Who It Helps</h2>
            </div>
            <ul className="space-y-3">
              {program.whoItHelps.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
                  <span className="text-ink/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Assistance Types */}
          <div className="bg-white rounded-card p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gold/10 rounded-full p-3">
                <Target className="w-6 h-6 text-gold" />
              </div>
              <h2 className="font-display text-2xl font-bold text-navy">Assistance Types</h2>
            </div>
            <ul className="space-y-3">
              {program.assistanceTypes.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <span className="text-ink/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility */}
          <div className="bg-white rounded-card p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-teal/10 rounded-full p-3">
                <FileText className="w-6 h-6 text-teal" />
              </div>
              <h2 className="font-display text-2xl font-bold text-navy">Eligibility</h2>
            </div>
            <ul className="space-y-3">
              {program.eligibility.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
                  <span className="text-ink/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact Highlight */}
          <div className={`${program.bgColor} rounded-card p-8 border border-gray-100`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white rounded-full p-3">
                <TrendingUp className={`w-6 h-6 ${program.color}`} />
              </div>
              <h2 className="font-display text-2xl font-bold text-navy">Our Impact</h2>
            </div>
            <p className="text-ink/70 leading-relaxed">
              Through {program.name}, we've created measurable change in communities worldwide. 
              Every contribution — whether time, resources, or funding — directly supports our mission.
            </p>
            <Link 
              href="/impact" 
              className="inline-flex items-center gap-2 text-navy font-semibold mt-6 hover:text-gold transition-colors"
            >
              View Full Impact Report
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-purple text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Support {program.name}
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Your contribution directly powers this program. Every donation creates lasting change 
            for those who need it most.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link 
              href={`/giving?program=${program.id}`}
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Donate Now
            </Link>
            <Link 
              href="/programs" 
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              View All Programs
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}