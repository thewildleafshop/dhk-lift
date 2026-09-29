"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Heart,
  TrendingUp,
  Bookmark,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
  Stethoscope,
  Award,
  Briefcase,
  Gift,
} from "lucide-react";

// ============ ROLE-BASED NAVIGATION ============
const getNavItems = (role: string) => {
  const commonStart = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  const commonEnd = [
    { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  ];

  const roleSpecificItems: Record<string, any[]> = {
       MEMBER: [
      { href: "/dashboard/applications", label: "My Applications", icon: FileText },
      { href: "/dashboard/donations", label: "My Donations", icon: Heart },
      { href: "/dashboard/impact", label: "My Impact", icon: TrendingUp },
      { href: "/dashboard/benefits", label: "My Benefits", icon: Gift }, // ✅ ADDED
      { href: "/dashboard/saved", label: "Saved Items", icon: Bookmark },
       { href: "/dashboard/patient", label: "Patient Assistance", icon: Stethoscope },
    ],
    APPLICANT: [
      { href: "/dashboard/applications", label: "My Applications", icon: FileText },
      { href: "/dashboard/donations", label: "My Donations", icon: Heart },
      { href: "/dashboard/impact", label: "My Impact", icon: TrendingUp },
      { href: "/dashboard/benefits", label: "My Benefits", icon: Gift }, // ✅ ADDED
      { href: "/dashboard/patient", label: "Patient Assistance", icon: Stethoscope },
    ],
    PROVIDER: [
      { href: "/healthcare/claims/status", label: "My Claims", icon: FileText },
      { href: "/healthcare/claims/submit", label: "Submit Claim", icon: FileText },
    ],
    PHARMACY: [
      { href: "/healthcare/claims/status", label: "My Claims", icon: FileText },
      { href: "/healthcare/claims/submit", label: "Submit Claim", icon: FileText },
    ],
    VOLUNTEER: [
      { href: "/stories", label: "Impact Stories", icon: TrendingUp },
    ],
    PARTNER: [
      { href: "/partner", label: "Partner Portal", icon: Briefcase },
    ],
    ADMIN: [
      { href: "/admin", label: "Admin Panel", icon: Award },
    ],
  };

  const roleItems = roleSpecificItems[role] || roleSpecificItems.MEMBER;

  return [...commonStart, ...roleItems, ...commonEnd];
};
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userRole = (session?.user as any)?.role || "MEMBER";
  const navItems = getNavItems(userRole);
  const bottomNavItems = [
    { href: "/dashboard/profile", label: "Profile & Settings", icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const userInitial = session?.user?.name?.charAt(0).toUpperCase() || "U";

  const isNavItemActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-cloud flex">
      
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo/logo.png"
                alt="DHK LIFT"
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Role Badge */}
          <div className="px-4 pt-4">
            <div className="bg-cloud rounded-input px-3 py-2 flex items-center justify-between">
              <span className="text-xs text-ink/50 font-medium">Logged in as</span>
              <span className="text-xs font-bold text-navy bg-navy/10 px-2 py-0.5 rounded-full">
                {userRole}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isNavItemActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-input font-medium text-sm transition-all ${
                      isActive
                        ? "bg-navy text-white shadow-sm"
                        : "text-ink/70 hover:bg-navy/5 hover:text-navy"
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-100 space-y-1">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = isNavItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-input font-medium text-sm transition-all ${
                    isActive
                      ? "bg-navy text-white"
                      : "text-ink/70 hover:bg-navy/5 hover:text-navy"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* User Info + Logout */}
            <div className="pt-4 mt-4 border-t border-gray-100">
              <div className="flex items-center gap-3 px-4 py-2 mb-2">
                <div className="bg-gold rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-ink">{userInitial}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-navy text-sm truncate">
                    {session?.user?.name || "User"}
                  </p>
                  <p className="text-ink/60 text-xs truncate">
                    {session?.user?.email || ""}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-3 rounded-input font-medium text-sm text-error hover:bg-error/5 transition-all w-full"
              >
                <LogOut className="w-5 h-5 shrink-0" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 md:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-ink hover:bg-navy/5 rounded-input transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h2 className="font-display font-bold text-navy text-lg">
                  {navItems.find((item) => isNavItemActive(item.href))?.label || "Dashboard"}
                </h2>
                <p className="text-ink/60 text-xs hidden sm:block">
                  Welcome back, {session?.user?.name?.split(" ")[0] || "User"}!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/dashboard/notifications"
                className="relative p-2.5 text-ink hover:bg-navy/5 rounded-full transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full"></span>
              </Link>
              <Link
                href="/dashboard/profile"
                className="bg-gold rounded-full w-10 h-10 flex items-center justify-center hover:bg-gold/90 transition-colors"
              >
                <span className="font-display font-bold text-ink text-sm">{userInitial}</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>

    </div>
  );
}