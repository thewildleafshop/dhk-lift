import Link from "next/link";
import {
  Home,
  Search,
  ArrowLeft,
  Heart,
  Users,
  BookOpen,
  LifeBuoy,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-navy text-white relative overflow-hidden flex items-center justify-center px-6 py-16">
      
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        
        {/* 404 Number */}
        <div className="relative inline-block mb-8 animate-fade-in-up">
          <h1 className="font-display text-[120px] md:text-[180px] leading-none font-bold text-white/10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gold/20 backdrop-blur-sm rounded-full p-5">
              <LifeBuoy className="w-12 h-12 md:w-16 md:h-16 text-gold" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animate-fade-in-up">
          Page Not Found
        </h2>
        <p className="text-lg text-white/70 mt-4 max-w-lg mx-auto leading-relaxed animate-fade-in-up delay-100">
          Oops! The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center animate-fade-in-up delay-200">
          <Link
            href="/"
            className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/assistance"
            className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Get Assistance
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-16 pt-10 border-t border-white/10 animate-fade-in-up delay-300">
          <p className="text-white/50 text-sm uppercase tracking-wider mb-6">
            Popular Destinations
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: "/giving", label: "Donate", icon: Heart },
              { href: "/programs", label: "Programs", icon: BookOpen },
              { href: "/assistance", label: "Get Help", icon: Users },
              { href: "/contact", label: "Contact", icon: Search },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-card border border-white/10 transition-all group"
                >
                  <Icon className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-white/90">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Help Text */}
        <p className="text-white/50 text-xs mt-10 animate-fade-in-up delay-400">
          Still need help? <Link href="/contact" className="text-gold hover:underline font-semibold">Contact our support team</Link>
        </p>

      </div>
    </main>
  );
}