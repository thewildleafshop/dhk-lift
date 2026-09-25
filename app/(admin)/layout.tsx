export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-cloud">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-ink text-white p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-8">DHK Admin</h1>
        <nav className="space-y-2">
          <a href="/admin" className="block px-4 py-2 rounded-xl hover:bg-gray-700">
            Dashboard
          </a>
          <a href="/admin/users" className="block px-4 py-2 rounded-xl hover:bg-gray-700">
            Users
          </a>
          <a href="/admin/applications" className="block px-4 py-2 rounded-xl hover:bg-gray-700">
            Applications
          </a>
          <a href="/admin/donations" className="block px-4 py-2 rounded-xl hover:bg-gray-700">
            Donations
          </a>
          <a href="/admin/projects" className="block px-4 py-2 rounded-xl hover:bg-gray-700">
            Projects
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <h2 className="text-xl font-bold text-ink">Admin Panel</h2>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}