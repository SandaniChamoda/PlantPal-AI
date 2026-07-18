"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface ChatMessageProps {
  message: string;
  sender: "user" | "ai";
}

export default function ChatMessage({ message, sender }: ChatMessageProps) {
  const isAI = sender === "ai";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "14px",
        justifyContent: isAI ? "flex-start" : "flex-end",
        marginBottom: "20px",
        padding: "0 4px"
      }}
    >
      {/* AI Avatar */}
      {isAI && (
        <div style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          flexShrink: 0,
          position: "relative",
          border: "2px solid rgba(34,197,94,0.2)",
          boxShadow: "0 4px 20px rgba(34,197,94,0.1)",
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
            width: "11px",
            height: "11px",
            borderRadius: "50%",
            background: "#22c55e",
            border: "2px solid #0a0a0a",
            boxShadow: "0 0 12px rgba(34,197,94,0.3)"
          }} />
        </div>
      )}

      {/* Message Bubble */}
      <div
        style={{
          maxWidth: "82%",
          padding: "16px 20px",
          borderRadius: isAI ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
          background: isAI 
            ? "rgba(255,255,255,0.04)" 
            : "linear-gradient(135deg, #22c55e, #16a34a)",
          border: isAI ? "1px solid rgba(255,255,255,0.06)" : "none",
          color: isAI ? "#e2e8f0" : "#0a0a0a",
          boxShadow: isAI 
            ? "none" 
            : "0 4px 20px rgba(34,197,94,0.15)"
        }}
      >
        {isAI ? (
          <div style={{
            fontSize: "14px",
            lineHeight: "1.8",
            color: "#e2e8f0"
          }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                // Headers
                h1: ({ children }) => (
                  <h1 style={{ 
                    fontSize: "20px", 
                    fontWeight: "700", 
                    color: "#ffffff", 
                    margin: "12px 0 6px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    paddingBottom: "4px"
                  }}>{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 style={{ 
                    fontSize: "17px", 
                    fontWeight: "600", 
                    color: "#e2e8f0", 
                    margin: "10px 0 4px"
                  }}>{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 style={{ 
                    fontSize: "15px", 
                    fontWeight: "600", 
                    color: "#94a3b8", 
                    margin: "8px 0 4px"
                  }}>{children}</h3>
                ),
                
                // Tables - FIXED!
                table: ({ children }) => (
                  <div style={{ 
                    margin: "12px 0", 
                    overflowX: "auto",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.06)"
                  }}>
                    <table style={{ 
                      width: "100%", 
                      borderCollapse: "collapse", 
                      fontSize: "13px",
                      minWidth: "300px"
                    }}>
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead style={{ 
                    background: "rgba(34,197,94,0.08)",
                  }}>
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th style={{ 
                    border: "1px solid rgba(255,255,255,0.06)", 
                    padding: "8px 12px", 
                    textAlign: "left",
                    color: "#e2e8f0",
                    fontWeight: "600",
                    fontSize: "12px"
                  }}>
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td style={{ 
                    border: "1px solid rgba(255,255,255,0.06)", 
                    padding: "8px 12px",
                    color: "#94a3b8",
                    fontSize: "12px"
                  }}>
                    {children}
                  </td>
                ),
                tr: ({ children }) => (
                  <tr style={{
                    transition: "background 0.2s"
                  }}>
                    {children}
                  </tr>
                ),
                
                // Lists
                ul: ({ children }) => (
                  <ul style={{ 
                    margin: "8px 0", 
                    paddingLeft: "20px", 
                    listStyle: "disc",
                    color: "#e2e8f0"
                  }}>{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol style={{ 
                    margin: "8px 0", 
                    paddingLeft: "20px", 
                    listStyle: "decimal",
                    color: "#e2e8f0"
                  }}>{children}</ol>
                ),
                li: ({ children }) => (
                  <li style={{ 
                    margin: "4px 0",
                    lineHeight: "1.6",
                    color: "#e2e8f0"
                  }}>{children}</li>
                ),
                
                // Paragraphs
                p: ({ children }) => (
                  <p style={{ 
                    margin: "6px 0",
                    color: "#e2e8f0",
                    lineHeight: "1.7"
                  }}>{children}</p>
                ),
                
                // Strong/Bold
                strong: ({ children }) => (
                  <strong style={{ 
                    color: "#ffffff", 
                    fontWeight: "600"
                  }}>{children}</strong>
                ),
                
                // Code blocks
                code: ({ children }) => (
                  <code style={{
                    background: "rgba(255,255,255,0.05)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "13px",
                    color: "#22c55e"
                  }}>{children}</code>
                ),
                
                // Blockquotes
                blockquote: ({ children }) => (
                  <blockquote style={{
                    borderLeft: "3px solid #22c55e",
                    paddingLeft: "16px",
                    margin: "8px 0",
                    color: "#94a3b8",
                    fontStyle: "italic"
                  }}>{children}</blockquote>
                ),
                
                // Horizontal Rule
                hr: () => (
                  <hr style={{
                    border: "none",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    margin: "16px 0"
                  }} />
                ),
              }}
            >
              {message}
            </ReactMarkdown>
          </div>
        ) : (
          <p style={{
            whiteSpace: "pre-wrap",
            fontSize: "14px",
            lineHeight: "1.6",
            margin: 0,
            color: "#ffffff"
          }}>
            {message}
          </p>
        )}
      </div>

      {/* User Avatar */}
      {!isAI && (
        <div style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          flexShrink: 0,
          overflow: "hidden",
          background: "#1a1a2e",
          border: "2px solid rgba(59,130,246,0.2)"
        }}>
          <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
            <circle cx="50" cy="50" r="48" fill="#dbeafe" />
            <circle cx="50" cy="40" r="22" fill="#60a5fa" />
            <ellipse cx="50" cy="78" rx="32" ry="22" fill="#60a5fa" />
            <circle cx="38" cy="38" r="4.5" fill="white" />
            <circle cx="62" cy="38" r="4.5" fill="white" />
            <circle cx="40" cy="39" r="2" fill="#1e293b" />
            <circle cx="60" cy="39" r="2" fill="#1e293b" />
            <path d="M42 48 Q50 52 58 48" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}