"use client";

import { useState } from "react";
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
  Filter,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Award,
  CheckCircle,
  Clock,
} from "lucide-react";

// ============ KPI STATS ============
const kpiStats = [
  {
    label: "Total Donations",
    value: "$2.5M",
    change: "+18%",
    trend: "up",
    subtext: "vs. last year",
    icon: DollarSign,
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  {
    label: "Total Users",
    value: "12,450",
    change: "+12%",
    trend: "up",
    subtext: "vs. last year",
    icon: Users,
    color: "text-navy",
    bgColor: "bg-navy/10",
  },
  {
    label: "Applications",
    value: "3,847",
    change: "+24%",
    trend: "up",
    subtext: "vs. last year",
    icon: FileText,
    color: "text-teal",
    bgColor: "bg-teal/10",
  },
  {
    label: "Active Partners",
    value: "80",
    change: "+5",
    trend: "up",
    subtext: "vs. last year",
    icon: Building2,
    color: "text-purple",
    bgColor: "bg-purple/10",
  },
];

// ============ QUICK REPORTS ============
const quickReports = [
  {
    id: "1",
    title: "Donation Summary Report",
    description: "Complete breakdown of all donations by program, cause, and time period.",
    icon: DollarSign,
    color: "text-gold",
    bgColor: "bg-gold/10",
    lastGenerated: "2 hours ago",
  },
  {
    id: "2",
    title: "Application Analytics",
    description: "Application volume, approval rates, and processing times by program.",
    icon: FileText,
    color: "text-teal",
    bgColor: "bg-teal/10",
    lastGenerated: "1 day ago",
  },
  {
    id: "3",
    title: "User Growth Report",
    description: "User registrations, activity, retention, and membership tier distribution.",
    icon: Users,
    color: "text-navy",
    bgColor: "bg-navy/10",
    lastGenerated: "3 days ago",
  },
  {
    id: "4",
    title: "Project Performance",
    description: "All projects with funding status, milestones, and verification progress.",
    icon: Activity,
    color: "text-purple",
    bgColor: "bg-purple/10",
    lastGenerated: "1 week ago",
  },
  {
    id: "5",
    title: "Partner Performance",
    description: "Partner project completion rates, funding received, and impact metrics.",
    icon: Building2,
    color: "text-info",
    bgColor: "bg-info/10",
    lastGenerated: "1 week ago",
  },
  {
    id: "6",
    title: "Financial Summary",
    description: "Income, expenses, fund allocations, and balance sheet overview.",
    icon: BarChart3,
    color: "text-success",
    bgColor: "bg-success/10",
    lastGenerated: "2 weeks ago",
  },
];

// ============ MONTHLY DONATIONS DATA ============
const monthlyDonations = [
  { month: "Jan", amount: 180000 },
  { month: "Feb", amount: 195000 },
  { month: "Mar", amount: 220000 },
  { month: "Apr", amount: 205000 },
  { month: "May", amount: 240000 },
  { month: "Jun", amount: 265000 },
  { month: "Jul", amount: 250000 },
  { month: "Aug", amount: 280000 },
  { month: "Sep", amount: 295000 },
  { month: "Oct", amount: 310000 },
  { month: "Nov", amount: 340000 },
  { month: "Dec", amount: 385000 },
];

// ============ PROGRAM DISTRIBUTION ============
const programDistribution = [
  { name: "LIFT Health", value: 32, color: "bg-teal", textColor: "text-teal" },
  { name: "Food Security", value: 24, color: "bg-gold", textColor: "text-gold" },
  { name: "Education Support", value: 18, color: "bg-navy", textColor: "text-navy" },
  { name: "LIFT Protect", value: 12, color: "bg-purple", textColor: "text-purple" },
  { name: "LIFT Ability", value: 8, color: "bg-info", textColor: "text-info" },
  { name: "Others", value: 6, color: "bg-gray-400", textColor: "text-ink/60" },
];

// ============ TOP PROGRAMS ============
const topPrograms = [
  { name: "LIFT Health", applications: 1240, approved: 856, approvalRate: 69 },
  { name: "Food Security", applications: 980, approved: 742, approvalRate: 76 },
  { name: "Education Support", applications: 720, approved: 612, approvalRate: 85 },
  { name: "LIFT Protect", applications: 480, approved: 398, approvalRate: 83 },
  { name: "LIFT Ability", applications: 427, approved: 342, approvalRate: 80 },
];

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState("year");
  const [reportType, setReportType] = useState("all");

  const maxDonation = Math.max(...monthlyDonations.map((d) => d.amount));
  const totalDonations = monthlyDonations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-6">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
            Reports & Analytics
          </h1>
          <p className="text-ink/70 mt-1">
            Platform metrics, financial reports, and impact analytics.
          </p>
        </div>
        <button className="btn-lift bg-navy text-white font-semibold px-6 py-3 rounded-input hover:bg-navy/90 transition-colors shadow-sm flex items-center gap-2 w-fit text-sm">
          <Download className="w-4 h-4" />
          Export All Reports
        </button>
      </div>

      {/* ================= DATE RANGE FILTER ================= */}
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

      {/* ================= KPI STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiStats.map((kpi, i) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <div
              key={i}
              className="card-hover bg-white rounded-card p-5 border border-gray-100"
            >
              <div className="flex items-start justify-between">
                <div className={`${kpi.bgColor} rounded-full p-3`}>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${
                  kpi.trend === "up" ? "text-success" : "text-error"
                }`}>
                  <TrendIcon className="w-3 h-3" />
                  {kpi.change}
                </div>
              </div>
              <p className="font-display text-2xl font-bold text-navy mt-4">{kpi.value}</p>
              <p className="text-ink/60 text-sm mt-1">{kpi.label}</p>
              <p className="text-ink/40 text-xs mt-0.5">{kpi.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* ================= CHARTS ROW ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Donations Chart */}
        <div className="lg:col-span-2 bg-white rounded-card p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gold" />
              <h2 className="font-display font-bold text-navy text-lg">
                Monthly Donations
              </h2>
            </div>
            <div className="text-right">
              <p className="font-display font-bold text-navy text-xl">
                ${(totalDonations / 1000).toFixed(0)}K
              </p>
              <p className="text-ink/50 text-xs">Total (2026)</p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-2 h-48">
            {monthlyDonations.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full flex-1 flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-gold to-gold/60 rounded-t-md transition-all duration-500 group-hover:from-gold group-hover:to-gold/80"
                    style={{ height: `${(data.amount / maxDonation) * 100}%` }}
                  ></div>
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-navy text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${(data.amount / 1000).toFixed(0)}K
                  </div>
                </div>
                <span className="text-xs text-ink/60 font-medium">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Program Distribution */}
        <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-gold" />
            <h2 className="font-display font-bold text-navy text-lg">
              Program Distribution
            </h2>
          </div>

          <div className="space-y-4">
            {programDistribution.map((program, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-navy">{program.name}</span>
                  <span className={`text-sm font-bold ${program.textColor}`}>
                    {program.value}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`${program.color} h-2 rounded-full transition-all duration-1000`}
                    style={{ width: `${program.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= QUICK REPORTS ================= */}
      <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileBarChart className="w-5 h-5 text-gold" />
            <h2 className="font-display font-bold text-navy text-lg">
              Quick Reports
            </h2>
          </div>
          <span className="text-xs text-ink/50">Last 30 days</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickReports.map((report) => {
            const Icon = report.icon;
            return (
              <div
                key={report.id}
                className="card-hover bg-cloud rounded-card p-5 border border-gray-100 flex flex-col"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`${report.bgColor} rounded-full p-2.5 shrink-0`}>
                    <Icon className={`w-5 h-5 ${report.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy text-sm leading-snug">
                      {report.title}
                    </h3>
                  </div>
                </div>
                <p className="text-ink/70 text-xs leading-relaxed flex-1">
                  {report.description}
                </p>
                <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-ink/50 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {report.lastGenerated}
                  </p>
                  <button className="btn-lift bg-navy text-white font-semibold px-3 py-1.5 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-1 text-xs">
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= TOP PROGRAMS ================= */}
      <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-5 h-5 text-gold" />
          <h2 className="font-display font-bold text-navy text-lg">
            Program Performance
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-xs font-semibold text-ink/60 uppercase tracking-wider">Program</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-ink/60 uppercase tracking-wider">Applications</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-ink/60 uppercase tracking-wider">Approved</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-ink/60 uppercase tracking-wider">Approval Rate</th>
              </tr>
            </thead>
            <tbody>
              {topPrograms.map((program, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-cloud/50 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-semibold text-navy text-sm">{program.name}</span>
                  </td>
                  <td className="text-right py-4 px-4">
                    <span className="font-display font-bold text-navy">{program.applications.toLocaleString()}</span>
                  </td>
                  <td className="text-right py-4 px-4">
                    <span className="font-display font-bold text-success">{program.approved.toLocaleString()}</span>
                  </td>
                  <td className="text-right py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-20 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${
                            program.approvalRate >= 80 ? "bg-success" : program.approvalRate >= 70 ? "bg-gold" : "bg-warning"
                          }`}
                          style={{ width: `${program.approvalRate}%` }}
                        ></div>
                      </div>
                      <span className="font-display font-bold text-navy text-sm w-10 text-right">
                        {program.approvalRate}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= YEARLY COMPARISON ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Year over Year Growth",
            value: "+42%",
            change: "vs 2025",
            trend: "up",
            icon: TrendingUp,
            color: "text-success",
            bgColor: "bg-success/10",
          },
          {
            label: "Average Donation Size",
            value: "$87",
            change: "+$12 vs 2025",
            trend: "up",
            icon: DollarSign,
            color: "text-gold",
            bgColor: "bg-gold/10",
          },
          {
            label: "Recurring Donors",
            value: "1,240",
            change: "+28% vs 2025",
            trend: "up",
            icon: Heart,
            color: "text-teal",
            bgColor: "bg-teal/10",
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;
          return (
            <div key={i} className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className={`${stat.bgColor} rounded-full p-3`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <TrendIcon className={`w-5 h-5 ml-auto ${stat.trend === "up" ? "text-success" : "text-error"}`} />
              </div>
              <p className="font-display text-3xl font-bold text-navy">{stat.value}</p>
              <p className="text-ink/60 text-sm mt-1">{stat.label}</p>
              <p className={`text-xs mt-2 font-semibold ${stat.trend === "up" ? "text-success" : "text-error"}`}>
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}