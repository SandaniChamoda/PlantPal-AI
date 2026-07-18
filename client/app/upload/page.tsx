"use client";

import Navbar from "@/components/Navbar";
import UploadBox from "@/components/UploadBox";

export default function UploadPage() {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />

      <section className="container-dark" style={{ padding: "40px 0" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <div className="badge-productivity" style={{ marginBottom: "12px" }}>
            📚 KNOWLEDGE BASE
          </div>
          
          <h1 style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#ffffff",
            letterSpacing: "-1px",
            marginTop: "8px"
          }}>
            Upload <span style={{ color: "#22c55e" }}>Knowledge</span>
          </h1>
          
          <p style={{
            fontSize: "16px",
            color: "#94a3b8",
            maxWidth: "560px",
            marginTop: "8px",
            lineHeight: "1.6"
          }}>
            Upload your plant care documents and turn them into actionable AI insights. 
            Your assistant will use this knowledge to provide accurate, personalized answers.
          </p>
        </div>

        {/* Upload Box */}
        <div style={{ maxWidth: "640px" }}>
          <UploadBox />
        </div>

        {/* Info Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          maxWidth: "640px",
          marginTop: "32px"
        }}>
          {[
            { icon: "📋", label: "Supported Formats", value: "PDF only" },
            { icon: "📚", label: "Knowledge Types", value: "Guides, FAQs, Sheets" },
            { icon: "🔍", label: "AI Analysis", value: "Automatic summarization" }
          ].map((item) => (
            <div key={item.label} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "24px", marginBottom: "4px" }}>{item.icon}</div>
              <div style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {item.label}
              </div>
              <div style={{ fontSize: "13px", color: "#e2e8f0", marginTop: "2px" }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}