"use client";

import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: string;
  sender: "user" | "ai";
}

export default function ChatMessage({ message, sender }: ChatMessageProps) {
  const isAI = sender === "ai";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 ${isAI ? "justify-start" : "justify-end"}`}
    >
      {isAI && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100">
          <Bot className="h-4 w-4 text-emerald-700" />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isAI
            ? "bg-white border border-emerald-100/60 shadow-sm text-emerald-900"
            : "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
        }`}
      >
        {isAI ? (
          <div className="prose prose-sm prose-emerald max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-lg font-bold text-emerald-800">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-semibold text-emerald-700">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-semibold text-emerald-600">{children}</h3>,
                ul: ({ children }) => <ul className="my-2 list-disc pl-4 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="my-2 list-decimal pl-4 space-y-1">{children}</ol>,
                li: ({ children }) => <li className="text-emerald-800">{children}</li>,
                p: ({ children }) => <p className="my-1 text-emerald-800">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold text-emerald-900">{children}</strong>,
                table: ({ children }) => (
                  <div className="my-2 overflow-x-auto">
                    <table className="min-w-full border-collapse rounded-lg border border-emerald-200">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-left text-xs font-semibold text-emerald-800">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-emerald-200 px-3 py-1.5 text-xs text-emerald-700">
                    {children}
                  </td>
                ),
              }}
            >
              {message}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message}</p>
        )}
      </div>

      {!isAI && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600">
          <User className="h-4 w-4 text-white" />
        </div>
      )}
    </motion.div>
  );
}