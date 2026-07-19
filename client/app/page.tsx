"use client";

import Link from "next/link";
import AvatarWidget from "@/components/AvatarWidget";

export default function Home() {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Navbar - Same as before */}
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
          {/* Left Content */}
          <div>
            <div className="badge-productivity" style={{ marginBottom: "12px" }}>
              🌱 AI Product Prototype
            </div>

            <div className="badge-dark">
              <span className="dot" />
              PlantPal AI
            </div>

            <h1 className="title-dark" style={{ fontSize: "42px", lineHeight: "1.2" }}>
              Your AI-Powered
              <span className="highlight"> Virtual Botanist</span>
            </h1>

            <p className="subtitle-dark" style={{ fontSize: "16px", color: "#94a3b8" }}>
              Upload your plant guides and get instant, personalized advice from your AI assistant.
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

          {/* Right Content - Amaya Avatar */}
          <div className="avatar-card-dark">
            <div className="header">
              <div className="icon-box">👩</div>
              <div>
                <div className="label">PlantPal AI - AI Assistant</div>
                <div className="sub">3D Interactive Avatar</div>
              </div>
            </div>

            <div className="avatar-shell-dark" style={{ height: "400px" }}>
              <AvatarWidget className="h-full w-full" />
            </div>

            <div className="status-dark">
              <div className="item">
                <span className="dot" style={{ background: "#22c55e" }} />
                3D Avatar
              </div>
              <div className="item">
                <span className="dot" style={{ background: "#22c55e" }} />
                Amaya
              </div>
              <div className="item">
                <span className="dot" style={{ background: "#22c55e" }} />
                AI Assistant
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}