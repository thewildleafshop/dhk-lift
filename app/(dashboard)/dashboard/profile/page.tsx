"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Bell,
  Shield,
  Save,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Settings,
  FileText,
  MessageSquare,
  CreditCard,
  Trash2,
} from "lucide-react";

// ============ TYPES ============
type Tab = "personal" | "security" | "notifications" | "privacy";

const tabs: { id: Tab; label: string; icon: any }[] = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Shield },
];

// ============ MAIN COMPONENT ============
export default function ProfilePage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [saved, setSaved] = useState(false);

  // Personal Info State
  const [personalInfo, setPersonalInfo] = useState({
    name: session?.user?.name || "Raazia Bibi",
    email: session?.user?.email || "raazia@example.com",
    phone: "+92 300 1234567",
    dateOfBirth: "1990-05-15",
    gender: "female",
    address: "House #12, Street 5, Block A",
    city: "Karachi",
    country: "Pakistan",
  });

  // Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState(false);

  // Notification Preferences
  const [notifications, setNotifications] = useState({
    emailDonations: true,
    emailApplications: true,
    emailNewsletter: false,
    emailBenefits: true,
    smsUpdates: false,
    pushNotifications: true,
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    profilePublic: false,
    showInDonorList: true,
    allowMessages: true,
    shareImpact: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
          Profile & Settings
        </h1>
        <p className="text-ink/70 mt-1">
          Manage your personal information, security, and preferences.
        </p>
      </div>

      {/* ================= SUCCESS MESSAGE ================= */}
      {saved && (
        <div className="bg-success/5 border border-success/20 rounded-card p-4 flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-5 h-5 text-success shrink-0" />
          <p className="text-success text-sm font-medium">
            Your changes have been saved successfully.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* ================= SIDEBAR TABS ================= */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-card p-2 shadow-sm border border-gray-100 sticky top-24">
            {/* Profile Card */}
            <div className="p-4 text-center border-b border-gray-100">
              <div className="bg-gold rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3">
                <span className="font-display font-bold text-ink text-3xl">
                  {personalInfo.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="font-display font-bold text-navy text-base truncate">
                {personalInfo.name}
              </h3>
              <p className="text-ink/60 text-xs truncate">{personalInfo.email}</p>
              <span className="inline-block mt-2 text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
                Bronze Member
              </span>
            </div>

            {/* Nav Tabs */}
            <nav className="p-2 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-input font-medium text-sm transition-all ${
                      isActive
                        ? "bg-navy text-white"
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
            
            {/* ================= PERSONAL INFO TAB ================= */}
            {activeTab === "personal" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl">
                    Personal Information
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">
                    Update your personal details and contact information.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="text"
                        value={personalInfo.name}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={personalInfo.dateOfBirth}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">
                      Gender
                    </label>
                    <select
                      value={personalInfo.gender}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm bg-white"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not">Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">
                      City
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type="text"
                        value={personalInfo.city}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={personalInfo.address}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      value={personalInfo.country}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, country: e.target.value })}
                      className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 text-sm"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* ================= SECURITY TAB ================= */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl">
                    Security Settings
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">
                    Update your password and manage account security.
                  </p>
                </div>

                {/* Password Change */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type={showPasswords ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        placeholder="Enter current password"
                        className="w-full pl-11 pr-12 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(!showPasswords)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 hover:text-navy transition-colors"
                      >
                        {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type={showPasswords ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        placeholder="Min. 8 characters"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                      <input
                        type={showPasswords ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        placeholder="Re-enter new password"
                        className="w-full pl-11 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Security Options */}
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <h3 className="font-semibold text-navy text-sm">Security Options</h3>
                  
                  <div className="flex items-center justify-between p-4 bg-cloud rounded-input">
                    <div className="flex items-center gap-3">
                      <div className="bg-navy/10 rounded-full p-2">
                        <Shield className="w-4 h-4 text-navy" />
                      </div>
                      <div>
                        <p className="font-semibold text-navy text-sm">Two-Factor Authentication</p>
                        <p className="text-ink/60 text-xs">Add an extra layer of security</p>
                      </div>
                    </div>
                    <button className="text-gold font-semibold text-sm hover:text-gold/80 transition-colors">
                      Enable
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-cloud rounded-input">
                    <div className="flex items-center gap-3">
                      <div className="bg-navy/10 rounded-full p-2">
                        <FileText className="w-4 h-4 text-navy" />
                      </div>
                      <div>
                        <p className="font-semibold text-navy text-sm">Active Sessions</p>
                        <p className="text-ink/60 text-xs">Manage devices where you're signed in</p>
                      </div>
                    </div>
                    <button className="text-gold font-semibold text-sm hover:text-gold/80 transition-colors">
                      Manage
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 text-sm"
                  >
                    <Save className="w-4 h-4" />
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {/* ================= NOTIFICATIONS TAB ================= */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl">
                    Notification Preferences
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">
                    Choose how you want to be notified about updates.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { key: "emailDonations", label: "Donation Updates", desc: "Receive updates when your donations make an impact", icon: CreditCard },
                    { key: "emailApplications", label: "Application Updates", desc: "Get notified about your application status", icon: FileText },
                    { key: "emailBenefits", label: "Membership Benefits", desc: "New deals, vouchers, and member benefits", icon: Bell },
                    { key: "emailNewsletter", label: "Newsletter", desc: "Monthly newsletter with stories and impact", icon: Mail },
                    { key: "smsUpdates", label: "SMS Updates", desc: "Urgent updates via text message", icon: MessageSquare },
                    { key: "pushNotifications", label: "Push Notifications", desc: "Browser push notifications", icon: Bell },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isEnabled = notifications[item.key as keyof typeof notifications];
                    return (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 bg-cloud rounded-input"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-navy/10 rounded-full p-2 shrink-0">
                            <Icon className="w-4 h-4 text-navy" />
                          </div>
                          <div>
                            <p className="font-semibold text-navy text-sm">{item.label}</p>
                            <p className="text-ink/60 text-xs">{item.desc}</p>
                          </div>
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

            {/* ================= PRIVACY TAB ================= */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display font-bold text-navy text-xl">
                    Privacy Settings
                  </h2>
                  <p className="text-ink/70 text-sm mt-1">
                    Control who can see your information and how it's used.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { key: "profilePublic", label: "Public Profile", desc: "Make your profile visible to other members" },
                    { key: "showInDonorList", label: "Show in Donor List", desc: "Display your name in public donor lists" },
                    { key: "allowMessages", label: "Allow Messages", desc: "Let other members send you messages" },
                    { key: "shareImpact", label: "Share Impact Stories", desc: "Allow DHK LIFT to share your impact story" },
                  ].map((item) => {
                    const isEnabled = privacy[item.key as keyof typeof privacy];
                    return (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 bg-cloud rounded-input"
                      >
                        <div>
                          <p className="font-semibold text-navy text-sm">{item.label}</p>
                          <p className="text-ink/60 text-xs">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => setPrivacy({ ...privacy, [item.key]: !isEnabled })}
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

                {/* Danger Zone */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-semibold text-error text-sm mb-3">Danger Zone</h3>
                  <div className="p-4 bg-error/5 border border-error/20 rounded-input">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-error mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-error text-sm">Delete Account</p>
                        <p className="text-ink/60 text-xs mt-1">
                          Once deleted, your account and all data cannot be recovered.
                        </p>
                      </div>
                      <button className="text-error font-semibold text-sm hover:bg-error/10 px-3 py-2 rounded-input transition-colors shrink-0 flex items-center gap-1">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 text-sm"
                  >
                    <Save className="w-4 h-4" />
                    Save Settings
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