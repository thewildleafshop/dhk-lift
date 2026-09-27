"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Heart,
  FileText,
  Users,
  Shield,
  Stethoscope,
  Globe,
  MessageSquare,
  Mail,
  User,
} from "lucide-react";

// ============ FAQ CATEGORIES ============
const categories = [
  { id: "all", label: "All Questions", icon: HelpCircle },
  { id: "assistance", label: "Assistance", icon: Heart },
  { id: "giving", label: "Giving & Donations", icon: FileText },
  { id: "membership", label: "Membership", icon: Users },
  { id: "healthcare", label: "Healthcare", icon: Stethoscope },
  { id: "partnerships", label: "Partnerships", icon: Globe },
  { id: "privacy", label: "Privacy & Security", icon: Shield },
];

// ============ FAQ DATA ============
const faqs = [
  // Assistance
  {
    category: "assistance",
    question: "How do I apply for assistance?",
    answer: "You can apply for assistance by visiting our Assistance page, selecting the program that matches your needs, and filling out the multi-step application form. You'll need to provide personal information, household details, and supporting documents. The application takes about 15-20 minutes, and you can save your progress to complete it later.",
  },
  {
    category: "assistance",
    question: "What documents are required for an application?",
    answer: "Required documents vary by program but typically include: a valid ID (CNIC or passport), proof of income or financial statement, and any relevant medical reports or supporting documents. The application form will clearly list what's needed for your specific program.",
  },
  {
    category: "assistance",
    question: "How long does the application review take?",
    answer: "Application review typically takes 5-7 business days. However, emergency cases (marked as 'Emergency' in the urgency field) are prioritized and reviewed within 24-48 hours. You can track your application status in real-time through your dashboard.",
  },
  {
    category: "assistance",
    question: "Can I apply for multiple programs at once?",
    answer: "Yes, you can apply for multiple programs if you have different needs. Each application is reviewed independently. However, we recommend applying only for what you genuinely need, as this helps us serve more people.",
  },
  {
    category: "assistance",
    question: "What happens after I'm approved?",
    answer: "Once approved, you'll receive a notification in your dashboard and via email. The assistance is then processed based on the program type — direct payment to providers, equipment delivery, food packages, or financial disbursement. You'll receive specific instructions in your approval notification.",
  },

  // Giving
  {
    category: "giving",
    question: "How do I donate to a cause?",
    answer: "Visit our Giving page, browse the causes, and click 'Donate' on the cause you want to support. You can choose from preset amounts ($25, $50, $100, $250) or enter a custom amount. You can also add multiple causes to your cart and donate to all of them in one transaction.",
  },
  {
    category: "giving",
    question: "Is my donation tax-deductible?",
    answer: "Tax deductibility depends on your country of residence. DHK LIFT is a registered nonprofit, and we provide donation receipts for tax purposes. Please consult with a tax advisor in your country for specific guidance.",
  },
  {
    category: "giving",
    question: "Can I set up a recurring donation?",
    answer: "Yes! During checkout, simply select 'Monthly' instead of 'One-Time'. Your donation will automatically recur every month. You can manage or cancel recurring donations anytime from your dashboard under 'My Donations'.",
  },
  {
    category: "giving",
    question: "How do I know my donation is being used properly?",
    answer: "Transparency is core to our platform. Every project is documented with receipts, invoices, photos, and progress reports. You can track exactly where your donation goes through your dashboard and the public project pages. We also publish annual audits.",
  },
  {
    category: "giving",
    question: "Can I donate anonymously?",
    answer: "Yes! During checkout, simply check the 'Donate Anonymously' option. Your name won't appear in public donor lists, but you'll still receive receipts and impact updates.",
  },

  // Membership
  {
    category: "membership",
    question: "What is the DHK LIFT membership?",
    answer: "DHK LIFT membership is a tiered program that rewards your generosity with exclusive benefits. As your lifetime giving grows, you unlock higher tiers (Bronze, Silver, Gold, Platinum) with more benefits like partner deals, priority support, and exclusive event access.",
  },
  {
    category: "membership",
    question: "How do I move to a higher tier?",
    answer: "Tier progression is automatic based on your lifetime giving. Bronze (free) → Silver ($100+) → Gold ($500+) → Platinum ($2,500+). Once you reach a tier threshold, your new tier activates on your next login.",
  },
  {
    category: "membership",
    question: "How do I redeem member benefits?",
    answer: "Visit the Benefits page to see available deals. Click 'Redeem' on any benefit to generate a unique QR code or voucher code. Show the QR code at the partner outlet or enter the code online to redeem your benefit.",
  },
  {
    category: "membership",
    question: "Do benefits expire?",
    answer: "Yes, most benefits have expiration dates, which are clearly shown on each benefit card. We recommend redeeming benefits before they expire. Expired benefits cannot be reactivated.",
  },

  // Healthcare
  {
    category: "healthcare",
    question: "How do disease funds work?",
    answer: "Disease funds are dedicated pools of money for specific conditions (cancer, heart disease, kidney disease, etc.). Patients apply to the relevant fund, and approved applications receive direct payment to their healthcare provider or pharmacy.",
  },
  {
    category: "healthcare",
    question: "How are healthcare providers verified?",
    answer: "All healthcare providers (hospitals, clinics, pharmacies) go through a rigorous verification process including credential checks, license validation, and reference verification. Only verified providers can receive payments from DHK LIFT.",
  },
  {
    category: "healthcare",
    question: "Can I choose my own doctor or hospital?",
    answer: "Yes, as long as the provider is part of our verified network. If your preferred provider is not in our network, they can apply to join. We continuously expand our network to serve more communities.",
  },

  // Partnerships
  {
    category: "partnerships",
    question: "How do I become a partner?",
    answer: "Visit our Partnerships page and click 'Apply as Partner'. You'll need to submit your organization details, mission statement, leadership info, and supporting documents. The verification process takes 5-7 business days.",
  },
  {
    category: "partnerships",
    question: "What types of organizations can become partners?",
    answer: "We partner with NGOs, nonprofits, healthcare providers, pharmacies, educational institutions, and community organizations. All partners must be legally registered and able to provide proper documentation.",
  },
  {
    category: "partnerships",
    question: "How does project funding work for partners?",
    answer: "Verified partners can submit project proposals through the Partner Dashboard. Once approved, projects are published on our platform, and donors can contribute. Funds are released based on verified milestones and proof of progress.",
  },

  // Privacy
  {
    category: "privacy",
    question: "How is my personal information protected?",
    answer: "We use bank-level encryption (SSL/TLS) for all data transmission and storage. Your personal information is never sold or shared with third parties without your consent. Sensitive cases (like LIFT Protect) have additional layers of confidentiality.",
  },
  {
    category: "privacy",
    question: "Who can see my application?",
    answer: "Only authorized DHK LIFT staff and the specific program team can see your application. Your information is never shared publicly. For LIFT Protect cases, access is restricted to a specialized team with strict confidentiality protocols.",
  },
  {
    category: "privacy",
    question: "Can I delete my account?",
    answer: "Yes, you can delete your account from the Profile & Settings page. However, some data may be retained for legal and financial compliance purposes. Please review our Privacy Policy for details.",
  },
];

