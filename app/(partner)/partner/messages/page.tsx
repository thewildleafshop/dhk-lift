"use client";

import { useState } from "react";
import {
  Search,
  Send,
  MessageSquare,
  CheckCheck,
  Inbox,
  ShieldCheck,
  Users,
  DollarSign,
} from "lucide-react";

// ============ TYPES ============
type Message = {
  id: number;
  sender: "user" | "them";
  text: string;
  time: string;
  read: boolean;
};

type Conversation = {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  avatarIcon: any;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  online: boolean;
  messages: Message[];
};

// ============ DEMO DATA ============
const demoConversations: Conversation[] = [
  {
    id: "1",
    name: "DHK LIFT Verification Team",
    role: "Verification Department",
    avatarColor: "bg-navy",
    avatarIcon: ShieldCheck,
    lastMessage: "Your document has been verified successfully.",
    lastMessageTime: "2h ago",
    unread: 2,
    online: true,
    messages: [
      { id: 1, sender: "them", text: "Hello! We received your Annual Report 2025 document.", time: "Apr 9, 10:45 AM", read: true },
      { id: 2, sender: "user", text: "Great! Is everything in order?", time: "Apr 9, 11:20 AM", read: true },
      { id: 3, sender: "them", text: "Your document has been verified successfully. Your Trusted Partner status is confirmed.", time: "2h ago", read: false },
      { id: 4, sender: "them", text: "Thank you for keeping your documentation up to date.", time: "2h ago", read: false },
    ],
  },
  {
    id: "2",
    name: "DHK LIFT Project Team",
    role: "Project Management",
    avatarColor: "bg-teal",
    avatarIcon: Users,
    lastMessage: "Your milestone 3 evidence has been approved.",
    lastMessageTime: "1d ago",
    unread: 1,
    online: false,
    messages: [
      { id: 1, sender: "them", text: "We have reviewed your milestone 3 submission for the Clean Water project.", time: "Apr 8, 3:00 PM", read: true },
      { id: 2, sender: "them", text: "Your milestone 3 evidence has been approved. Funds will be released within 5 business days.", time: "1d ago", read: false },
    ],
  },
  {
    id: "3",
    name: "DHK LIFT Finance Team",
    role: "Finance Department",
    avatarColor: "bg-gold",
    avatarIcon: DollarSign,
    lastMessage: "Funding request FND-24001 is under review.",
    lastMessageTime: "2d ago",
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: "them", text: "Funding request FND-24001 is under review. We'll update you within 3 business days.", time: "2d ago", read: true },
    ],
  },
  {
    id: "4",
    name: "Sarah Admin",
    role: "Senior Administrator",
    avatarColor: "bg-purple",
    avatarIcon: Users,
    lastMessage: "Please update your leadership information when possible.",
    lastMessageTime: "1w ago",
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: "them", text: "Hi, I noticed your leadership team information may need updating.", time: "1w ago", read: true },
      { id: 2, sender: "them", text: "Please update your leadership information when possible.", time: "1w ago", read: true },
    ],
  },
];

// ============ MAIN COMPONENT ============
export default function PartnerMessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(demoConversations);
  const [activeConversationId, setActiveConversationId] = useState<string>("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: newMessage,
      time: "Just now",
      read: true,
    };

    setConversations(
      conversations.map((c) =>
        c.id === activeConversation.id
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: newMessage,
              lastMessageTime: "Just now",
            }
          : c
      )
    );
    setNewMessage("");
  };

  return (
    <div className="space-y-6">
      
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-navy">
          Messages
        </h1>
        <p className="text-ink/70 mt-1">
          Communicate with DHK LIFT teams regarding your projects and requests.
        </p>
      </div>

      {/* ================= MESSAGES INTERFACE ================= */}
      <div className="bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
          
          {/* ================= LEFT: CONVERSATION LIST ================= */}
          <div className="md:col-span-1 border-r border-gray-100 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conv) => {
                  const isActive = conv.id === activeConversationId;
                  const AvatarIcon = conv.avatarIcon;
                  return (
                    <button
                      key={conv.id}
                      onClick={() => setActiveConversationId(conv.id)}
                      className={`w-full text-left p-4 border-b border-gray-50 transition-colors ${
                        isActive ? "bg-navy/5" : "hover:bg-cloud/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative shrink-0">
                          <div className={`${conv.avatarColor} rounded-full w-11 h-11 flex items-center justify-center`}>
                            <AvatarIcon className="w-5 h-5 text-white" />
                          </div>
                          {conv.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-white rounded-full"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className={`text-sm truncate ${isActive ? "font-bold text-navy" : "font-semibold text-navy"}`}>
                              {conv.name}
                            </p>
                            <span className="text-xs text-ink/40 shrink-0">
                              {conv.lastMessageTime}
                            </span>
                          </div>
                          <p className="text-xs text-ink/50 mt-0.5 truncate">{conv.role}</p>
                          <div className="flex items-center justify-between gap-2 mt-1">
                            <p className="text-xs text-ink/70 truncate">{conv.lastMessage}</p>
                            {conv.unread > 0 && (
                              <span className="bg-gold text-ink text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                                {conv.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center">
                  <Inbox className="w-10 h-10 text-ink/30 mx-auto mb-3" />
                  <p className="text-ink/60 text-sm">No conversations found</p>
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT: CHAT WINDOW ================= */}
          <div className="md:col-span-2 flex flex-col">
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                  <div className="relative shrink-0">
                    <div className={`${activeConversation.avatarColor} rounded-full w-10 h-10 flex items-center justify-center`}>
                      <activeConversation.avatarIcon className="w-5 h-5 text-white" />
                    </div>
                    {activeConversation.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div>
                    <p className="font-display font-bold text-navy text-sm">
                      {activeConversation.name}
                    </p>
                    <p className="text-xs text-ink/50">
                      {activeConversation.online ? "Online now" : activeConversation.role}
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cloud/30">
                  {activeConversation.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[75%] ${msg.sender === "user" ? "text-right" : ""}`}>
                        <div
                          className={`inline-block p-3 rounded-card text-sm leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-gold text-ink"
                              : "bg-white text-navy border border-gray-100"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <div
                          className={`flex items-center gap-1 mt-1 text-xs text-ink/40 ${
                            msg.sender === "user" ? "justify-end" : ""
                          }`}
                        >
                          <span>{msg.time}</span>
                          {msg.sender === "user" && msg.read && (
                            <CheckCheck className="w-3 h-3 text-success" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Box */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 rounded-input border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!newMessage.trim()}
                      className="btn-lift bg-navy text-white font-semibold px-5 py-3 rounded-input hover:bg-navy/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      <span className="hidden sm:inline">Send</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-cloud rounded-full p-6 w-fit mx-auto mb-4">
                    <MessageSquare className="w-12 h-12 text-ink/30" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy">
                    Select a Conversation
                  </h3>
                  <p className="text-ink/60 text-sm mt-1">
                    Choose a conversation to start messaging.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}