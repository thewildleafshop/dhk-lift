import Link from "next/link";
import Image from "next/image";
import { 
  Heart, 
  Globe, 
  Users, 
  Shield, 
  Target, 
  Eye,
  ChevronRight,
  CheckCircle
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cloud">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm animate-fade-in">
            About DHK LIFT
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4 animate-fade-in-up">
            One Platform. <br />
            <span className="text-gradient-gold">Endless Impact.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-in-up delay-100">
            DHK LIFT is a global humanitarian platform connecting kind hearts with real needs. 
            We bring together donors, members, partners, and communities to create lasting change.
          </p>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white rounded-card p-8 md:p-10 shadow-sm border border-gray-100 card-hover">
            <div className="bg-gold/10 rounded-full p-4 w-fit mb-6">
              <Target className="w-8 h-8 text-gold" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy">
              Our Mission
            </h2>
            <p className="text-ink/70 mt-4 leading-relaxed">
              To provide a unified, transparent, and trustworthy platform that connects 
              individuals in need with the resources, healthcare, and support they deserve — 
              while empowering donors and partners to make a measurable impact.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-card p-8 md:p-10 shadow-sm border border-gray-100 card-hover">
            <div className="bg-purple/10 rounded-full p-4 w-fit mb-6">
              <Eye className="w-8 h-8 text-purple" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy">
              Our Vision
            </h2>
            <p className="text-ink/70 mt-4 leading-relaxed">
              A world where help reaches those who need it most — quickly, transparently, 
              and with dignity. We envision a global community where every act of kindness 
              creates a ripple of lasting change.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHO WE HELP ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Who We Help
            </h2>
            <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
              DHK LIFT serves individuals, families, and communities across the globe 
              through our seven core programs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Families in Need", desc: "Food, shelter, and essential support" },
              { icon: Users, title: "Children & Youth", desc: "Education and healthcare access" },
              { icon: Shield, title: "Vulnerable Communities", desc: "Protection and disaster relief" },
              { icon: Globe, title: "Global Communities", desc: "Cross-border humanitarian aid" },
            ].map((item, i) => (
              <div 
                key={i} 
                className="bg-cloud rounded-card p-6 text-center border border-gray-100 card-hover"
              >
                <div className="bg-navy/5 rounded-full p-4 w-fit mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-navy" />
                </div>
                <h3 className="font-display font-bold text-navy text-lg">{item.title}</h3>
                <p className="text-ink/60 text-sm mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR VALUES ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Our Values
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
            Everything we do is guided by these core principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              title: "Transparency", 
              desc: "Every donation, project, and outcome is tracked and publicly verifiable." 
            },
            { 
              title: "Dignity", 
              desc: "We treat every person with respect, protecting their privacy and humanity." 
            },
            { 
              title: "Accountability", 
              desc: "We hold ourselves and our partners to the highest standards of integrity." 
            },
            { 
              title: "Compassion", 
              desc: "We lead with empathy, understanding the real needs behind every request." 
            },
            { 
              title: "Collaboration", 
              desc: "We believe in the power of partnerships to multiply impact." 
            },
            { 
              title: "Innovation", 
              desc: "We use technology to make giving and receiving help simpler and faster." 
            },
          ].map((value, i) => (
            <div 
              key={i} 
              className="bg-white rounded-card p-6 border border-gray-100 card-hover"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-navy text-lg">{value.title}</h3>
                  <p className="text-ink/70 text-sm mt-2 leading-relaxed">{value.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-purple text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Join Us in Making a Difference
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Whether you want to give, receive help, or partner with us — there's a place for you at DHK LIFT.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link 
              href="/giving" 
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
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