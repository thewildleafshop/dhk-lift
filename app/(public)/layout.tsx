export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cloud">
      {/* Public Header yahan aayega */}
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-navy">DHK LIFT</h1>
          <nav className="hidden md:flex gap-6 text-ink">
            <a href="#" className="hover:text-navy">Assistance</a>
            <a href="#" className="hover:text-navy">Giving</a>
            <a href="#" className="hover:text-navy">Membership</a>
            <a href="#" className="hover:text-navy">Partnerships</a>
          </nav>
          <button className="bg-gold text-ink px-6 py-2 rounded-xl font-semibold">
            Donate
          </button>
        </div>
      </header>

      <main>{children}</main>

      {/* Public Footer yahan aayega */}
      <footer className="bg-navy text-white px-8 py-12 mt-16">
        <div className="max-w-7xl mx-auto">
          <p>© 2026 DHK LIFT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}