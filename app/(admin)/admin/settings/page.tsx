"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  Mail,
  CreditCard,
  Shield,
  Bell,
  Database,
  Save,
  CheckCircle,
  Eye,
  EyeOff,
  AlertCircle,
  Send,
  Loader2,
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for each category
  const [general, setGeneral] = useState<Record<string, string>>({});
  const [payment, setPayment] = useState<Record<string, string>>({});
  const [email, setEmail] = useState<Record<string, string>>({});
  const [notifications, setNotifications] = useState<Record<string, string>>({});
  const [security, setSecurity] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        if (!res.ok) throw new Error("Failed to load settings");
        const data = await res.json();
        setGeneral(data.general || {});
        setPayment(data.payment || {});
        setEmail(data.email || {});
        setNotifications(data.notifications || {});
        setSecurity(data.security || {});
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      // Combine all settings
      const allSettings = {
        ...general,
        ...payment,
        ...email,
        ...notifications,
        ...security,
      };

      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: allSettings }),
      });

      if (!res.ok) throw new Error("Failed to save settings");

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const Toggle = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <button
      onClick={() => onChange(value === "true" ? "false" : "true")}
      className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
        value === "true" ? "bg-gold" : "bg-gray-300"
      }`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
        value === "true" ? "translate-x-6" : "translate-x-0"
      }`}></span>
    </button>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-navy animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-card p-12 text-center border border-gray-100">
        <p className="text-error font-semibold mb-2">Error loading settings</p>
        <p className="text-ink/60 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
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
          disabled={saving}
          className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 w-fit text-sm disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* SUCCESS MESSAGE */}
      {saved && (
        <div className="bg-success/5 border border-success/20 rounded-card p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-success shrink-0" />
          <p className="text-success text-sm font-medium">Settings saved successfully.</p>
        </div>
      )}

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SIDEBAR TABS */}
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
                      isActive ? "bg-navy text-white shadow-sm" : "text-ink/70 hover:bg-navy/5 hover:text-navy"
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

        {/* MAIN CONTENT */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            
            {/* GENERAL TAB */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-gold" /> General Settings
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">Basic organization configuration.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Site Name</label>
                    <input type="text" value={general.siteName || ""} onChange={(e) => setGeneral({ ...general, siteName: e.target.value })} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Tagline</label>
                    <input type="text" value={general.siteTagline || ""} onChange={(e) => setGeneral({ ...general, siteTagline: e.target.value })} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Contact Email</label>
                    <input type="email" value={general.contactEmail || ""} onChange={(e) => setGeneral({ ...general, contactEmail: e.target.value })} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Contact Phone</label>
                    <input type="tel" value={general.contactPhone || ""} onChange={(e) => setGeneral({ ...general, contactPhone: e.target.value })} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">Address</label>
                    <input type="text" value={general.address || ""} onChange={(e) => setGeneral({ ...general, address: e.target.value })} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Timezone</label>
                    <input type="text" value={general.timezone || ""} onChange={(e) => setGeneral({ ...general, timezone: e.target.value })} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Currency</label>
                    <input type="text" value={general.currency || ""} onChange={(e) => setGeneral({ ...general, currency: e.target.value })} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                </div>
              </div>
            )}

            {/* PAYMENT TAB */}
            {activeTab === "payment" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-gold" /> Payment Settings
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">Configure Stripe and donation limits.</p>
                </div>

                <div className="bg-cloud rounded-card p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-navy text-sm">Stripe API Keys</h3>
                    <button onClick={() => setShowSecrets(!showSecrets)} className="flex items-center gap-1 text-xs font-semibold text-gold">
                      {showSecrets ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {showSecrets ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">Publishable Key</label>
                    <input type={showSecrets ? "text" : "password"} value={payment.stripePublicKey || ""} onChange={(e) => setPayment({ ...payment, stripePublicKey: e.target.value })} placeholder="pk_test_..." className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">Secret Key</label>
                    <input type={showSecrets ? "text" : "password"} value={payment.stripeSecretKey || ""} onChange={(e) => setPayment({ ...payment, stripeSecretKey: e.target.value })} placeholder="sk_test_..." className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm font-mono" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Minimum Donation ($)</label>
                    <input type="number" value={payment.minDonation || ""} onChange={(e) => setPayment({ ...payment, minDonation: e.target.value })} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Maximum Donation ($)</label>
                    <input type="number" value={payment.maxDonation || ""} onChange={(e) => setPayment({ ...payment, maxDonation: e.target.value })} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 bg-cloud rounded-input">
                    <div>
                      <p className="font-semibold text-navy text-sm">Allow Recurring Donations</p>
                      <p className="text-ink/60 text-xs mt-0.5">Enable monthly recurring donations</p>
                    </div>
                    <Toggle value={payment.allowRecurring || "false"} onChange={(v) => setPayment({ ...payment, allowRecurring: v })} />
                  </label>
                  <label className="flex items-center justify-between p-4 bg-cloud rounded-input">
                    <div>
                      <p className="font-semibold text-navy text-sm">Allow Anonymous Donations</p>
                      <p className="text-ink/60 text-xs mt-0.5">Let donors hide their name</p>
                    </div>
                    <Toggle value={payment.allowAnonymous || "false"} onChange={(v) => setPayment({ ...payment, allowAnonymous: v })} />
                  </label>
                </div>
              </div>
            )}

            {/* EMAIL TAB */}
            {activeTab === "email" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gold" /> Email Settings
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">Configure email and SMTP settings.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Sender Name</label>
                    <input type="text" value={email.senderName || ""} onChange={(e) => setEmail({ ...email, senderName: e.target.value })} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Sender Email</label>
                    <input type="email" value={email.senderEmail || ""} onChange={(e) => setEmail({ ...email, senderEmail: e.target.value })} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl flex items-center gap-2">
                    <Bell className="w-5 h-5 text-gold" /> Notification Settings
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">Configure admin notifications.</p>
                </div>

                <div className="space-y-3">
                  {[
                    { key: "notify_newApplication", label: "New Application Submitted" },
                    { key: "notify_newDonation", label: "New Donation Received" },
                    { key: "notify_largeDonation", label: "Large Donation ($1,000+)" },
                    { key: "notify_newPartner", label: "New Partner Application" },
                    { key: "notify_verificationRequest", label: "Verification Request" },
                    { key: "notify_failedPayment", label: "Failed Payment" },
                    { key: "notify_dailyDigest", label: "Daily Digest" },
                    { key: "notify_weeklyReport", label: "Weekly Report" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center justify-between p-4 bg-cloud rounded-input">
                      <p className="font-semibold text-navy text-sm">{item.label}</p>
                      <Toggle value={notifications[item.key] || "false"} onChange={(v) => setNotifications({ ...notifications, [item.key]: v })} />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gold" /> Security Settings
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">Configure security policies.</p>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 bg-cloud rounded-input">
                    <p className="font-semibold text-navy text-sm">Enforce MFA for Admins</p>
                    <Toggle value={security.enforceMFA || "false"} onChange={(v) => setSecurity({ ...security, enforceMFA: v })} />
                  </label>
                  <label className="flex items-center justify-between p-4 bg-cloud rounded-input">
                    <p className="font-semibold text-navy text-sm">Require Special Characters</p>
                    <Toggle value={security.passwordRequireSpecial || "false"} onChange={(v) => setSecurity({ ...security, passwordRequireSpecial: v })} />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Session Timeout (min)</label>
                    <input type="number" value={security.sessionTimeout || ""} onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Password Min Length</label>
                    <input type="number" value={security.passwordMinLength || ""} onChange={(e) => setSecurity({ ...security, passwordMinLength: e.target.value })} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Max Login Attempts</label>
                    <input type="number" value={security.maxLoginAttempts || ""} onChange={(e) => setSecurity({ ...security, maxLoginAttempts: e.target.value })} className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm" />
                  </div>
                </div>
              </div>
            )}

            {/* ADVANCED TAB */}
            {activeTab === "advanced" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl flex items-center gap-2">
                    <Database className="w-5 h-5 text-gold" /> Advanced Settings
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">System information.</p>
                </div>

                <div className="bg-cloud rounded-card p-5">
                  <h3 className="font-semibold text-navy text-sm mb-4">System Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {[
                      { label: "Platform Version", value: "v1.0.0" },
                      { label: "Next.js Version", value: "16.3.6" },
                      { label: "Database", value: "PostgreSQL (Neon)" },
                      { label: "Node Version", value: "20.x LTS" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                        <span className="text-ink/60">{item.label}</span>
                        <span className="font-semibold text-navy">{item.value}</span>
                      </div>
                    ))}
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