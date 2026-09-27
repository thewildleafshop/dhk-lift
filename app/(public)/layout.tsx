"use client";

import Link from "next/link";
import { Search, User, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cloud flex flex-col">
      {/* ================= PUBLIC HEADER ================= */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-container mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/logo/logo.png"
              alt="DHK LIFT"
              className="h-14 md:h-16 lg:h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-ink font-medium text-sm">
            {/* Programs Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-navy transition-colors py-2">
                Programs
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-card shadow-xl border border-gray-100 py-2 min-w-[200px]">
                  <Link href="/assistance" className="block px-4 py-2.5 text-ink hover:bg-cloud hover:text-navy transition-colors text-sm">
                    Assistance
                  </Link>
                  <Link href="/equipment" className="block px-4 py-2.5 text-ink hover:bg-cloud hover:text-navy transition-colors text-sm">
                    Equipment
                  </Link>
                  <Link href="/healthcare/funds" className="block px-4 py-2.5 text-ink hover:bg-cloud hover:text-navy transition-colors text-sm">
                    Healthcare
                  </Link>
                </div>
              </div>
            </div>

            {/* Direct Links */}
            <Link href="/giving" className="hover:text-navy transition-colors">Giving</Link>
            <Link href="/membership" className="hover:text-navy transition-colors">Membership</Link>

            {/* Partnerships Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-navy transition-colors py-2">
                Partnerships
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-card shadow-xl border border-gray-100 py-2 min-w-[200px]">
                  <Link href="/partnerships" className="block px-4 py-2.5 text-ink hover:bg-cloud hover:text-navy transition-colors text-sm">
                    Global Partnerships
                  </Link>
                  <Link href="/projects" className="block px-4 py-2.5 text-ink hover:bg-cloud hover:text-navy transition-colors text-sm">
                    Projects
                  </Link>
                  <Link href="/transparency" className="block px-4 py-2.5 text-ink hover:bg-cloud hover:text-navy transition-colors text-sm">
                    Transparency
                  </Link>
                </div>
              </div>
            </div>

            {/* More Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-navy transition-colors py-2">
                More
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-card shadow-xl border border-gray-100 py-2 min-w-[200px]">
                  <Link href="/stories" className="block px-4 py-2.5 text-ink hover:bg-cloud hover:text-navy transition-colors text-sm">
                    Stories
                  </Link>
                  <Link href="/impact" className="block px-4 py-2.5 text-ink hover:bg-cloud hover:text-navy transition-colors text-sm">
                    Impact
                  </Link>
                  <Link href="/about" className="block px-4 py-2.5 text-ink hover:bg-cloud hover:text-navy transition-colors text-sm">
                    About Us
                  </Link>
                  <Link href="/faq" className="block px-4 py-2.5 text-ink hover:bg-cloud hover:text-navy transition-colors text-sm">
                    FAQ
                  </Link>
                  <Link href="/contact" className="block px-4 py-2.5 text-ink hover:bg-cloud hover:text-navy transition-colors text-sm">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Right Side: Search, Login, Donate */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 text-ink hover:text-navy hover:bg-navy/5 rounded-full transition-all"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Login */}
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1.5 text-ink hover:text-navy font-medium text-sm transition-colors px-3 py-2 rounded-input hover:bg-navy/5"
            >
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Login</span>
            </Link>

            {/* Donate CTA */}
            <Link
              href="/giving"
              className="btn-lift bg-gold text-ink font-semibold px-4 md:px-6 py-2 md:py-2.5 rounded-input hover:bg-gold/90 text-sm"
            >
              Donate
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 text-ink hover:bg-navy/5 rounded-full transition-all"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="border-t border-gray-100 bg-white animate-slide-down">
            <div className="max-w-container mx-auto px-4 md:px-6 py-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                <input
                  type="text"
                  placeholder="Search programs, projects, stories..."
                  className="w-full pl-12 pr-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-ink"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white animate-slide-down max-h-[80vh] overflow-y-auto">
            <nav className="max-w-container mx-auto px-4 py-6 flex flex-col gap-1">
              {/* Programs Section */}
              <div className="px-4 py-2 text-xs font-semibold text-ink/50 uppercase tracking-wider">
                Programs
              </div>
              <Link href="/assistance" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all">
                Assistance
              </Link>
              <Link href="/equipment" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all">
                Equipment
              </Link>
              <Link href="/healthcare/funds" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all">
                Healthcare
              </Link>

              {/* Other Links */}
              <div className="border-t border-gray-100 my-3"></div>
              <Link href="/giving" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all">
                Giving
              </Link>
              <Link href="/membership" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all">
                Membership
              </Link>

              {/* Partnerships Section */}
              <div className="border-t border-gray-100 my-3"></div>
              <div className="px-4 py-2 text-xs font-semibold text-ink/50 uppercase tracking-wider">
                Partnerships
              </div>
              <Link href="/partnerships" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all">
                Global Partnerships
              </Link>
              <Link href="/projects" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all">
                Projects
              </Link>
              <Link href="/transparency" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all">
                Transparency
              </Link>

              {/* More Section */}
              <div className="border-t border-gray-100 my-3"></div>
              <div className="px-4 py-2 text-xs font-semibold text-ink/50 uppercase tracking-wider">
                More
              </div>
              <Link href="/stories" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all">
                Stories
              </Link>
              <Link href="/impact" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all">
                Impact
              </Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all">
                About Us
              </Link>
              <Link href="/faq" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all">
                FAQ
              </Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all">
                Contact
              </Link>

              {/* Login */}
              <div className="border-t border-gray-100 my-3"></div>
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all">
                <User className="w-4 h-4" />
                Login
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* ================= PAGE CONTENT ================= */}
      <main className="flex-1">{children}</main>
    </div>
  );
}