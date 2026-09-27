import Link from "next/link";
import {
  FileText,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Users,
  Shield,
  Heart,
  Ban,
  Scale,
  Mail,
} from "lucide-react";

// ============ TABLE OF CONTENTS ============
const tableOfContents = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "eligibility", title: "2. Eligibility" },
  { id: "user-accounts", title: "3. User Accounts" },
  { id: "assistance", title: "4. Assistance Applications" },
  { id: "donations", title: "5. Donations & Payments" },
  { id: "membership", title: "6. Membership" },
  { id: "partnerships", title: "7. Global Partnerships" },
  { id: "prohibited", title: "8. Prohibited Conduct" },
  { id: "intellectual", title: "9. Intellectual Property" },
  { id: "disclaimer", title: "10. Disclaimer" },
  { id: "liability", title: "11. Limitation of Liability" },
  { id: "termination", title: "12. Termination" },
  { id: "governing", title: "13. Governing Law" },
  { id: "changes", title: "14. Changes to Terms" },
  { id: "contact", title: "15. Contact Us" },
];

export default function TermsPage() {
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
              <span className="text-gold">Terms of Service</span>
            </div>
            <div className="bg-gold/20 rounded-full p-3 w-fit mb-4">
              <Scale className="w-8 h-8 text-gold" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Terms of Service
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

              {/* Acceptance */}
              <section id="acceptance" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">1. Acceptance of Terms</h2>
                <p className="text-ink/80 leading-relaxed">
                  By accessing or using the DHK LIFT platform, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our platform.
                </p>
              </section>

              {/* Eligibility */}
              <section id="eligibility" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">2. Eligibility</h2>
                <p className="text-ink/80 leading-relaxed mb-4">
                  To use DHK LIFT, you must:
                </p>
                <ul className="space-y-2">
                  {[
                    "Be at least 18 years old (or have parental consent)",
                    "Provide accurate and truthful information",
                    "Comply with all applicable laws and regulations",
                    "Not be prohibited from using our services under applicable law",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
                      <span className="text-ink/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* User Accounts */}
              <section id="user-accounts" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">3. User Accounts</h2>
                <p className="text-ink/80 leading-relaxed mb-4">
                  You are responsible for:
                </p>
                <ul className="space-y-2">
                  {[
                    "Maintaining the confidentiality of your account credentials",
                    "All activities that occur under your account",
                    "Notifying us immediately of any unauthorized access",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                      <span className="text-ink/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Assistance Applications */}
              <section id="assistance" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">4. Assistance Applications</h2>
                <p className="text-ink/80 leading-relaxed mb-4">
                  By submitting an assistance application:
                </p>
                <ul className="space-y-2">
                  {[
                    "You confirm all information is accurate and truthful",
                    "You consent to verification of your information",
                    "You understand that submission does not guarantee approval",
                    "You agree to provide additional information if requested",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-purple mt-0.5 shrink-0" />
                      <span className="text-ink/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 bg-warning/5 border border-warning/20 rounded-card p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
                    <p className="text-ink/80 text-sm">
                      <strong className="text-warning">Important:</strong> False or misleading information 
                      may result in denial of assistance and account suspension.
                    </p>
                  </div>
                </div>
              </section>

              {/* Donations */}
              <section id="donations" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">5. Donations & Payments</h2>
                <ul className="space-y-2">
                  {[
                    "All donations are voluntary and non-refundable unless required by law",
                    "Recurring donations can be cancelled at any time from your dashboard",
                    "We use Stripe for secure payment processing — we do not store card details",
                    "Donation receipts are provided for tax purposes where applicable",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                      <span className="text-ink/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Membership */}
              <section id="membership" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">6. Membership</h2>
                <p className="text-ink/80 leading-relaxed mb-4">
                  Membership tiers are based on lifetime giving:
                </p>
                <ul className="space-y-2">
                  {[
                    "Bronze: Free (default tier)",
                    "Silver: $100+ lifetime giving",
                    "Gold: $500+ lifetime giving",
                    "Platinum: $2,500+ lifetime giving",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-navy mt-0.5 shrink-0" />
                      <span className="text-ink/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Partnerships */}
              <section id="partnerships" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">7. Global Partnerships</h2>
                <p className="text-ink/80 leading-relaxed">
                  Partners must be legally registered organizations with proper documentation. 
                  Verification is required before partnership is granted. Partners agree to provide 
                  accurate project information and proof of progress.
                </p>
              </section>

              {/* Prohibited Conduct */}
              <section id="prohibited" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">8. Prohibited Conduct</h2>
                <div className="bg-error/5 border border-error/20 rounded-card p-5">
                  <div className="flex items-start gap-3">
                    <Ban className="w-5 h-5 text-error mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-error text-sm">Prohibited Activities</p>
                      <ul className="space-y-1 mt-2 text-sm text-ink/80">
                        <li>• Providing false or misleading information</li>
                        <li>• Attempting to defraud the platform or its users</li>
                        <li>• Harassing, abusing, or threatening others</li>
                        <li>• Violating any applicable laws or regulations</li>
                        <li>• Attempting to hack, disrupt, or damage the platform</li>
                        <li>• Impersonating another person or organization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Intellectual Property */}
              <section id="intellectual" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">9. Intellectual Property</h2>
                <p className="text-ink/80 leading-relaxed">
                  All content, logos, trademarks, and materials on the DHK LIFT platform are owned by 
                  DHK LIFT or its licensors. You may not reproduce, distribute, or create derivative 
                  works without written permission.
                </p>
              </section>

              {/* Disclaimer */}
              <section id="disclaimer" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">10. Disclaimer</h2>
                <p className="text-ink/80 leading-relaxed">
                  DHK LIFT provides the platform "as is" without warranties of any kind. We do not 
                  guarantee uninterrupted service, error-free operation, or specific outcomes for 
                  applications or donations.
                </p>
              </section>

              {/* Liability */}
              <section id="liability" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">11. Limitation of Liability</h2>
                <p className="text-ink/80 leading-relaxed">
                  To the maximum extent permitted by law, DHK LIFT shall not be liable for any indirect, 
                  incidental, special, or consequential damages arising from your use of the platform.
                </p>
              </section>

              {/* Termination */}
              <section id="termination" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">12. Termination</h2>
                <p className="text-ink/80 leading-relaxed">
                  We reserve the right to suspend or terminate your account at any time for violation 
                  of these Terms. You may also delete your account at any time from your dashboard.
                </p>
              </section>

              {/* Governing Law */}
              <section id="governing" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">13. Governing Law</h2>
                <p className="text-ink/80 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of Pakistan, 
                  without regard to its conflict of law provisions.
                </p>
              </section>

              {/* Changes */}
              <section id="changes" className="mb-10 scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">14. Changes to Terms</h2>
                <p className="text-ink/80 leading-relaxed">
                  We may update these Terms from time to time. We will notify you of significant changes 
                  via email or through our platform. Continued use after changes constitutes acceptance.
                </p>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-4">15. Contact Us</h2>
                <p className="text-ink/80 leading-relaxed mb-4">
                  If you have questions about these Terms, please contact us:
                </p>
                <div className="bg-cloud rounded-card p-5">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-navy mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-navy text-sm">DHK LIFT Legal Team</p>
                      <p className="text-ink/70 text-sm mt-1">Email: legal@dhklift.org</p>
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