// ============ MAIN COMPONENT ============
export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-cloud">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-container mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <div className="bg-gold/20 rounded-full p-4 w-fit mx-auto mb-6 animate-fade-in">
            <HelpCircle className="w-10 h-10 text-gold" />
          </div>
          <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm animate-fade-in">
            Help Center
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4 animate-fade-in-up">
            Frequently Asked <br />
            <span className="text-gradient-gold">Questions.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-in-up delay-100">
            Find quick answers to common questions about DHK LIFT. 
            Can't find what you're looking for? Contact our support team.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8 animate-fade-in-up delay-200">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for answers..."
                className="w-full pl-14 pr-6 py-4 md:py-5 rounded-input border-0 bg-white text-ink placeholder:text-ink/40 focus:outline-none focus:ring-4 focus:ring-gold/30 shadow-2xl text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY FILTERS ================= */}
      <section className="max-w-container mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-card p-3 shadow-lg border border-gray-100">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-navy text-white shadow-sm"
                      : "bg-cloud text-ink/70 hover:bg-navy/5 hover:text-navy"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FAQ LIST ================= */}
      <section className="max-w-container mx-auto px-6 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-ink/60 text-sm">
              Showing <span className="font-semibold text-navy">{filteredFaqs.length}</span> 
              {filteredFaqs.length === 1 ? " question" : " questions"}
            </p>
            {(searchQuery || activeCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-gold font-semibold text-sm hover:text-gold/80 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* FAQ Items */}
          {filteredFaqs.length > 0 ? (
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`bg-white rounded-card border transition-all overflow-hidden ${
                      isOpen ? "border-gold shadow-md" : "border-gray-100 shadow-sm"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-cloud/50 transition-colors"
                    >
                      <h3 className={`font-display font-semibold text-base md:text-lg pr-4 ${
                        isOpen ? "text-gold" : "text-navy"
                      }`}>
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-gold" : "text-ink/40"
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 md:px-6 pb-5 md:pb-6 animate-fade-in">
                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-ink/80 leading-relaxed text-sm md:text-base pt-4">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-card p-12 text-center border border-gray-100">
              <div className="bg-cloud rounded-full p-6 w-fit mx-auto mb-4">
                <HelpCircle className="w-12 h-12 text-ink/30" />
              </div>
              <h3 className="font-display text-xl font-bold text-navy">
                No Results Found
              </h3>
              <p className="text-ink/60 mt-2 max-w-md mx-auto">
                We couldn't find any questions matching your search. 
                Try different keywords or browse all categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="btn-lift inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg mt-6"
              >
                View All Questions
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= STILL HAVE QUESTIONS ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <div className="bg-gradient-to-br from-purple to-purple/90 rounded-card p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-white/10 rounded-full p-3 w-fit mb-4">
                  <MessageSquare className="w-7 h-7 text-gold" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Still Have Questions?
                </h2>
                <p className="text-white/80 mt-4 leading-relaxed">
                  Our support team is here to help. Reach out to us and we'll get back 
                  to you within 24 hours.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Contact Support
                  </Link>
                  <Link
                    href="/dashboard/messages"
                    className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Send a Message
                  </Link>
                </div>
              </div>

              <div className="hidden lg:block space-y-4">
                {[
                  { icon: User, title: "24-Hour Response", desc: "Average response time" },
                  { icon: Shield, title: "Secure & Private", desc: "Your data is protected" },
                  { icon: Globe, title: "Global Support", desc: "Available worldwide" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-card p-4 border border-white/20">
                      <div className="bg-gold rounded-full p-3 shrink-0">
                        <Icon className="w-5 h-5 text-ink" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="text-white/70 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-navy text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Whether you want to give, receive help, or partner with us — there's 
            a place for you at DHK LIFT.
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
              <Users className="w-5 h-5" />
              Get Assistance
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}