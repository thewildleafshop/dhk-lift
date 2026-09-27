import Link from "next/link";
import Image from "next/image";
import { 
  Utensils, 
  BookOpen, 
  Stethoscope, 
  Home,
  HeartHandshake,
  Accessibility,
  Users,
  ChevronRight
} from "lucide-react";

// 7 LIFT Programs Data
const programs = [
  {
    id: "lift-health",
    name: "LIFT Health",
    icon: Stethoscope,
    image: "/images/programs/healthcare.png",
    shortDesc: "Access to quality healthcare and medical support for underserved communities.",
    color: "text-teal",
    bgColor: "bg-teal/10",
    href: "/programs/lift-health",
  },
  {
    id: "lift-protect",
    name: "LIFT Protect",
    icon: HeartHandshake,
    image: "/images/programs/familu.png",
    shortDesc: "Confidential support for women and children affected by abuse and exploitation.",
    color: "text-purple",
    bgColor: "bg-purple/10",
    href: "/programs/lift-protect",
  },
  {
    id: "lift-ability",
    name: "LIFT Ability",
    icon: Accessibility,
    image: "/images/programs/disasterRelief.png",
    shortDesc: "Medical equipment, mobility aids, and support for people with disabilities.",
    color: "text-navy",
    bgColor: "bg-navy/10",
    href: "/programs/lift-ability",
  },
  {
    id: "lift-community",
    name: "LIFT Community",
    icon: Users,
    image: "/images/programs/communityVolunteers.png",
    shortDesc: "Building stronger communities through local partnerships and volunteer programs.",
    color: "text-gold",
    bgColor: "bg-gold/10",
    href: "/programs/lift-community",
  },
  {
    id: "children-families",
    name: "Children & Families",
    icon: Home,
    image: "/images/stories/volunteer.png",
    shortDesc: "Supporting children and families with food, shelter, and essential needs.",
    color: "text-purple",
    bgColor: "bg-purple/10",
    href: "/programs/children-families",
  },
  {
    id: "food-security",
    name: "Food Security",
    icon: Utensils,
    image: "/images/programs/foodDonation.png",
    shortDesc: "Providing nutritious meals to families facing hunger and malnutrition.",
    color: "text-gold",
    bgColor: "bg-gold/10",
    href: "/programs/food-security",
  },
  {
    id: "education-support",
    name: "Education Support",
    icon: BookOpen,
    image: "/images/programs/education.png",
    shortDesc: "Helping children access quality education and learning resources.",
    color: "text-teal",
    bgColor: "bg-teal/10",
    href: "/programs/education",
  },
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-cloud">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm animate-fade-in">
            Our Programs
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4 animate-fade-in-up">
            Seven Programs. <br />
            <span className="text-gradient-gold">One Mission.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-in-up delay-100">
            DHK LIFT delivers aid through seven core programs — each designed to address 
            a specific need and create lasting impact in communities worldwide.
          </p>
        </div>
      </section>

      {/* ================= PROGRAMS GRID ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <Link
                key={program.id}
                href={program.href}
                className="card-hover bg-white rounded-card shadow-sm overflow-hidden border border-gray-100 group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Icon Badge */}
                  <div className={`absolute top-4 left-4 ${program.bgColor} backdrop-blur-sm rounded-full p-3`}>
                    <Icon className={`w-6 h-6 ${program.color}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-navy text-xl">
                    {program.name}
                  </h3>
                  <p className="text-ink/70 text-sm mt-3 leading-relaxed flex-1">
                    {program.shortDesc}
                  </p>
                  <div className="mt-5 flex items-center gap-1 text-gold font-semibold text-sm group-hover:gap-2 transition-all">
                    Learn More <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-purple text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Ready to Make a Difference?
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Your support powers all seven programs. Donate today or apply for assistance 
            — every action creates lasting change.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link 
              href="/giving" 
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              Donate Now
            </Link>
            <Link 
              href="/assistance" 
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              Apply for Assistance
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}