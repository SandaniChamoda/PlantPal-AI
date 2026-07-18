"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ChatMessage from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";
import AvatarWidget from "@/components/AvatarWidget";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Settings, Sparkles, Loader2 } from "lucide-react";

type Message = {
  sender: "user" | "ai";
  message: string;
  timestamp?: Date;
};

const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      message:
        "🌿 Hello! I'm PlantPal AI, your virtual botanist. I can answer questions about plant care, diseases, watering, and more. Upload your plant guides in the Knowledge tab to make me even smarter!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [instructions, setInstructions] = useState(
    "Provide practical, actionable advice for home gardeners. Be friendly and encouraging."
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { sender: "user", message: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${apiBase}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, instructions }),
      });

      const data = await response.json();

      if (!response.ok || !data.success || !data.reply) {
        throw new Error(data.message || "Chat failed.");
      }

      const aiMessage: Message = { sender: "ai", message: data.reply, timestamp: new Date() };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chat failed.");
      const errorMessage: Message = {
        sender: "ai",
        message: "⚠️ I couldn't process your request. Please check your connection and try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/30">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Sidebar */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-white/80 p-5 border border-emerald-200/50 backdrop-blur-sm shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <AvatarWidget className="h-20 w-20" />
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-white"></div>
                </div>
                <div>
                  <h3 className="font-bold text-emerald-900">PlantPal AI</h3>
                  <p className="text-xs text-emerald-600">Online • Ready</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-full rounded-xl bg-white/80 p-4 border border-emerald-200/50 text-left transition-all hover:bg-emerald-50 flex items-center justify-between"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-emerald-800">
                <Settings className="h-4 w-4" />
                Assistant Settings
              </span>
              <span className="text-emerald-400">{showSettings ? "▼" : "▶"}</span>
            </button>

            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-xl bg-white/80 p-4 border border-emerald-200/50">
                    <label className="text-sm font-medium text-emerald-800">Custom Instructions</label>
                    <textarea
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      className="mt-2 min-h-[120px] w-full rounded-lg border border-emerald-200 p-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                      placeholder="How should the assistant behave?"
                    />
                    <p className="mt-2 text-xs text-emerald-600">
                      These instructions guide how the AI responds to your questions.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="rounded-xl bg-emerald-50/80 p-4 border border-emerald-200/50">
              <div className="flex items-center gap-2 text-sm text-emerald-700">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                <span>Knowledge Base: Active</span>
              </div>
              <p className="mt-1 text-xs text-emerald-600">
                Upload PDFs in the Knowledge tab to enhance responses.
              </p>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col rounded-2xl bg-white/80 border border-emerald-200/50 backdrop-blur-sm shadow-sm overflow-hidden">
            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-6 max-h-[600px]">
              {messages.map((msg, index) => (
                <ChatMessage key={index} sender={msg.sender} message={msg.message} />
              ))}
              {loading && (
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <Bot className="h-4 w-4 text-emerald-700" />
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                    <span className="text-sm text-emerald-700">Thinking...</span>
                  </div>
                </div>
              )}
              {error && (
                <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-200">
                  ⚠️ {error}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-emerald-100/60 p-4">
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask about plant care, watering, diseases..."
                  className="flex-1 rounded-xl border border-emerald-200 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition bg-white/50"
                  disabled={loading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="rounded-xl bg-emerald-600 px-6 hover:bg-emerald-700 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </Button>
              </div>
              <p className="mt-2 text-center text-xs text-emerald-500">
                Press Enter to send • Knowledge-based responses from your uploaded guides
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}