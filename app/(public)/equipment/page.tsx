"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import {
  Accessibility,
  Search,
  ChevronRight,
  CheckCircle,
  Heart,
  Truck,
  Shield,
  Stethoscope,
  Home,
  Wind,
  Activity,
  Loader2,
} from "lucide-react";

// ============ CATEGORIES ============
const categories = [
  { id: "all", label: "All Equipment", icon: Accessibility },
  { id: "wheelchairs", label: "Wheelchairs", icon: Accessibility },
  { id: "mobility", label: "Mobility Aids", icon: Activity },
  { id: "respiratory", label: "Respiratory", icon: Wind },
  { id: "home", label: "Home Equipment", icon: Home },
  { id: "prosthetics", label: "Prosthetics", icon: Stethoscope },
];

// Icon mapping
const categoryIconMap: Record<string, any> = {
  wheelchairs: Accessibility,
  mobility: Activity,
  respiratory: Wind,
  home: Home,
  prosthetics: Stethoscope,
};

const categoryColorMap: Record<string, { color: string; bgColor: string }> = {
  wheelchairs: { color: "text-navy", bgColor: "bg-navy/10" },
  mobility: { color: "text-gold", bgColor: "bg-gold/10" },
  respiratory: { color: "text-purple", bgColor: "bg-purple/10" },
  home: { color: "text-info", bgColor: "bg-info/10" },
  prosthetics: { color: "text-error", bgColor: "bg-error/10" },
};

export default function EquipmentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch equipment from API
  useEffect(() => {
    fetch("/api/equipment")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          categoryLabel: item.categoryLabel,
          description: item.description,
          availability: item.availability,
          image: item.imageUrl || "/images/programs/disasterRelief.png",
          icon: categoryIconMap[item.category] || Accessibility,
          ...(categoryColorMap[item.category] || {
            color: "text-navy",
            bgColor: "bg-navy/10",
          }),
        }));
        setEquipment(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching equipment:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Filter equipment based on search and category
  const filteredEquipment = useMemo(() => {
    return equipment.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, equipment]);

  return (
    <main className="min-h-screen bg-cloud">
      {/* ================= HERO ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <div className="bg-gold/20 rounded-full p-4 w-fit mx-auto mb-6 animate-fade-in">
            <Accessibility className="w-10 h-10 text-gold" />
          </div>
          <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm">
            Medical Equipment
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4">
            Equipment That <br />
            <span className="text-gradient-gold">Restores Independence.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed">
            Browse our directory of medical equipment. Request what you need and
            we'll connect you with verified suppliers.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search equipment..."
                className="w-full pl-14 pr-32 py-4 md:py-5 rounded-input border-0 bg-white text-ink placeholder:text-ink/40 focus:outline-none focus:ring-4 focus:ring-gold/30 shadow-2xl text-base"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors text-sm"
              >
                Search
              </button>
            </div>
            {searchQuery && (
              <p className="text-white/70 text-sm mt-3">
                Showing {filteredEquipment.length} result(s) for "{searchQuery}"
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ================= TRUST BAR ================= */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-container mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-teal shrink-0" />
              <span className="text-ink/70 text-sm font-medium">Verified Suppliers</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Truck className="w-5 h-5 text-teal shrink-0" />
              <span className="text-ink/70 text-sm font-medium">Free Delivery</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-teal shrink-0" />
              <span className="text-ink/70 text-sm font-medium">100% Free</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-teal shrink-0" />
              <span className="text-ink/70 text-sm font-medium">Follow-up Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="max-w-container mx-auto px-6 py-8">
        <div className="bg-white rounded-card p-4 shadow-sm border border-gray-100">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-navy text-white shadow-sm"
                      : "bg-cloud text-ink/70 hover:bg-navy/5 hover:text-navy"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ EQUIPMENT GRID ============ */}
      <section className="max-w-container mx-auto px-6 pb-16 md:pb-24">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-navy animate-spin" />
          </div>
        ) : filteredEquipment.length === 0 ? (
          <div className="bg-white rounded-card p-12 text-center border border-gray-100">
            <Search className="w-12 h-12 text-ink/30 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-navy">
              No Equipment Found
            </h3>
            <p className="text-ink/60 mt-2">
              Try a different search term or category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-6 text-navy font-semibold hover:text-gold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map((item) => {
              const Icon = item.icon;
              const availabilityColor =
                item.availability === "Available"
                  ? "text-success bg-success/10"
                  : item.availability === "Limited"
                  ? "text-warning bg-warning/10"
                  : "text-error bg-error/10";

              return (
                <div
                  key={item.id}
                  className="card-hover bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className={`absolute top-4 left-4 ${item.bgColor} backdrop-blur-sm rounded-full p-3`}
                    >
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div
                      className={`absolute top-4 right-4 ${availabilityColor} backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-full`}
                    >
                      {item.availability}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full w-fit">
                      {item.categoryLabel}
                    </span>
                    <h3 className="font-display font-bold text-navy text-lg mt-3">
                      {item.name}
                    </h3>
                    <p className="text-ink/70 text-sm mt-2 leading-relaxed flex-1">
                      {item.description}
                    </p>

                    <Link
                      href={`/equipment/request?item=${item.id}`}
                      className="btn-lift mt-5 bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      Request Equipment
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-purple text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Can't Find What You Need?
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Contact our team and we'll help you find the right equipment or connect
            you with a verified supplier.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/equipment/request"
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <Accessibility className="w-5 h-5" />
              Submit Custom Request
            </Link>
            <Link
              href="/contact"
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              Contact Support
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}