"use client";

import { useState } from "react";

// ── Types 
interface Message {
  id: string;
  text: string;
  senderId: string;
  createdAt: Date;
}

interface Conversation {
  id: string;
  participantName: string;
  participantImage: string | null;
  participantRole: "client" | "provider";
  lastMessage: string;
  lastMessageAt: Date;
  unreadCount: number;
  messages: Message[];
}

// ── Mock data (replace with real DB data when making dynamic) ──────────────
const MOCK_CONVERSATIONS: Conversation[] = [
  // empty for now — matches your screenshot
];

// ── Icons ──────────────────────────────────────────────────────────────────
const ChatIcon = ({ className }: { className?: string }) => (
  <svg className={className ?? "w-5 h-5"} viewBox="0 0 24 24" fill="none" 
  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" 
  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SendIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
  strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const BackIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
  strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

// ── Helpers ────────────────────────────────────────────────────────────────
function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function timeAgo(date: Date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

// ── Conversation List Item ─────────────────────────────────────────────────
function ConversationItem({
  conversation,
  isActive,
  onClick,
  currentUserId,
}: {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
  currentUserId: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors border-b border-gray-100 last:border-0
        ${isActive ? "bg-yellow-50 border-l-2 border-l-yellow-400" : "hover:bg-gray-50"}`}
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-[#1A2332] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
        {getInitials(conversation.participantName)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <p className="text-sm font-semibold text-gray-900 truncate">{conversation.participantName}</p>
          <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{timeAgo(conversation.lastMessageAt)}</span>
        </div>
        <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
      </div>

      {/* Unread badge */}
      {conversation.unreadCount > 0 && (
        <span className="w-5 h-5 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
          {conversation.unreadCount}
        </span>
      )}
    </button>
  );
}

// ── Chat Window ────────────────────────────────────────────────────────────
function ChatWindow({
  conversation,
  currentUserId,
  onBack,
}: {
  conversation: Conversation | null;
  currentUserId: string;
  onBack: () => void;
}) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    // TODO: call sendMessage() server action
    setInput("");
  };

  // No conversation selected
  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-8">
        <div className="w-20 h-20 rounded-full bg-yellow-50 flex items-center justify-center">
          <ChatIcon className="w-8 h-8 text-yellow-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Select a conversation</h3>
        <p className="text-sm text-gray-400">Choose a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-white">
        <button onClick={onBack} className="md:hidden text-gray-500 hover:text-gray-900 mr-1">
          <BackIcon />
        </button>
        <div className="w-9 h-9 rounded-full bg-[#1A2332] text-white flex items-center justify-center font-bold text-sm">
          {getInitials(conversation.participantName)}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{conversation.participantName}</p>
          <p className="text-xs text-gray-400 capitalize">{conversation.participantRole}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3 bg-gray-50">
        {conversation.messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
            <p className="text-sm text-gray-400">No messages yet. Say hello! 👋</p>
          </div>
        ) : (
          conversation.messages.map((msg) => {
            const isMe = msg.senderId === currentUserId;
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                  isMe
                    ? "bg-[#1A2332] text-white rounded-br-sm"
                    : "bg-white border border-gray-200 text-gray-900 rounded-bl-sm"
                }`}>
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${isMe ? "text-gray-400" : "text-gray-400"}`}>
                    {timeAgo(msg.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 
            placeholder-gray-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center 
            hover:bg-yellow-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function MessagesPage() {
  const [search, setSearch] = useState("");
  const [conversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  // Static current user — replace with session.user.id when dynamic
  const currentUserId = "current-user-id";

  const filtered = conversations.filter((c) =>
    c.participantName.toLowerCase().includes(search.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;

  const handleSelectConversation = (id: string) => {
    setActiveId(id);
    setMobileView("chat");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <ChatIcon className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            <p className="text-sm text-gray-500">Chat with your providers & clients</p>
          </div>
        </div>

        {/* Main Container */}
        <div className="bg-white border border-black rounded-2xl shadow-sm overflow-hidden flex"
          style={{ height: "calc(100vh - 220px)", minHeight: "500px" }}>

          {/* ── Left: Conversation List ── */}
          <div className={`w-full md:w-[340px] flex-shrink-0 border-r border-black flex flex-col
            ${mobileView === "chat" ? "hidden md:flex" : "flex"}`}>

            {/* Search */}
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2"><SearchIcon /></span>
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center p-8">
                  <ChatIcon className="w-10 h-10 text-gray-300" />
                  <p className="text-sm font-semibold text-gray-500">No conversations</p>
                  <p className="text-xs text-gray-400">Start a chat from a provider&apos;s profile</p>
                </div>
              ) : (
                filtered.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conversation={conv}
                    isActive={conv.id === activeId}
                    onClick={() => handleSelectConversation(conv.id)}
                    currentUserId={currentUserId}
                  />
                ))
              )}
            </div>
          </div>

          {/* ── Right: Chat Window ── */}
          <div className={`flex-1 flex flex-col min-w-0
            ${mobileView === "list" ? "hidden md:flex" : "flex"}`}>
            <ChatWindow
              conversation={activeConversation}
              currentUserId={currentUserId}
              onBack={() => setMobileView("list")}
            />
          </div>

        </div>
      </div>
    </div>
  );
}