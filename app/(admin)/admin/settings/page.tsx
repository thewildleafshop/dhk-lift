"use client";

import { useState } from "react";
import {
  Settings,
  Building2,
  Mail,
  CreditCard,
  Shield,
  Bell,
  Globe,
  FileText,
  Save,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Users,
  DollarSign,
  Clock,
  Send,
  Database,
} from "lucide-react";

// ============ TYPES ============
type Tab = "general" | "payment" | "email" | "notifications" | "security" | "advanced";

const tabs: { id: Tab; label: string; icon: any }[] = [
  { id: "general", label: "General", icon: Building2 },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "email", label: "Email", icon: Mail },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "advanced", label: "Advanced", icon: Database },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [saved, setSaved] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);

  // General Settings
  const [general, setGeneral] = useState({
    siteName: "DHK LIFT",
    siteTagline: "A Global Humanitarian Platform",
    contactEmail: "support@dhklift.org",
    contactPhone: "+92 300 1234567",
    address: "Karachi, Pakistan",
    timezone: "Asia/Karachi (PKT)",
    language: "English",
    currency: "USD ($)",
  });

  // Payment Settings
  const [payment, setPayment] = useState({
    stripePublicKey: "pk_live_51Hxxxxxxxxxxxxx",
    stripeSecretKey: "sk_live_51Hxxxxxxxxxxxxx",
    minDonation: 5,
    maxDonation: 100000,
    processingFeePercent: 2.9,
    processingFeeFixed: 0.3,
    allowRecurring: true,
    allowAnonymous: true,
  });

  // Email Settings
  const [email, setEmail] = useState({
    senderName: "DHK LIFT",
    senderEmail: "noreply@dhklift.org",
    replyTo: "support@dhklift.org",
    smtpHost: "smtp.sendgrid.net",
    smtpPort: 587,
    smtpUser: "apikey",
    smtpPassword: "SG.xxxxxxxxxxxxx",
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    newApplication: true,
    newDonation: true,
    largeDonation: true,
    newPartner: true,
    verificationRequest: true,
    failedPayment: true,
    dailyDigest: true,
    weeklyReport: false,
  });

  // Security Settings
  const [security, setSecurity] = useState({
    enforceMFA: true,
    sessionTimeout: 60,
    passwordMinLength: 8,
    passwordRequireSpecial: true,
    maxLoginAttempts: 5,
    ipWhitelist: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
            System Settings
          </h1>
          <p className="text-ink/70 mt-1">
            Configure platform settings, integrations, and security.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 w-fit text-sm"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {/* ================= SUCCESS MESSAGE ================= */}
      {saved && (
        <div className="bg-success/5 border border-success/20 rounded-card p-4 flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-5 h-5 text-success shrink-0" />
          <p className="text-success text-sm font-medium">
            Settings saved successfully.
          </p>
        </div>
      )}

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* ================= SIDEBAR TABS ================= */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-card p-2 shadow-sm border border-gray-100 lg:sticky lg:top-24">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-input font-medium text-sm transition-all ${
                      isActive
                        ? "bg-navy text-white shadow-sm"
                        : "text-ink/70 hover:bg-navy/5 hover:text-navy"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            
            {/* ================= GENERAL TAB ================= */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-gold" />
                    General Settings
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">
                    Basic organization and platform configuration.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Site Name</label>
                    <input
                      type="text"
                      value={general.siteName}
                      onChange={(e) => setGeneral({ ...general, siteName: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Tagline</label>
                    <input
                      type="text"
                      value={general.siteTagline}
                      onChange={(e) => setGeneral({ ...general, siteTagline: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Contact Email</label>
                    <input
                      type="email"
                      value={general.contactEmail}
                      onChange={(e) => setGeneral({ ...general, contactEmail: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Contact Phone</label>
                    <input
                      type="tel"
                      value={general.contactPhone}
                      onChange={(e) => setGeneral({ ...general, contactPhone: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Address</label>
                    <input
                      type="text"
                      value={general.address}
                      onChange={(e) => setGeneral({ ...general, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Timezone</label>
                    <select
                      value={general.timezone}
                      onChange={(e) => setGeneral({ ...general, timezone: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                    >
                      <option>Asia/Karachi (PKT)</option>
                      <option>Asia/Dubai (GST)</option>
                      <option>Europe/London (GMT)</option>
                      <option>America/New_York (EST)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Currency</label>
                    <select
                      value={general.currency}
                      onChange={(e) => setGeneral({ ...general, currency: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                    >
                      <option>USD ($)</option>
                      <option>PKR (Rs)</option>
                      <option>AED (د.إ)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ================= PAYMENT TAB ================= */}
            {activeTab === "payment" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-gold" />
                    Payment Settings
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">
                    Configure Stripe integration and donation limits.
                  </p>
                </div>

                {/* Stripe Keys */}
                <div className="bg-cloud rounded-card p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-navy text-sm">Stripe API Keys</h3>
                    <button
                      onClick={() => setShowSecrets(!showSecrets)}
                      className="flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold/80 transition-colors"
                    >
                      {showSecrets ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {showSecrets ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">Publishable Key</label>
                    <input
                      type={showSecrets ? "text" : "password"}
                      value={payment.stripePublicKey}
                      onChange={(e) => setPayment({ ...payment, stripePublicKey: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">Secret Key</label>
                    <input
                      type={showSecrets ? "text" : "password"}
                      value={payment.stripeSecretKey}
                      onChange={(e) => setPayment({ ...payment, stripeSecretKey: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Donation Limits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Minimum Donation ($)</label>
                    <input
                      type="number"
                      value={payment.minDonation}
                      onChange={(e) => setPayment({ ...payment, minDonation: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Maximum Donation ($)</label>
                    <input
                      type="number"
                      value={payment.maxDonation}
                      onChange={(e) => setPayment({ ...payment, maxDonation: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Processing Fee (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={payment.processingFeePercent}
                      onChange={(e) => setPayment({ ...payment, processingFeePercent: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Processing Fee Fixed ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={payment.processingFeeFixed}
                      onChange={(e) => setPayment({ ...payment, processingFeeFixed: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 bg-cloud rounded-input cursor-pointer">
                    <div>
                      <p className="font-semibold text-navy text-sm">Allow Recurring Donations</p>
                      <p className="text-ink/60 text-xs mt-0.5">Enable monthly recurring donations</p>
                    </div>
                    <button
                      onClick={() => setPayment({ ...payment, allowRecurring: !payment.allowRecurring })}
                      className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
                        payment.allowRecurring ? "bg-gold" : "bg-gray-300"
                      }`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                        payment.allowRecurring ? "translate-x-6" : "translate-x-0"
                      }`}></span>
                    </button>
                  </label>

                  <label className="flex items-center justify-between p-4 bg-cloud rounded-input cursor-pointer">
                    <div>
                      <p className="font-semibold text-navy text-sm">Allow Anonymous Donations</p>
                      <p className="text-ink/60 text-xs mt-0.5">Let donors hide their name publicly</p>
                    </div>
                    <button
                      onClick={() => setPayment({ ...payment, allowAnonymous: !payment.allowAnonymous })}
                      className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
                        payment.allowAnonymous ? "bg-gold" : "bg-gray-300"
                      }`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                        payment.allowAnonymous ? "translate-x-6" : "translate-x-0"
                      }`}></span>
                    </button>
                  </label>
                </div>
              </div>
            )}

            {/* ================= EMAIL TAB ================= */}
            {activeTab === "email" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gold" />
                    Email Settings
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">
                    Configure email sender and SMTP settings.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Sender Name</label>
                    <input
                      type="text"
                      value={email.senderName}
                      onChange={(e) => setEmail({ ...email, senderName: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Sender Email</label>
                    <input
                      type="email"
                      value={email.senderEmail}
                      onChange={(e) => setEmail({ ...email, senderEmail: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Reply-To Email</label>
                    <input
                      type="email"
                      value={email.replyTo}
                      onChange={(e) => setEmail({ ...email, replyTo: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                </div>

                {/* SMTP Settings */}
                <div className="bg-cloud rounded-card p-5 space-y-4">
                  <h3 className="font-semibold text-navy text-sm flex items-center gap-2">
                    <Send className="w-4 h-4 text-gold" />
                    SMTP Configuration
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1.5">SMTP Host</label>
                      <input
                        type="text"
                        value={email.smtpHost}
                        onChange={(e) => setEmail({ ...email, smtpHost: e.target.value })}
                        className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1.5">SMTP Port</label>
                      <input
                        type="number"
                        value={email.smtpPort}
                        onChange={(e) => setEmail({ ...email, smtpPort: Number(e.target.value) })}
                        className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1.5">Username</label>
                      <input
                        type="text"
                        value={email.smtpUser}
                        onChange={(e) => setEmail({ ...email, smtpUser: e.target.value })}
                        className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1.5">Password</label>
                      <input
                        type={showSecrets ? "text" : "password"}
                        value={email.smtpPassword}
                        onChange={(e) => setEmail({ ...email, smtpPassword: e.target.value })}
                        className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>

                <button className="btn-lift bg-navy text-white font-semibold px-6 py-3 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-2 text-sm">
                  <Send className="w-4 h-4" />
                  Send Test Email
                </button>
              </div>
            )}

            {/* ================= NOTIFICATIONS TAB ================= */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl flex items-center gap-2">
                    <Bell className="w-5 h-5 text-gold" />
                    Notification Settings
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">
                    Configure which events trigger admin notifications.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { key: "newApplication", label: "New Application Submitted", desc: "Get notified when a new assistance application is submitted" },
                    { key: "newDonation", label: "New Donation Received", desc: "Get notified for every donation" },
                    { key: "largeDonation", label: "Large Donation ($1,000+)", desc: "Get notified for donations over $1,000" },
                    { key: "newPartner", label: "New Partner Application", desc: "Get notified when a new partner applies" },
                    { key: "verificationRequest", label: "Verification Request", desc: "Get notified for project verification requests" },
                    { key: "failedPayment", label: "Failed Payment", desc: "Get notified when a payment fails" },
                    { key: "dailyDigest", label: "Daily Digest", desc: "Receive a daily summary email" },
                    { key: "weeklyReport", label: "Weekly Report", desc: "Receive a weekly performance report" },
                  ].map((item) => {
                    const isEnabled = notifications[item.key as keyof typeof notifications];
                    return (
                      <label
                        key={item.key}
                        className="flex items-center justify-between p-4 bg-cloud rounded-input cursor-pointer"
                      >
                        <div>
                          <p className="font-semibold text-navy text-sm">{item.label}</p>
                          <p className="text-ink/60 text-xs mt-0.5">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifications({ ...notifications, [item.key]: !isEnabled })}
                          className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
                            isEnabled ? "bg-gold" : "bg-gray-300"
                          }`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                            isEnabled ? "translate-x-6" : "translate-x-0"
                          }`}></span>
                        </button>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ================= SECURITY TAB ================= */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gold" />
                    Security Settings
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">
                    Configure authentication and security policies.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 bg-cloud rounded-input cursor-pointer">
                    <div>
                      <p className="font-semibold text-navy text-sm">Enforce MFA for Admins</p>
                      <p className="text-ink/60 text-xs mt-0.5">Require two-factor authentication for all admin accounts</p>
                    </div>
                    <button
                      onClick={() => setSecurity({ ...security, enforceMFA: !security.enforceMFA })}
                      className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
                        security.enforceMFA ? "bg-gold" : "bg-gray-300"
                      }`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                        security.enforceMFA ? "translate-x-6" : "translate-x-0"
                      }`}></span>
                    </button>
                  </label>

                  <label className="flex items-center justify-between p-4 bg-cloud rounded-input cursor-pointer">
                    <div>
                      <p className="font-semibold text-navy text-sm">Require Special Characters</p>
                      <p className="text-ink/60 text-xs mt-0.5">Passwords must contain special characters</p>
                    </div>
                    <button
                      onClick={() => setSecurity({ ...security, passwordRequireSpecial: !security.passwordRequireSpecial })}
                      className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
                        security.passwordRequireSpecial ? "bg-gold" : "bg-gray-300"
                      }`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                        security.passwordRequireSpecial ? "translate-x-6" : "translate-x-0"
                      }`}></span>
                    </button>
                  </label>

                  <label className="flex items-center justify-between p-4 bg-cloud rounded-input cursor-pointer">
                    <div>
                      <p className="font-semibold text-navy text-sm">IP Whitelist for Admins</p>
                      <p className="text-ink/60 text-xs mt-0.5">Restrict admin access to specific IP addresses</p>
                    </div>
                    <button
                      onClick={() => setSecurity({ ...security, ipWhitelist: !security.ipWhitelist })}
                      className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
                        security.ipWhitelist ? "bg-gold" : "bg-gray-300"
                      }`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                        security.ipWhitelist ? "translate-x-6" : "translate-x-0"
                      }`}></span>
                    </button>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Session Timeout (min)</label>
                    <input
                      type="number"
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity({ ...security, sessionTimeout: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Password Min Length</label>
                    <input
                      type="number"
                      value={security.passwordMinLength}
                      onChange={(e) => setSecurity({ ...security, passwordMinLength: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Max Login Attempts</label>
                    <input
                      type="number"
                      value={security.maxLoginAttempts}
                      onChange={(e) => setSecurity({ ...security, maxLoginAttempts: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-warning/5 border border-warning/20 rounded-input">
                  <AlertCircle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-navy text-sm">Important</p>
                    <p className="text-ink/70 text-xs mt-1">
                      Security changes take effect immediately. Ensure you don't lock yourself out.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ================= ADVANCED TAB ================= */}
            {activeTab === "advanced" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl flex items-center gap-2">
                    <Database className="w-5 h-5 text-gold" />
                    Advanced Settings
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">
                    System information and maintenance tools.
                  </p>
                </div>

                {/* System Info */}
                <div className="bg-cloud rounded-card p-5">
                  <h3 className="font-semibold text-navy text-sm mb-4">System Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {[
                      { label: "Platform Version", value: "v1.0.0" },
                      { label: "Next.js Version", value: "16.3.6" },
                      { label: "Database", value: "PostgreSQL (Neon)" },
                      { label: "Node Version", value: "20.x LTS" },
                      { label: "Last Deployment", value: "Apr 10, 2026" },
                      { label: "Environment", value: "Production" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                        <span className="text-ink/60">{item.label}</span>
                        <span className="font-semibold text-navy">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Maintenance */}
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 bg-cloud rounded-input hover:bg-navy/5 transition-colors text-left">
                    <div>
                      <p className="font-semibold text-navy text-sm">Clear Cache</p>
                      <p className="text-ink/60 text-xs mt-0.5">Clear Next.js cache and rebuild</p>
                    </div>
                    <Database className="w-5 h-5 text-navy" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-cloud rounded-input hover:bg-navy/5 transition-colors text-left">
                    <div>
                      <p className="font-semibold text-navy text-sm">Run Database Backup</p>
                      <p className="text-ink/60 text-xs mt-0.5">Create a manual backup of all data</p>
                    </div>
                    <Database className="w-5 h-5 text-navy" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-cloud rounded-input hover:bg-navy/5 transition-colors text-left">
                    <div>
                      <p className="font-semibold text-navy text-sm">Reindex Search</p>
                      <p className="text-ink/60 text-xs mt-0.5">Rebuild the search index for better results</p>
                    </div>
                    <Database className="w-5 h-5 text-navy" />
                  </button>
                </div>

                <div className="flex items-start gap-3 p-4 bg-error/5 border border-error/20 rounded-input">
                  <AlertCircle className="w-5 h-5 text-error mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-error text-sm">Danger Zone</p>
                    <p className="text-ink/70 text-xs mt-1">
                      These actions are irreversible. Only proceed if you know what you're doing.
                    </p>
                    <button className="btn-lift mt-3 bg-error text-white font-semibold px-4 py-2 rounded-input hover:bg-error/90 transition-colors text-xs">
                      Clear All Demo Data
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}