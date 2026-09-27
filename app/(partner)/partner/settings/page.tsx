"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  Key,
  LogOut,
  Trash2,
  Smartphone,
  Globe,
} from "lucide-react";

type Tab = "account" | "notifications" | "security" | "preferences";

const tabs: { id: Tab; label: string; icon: any }[] = [
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "preferences", label: "Preferences", icon: Settings },
];

export default function PartnerSettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("account");
  const [saved, setSaved] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  // Account Settings
  const [account, setAccount] = useState({
    name: "Raazia Babar",
    email: "raaziach23@gmail.com",
    phone: "+92 300 1234567",
    position: "Director",
  });

  // Password Settings
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailMessages: true,
    emailProjectUpdates: true,
    emailFundingUpdates: true,
    emailVerificationUpdates: true,
    emailMarketing: false,
    smsUrgent: true,
    pushNotifications: true,
  });

  // Preferences
  const [preferences, setPreferences] = useState({
    language: "English",
    timezone: "Asia/Karachi (PKT)",
    dateFormat: "DD/MM/YYYY",
    emailDigest: "daily",
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
            Settings
          </h1>
          <p className="text-ink/70 mt-1">
            Manage your partner account settings and preferences.
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
            
            {/* ================= ACCOUNT TAB ================= */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl flex items-center gap-2">
                    <User className="w-5 h-5 text-gold" />
                    Account Settings
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">
                    Update your personal contact information.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Full Name</label>
                    <input
                      type="text"
                      value={account.name}
                      onChange={(e) => setAccount({ ...account, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Position / Role</label>
                    <input
                      type="text"
                      value={account.position}
                      onChange={(e) => setAccount({ ...account, position: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="email"
                        value={account.email}
                        onChange={(e) => setAccount({ ...account, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="tel"
                        value={account.phone}
                        onChange={(e) => setAccount({ ...account, phone: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 text-sm"
                  >
                    <Save className="w-4 h-4" />
                    Save Account
                  </button>
                </div>
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
                    Choose how you want to be notified about updates.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { key: "emailMessages", label: "New Messages", desc: "Get notified when DHK LIFT sends you a message" },
                    { key: "emailProjectUpdates", label: "Project Updates", desc: "Updates about your submitted projects" },
                    { key: "emailFundingUpdates", label: "Funding Updates", desc: "Updates about your funding requests" },
                    { key: "emailVerificationUpdates", label: "Verification Updates", desc: "Updates about your verification status" },
                    { key: "emailMarketing", label: "Marketing Emails", desc: "Newsletters and promotional content" },
                    { key: "smsUrgent", label: "SMS for Urgent Alerts", desc: "Important updates via SMS" },
                    { key: "pushNotifications", label: "Push Notifications", desc: "Browser push notifications" },
                  ].map((item) => {
                    const isEnabled = notifications[item.key as keyof typeof notifications];
                    return (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 bg-cloud rounded-input"
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
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 text-sm"
                  >
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </button>
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
                    Update your password and manage account security.
                  </p>
                </div>

                {/* Password Change */}
                <div className="bg-cloud rounded-card p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-navy text-sm flex items-center gap-2">
                      <Key className="w-4 h-4 text-gold" />
                      Change Password
                    </h3>
                    <button
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold/80 transition-colors"
                    >
                      {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {showPasswords ? "Hide" : "Show"}
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5">Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type={showPasswords ? "text" : "password"}
                        value={passwords.current}
                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                        placeholder="Enter current password"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1.5">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                        <input
                          type={showPasswords ? "text" : "password"}
                          value={passwords.new}
                          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                          placeholder="Min. 8 characters"
                          className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1.5">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                        <input
                          type={showPasswords ? "text" : "password"}
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                          placeholder="Re-enter new password"
                          className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSave}
                    className="btn-lift bg-navy text-white font-semibold px-5 py-2.5 rounded-input hover:bg-navy/90 transition-colors text-sm w-fit"
                  >
                    Update Password
                  </button>
                </div>

                {/* Two Factor */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-navy text-sm">Additional Security</h3>

                  <div className="flex items-center justify-between p-4 bg-cloud rounded-input">
                    <div className="flex items-center gap-3">
                      <div className="bg-navy/10 rounded-full p-2">
                        <Smartphone className="w-4 h-4 text-navy" />
                      </div>
                      <div>
                        <p className="font-semibold text-navy text-sm">Two-Factor Authentication</p>
                        <p className="text-ink/60 text-xs mt-0.5">Add an extra layer of security</p>
                      </div>
                    </div>
                    <button className="btn-lift bg-teal text-white font-semibold px-4 py-2 rounded-input hover:bg-teal/90 transition-colors text-xs">
                      Enable
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-cloud rounded-input">
                    <div className="flex items-center gap-3">
                      <div className="bg-navy/10 rounded-full p-2">
                        <Globe className="w-4 h-4 text-navy" />
                      </div>
                      <div>
                        <p className="font-semibold text-navy text-sm">Active Sessions</p>
                        <p className="text-ink/60 text-xs mt-0.5">Manage your logged-in devices</p>
                      </div>
                    </div>
                    <button className="text-gold font-semibold text-xs hover:text-gold/80 transition-colors">
                      Manage
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-semibold text-error text-sm mb-3">Danger Zone</h3>
                  <div className="p-4 bg-error/5 border border-error/20 rounded-input">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-error mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-error text-sm">Log Out All Devices</p>
                        <p className="text-ink/60 text-xs mt-1">
                          Sign out of all sessions except this one.
                        </p>
                      </div>
                      <button className="text-error font-semibold text-xs hover:bg-error/10 px-3 py-2 rounded-input transition-colors shrink-0 flex items-center gap-1">
                        <LogOut className="w-3.5 h-3.5" />
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= PREFERENCES TAB ================= */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl flex items-center gap-2">
                    <Settings className="w-5 h-5 text-gold" />
                    Preferences
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">
                    Customize your experience on the platform.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Language</label>
                    <select
                      value={preferences.language}
                      onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                    >
                      <option>English</option>
                      <option>Urdu</option>
                      <option>Arabic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Timezone</label>
                    <select
                      value={preferences.timezone}
                      onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                    >
                      <option>Asia/Karachi (PKT)</option>
                      <option>Asia/Dubai (GST)</option>
                      <option>Europe/London (GMT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Date Format</label>
                    <select
                      value={preferences.dateFormat}
                      onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                    >
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Email Digest</label>
                    <select
                      value={preferences.emailDigest}
                      onChange={(e) => setPreferences({ ...preferences, emailDigest: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white text-sm"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 text-sm"
                  >
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}