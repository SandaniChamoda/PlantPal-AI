"use client";

import Link from "next/link";
import AvatarWidget from "@/components/AvatarWidget";
import { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <header className="container-dark" style={{ paddingTop: "16px" }}>
        <div className="header-dark">
          <div className="logo-dark">
            PlantPal <span>AI</span>
          </div>
          <nav className="nav-dark">
            <Link href="/" className="active">Home</Link>
            <Link href="/upload">Knowledge</Link>
            <Link href="/chat">Chat</Link>
          </nav>
        </div>
      </header>

      <section className="container-dark">
        <div className="hero-dark">
          {/* LEFT CONTENT */}
          <div>
            <div className="badge-productivity" style={{ marginBottom: "12px" }}>
              ⚡ PRODUCTIVITY
            </div>

            <div className="badge-dark">
              <span className="dot" />
              ai/SmartSolution
            </div>

            <h1 className="title-dark" style={{ fontSize: "42px", lineHeight: "1.2" }}>
              Give teams the context needed to make 
              <span className="highlight"> quick decisions</span>
            </h1>

            <p className="subtitle-dark" style={{ fontSize: "16px", color: "#94a3b8" }}>
              while staying aligned with your AI-powered virtual gardening assistant.
            </p>

            <div className="btn-group">
              <Link href="/upload" className="btn-primary-dark">
                Upload Knowledge →
              </Link>
              <Link href="/chat" className="btn-secondary-dark">
                Start Chat
              </Link>
            </div>

            <div className="features-dark">
              <div className="feature-dark">
                <span className="icon">📄</span> Upload PDF Guides
              </div>
              <div className="feature-dark">
                <span className="icon">🧠</span> AI-Powered Answers
              </div>
              <div className="feature-dark">
                <span className="icon">⚡</span> Real-Time Chat
              </div>
              <div className="feature-dark">
                <span className="icon">📚</span> Custom Knowledge
              </div>
            </div>

            <div className="slider-dots">
              <span className="dot active" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>

          {/* RIGHT CONTENT - AVATAR */}
          <div className="avatar-card-dark">
            <div className="header">
              <div className="icon-box">🤖</div>
              <div>
                <div className="label">Virtual Plant Assistant</div>
                <div className="sub">3D Interactive Avatar</div>
              </div>
            </div>

            <div className="avatar-shell-dark" style={{ height: "380px" }}>
              <AvatarWidget className="h-full w-full" />
            </div>

            <div className="status-dark">
              <div className="item">
                <span className="dot" style={{ background: "#22c55e" }} />
                3D Avatar
              </div>
              <div className="item">
                <span className="dot" style={{ background: "#22c55e" }} />
                PlantPal Powered
              </div>
              <div className="item">
                <span className="dot" style={{ background: "#22c55e" }} />
                RAG Knowledge
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}