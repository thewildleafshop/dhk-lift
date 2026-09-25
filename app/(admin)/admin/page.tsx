export default function AdminHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-ink mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-navy">
          <p className="text-sm text-gray-500 mb-1">Pending Reviews</p>
          <p className="text-3xl font-bold text-navy">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-gold">
          <p className="text-sm text-gray-500 mb-1">New Donations</p>
          <p className="text-3xl font-bold text-gold">48</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple">
          <p className="text-sm text-gray-500 mb-1">Active Projects</p>
          <p className="text-3xl font-bold text-purple">7</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-success">
          <p className="text-sm text-gray-500 mb-1">Verified Partners</p>
          <p className="text-3xl font-bold text-success">23</p>
        </div>
      </div>
    </div>
  );
}