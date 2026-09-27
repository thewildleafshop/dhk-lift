"use client";

import { useState } from "react";
import {
  Building2,
  Globe,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Users,
  ShieldCheck,
  CheckCircle,
  Edit3,
  Save,
  X,
  FileText,
  Award,
  TrendingUp,
  Upload,
  Download,
  Eye,
} from "lucide-react";

export default function PartnerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: "Al-Khidmat Foundation",
    type: "NGO / Nonprofit",
    email: "contact@alkhidmat.org",
    phone: "+92 21 1234567",
    website: "https://alkhidmat.org",
    foundedYear: "1990",
    country: "Pakistan",
    city: "Karachi",
    address: "Al-Khidmat House, Block 5, Clifton, Karachi",
    mission: "To serve humanity with dignity by providing food, healthcare, education, and disaster relief to underserved communities across Pakistan.",
    leadership: "Dr. Hafeez Ur Rehman (Chairman), Imran Siddiqui (Director Operations)",
    previousProjects: "Over 500 projects completed in healthcare, education, and disaster relief across 30 years of service.",
  });

  const handleSave = () => {
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <div className="space-y-6">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
            Organization Profile
          </h1>
          <p className="text-ink/70 mt-1">
            Manage your organization's public profile and information.
          </p>
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="btn-lift bg-white border-2 border-navy/20 text-navy font-semibold px-5 py-2.5 rounded-input hover:bg-navy/5 transition-colors flex items-center gap-2 text-sm"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-lift bg-gold text-ink font-semibold px-5 py-2.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 text-sm"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 w-fit text-sm"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      {/* ================= SUCCESS MESSAGE ================= */}
      {saved && (
        <div className="bg-success/5 border border-success/20 rounded-card p-4 flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-5 h-5 text-success shrink-0" />
          <p className="text-success text-sm font-medium">
            Profile updated successfully.
          </p>
        </div>
      )}

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ================= LEFT: PROFILE ================= */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Organization Header Card */}
          <div className="bg-gradient-to-br from-navy to-navy/90 rounded-card p-6 md:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 flex items-start gap-5">
              <div className="bg-gold rounded-full w-20 h-20 flex items-center justify-center shrink-0">
                <Building2 className="w-10 h-10 text-ink" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-display text-2xl md:text-3xl font-bold">
                    {profile.name}
                  </h2>
                  <span className="text-xs font-semibold text-gold bg-gold/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Trusted Partner
                  </span>
                </div>
                <p className="text-white/70 text-sm mt-2">{profile.type}</p>
                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm text-white/70">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {profile.city}, {profile.country}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Founded {profile.foundedYear}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-gold" />
              Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className="block text-xs font-semibold text-ink/50 uppercase tracking-wider mb-2">
                  Organization Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                  />
                ) : (
                  <p className="font-semibold text-navy text-sm">{profile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/50 uppercase tracking-wider mb-2">
                  Organization Type
                </label>
                {isEditing ? (
                  <select
                    value={profile.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                    className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm bg-white"
                  >
                    <option>NGO / Nonprofit</option>
                    <option>Healthcare Provider</option>
                    <option>Pharmacy</option>
                    <option>Educational Institution</option>
                    <option>Community Organization</option>
                  </select>
                ) : (
                  <p className="font-semibold text-navy text-sm">{profile.type}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/50 uppercase tracking-wider mb-2">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                  />
                ) : (
                  <p className="font-semibold text-navy text-sm break-all">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/50 uppercase tracking-wider mb-2">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                  />
                ) : (
                  <p className="font-semibold text-navy text-sm">{profile.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/50 uppercase tracking-wider mb-2">
                  Website
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profile.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                    className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                  />
                ) : (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gold hover:text-gold/80 transition-colors text-sm break-all"
                  >
                    {profile.website}
                  </a>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/50 uppercase tracking-wider mb-2">
                  Founded Year
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.foundedYear}
                    onChange={(e) => handleChange("foundedYear", e.target.value)}
                    className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                  />
                ) : (
                  <p className="font-semibold text-navy text-sm">{profile.foundedYear}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-ink/50 uppercase tracking-wider mb-2">
                  Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                  />
                ) : (
                  <p className="font-semibold text-navy text-sm">{profile.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-gold" />
              Mission Statement
            </h2>
            {isEditing ? (
              <textarea
                value={profile.mission}
                onChange={(e) => handleChange("mission", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none"
              />
            ) : (
              <p className="text-ink/80 leading-relaxed">{profile.mission}</p>
            )}
          </div>

          {/* Leadership */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-gold" />
              Leadership Team
            </h2>
            {isEditing ? (
              <textarea
                value={profile.leadership}
                onChange={(e) => handleChange("leadership", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none"
              />
            ) : (
              <p className="text-ink/80 leading-relaxed">{profile.leadership}</p>
            )}
          </div>

          {/* Previous Projects */}
          <div className="bg-white rounded-card p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gold" />
              Track Record
            </h2>
            {isEditing ? (
              <textarea
                value={profile.previousProjects}
                onChange={(e) => handleChange("previousProjects", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none"
              />
            ) : (
              <p className="text-ink/80 leading-relaxed">{profile.previousProjects}</p>
            )}
          </div>
        </div>

        {/* ================= RIGHT: SIDEBAR ================= */}
        <div className="space-y-6">
          
          {/* Verification Status */}
          <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-navy text-base mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold" />
              Verification Status
            </h3>
            <div className="bg-success/5 border border-success/20 rounded-card p-4 text-center mb-4">
              <div className="bg-success/10 rounded-full p-3 w-fit mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <p className="font-semibold text-success text-sm">Fully Verified</p>
              <p className="text-ink/60 text-xs mt-1">Trusted Partner Status</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-ink/60">Documents</span>
                <span className="font-semibold text-success flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Approved
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-ink/60">References</span>
                <span className="font-semibold text-success flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-ink/60">Track Record</span>
                <span className="font-semibold text-success flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Excellent
                </span>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
            <h3 className="font-display font-bold text-navy text-base mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold" />
              Documents
            </h3>
            <div className="space-y-2">
              {[
                "Registration Certificate",
                "Tax Exemption Certificate",
                "Financial Statements 2025",
                "Annual Report 2025",
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-cloud rounded-input">
                  <FileText className="w-4 h-4 text-navy shrink-0" />
                  <span className="text-xs text-navy font-medium flex-1 truncate">{doc}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-success shrink-0" />
                </div>
              ))}
            </div>
            <button className="btn-lift w-full mt-4 border-2 border-dashed border-gray-200 text-ink/60 hover:border-gold hover:text-gold font-medium px-4 py-3 rounded-input transition-colors flex items-center justify-center gap-2 text-sm">
              <Upload className="w-4 h-4" />
              Upload Document
            </button>
          </div>

          {/* Organization Stats */}
          <div className="bg-navy text-white rounded-card p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h3 className="font-display font-bold text-base mb-4">Organization Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-display text-2xl font-bold text-gold">25</p>
                  <p className="text-white/60 text-xs">Projects Done</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-gold">3</p>
                  <p className="text-white/60 text-xs">Active Projects</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-gold">$250K</p>
                  <p className="text-white/60 text-xs">Total Funding</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-gold">36</p>
                  <p className="text-white/60 text-xs">Years Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}