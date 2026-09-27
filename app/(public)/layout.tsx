"use client";

import Link from "next/link";
import { Search, User, Menu, X } from "lucide-react";
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
            <Link href="/assistance" className="nav-link hover:text-navy">Assistance</Link>
            <Link href="/equipment" className="nav-link hover:text-navy">Equipment</Link>
            <Link href="/healthcare/funds" className="nav-link hover:text-navy">Healthcare</Link>
            <Link href="/giving" className="nav-link hover:text-navy">Giving</Link>
            <Link href="/membership" className="nav-link hover:text-navy">Membership</Link>
            <Link href="/partnerships" className="nav-link hover:text-navy">Partnerships</Link>
            <Link href="/projects" className="nav-link hover:text-navy">Projects</Link>
            <Link href="/stories" className="nav-link hover:text-navy">Stories</Link>
            <Link href="/impact" className="nav-link hover:text-navy">Impact</Link>
            <Link href="/transparency" className="nav-link hover:text-navy">Transparency</Link>
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
          <div className="lg:hidden border-t border-gray-100 bg-white animate-slide-down">
            <nav className="max-w-container mx-auto px-4 py-6 flex flex-col gap-1">
              <Link
                href="/assistance"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3.5 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all"
              >
                Assistance
              </Link>
              <Link
                href="/equipment"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3.5 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all"
              >
                Equipment
              </Link>
              <Link
                href="/healthcare/funds"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3.5 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all"
              >
                Healthcare
              </Link>
              <Link
                href="/giving"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3.5 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all"
              >
                Giving
              </Link>
              <Link
                href="/membership"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3.5 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all"
              >
                Membership
              </Link>
              <Link
                href="/partnerships"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3.5 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all"
              >
                Partnerships
              </Link>
              <Link
                href="/projects"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3.5 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all"
              >
                Projects
              </Link>
              <Link
                href="/stories"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3.5 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all"
              >
                Stories
              </Link>
              <Link
                href="/impact"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3.5 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all"
              >
                Impact
              </Link>
              <Link
                href="/transparency"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3.5 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all"
              >
                Transparency
              </Link>

              <div className="border-t border-gray-100 my-3"></div>

              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3.5 text-ink font-medium rounded-input hover:bg-navy/5 hover:text-navy transition-all"
              >
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