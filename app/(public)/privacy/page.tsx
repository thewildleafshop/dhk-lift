import Link from "next/link";
import {
  Shield,
  ChevronRight,
  Lock,
  Eye,
  FileText,
  Users,
  Mail,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

// ============ TABLE OF CONTENTS ============
const tableOfContents = [
  { id: "introduction", title: "1. Introduction" },
  { id: "information-collect", title: "2. Information We Collect" },
  { id: "how-we-use", title: "3. How We Use Your Information" },
  { id: "information-sharing", title: "4. Information Sharing" },
  { id: "data-security", title: "5. Data Security" },
  { id: "your-rights", title: "6. Your Rights" },
  { id: "cookies", title: "7. Cookies & Tracking" },
  { id: "children", title: "8. Children's Privacy" },
  { id: "lift-protect", title: "9. LIFT Protect Confidentiality" },
  { id: "changes", title: "10. Changes to This Policy" },
  { id: "contact", title: "11. Contact Us" },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cloud">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-12 md:py-16 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gold">Privacy Policy</span>
            </div>
            <div className="bg-gold/20 rounded-full p-3 w-fit mb-4">
              <Shield className="w-8 h-8 text-gold" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Privacy Policy
            </h1>
            <p className="text-white/70 mt-4 text-sm">
              Last Updated: January 1, 2026 • Effective: January 1, 2026
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-container mx-auto px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* ================= SIDEBAR: TOC ================= */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100 lg:sticky lg:top-24">
              <h3 className="font-display font-bold text-navy text-base mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gold" />
                Contents
              </h3>
              <nav className="space-y-1">
                {tableOfContents.map((item, i) => (
                  <a
                    key={i}
                    href={`#${item.id}`}
                    className="block text-sm text-ink/70 hover:text-gold hover:bg-cloud px-3 py-2 rounded-input transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-card p-6 md:p-10 shadow-sm border border-gray-100">

              {/* Introduction */}
              <section id="introduction" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">1. Introduction</h2>
                <p className="text-ink/80 leading-relaxed mb-4">
                  DHK LIFT ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                  explains how we collect, use, disclose, and safeguard your information when you use our platform.
                </p>
                <p className="text-ink/80 leading-relaxed">
                  By using DHK LIFT, you consent to the data practices described in this policy. If you do not 
                  agree with these practices, please do not use our platform.
                </p>
              </section>

              {/* Information We Collect */}
              <section id="information-collect" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">2. Information We Collect</h2>
                <p className="text-ink/80 leading-relaxed mb-4">
                  We collect information you provide directly, information collected automatically, and 
                  information from third parties:
                </p>
                <div className="space-y-3">
                  {[
                    { title: "Personal Information", desc: "Name, email, phone, address, date of birth, gender" },
                    { title: "Application Data", desc: "Household information, financial data, medical reports, documents" },
                    { title: "Donation Data", desc: "Payment information (processed by Stripe), donation history" },
                    { title: "Usage Data", desc: "IP address, browser type, pages visited, time spent" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-cloud rounded-input">
                      <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-navy text-sm">{item.title}</p>
                        <p className="text-ink/70 text-sm mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* How We Use */}
              <section id="how-we-use" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">3. How We Use Your Information</h2>
                <p className="text-ink/80 leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="space-y-2">
                  {[
                    "Process your applications and donations",
                    "Verify your identity and eligibility",
                    "Communicate with you about your account and applications",
                    "Process payments and issue receipts",
                    "Improve our platform and services",
                    "Comply with legal obligations",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
                      <span className="text-ink/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Information Sharing */}
              <section id="information-sharing" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">4. Information Sharing</h2>
                <p className="text-ink/80 leading-relaxed mb-4">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="space-y-2">
                  {[
                    "Verified healthcare providers and pharmacies (only for authorized cases)",
                    "Verified global partners (only for project-related work)",
                    "Payment processors (Stripe) for donation processing",
                    "Legal authorities if required by law",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                      <span className="text-ink/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Data Security */}
              <section id="data-security" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">5. Data Security</h2>
                <div className="bg-navy/5 border border-navy/10 rounded-card p-5 mb-4">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-navy mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-navy text-sm">Bank-Level Security</p>
                      <p className="text-ink/70 text-sm mt-1">
                        We use SSL/TLS encryption, PCI-compliant payment processing, and 
                        role-based access control to protect your data.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-ink/80 leading-relaxed">
                  While we implement reasonable security measures, no method of transmission over 
                  the internet is 100% secure. We cannot guarantee absolute security.
                </p>
              </section>

              {/* Your Rights */}
              <section id="your-rights" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">6. Your Rights</h2>
                <p className="text-ink/80 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="space-y-2">
                  {[
                    "Access your personal information",
                    "Correct inaccurate information",
                    "Request deletion of your account",
                    "Opt out of marketing communications",
                    "Export your data",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Eye className="w-5 h-5 text-purple mt-0.5 shrink-0" />
                      <span className="text-ink/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Cookies */}
              <section id="cookies" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">7. Cookies & Tracking</h2>
                <p className="text-ink/80 leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze usage, 
                  and personalize content. You can control cookies through your browser settings.
                </p>
              </section>

              {/* Children's Privacy */}
              <section id="children" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">8. Children's Privacy</h2>
                <p className="text-ink/80 leading-relaxed">
                  Our platform is not intended for children under 13. We do not knowingly collect 
                  information from children under 13. Parents or guardians may submit applications 
                  on behalf of minors.
                </p>
              </section>

              {/* LIFT Protect */}
              <section id="lift-protect" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">9. LIFT Protect Confidentiality</h2>
                <div className="bg-purple/5 border border-purple/20 rounded-card p-5">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-purple mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-navy text-sm">Enhanced Confidentiality</p>
                      <p className="text-ink/70 text-sm mt-1 leading-relaxed">
                        LIFT Protect cases involve sensitive situations. Access to this data is restricted 
                        to a specialized team with strict confidentiality protocols. No sensitive details 
                        are exposed in public views, email subject lines, or notification previews.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Changes */}
              <section id="changes" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">10. Changes to This Policy</h2>
                <p className="text-ink/80 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of significant 
                  changes via email or through our platform. Your continued use after changes constitutes 
                  acceptance of the updated policy.
                </p>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">11. Contact Us</h2>
                <p className="text-ink/80 leading-relaxed mb-4">
                  If you have questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-cloud rounded-card p-5">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-navy mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-navy text-sm">DHK LIFT Privacy Team</p>
                      <p className="text-ink/70 text-sm mt-1">Email: privacy@dhklift.org</p>
                      <p className="text-ink/70 text-sm">Address: Karachi, Pakistan</p>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}