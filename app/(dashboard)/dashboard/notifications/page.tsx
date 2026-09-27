"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  CheckCheck,
  Heart,
  FileText,
  MessageSquare,
  Gift,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Trash2,
  Settings,
  Inbox,
  Filter,
} from "lucide-react";

// ============ TYPES ============
type NotificationType = "donation" | "application" | "message" | "benefit" | "impact" | "system";

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  href?: string;
};

// ============ TYPE CONFIG ============
const typeConfig: Record<NotificationType, { icon: any; color: string; bg: string }> = {
  donation: { icon: Heart, color: "text-gold", bg: "bg-gold/10" },
  application: { icon: FileText, color: "text-purple", bg: "bg-purple/10" },
  message: { icon: MessageSquare, color: "text-teal", bg: "bg-teal/10" },
  benefit: { icon: Gift, color: "text-gold", bg: "bg-gold/10" },
  impact: { icon: TrendingUp, color: "text-teal", bg: "bg-teal/10" },
  system: { icon: AlertCircle, color: "text-navy", bg: "bg-navy/10" },
};

// ============ TAB FILTERS ============
const tabs: { id: NotificationType | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "application", label: "Applications" },
  { id: "donation", label: "Donations" },
  { id: "message", label: "Messages" },
  { id: "benefit", label: "Benefits" },
  { id: "impact", label: "Impact" },
];

// ============ DEMO DATA ============
const demoNotifications: Notification[] = [
  {
    id: "1",
    type: "application",
    title: "Application Status Updated",
    message: "Your application APP-23043012 has moved to 'Under Review'. Expected decision: Apr 14, 2026.",
    time: "2 hours ago",
    read: false,
    href: "/dashboard/applications/1",
  },
  {
    id: "2",
    type: "donation",
    title: "Donation Received",
    message: "Thank you! Your donation of $50 to Food Security has been processed successfully.",
    time: "5 hours ago",
    read: false,
    href: "/dashboard/donations",
  },
  {
    id: "3",
    type: "message",
    title: "New Message from DHK LIFT Support",
    message: "Your application has moved to the review stage. Our team is evaluating your case.",
    time: "2 hours ago",
    read: false,
    href: "/dashboard/messages",
  },
  {
    id: "4",
    type: "impact",
    title: "Your Impact Verified",
    message: "Your donation to Food Security provided 10 nutritious meals to families in Karachi.",
    time: "1 day ago",
    read: true,
    href: "/dashboard/impact",
  },
  {
    id: "5",
    type: "benefit",
    title: "New Benefit Unlocked",
    message: "Congratulations! You've qualified for Silver Tier benefits. Check out exclusive deals.",
    time: "2 days ago",
    read: true,
    href: "/membership/benefits",
  },
  {
    id: "6",
    type: "application",
    title: "Application Approved",
    message: "Your application APP-23031987 for Education Support has been approved.",
    time: "1 week ago",
    read: true,
    href: "/dashboard/applications/2",
  },
  {
    id: "7",
    type: "system",
    title: "Password Changed",
    message: "Your password was successfully changed. If this wasn't you, please contact support.",
    time: "2 weeks ago",
    read: true,
  },
  {
    id: "8",
    type: "donation",
    title: "Recurring Donation Reminder",
    message: "Your monthly recurring donation of $30 to Education Support will be processed in 3 days.",
    time: "2 weeks ago",
    read: true,
    href: "/dashboard/donations",
  },
];

// ============ MAIN COMPONENT ============
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(demoNotifications);
  const [activeTab, setActiveTab] = useState<NotificationType | "all">("all");

  const filteredNotifications = notifications.filter(
    (n) => activeTab === "all" || n.type === activeTab
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleMarkRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy flex items-center gap-3">
            Notifications
            {unreadCount > 0 && (
              <span className="text-sm font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-ink/70 mt-1">
            Stay updated with your applications, donations, and impact.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="btn-lift bg-navy text-white font-semibold px-5 py-2.5 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-2 text-sm"
            >
              <CheckCheck className="w-4 h-4" />
              Mark All Read
            </button>
          )}
          <Link
            href="/dashboard/profile"
            className="btn-lift border-2 border-navy/20 text-navy font-semibold px-5 py-2.5 rounded-input hover:bg-navy/5 transition-colors flex items-center gap-2 text-sm"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="bg-white rounded-card p-2 shadow-sm border border-gray-100 flex flex-wrap gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = tab.id === "all"
            ? notifications.length
            : notifications.filter((n) => n.type === tab.id).length;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-fit flex items-center justify-center gap-2 px-4 py-2.5 rounded-input font-medium text-sm transition-all ${
                isActive
                  ? "bg-navy text-white shadow-sm"
                  : "text-ink/70 hover:bg-navy/5 hover:text-navy"
              }`}
            >
              {tab.label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isActive ? "bg-white/20 text-white" : "bg-cloud text-ink/60"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ================= NOTIFICATIONS LIST ================= */}
      {filteredNotifications.length > 0 ? (
        <div className="bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => {
              const config = typeConfig[notification.type];
              const Icon = config.icon;
              const content = (
                <div
                  className={`flex items-start gap-4 p-5 transition-colors ${
                    !notification.read ? "bg-gold/[0.02]" : "hover:bg-cloud/50"
                  }`}
                >
                  {/* Icon */}
                  <div className={`${config.bg} rounded-full p-3 shrink-0 relative`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                    {!notification.read && (
                      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gold border-2 border-white rounded-full"></span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className={`text-sm ${
                          !notification.read ? "font-bold text-navy" : "font-semibold text-navy/80"
                        }`}>
                          {notification.title}
                        </h3>
                        <p className="text-ink/70 text-sm mt-1 leading-relaxed">
                          {notification.message}
                        </p>
                        <p className="text-ink/40 text-xs mt-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notification.time}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        {!notification.read && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleMarkRead(notification.id);
                            }}
                            className="p-2 text-ink/40 hover:text-navy hover:bg-cloud rounded-input transition-colors"
                            title="Mark as read"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDelete(notification.id);
                          }}
                          className="p-2 text-ink/40 hover:text-error hover:bg-error/5 rounded-input transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );

              return notification.href ? (
                <Link key={notification.id} href={notification.href}>
                  {content}
                </Link>
              ) : (
                <div key={notification.id}>{content}</div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ================= EMPTY STATE ================= */
        <div className="bg-white rounded-card p-12 text-center border border-gray-100">
          <div className="bg-cloud rounded-full p-6 w-fit mx-auto mb-4">
            <Inbox className="w-12 h-12 text-ink/30" />
          </div>
          <h3 className="font-display text-xl font-bold text-navy">
            No Notifications
          </h3>
          <p className="text-ink/60 mt-2 max-w-md mx-auto">
            You're all caught up! No new notifications at the moment.
          </p>
        </div>
      )}

    </div>
  );
}