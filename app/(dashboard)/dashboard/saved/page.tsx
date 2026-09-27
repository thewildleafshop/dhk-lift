"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bookmark,
  Heart,
  FileText,
  ChevronRight,
  Search,
  Trash2,
  ExternalLink,
  Stethoscope,
  Utensils,
  BookOpen,
  Accessibility,
  Users,
  Home,
  TrendingUp,
  Inbox,
} from "lucide-react";

// ============ TYPES ============
type SavedItemType = "program" | "cause" | "project";

type SavedItem = {
  id: string;
  type: SavedItemType;
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  image: string;
  savedDate: string;
  href: string;
};

// ============ TAB FILTERS ============
const tabs: { id: SavedItemType | "all"; label: string; icon: any }[] = [
  { id: "all", label: "All Items", icon: Bookmark },
  { id: "program", label: "Programs", icon: Users },
  { id: "cause", label: "Causes", icon: Heart },
  { id: "project", label: "Projects", icon: FileText },
];

// ============ DEMO DATA ============
const demoItems: SavedItem[] = [
  {
    id: "1",
    type: "program",
    title: "LIFT Health",
    description: "Medical care, disease funds, and healthcare access for underserved communities.",
    icon: Stethoscope,
    color: "text-teal",
    bgColor: "bg-teal/10",
    image: "/images/programs/healthcare.png",
    savedDate: "Apr 10, 2026",
    href: "/programs/lift-health",
  },
  {
    id: "2",
    type: "cause",
    title: "Food Security",
    description: "Providing nutritious meals to families facing hunger and malnutrition.",
    icon: Utensils,
    color: "text-gold",
    bgColor: "bg-gold/10",
    image: "/images/programs/foodDonation.png",
    savedDate: "Apr 8, 2026",
    href: "/giving/food-security",
  },
  {
    id: "3",
    type: "program",
    title: "Education Support",
    description: "Helping children access quality education and learning resources.",
    icon: BookOpen,
    color: "text-teal",
    bgColor: "bg-teal/10",
    image: "/images/programs/education.png",
    savedDate: "Apr 5, 2026",
    href: "/programs/education-support",
  },
  {
    id: "4",
    type: "cause",
    title: "LIFT Protect",
    description: "Confidential support for women and children affected by abuse and exploitation.",
    icon: Heart,
    color: "text-purple",
    bgColor: "bg-purple/10",
    image: "/images/programs/familu.png",
    savedDate: "Mar 28, 2026",
    href: "/giving/lift-protect",
  },
  {
    id: "5",
    type: "project",
    title: "Clean Water Initiative",
    description: "Building wells and water filtration systems in rural communities.",
    icon: TrendingUp,
    color: "text-navy",
    bgColor: "bg-navy/10",
    image: "/images/programs/disasterRelief.png",
    savedDate: "Mar 20, 2026",
    href: "/projects/clean-water",
  },
  {
    id: "6",
    type: "program",
    title: "LIFT Ability",
    description: "Mobility aids, prosthetics, and medical equipment for people with disabilities.",
    icon: Accessibility,
    color: "text-navy",
    bgColor: "bg-navy/10",
    image: "/images/programs/disasterRelief.png",
    savedDate: "Mar 15, 2026",
    href: "/programs/lift-ability",
  },
];

// ============ TYPE BADGE ============
const typeBadge: Record<SavedItemType, { label: string; color: string; bg: string }> = {
  program: { label: "Program", color: "text-teal", bg: "bg-teal/10" },
  cause: { label: "Cause", color: "text-gold", bg: "bg-gold/10" },
  project: { label: "Project", color: "text-purple", bg: "bg-purple/10" },
};

// ============ MAIN COMPONENT ============
export default function SavedItemsPage() {
  const [activeTab, setActiveTab] = useState<SavedItemType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(demoItems);

  const filteredItems = items.filter((item) => {
    const matchesTab = activeTab === "all" || item.type === activeTab;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleRemove = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const counts = {
    all: items.length,
    program: items.filter((i) => i.type === "program").length,
    cause: items.filter((i) => i.type === "cause").length,
    project: items.filter((i) => i.type === "project").length,
  };

  return (
    <div className="space-y-6">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
            Saved Items
          </h1>
          <p className="text-ink/70 mt-1">
            Programs, causes, and projects you've bookmarked for later.
          </p>
        </div>
        <Link
          href="/giving"
          className="btn-lift bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2 w-fit"
        >
          <Heart className="w-5 h-5" />
          Explore Causes
        </Link>
      </div>

      {/* ================= TABS ================= */}
      <div className="bg-white rounded-card p-2 shadow-sm border border-gray-100 flex flex-wrap gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-fit flex items-center justify-center gap-2 px-4 py-3 rounded-input font-medium text-sm transition-all ${
                isActive
                  ? "bg-navy text-white shadow-sm"
                  : "text-ink/70 hover:bg-navy/5 hover:text-navy"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isActive ? "bg-white/20 text-white" : "bg-cloud text-ink/60"
              }`}>
                {counts[tab.id]}
              </span>
            </button>
          );
        })}
      </div>

      {/* ================= SEARCH ================= */}
      <div className="bg-white rounded-card p-4 shadow-sm border border-gray-100">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved items..."
            className="w-full pl-12 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
          />
        </div>
      </div>

      {/* ================= SAVED ITEMS GRID ================= */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const badge = typeBadge[item.type];
            return (
              <div
                key={item.id}
                className="card-hover bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Type Badge */}
                  <div className={`absolute top-4 left-4 ${badge.bg} backdrop-blur-sm text-xs font-semibold ${badge.color} px-3 py-1.5 rounded-full`}>
                    {badge.label}
                  </div>
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-error hover:text-white transition-colors shadow-sm"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className={`${item.bgColor} rounded-full p-2.5 w-fit mb-3`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>

                  <h3 className="font-display font-bold text-navy text-lg">
                    {item.title}
                  </h3>
                  <p className="text-ink/70 text-sm mt-2 leading-relaxed flex-1 line-clamp-3">
                    {item.description}
                  </p>

                  <p className="text-ink/40 text-xs mt-3">
                    Saved on {item.savedDate}
                  </p>

                  {/* Actions */}
                  <div className="mt-5 pt-5 border-t border-gray-100 flex gap-2">
                    <Link
                      href={item.href}
                      className="btn-lift flex-1 bg-navy text-white font-semibold px-4 py-2.5 rounded-input hover:bg-navy/90 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      View Details
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={
                        item.type === "cause"
                          ? `/giving/${item.href.split("/").pop()}`
                          : "/giving"
                      }
                      className="btn-lift bg-gold text-ink font-semibold p-2.5 rounded-input hover:bg-gold/90 transition-colors flex items-center justify-center"
                      title="Donate"
                    >
                      <Heart className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ================= EMPTY STATE ================= */
        <div className="bg-white rounded-card p-12 text-center border border-gray-100">
          <div className="bg-cloud rounded-full p-6 w-fit mx-auto mb-4">
            <Inbox className="w-12 h-12 text-ink/30" />
          </div>
          <h3 className="font-display text-xl font-bold text-navy">
            No Saved Items
          </h3>
          <p className="text-ink/60 mt-2 max-w-md mx-auto">
            {searchQuery
              ? "Try adjusting your search query."
              : "You haven't saved any programs, causes, or projects yet."}
          </p>
          <Link
            href="/programs"
            className="btn-lift inline-flex items-center gap-2 bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg mt-6"
          >
            <Bookmark className="w-5 h-5" />
            Browse Programs
          </Link>
        </div>
      )}

    </div>
  );
}