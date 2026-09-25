import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardHome() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-6">
        Welcome, {session.user?.name || "User"}!
      </h1>
      <p className="text-ink mb-4">Role: {(session.user as any)?.role}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Active Applications</p>
          <p className="text-3xl font-bold text-navy">0</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Donated</p>
          <p className="text-3xl font-bold text-gold">$0</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Membership Tier</p>
          <p className="text-3xl font-bold text-purple">Bronze</p>
        </div>
      </div>
    </div>
  );
}