"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Heart,
  Building2,
  FolderKanban,
  ShieldCheck,
  Stethoscope,
  FileBarChart,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  BookOpen,
  Search,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users & Members", icon: Users },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/donations", label: "Donations", icon: Heart },
  { href: "/admin/partners", label: "Partners", icon: Building2 },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/verification", label: "Verification", icon: ShieldCheck },
  { href: "/admin/healthcare", label: "Healthcare", icon: Stethoscope },
  { href: "/admin/stories", label: "Stories", icon: BookOpen }, 
  { href: "/admin/reports", label: "Reports", icon: FileBarChart },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const userInitial = session?.user?.name?.charAt(0).toUpperCase() || "A";

  return (
    <div className="min-h-screen bg-cloud flex">
      
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-navy text-white z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-2">
              <img
                src="/logo/logo.png"
                alt="DHK LIFT"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-white/50 text-xs mt-2 tracking-wider uppercase">
              Admin Panel
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-input font-medium text-sm transition-all ${
                      isActive
                        ? "bg-gold text-ink shadow-sm"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
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

          {/* User Info + Logout */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-4 py-2 mb-2">
              <div className="bg-gold rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-ink">{userInitial}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white text-sm truncate">
                  {session?.user?.name || "Admin"}
                </p>
                <p className="text-white/50 text-xs truncate">
                  {session?.user?.email || ""}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 rounded-input font-medium text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all w-full"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span>Sign Out</span>
            </button>
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
          <div className="px-4 md:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-ink hover:bg-navy/5 rounded-input transition-colors shrink-0"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Search */}
              <div className="relative flex-1 max-w-md hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                <input
                  type="text"
                  placeholder="Search applications, users, projects..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/admin/notifications"
                className="relative p-2.5 text-ink hover:bg-navy/5 rounded-full transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
              </Link>
              <div className="bg-gold rounded-full w-10 h-10 flex items-center justify-center">
                <span className="font-display font-bold text-ink text-sm">{userInitial}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>

    </div>
  );
}