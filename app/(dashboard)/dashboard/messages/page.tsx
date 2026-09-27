"use client";

import { useState } from "react";
import {
  Search,
  Send,
  User,
  MessageSquare,
  CheckCheck,
  Inbox,
  ChevronRight,
} from "lucide-react";

// ============ TYPES ============
type Conversation = {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  online: boolean;
  messages: Message[];
};

type Message = {
  id: number;
  sender: "user" | "them";
  text: string;
  time: string;
  read: boolean;
};

// ============ DEMO DATA ============
const demoConversations: Conversation[] = [
  {
    id: "1",
    name: "DHK LIFT Support",
    role: "Support Team",
    avatarColor: "bg-navy",
    lastMessage: "Your application has moved to the review stage.",
    lastMessageTime: "2h ago",
    unread: 2,
    online: true,
    messages: [
      { id: 1, sender: "them", text: "Thank you for submitting your application. We have received all your documents.", time: "Apr 5, 10:45 AM", read: true },
      { id: 2, sender: "user", text: "Thank you. Please let me know if you need any additional information.", time: "Apr 6, 9:20 AM", read: true },
      { id: 3, sender: "them", text: "Your application has moved to the review stage. Our team is evaluating your case.", time: "Apr 9, 9:05 AM", read: true },
      { id: 4, sender: "them", text: "Expected decision date: Apr 14, 2026. We'll keep you updated.", time: "2h ago", read: false },
    ],
  },
  {
    id: "2",
    name: "Al-Khidmat Foundation",
    role: "Global Partner",
    avatarColor: "bg-teal",
    lastMessage: "Your donation helped us deliver 50 meals this week!",
    lastMessageTime: "1d ago",
    unread: 1,
    online: false,
    messages: [
      { id: 1, sender: "them", text: "Thank you for your generous donation to Food Security.", time: "Apr 13, 11:00 AM", read: true },
      { id: 2, sender: "them", text: "Your donation helped us deliver 50 meals this week!", time: "1d ago", read: false },
    ],
  },
  {
    id: "3",
    name: "Edhi Foundation",
    role: "Global Partner",
    avatarColor: "bg-purple",
    lastMessage: "We've received your medical equipment request.",
    lastMessageTime: "3d ago",
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: "them", text: "We've received your medical equipment request. Our team will review it shortly.", time: "3d ago", read: true },
    ],
  },
  {
    id: "4",
    name: "Sindh Education Trust",
    role: "Global Partner",
    avatarColor: "bg-gold",
    lastMessage: "The school supplies have been distributed.",
    lastMessageTime: "1w ago",
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: "them", text: "The school supplies have been distributed to 25 children in your name.", time: "1w ago", read: true },
    ],
  },
];

// ============ MAIN COMPONENT ============
export default function MessagesPage() {
  const [conversations, setConversations] = useState(demoConversations);
  const [activeConversationId, setActiveConversationId] = useState<string>("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMessage, lastMessageTime: "Just now" }
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
          Communicate with DHK LIFT support and global partners.
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
                            <span className="font-display font-bold text-white text-base">
                              {conv.name.charAt(0)}
                            </span>
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
                      <span className="font-display font-bold text-white">
                        {activeConversation.name.charAt(0)}
                      </span>
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
                        <div className={`flex items-center gap-1 mt-1 text-xs text-ink/40 ${
                          msg.sender === "user" ? "justify-end" : ""
                        }`}>
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
              /* No active conversation */
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