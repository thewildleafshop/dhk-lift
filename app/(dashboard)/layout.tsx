export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-cloud">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-8">DHK LIFT</h1>
        <nav className="space-y-2">
          <a href="/dashboard" className="block px-4 py-2 rounded-xl hover:bg-navy-light">
            Dashboard
          </a>
          <a href="/dashboard/applications" className="block px-4 py-2 rounded-xl hover:bg-navy-light">
            My Applications
          </a>
          <a href="/dashboard/donations" className="block px-4 py-2 rounded-xl hover:bg-navy-light">
            My Donations
          </a>
          <a href="/dashboard/documents" className="block px-4 py-2 rounded-xl hover:bg-navy-light">
            Documents
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-navy">Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-ink">Welcome, User</span>
            <div className="w-10 h-10 bg-purple rounded-full"></div>
          </div>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}