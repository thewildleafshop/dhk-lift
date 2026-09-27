"use client";

import { useState, useEffect } from "react";
import {
  FileBarChart,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Heart,
  FileText,
  Building2,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Clock,
  Loader2,
} from "lucide-react";

// ============ TYPES ============
interface SummaryData {
  totalUsers: number;
  totalDonations: number;
  totalRaised: number;
  totalApplications: number;
  totalProjects: number;
  totalPartners: number;
}

// ============ REPORT TYPES ============
const reportTypes = [
  { id: "donations", label: "Donations Report", icon: DollarSign, color: "text-gold", bgColor: "bg-gold/10" },
  { id: "applications", label: "Applications Report", icon: FileText, color: "text-teal", bgColor: "bg-teal/10" },
  { id: "projects", label: "Projects Report", icon: Activity, color: "text-purple", bgColor: "bg-purple/10" },
  { id: "users", label: "Users Report", icon: Users, color: "text-navy", bgColor: "bg-navy/10" },
];

export default function AdminReportsPage() {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("year");

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch("/api/admin/reports?type=summary");
        if (res.ok) {
          const data = await res.json();
          setSummary(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, []);

  // CSV Export Function
  const handleExport = async (type: string) => {
    setExporting(type);
    try {
      const res = await fetch(`/api/admin/reports?type=${type}`);
      if (!res.ok) throw new Error("Failed to fetch report");

      const data = await res.json();

      if (!data || data.length === 0) {
        alert("No data to export");
        setExporting(null);
        return;
      }

      // Convert JSON to CSV
      const headers = Object.keys(data[0]);
      const csvRows = [
        headers.join(","), // Header row
        ...data.map((row: any) =>
          headers
            .map((header) => {
              const value = row[header];
              const escaped = String(value ?? "").replace(/"/g, '""');
              return `"${escaped}"`;
            })
            .join(",")
        ),
      ];
      const csvString = csvRows.join("\n");

      // Download CSV
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `dhk-lift-${type}-report-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      alert("Error exporting: " + err.message);
    } finally {
      setExporting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-navy animate-spin" />
      </div>
    );
  }

  const stats = summary || { totalUsers: 0, totalDonations: 0, totalRaised: 0, totalApplications: 0, totalProjects: 0, totalPartners: 0 };

  // KPI Stats
  const kpiStats = [
    { label: "Total Raised", value: stats.totalRaised >= 1000 ? `$${(stats.totalRaised / 1000).toFixed(1)}K` : `$${stats.totalRaised}`, subtext: `${stats.totalDonations} donations`, icon: DollarSign, color: "text-gold", bgColor: "bg-gold/10" },
    { label: "Total Users", value: stats.totalUsers.toLocaleString(), subtext: "Registered accounts", icon: Users, color: "text-navy", bgColor: "bg-navy/10" },
    { label: "Applications", value: stats.totalApplications.toLocaleString(), subtext: "All assistance requests", icon: FileText, color: "text-teal", bgColor: "bg-teal/10" },
    { label: "Partners", value: stats.totalPartners.toLocaleString(), subtext: "Global partners", icon: Building2, color: "text-purple", bgColor: "bg-purple/10" },
  ];

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
            Reports & Analytics
          </h1>
          <p className="text-ink/70 mt-1">
            Platform metrics, financial reports, and impact analytics.
          </p>
        </div>
      </div>

      {/* DATE RANGE FILTER */}
      <div className="bg-white rounded-card p-4 border border-gray-100 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-ink/40" />
          <span className="text-sm font-medium text-ink">Date Range:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: "week", label: "This Week" },
            { id: "month", label: "This Month" },
            { id: "quarter", label: "This Quarter" },
            { id: "year", label: "This Year" },
            { id: "all", label: "All Time" },
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setDateRange(range.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                dateRange === range.id
                  ? "bg-navy text-white shadow-sm"
                  : "bg-cloud text-ink/70 hover:bg-navy/5 hover:text-navy"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiStats.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-card p-5 border border-gray-100">
              <div className={`${kpi.bgColor} rounded-full p-3 w-fit`}>
                <Icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <p className="font-display text-2xl font-bold text-navy mt-4">{kpi.value}</p>
              <p className="text-ink/60 text-sm mt-1">{kpi.label}</p>
              <p className="text-ink/40 text-xs mt-0.5">{kpi.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* EXPORT REPORTS */}
      <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <FileBarChart className="w-5 h-5 text-gold" />
          <h2 className="font-display font-bold text-navy text-lg">
            Export Reports (CSV)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            const isExporting = exporting === report.id;
            return (
              <div
                key={report.id}
                className="bg-cloud rounded-card p-5 border border-gray-100 flex flex-col"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`${report.bgColor} rounded-full p-2.5 shrink-0`}>
                    <Icon className={`w-5 h-5 ${report.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy text-sm leading-snug">
                      {report.label}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => handleExport(report.id)}
                  disabled={isExporting}
                  className="btn-lift mt-auto bg-navy text-white font-semibold px-4 py-2.5 rounded-input hover:bg-navy/90 transition-colors flex items-center justify-center gap-2 text-xs disabled:opacity-50"
                >
                  {isExporting ? (
                    <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Exporting...</>
                  ) : (
                    <><Download className="w-3.5 h-3.5" /> Download CSV</>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* SUMMARY STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Users", value: stats.totalUsers.toLocaleString(), subtext: "Registered accounts", icon: Users, color: "text-navy", bgColor: "bg-navy/10" },
          { label: "Total Projects", value: stats.totalProjects.toLocaleString(), subtext: "All projects", icon: Activity, color: "text-purple", bgColor: "bg-purple/10" },
          { label: "Total Applications", value: stats.totalApplications.toLocaleString(), subtext: "Assistance requests", icon: FileText, color: "text-teal", bgColor: "bg-teal/10" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
              <div className={`${stat.bgColor} rounded-full p-3 w-fit mb-4`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="font-display text-3xl font-bold text-navy">{stat.value}</p>
              <p className="text-ink/60 text-sm mt-1">{stat.label}</p>
              <p className="text-ink/40 text-xs mt-0.5">{stat.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* INFO BOX */}
      <div className="bg-info/5 border border-info/20 rounded-card p-6">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-info mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-navy text-sm">About CSV Reports</p>
            <p className="text-ink/70 text-xs mt-1 leading-relaxed">
              CSV reports can be opened in Excel, Google Sheets, or any spreadsheet software. 
              Each report contains the latest data from the database. Future updates will add 
              more detailed reports (financial summary, monthly breakdowns, etc.).
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}