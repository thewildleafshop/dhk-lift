"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Define the Project type based on your DB schema
interface Project {
  id: string;
  title: string;
  partner: string;
  location: string;
  status: string;
  goalAmount: number;
  raisedAmount: number;
  createdAt: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  // Fetch projects from your API
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/admin/projects"); // Make sure this API route exists
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Filter projects based on search and status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.partner.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All Statuses" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects Management</h1>
          <p className="text-gray-500">Review, approve, and manage global projects.</p>
        </div>
        <button className="px-4 py-2 bg-[#0B468F] text-white rounded-lg hover:bg-blue-800 transition">
          Export CSV
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Total Projects</p>
          <p className="text-2xl font-bold text-[#0B468F]">{projects.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {projects.filter((p) => p.status === "In Progress").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Fundraising</p>
          <p className="text-2xl font-bold text-[#FFA20D]">
            {projects.filter((p) => p.status === "Fundraising").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-gray-700">
            {projects.filter((p) => p.status === "Completed").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-4">
        <input
          type="text"
          placeholder="Search by title, partner, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B468F]"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B468F]"
        >
          <option>All Statuses</option>
          <option>Approved</option>
          <option>Fundraising</option>
          <option>Funded</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Verified</option>
        </select>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No projects found.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Project</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Partner</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Goal</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Raised</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{project.title}</td>
                  <td className="px-6 py-4 text-gray-600">{project.partner}</td>
                  <td className="px-6 py-4 text-gray-600">{project.location}</td>
                  <td className="px-6 py-4 text-gray-900">${project.goalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-900">${project.raisedAmount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="px-3 py-1 text-sm bg-[#0B468F] text-white rounded-lg hover:bg-blue-800 transition"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}