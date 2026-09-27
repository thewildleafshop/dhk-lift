import Link from "next/link";
import {
  Accessibility,
  ChevronRight,
  Eye,
  Ear,
  Keyboard,
  Smartphone,
  Monitor,
  CheckCircle,
  AlertCircle,
  Mail,
  FileText,
  Shield,
  Users,
  Heart,
} from "lucide-react";

// ============ ACCESSIBILITY FEATURES ============
const features = [
  {
    icon: Eye,
    title: "Visual Accessibility",
    description: "High contrast ratios, readable font sizes, and support for screen readers.",
    color: "text-gold",
    bgColor: "bg-gold/10",
    items: [
      "WCAG 2.2 AA compliant color contrast",
      "Minimum 16px body text",
      "Resizable text up to 200% without loss of content",
      "Alt text for all meaningful images",
      "No color as the sole means of conveying information",
    ],
  },
  {
    icon: Keyboard,
    title: "Keyboard Navigation",
    description: "Full keyboard support for all interactive elements and workflows.",
    color: "text-teal",
    bgColor: "bg-teal/10",
    items: [
      "Tab navigation through all interactive elements",
      "Visible focus indicators",
      "Skip to main content link",
      "Keyboard-accessible menus, dialogs, and forms",
      "No keyboard traps",
    ],
  },
  {
    icon: Ear,
    title: "Auditory Accessibility",
    description: "Support for users with hearing impairments.",
    color: "text-purple",
    bgColor: "bg-purple/10",
    items: [
      "Captions for video content where applicable",
      "Text alternatives for audio content",
      "Visual notifications alongside audio alerts",
      "No autoplay media",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile & Touch",
    description: "Optimized for mobile devices and touch interactions.",
    color: "text-navy",
    bgColor: "bg-navy/10",
    items: [
      "Responsive design for all screen sizes",
      "Touch targets of at least 44x44 pixels",
      "Pinch-to-zoom support",
      "Orientation support (portrait and landscape)",
    ],
  },
];

// ============ COMPLIANCE STANDARDS ============
const standards = [
  {
    title: "WCAG 2.2 AA",
    description: "We target Web Content Accessibility Guidelines 2.2 Level AA compliance.",
    icon: Shield,
  },
  {
    title: "Section 508",
    description: "We aim to comply with Section 508 of the Rehabilitation Act.",
    icon: FileText,
  },
  {
    title: "ADA Awareness",
    description: "We consider Americans with Disabilities Act principles in our design.",
    icon: Users,
  },
  {
    title: "Continuous Testing",
    description: "Regular audits and user testing with assistive technology users.",
    icon: CheckCircle,
  },
];

// ============ KNOWN LIMITATIONS ============
const limitations = [
  {
    title: "Third-Party Content",
    description: "Some partner-provided content may not fully meet our accessibility standards. We are working with partners to improve this.",
  },
  {
    title: "Legacy PDF Documents",
    description: "Some older PDF documents may not be fully accessible. We are converting them to accessible formats.",
  },
  {
    title: "Complex Data Visualizations",
    description: "Some charts and graphs may require additional text descriptions. We are adding these progressively.",
  },
];

// ============ ASSISTIVE TECHNOLOGIES ============
const assistiveTech = [
  "Screen Readers (NVDA, JAWS, VoiceOver)",
  "Screen Magnifiers",
  "Speech Recognition Software",
  "Keyboard-Only Navigation",
  "High Contrast Mode",
  "Reduced Motion Preferences",
];

// ============ MAIN COMPONENT ============
export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-cloud">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-container mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <div className="bg-gold/20 rounded-full p-4 w-fit mx-auto mb-6 animate-fade-in">
            <Accessibility className="w-10 h-10 text-gold" />
          </div>
          <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm animate-fade-in">
            Accessibility Statement
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4 animate-fade-in-up">
            Accessible to All. <br />
            <span className="text-gradient-gold">Designed for Everyone.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-in-up delay-100">
            DHK LIFT is committed to ensuring digital accessibility for people with disabilities. 
            We are continually improving the user experience for everyone.
          </p>
          <p className="text-white/60 text-sm mt-4">
            Last Updated: January 1, 2026
          </p>
        </div>
      </section>

      {/* ================= COMMITMENT ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="bg-white rounded-card p-6 md:p-10 shadow-sm border border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gold/10 rounded-full p-3 w-fit mx-auto mb-4">
              <Heart className="w-7 h-7 text-gold" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy">
              Our Commitment
            </h2>
            <p className="text-ink/80 mt-4 leading-relaxed">
              At DHK LIFT, we believe that access to help should never be limited by disability. 
              We are committed to making our platform accessible to everyone, regardless of ability. 
              This includes people with visual, auditory, motor, and cognitive disabilities.
            </p>
            <p className="text-ink/80 mt-4 leading-relaxed">
              We are actively working to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 
              Level AA standards and to make our platform usable with assistive technologies.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ACCESSIBILITY FEATURES ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Accessibility Features
            </h2>
            <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
              We have implemented the following accessibility features across our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="card-hover bg-cloud rounded-card p-6 md:p-8 border border-gray-100"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`${feature.bgColor} rounded-full p-3 shrink-0`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-navy text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-ink/70 text-sm mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 pl-4">
                    {feature.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-ink/80">
                        <CheckCircle className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= COMPLIANCE STANDARDS ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Compliance Standards
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
            We align with internationally recognized accessibility standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((standard, i) => {
            const Icon = standard.icon;
            return (
              <div
                key={i}
                className="card-hover bg-white rounded-card p-6 border border-gray-100 text-center"
              >
                <div className="bg-navy/5 rounded-full p-4 w-fit mx-auto mb-4">
                  <Icon className="w-7 h-7 text-navy" />
                </div>
                <h3 className="font-display font-bold text-navy text-base">
                  {standard.title}
                </h3>
                <p className="text-ink/70 text-sm mt-3 leading-relaxed">
                  {standard.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= ASSISTIVE TECHNOLOGIES ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-teal/10 rounded-full p-3 w-fit mb-4">
                <Monitor className="w-7 h-7 text-teal" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
                Assistive Technology Support
              </h2>
              <p className="text-ink/80 mt-4 leading-relaxed">
                Our platform is designed to work with commonly used assistive technologies. 
                We test regularly with the following tools:
              </p>
              <ul className="mt-6 space-y-3">
                {assistiveTech.map((tech, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
                    <span className="text-ink/80">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-navy text-white rounded-card p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <Accessibility className="w-10 h-10 text-gold mb-4" />
                <h3 className="font-display text-2xl font-bold">
                  Need an Accommodation?
                </h3>
                <p className="text-white/80 mt-3 leading-relaxed text-sm">
                  If you need a specific accommodation to use our platform, or if you encounter 
                  accessibility barriers, please contact us. We will work with you to provide 
                  an alternative way to access our services.
                </p>
                <Link
                  href="/contact"
                  className="btn-lift inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg mt-6 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Request Accommodation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= KNOWN LIMITATIONS ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <div className="bg-warning/10 rounded-full p-3 w-fit mx-auto mb-4">
            <AlertCircle className="w-7 h-7 text-warning" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            Known Limitations
          </h2>
          <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
            We are transparent about areas where we are still improving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {limitations.map((limitation, i) => (
            <div
              key={i}
              className="bg-white rounded-card p-6 border border-gray-100 card-hover"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-navy text-base">
                    {limitation.title}
                  </h3>
                  <p className="text-ink/70 text-sm mt-2 leading-relaxed">
                    {limitation.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEEDBACK ================= */}
      <section className="bg-purple text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="bg-white/10 rounded-full p-4 w-fit mx-auto mb-6">
              <Mail className="w-10 h-10 text-gold" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              We Welcome Your Feedback
            </h2>
            <p className="text-white/80 mt-4 leading-relaxed">
              Your feedback helps us improve. If you encounter any accessibility barriers 
              or have suggestions for improvement, please let us know.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Send Feedback
              </Link>
              <Link
                href="/faq"
                className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <FileText className="w-5 h-5" />
                View FAQs
              </Link>
            </div>
            <p className="text-white/60 text-sm mt-6">
              Email us at: <span className="text-gold font-semibold">accessibility@dhklift.org</span>
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}