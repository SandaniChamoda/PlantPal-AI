"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ChatMessage from "@/components/ChatMessage";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Sparkles, 
  Loader2, 
  Settings
} from "lucide-react";
import Link from "next/link";

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
      message: "👋 Hello! I'm **PlantPal AI**, your virtual botanist. I can answer questions about:\n\n• 🌱 Plant care & watering\n• 🐛 Disease identification\n• ☀️ Sunlight requirements\n• 🌿 Fertilizer & soil\n• 📚 Your uploaded plant guides\n\nUpload your plant knowledge in the **Knowledge** tab to get personalized answers!",
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

  const quickQuestions = [
    "How often should I water my monstera?",
    "Why are my plant leaves turning yellow?",
    "What's the best fertilizer for indoor plants?",
    "How do I propagate succulents?",
  ];

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ 
        maxWidth: "1000px", 
        margin: "0 auto", 
        padding: "20px 24px",
        paddingTop: "100px"
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
          paddingBottom: "16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* Human Avatar Header */}
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              position: "relative",
              border: "2px solid rgba(34,197,94,0.2)",
              boxShadow: "0 4px 24px rgba(34,197,94,0.1)",
              overflow: "hidden",
              background: "#1a1a2e"
            }}>
              <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                <circle cx="50" cy="50" r="48" fill="#f0f0f0" />
                <path d="M10 45 Q10 20 30 12 Q50 5 70 12 Q90 20 90 45 Q90 55 85 50 Q80 45 75 50 Q70 55 65 50 Q60 45 55 50 Q50 55 45 50 Q40 45 35 50 Q30 55 25 50 Q20 45 15 50 Q10 55 10 45" fill="#3d3d3d" />
                <path d="M15 40 Q20 15 40 10 Q60 8 80 15 Q88 20 85 35 Q80 28 75 32 Q70 36 65 32 Q60 28 55 32 Q50 36 45 32 Q40 28 35 32 Q30 36 25 32 Q20 28 15 40" fill="#4a4a4a" />
                <ellipse cx="36" cy="48" rx="7" ry="6" fill="white" />
                <ellipse cx="64" cy="48" rx="7" ry="6" fill="white" />
                <circle cx="38" cy="49" r="4" fill="#2d2d2d" />
                <circle cx="62" cy="49" r="4" fill="#2d2d2d" />
                <circle cx="39.5" cy="47.5" r="1.5" fill="white" />
                <circle cx="63.5" cy="47.5" r="1.5" fill="white" />
                <path d="M30 41 Q36 38 42 41" stroke="#3d3d3d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M58 41 Q64 38 70 41" stroke="#3d3d3d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M50 50 L48 58 Q50 60 52 58 L50 50" fill="#d4d4d4" stroke="#c0c0c0" strokeWidth="0.5" />
                <path d="M38 62 Q50 70 62 62" stroke="#2d2d2d" strokeWidth="2" fill="none" strokeLinecap="round" />
                <ellipse cx="30" cy="58" rx="6" ry="3" fill="#fca5a5" opacity="0.15" />
                <ellipse cx="70" cy="58" rx="6" ry="3" fill="#fca5a5" opacity="0.15" />
                <circle cx="50" cy="50" r="48" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.2" />
              </svg>
              <div style={{
                position: "absolute",
                bottom: "2px",
                right: "2px",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#22c55e",
                border: "2px solid #0a0a0a",
                boxShadow: "0 0 12px rgba(34,197,94,0.3)"
              }} />
            </div>
            <div>
              <div style={{ fontSize: "18px", fontWeight: "600", color: "#ffffff" }}>
                PlantPal AI
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#64748b" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                Online • Ready
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{
              padding: "8px 14px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "8px",
              color: "#94a3b8",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)" }}
          >
            <Settings style={{ width: "16px", height: "16px" }} />
            Settings
          </button>
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: "hidden" }}
            >
              <div style={{
                padding: "16px 20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                marginBottom: "20px"
              }}>
                <div style={{ fontSize: "13px", fontWeight: "500", color: "#e2e8f0", marginBottom: "4px" }}>
                  Assistant Instructions
                </div>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: "80px",
                    padding: "10px 14px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "8px",
                    color: "#e2e8f0",
                    fontSize: "13px",
                    resize: "vertical",
                    outline: "none",
                    fontFamily: "inherit"
                  }}
                  placeholder="How should the assistant behave?"
                />
                <div style={{ fontSize: "11px", color: "#64748b", marginTop: "6px" }}>
                  These instructions guide how the AI responds to your questions.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Knowledge Base Status */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 16px",
          background: "rgba(34,197,94,0.04)",
          border: "1px solid rgba(34,197,94,0.06)",
          borderRadius: "10px",
          marginBottom: "20px"
        }}>
          <Sparkles style={{ color: "#22c55e", width: "18px", height: "18px" }} />
          <div style={{ fontSize: "13px", color: "#94a3b8" }}>
            <span style={{ color: "#22c55e", fontWeight: "500" }}>Knowledge Base: Active</span>
            {" • "}
            Upload PDFs to enhance responses.
          </div>
          <Link href="/upload" style={{
            marginLeft: "auto",
            padding: "4px 14px",
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.1)",
            borderRadius: "6px",
            color: "#22c55e",
            fontSize: "12px",
            fontWeight: "500",
            textDecoration: "none",
            transition: "all 0.2s"
          }}>
            Upload →
          </Link>
        </div>

        {/* Messages */}
        <div style={{
          minHeight: "400px",
          maxHeight: "500px",
          overflowY: "auto",
          paddingRight: "8px",
          marginBottom: "16px"
        }}>
          {messages.map((msg, index) => (
            <ChatMessage key={index} sender={msg.sender} message={msg.message} />
          ))}
          {loading && (
            <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 4px" }}>
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                position: "relative",
                overflow: "hidden",
                border: "2px solid rgba(34,197,94,0.2)",
                background: "#1a1a2e"
              }}>
                <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                  <circle cx="50" cy="50" r="48" fill="#f0f0f0" />
                  <ellipse cx="50" cy="35" rx="40" ry="25" fill="#4a4a4a" />
                  <ellipse cx="38" cy="48" rx="6" ry="5" fill="white" />
                  <ellipse cx="62" cy="48" rx="6" ry="5" fill="white" />
                  <circle cx="39.5" cy="49" r="3.5" fill="#2d2d2d" />
                  <circle cx="60.5" cy="49" r="3.5" fill="#2d2d2d" />
                  <path d="M40 58 Q50 64 60 58" stroke="#2d2d2d" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
                <div style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  border: "2px solid #0a0a0a"
                }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Loader2 style={{ color: "#22c55e", width: "16px", height: "16px", animation: "spin 1s linear infinite" }} />
                <span style={{ fontSize: "13px", color: "#64748b" }}>Thinking...</span>
              </div>
            </div>
          )}
          {error && (
            <div style={{
              padding: "12px 16px",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.1)",
              borderRadius: "8px",
              fontSize: "13px",
              color: "#f87171",
              marginBottom: "12px"
            }}>
              ⚠️ {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "12px"
        }}>
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => {
                setInput(q);
                setTimeout(() => sendMessage(), 100);
              }}
              style={{
                padding: "6px 16px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "20px",
                color: "#94a3b8",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#ffffff" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "#94a3b8" }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-end",
          padding: "12px 16px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "12px",
          transition: "all 0.2s"
        }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask about plant care, watering, diseases..."
            style={{
              flex: 1,
              padding: "8px 0",
              background: "transparent",
              border: "none",
              color: "#e2e8f0",
              fontSize: "14px",
              resize: "none",
              outline: "none",
              minHeight: "24px",
              maxHeight: "120px",
              fontFamily: "inherit"
            }}
            rows={1}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              padding: "8px 16px",
              background: input.trim() && !loading ? "#22c55e" : "rgba(255,255,255,0.05)",
              color: input.trim() && !loading ? "#0a0a0a" : "#64748b",
              border: "none",
              borderRadius: "8px",
              cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            {loading ? (
              <Loader2 style={{ width: "18px", height: "18px", animation: "spin 1s linear infinite" }} />
            ) : (
              <>
                Send
                <Send style={{ width: "16px", height: "16px" }} />
              </>
            )}
          </button>
        </div>

        <div style={{
          textAlign: "center",
          fontSize: "11px",
          color: "#475569",
          marginTop: "12px",
          letterSpacing: "0.3px"
        }}>
          Press Enter to send • Knowledge-based responses from your uploaded guides
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}