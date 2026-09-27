"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle,
  Clock,
  Globe,
  Heart,
  Shield,
  ChevronRight,
  Building2,
  Users,
  Headphones,
} from "lucide-react";

// ============ CONTACT INFO ============
const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "support@dhklift.org",
    subtext: "We reply within 24 hours",
    color: "text-gold",
    bgColor: "bg-gold/10",
    href: "mailto:support@dhklift.org",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+92 300 1234567",
    subtext: "Mon-Fri, 9 AM - 6 PM (PKT)",
    color: "text-teal",
    bgColor: "bg-teal/10",
    href: "tel:+923001234567",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Karachi, Pakistan",
    subtext: "Head Office",
    color: "text-purple",
    bgColor: "bg-purple/10",
    href: "#",
  },
  {
    icon: Headphones,
    title: "Support",
    value: "help.dhklift.org",
    subtext: "FAQs & Documentation",
    color: "text-navy",
    bgColor: "bg-navy/10",
    href: "/faq",
  },
];

// ============ INQUIRY CATEGORIES ============
const inquiryCategories = [
  "General Inquiry",
  "Assistance Application",
  "Donation & Giving",
  "Membership",
  "Global Partnerships",
  "Healthcare & Providers",
  "Technical Support",
  "Media & Press",
];

// ============ OFFICE LOCATIONS ============
const offices = [
  {
    city: "Karachi",
    country: "Pakistan",
    type: "Head Office",
    address: "123 Main Boulevard, Clifton Block 5, Karachi",
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  {
    city: "Lahore",
    country: "Pakistan",
    type: "Regional Office",
    address: "456 Mall Road, Gulberg III, Lahore",
    color: "text-teal",
    bgColor: "bg-teal/10",
  },
  {
    city: "Dubai",
    country: "UAE",
    type: "International Office",
    address: "Business Bay Tower, Dubai, UAE",
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
];

// ============ MAIN COMPONENT ============
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: "", email: "", phone: "", category: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-cloud">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-container mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <div className="bg-gold/20 rounded-full p-4 w-fit mx-auto mb-6 animate-fade-in">
            <MessageSquare className="w-10 h-10 text-gold" />
          </div>
          <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm animate-fade-in">
            Get In Touch
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4 animate-fade-in-up">
            We're Here to Help. <br />
            <span className="text-gradient-gold">Contact Us.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-in-up delay-100">
            Have a question, feedback, or need support? Our team is here to assist you. 
            Reach out and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* ================= CONTACT INFO CARDS ================= */}
      <section className="max-w-container mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, i) => {
            const Icon = info.icon;
            return (
              <Link
                key={i}
                href={info.href}
                className="card-hover bg-white rounded-card p-6 shadow-lg border border-gray-100 animate-fade-in-up block"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`${info.bgColor} rounded-full p-3 w-fit mb-4`}>
                  <Icon className={`w-6 h-6 ${info.color}`} />
                </div>
                <h3 className="font-display font-bold text-navy text-base">{info.title}</h3>
                <p className="font-semibold text-navy text-sm mt-1 break-all">{info.value}</p>
                <p className="text-ink/50 text-xs mt-1">{info.subtext}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ================= CONTACT FORM & INFO ================= */}
      <section className="max-w-container mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* ================= FORM ================= */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-card p-6 md:p-10 shadow-sm border border-gray-100">
              <div className="mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-navy">
                  Send Us a Message
                </h2>
                <p className="text-ink/70 mt-2">
                  Fill out the form below and we'll respond within 24 hours.
                </p>
              </div>

              {/* Success Message */}
              {submitted && (
                <div className="mb-6 p-4 bg-success/5 border border-success/20 rounded-input flex items-start gap-3 animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  <div>
                    <p className="text-success font-semibold text-sm">Message Sent Successfully!</p>
                    <p className="text-ink/70 text-xs mt-1">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                    >
                      <option value="">Select a category</option>
                      {inquiryCategories.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Subject *</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    placeholder="Brief subject of your inquiry"
                    required
                    className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Message *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    rows={6}
                    placeholder="Please describe your inquiry in detail..."
                    required
                    className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none"
                  />
                </div>

                <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                  <p className="text-xs text-ink/50 flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5" />
                    Your information is secure and encrypted
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-lift bg-gold text-ink font-semibold px-8 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* ================= SIDEBAR ================= */}
          <div className="space-y-6">
            
            {/* Quick Help */}
            <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
              <h3 className="font-display font-bold text-navy text-lg mb-4">
                Quick Help
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Assistance FAQs", href: "/faq" },
                  { label: "How to Donate", href: "/giving" },
                  { label: "Membership Benefits", href: "/membership" },
                  { label: "Partner Application", href: "/partnerships/apply" },
                  { label: "Track Application", href: "/dashboard/applications" },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="flex items-center justify-between p-3 bg-cloud rounded-input hover:bg-navy/5 transition-colors group"
                  >
                    <span className="text-sm font-medium text-navy">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-ink/40 group-hover:text-gold transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-navy text-white rounded-card p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <Clock className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-display font-bold text-lg mb-3">
                  Support Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Mon - Fri</span>
                    <span className="font-semibold">9 AM - 6 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Saturday</span>
                    <span className="font-semibold">10 AM - 2 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Sunday</span>
                    <span className="text-gold font-semibold">Closed</span>
                  </div>
                </div>
                <p className="text-white/60 text-xs mt-4 pt-4 border-t border-white/10">
                  All times are in Pakistan Standard Time (PKT)
                </p>
              </div>
            </div>

            {/* Emergency Note */}
            <div className="bg-error/5 border border-error/20 rounded-card p-6">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-error mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-error text-sm">Urgent Assistance?</h3>
                  <p className="text-ink/70 text-xs mt-2 leading-relaxed">
                    For urgent medical or protection emergencies, please use our 
                    Assistance Finder for priority processing.
                  </p>
                  <Link
                    href="/assistance/finder"
                    className="inline-flex items-center gap-1 text-error font-semibold text-xs mt-3 hover:gap-2 transition-all"
                  >
                    Get Urgent Help
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OFFICE LOCATIONS ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <div className="bg-gold/10 rounded-full p-3 w-fit mx-auto mb-4">
              <Building2 className="w-7 h-7 text-gold" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
              Our Offices
            </h2>
            <p className="text-ink/70 mt-3 max-w-2xl mx-auto">
              Visit us at any of our offices. Our team is happy to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, i) => (
              <div
                key={i}
                className="card-hover bg-cloud rounded-card p-6 border border-gray-100"
              >
                <div className={`${office.bgColor} rounded-full p-3 w-fit mb-4`}>
                  <MapPin className={`w-6 h-6 ${office.color}`} />
                </div>
                <span className={`text-xs font-semibold ${office.color} ${office.bgColor} px-3 py-1 rounded-full`}>
                  {office.type}
                </span>
                <h3 className="font-display font-bold text-navy text-xl mt-3">
                  {office.city}
                </h3>
                <p className="text-ink/60 text-sm">{office.country}</p>
                <p className="text-ink/70 text-sm mt-3 leading-relaxed">
                  {office.address}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-purple text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <div className="bg-white/10 rounded-full p-4 w-fit mx-auto mb-6">
            <Globe className="w-10 h-10 text-gold" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Join Our Global Community
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
              <Users className="w-5 h-5" />
              Apply for Assistance
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}