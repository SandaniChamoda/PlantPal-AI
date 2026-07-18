"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Upload, File, X, Loader2, CheckCircle } from "lucide-react";

type UploadResult = {
  success: boolean;
  message: string;
  answer?: string;
  knowledge?: {
    id: string;
    fileName: string;
    knowledgeType: string;
    uploadedAt: string;
  };
  totalKnowledgeItems?: number;
};

const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [knowledgeType, setKnowledgeType] = useState("Plant Care Guide");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const isReady = useMemo(() => !!file && !loading, [file, loading]);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("knowledgeType", knowledgeType);

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${apiBase}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Upload failed.");
      }

      setResult(data);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "16px",
      padding: "32px",
      backdropFilter: "blur(10px)",
    }}>
      {/* Title */}
      <h2 style={{
        fontSize: "18px",
        fontWeight: "600",
        color: "#ffffff",
        marginBottom: "4px"
      }}>
        Upload Plant Knowledge
      </h2>
      <p style={{
        fontSize: "14px",
        color: "#94a3b8",
        marginBottom: "24px"
      }}>
        Upload PDF guides, disease sheets, or care instructions.
      </p>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const droppedFile = e.dataTransfer.files[0];
          if (droppedFile && droppedFile.type === "application/pdf") {
            setFile(droppedFile);
            setError("");
          } else {
            setError("Please drop a valid PDF file.");
          }
        }}
        onClick={() => document.getElementById("file-input")?.click()}
        style={{
          border: `2px dashed ${isDragging ? "#22c55e" : file ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "12px",
          padding: "40px 20px",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.3s",
          background: isDragging ? "rgba(34,197,94,0.05)" : file ? "rgba(34,197,94,0.03)" : "transparent",
        }}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf"
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if (selected) {
              setFile(selected);
              setError("");
            }
          }}
          style={{ display: "none" }}
        />

        {file ? (
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 20px",
              background: "rgba(34,197,94,0.08)",
              borderRadius: "10px",
              border: "1px solid rgba(34,197,94,0.12)"
            }}>
              <File style={{ color: "#22c55e", width: "24px", height: "24px" }} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "14px", fontWeight: "500", color: "#e2e8f0" }}>
                  {file.name}
                </div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>
                  {(file.size / 1024).toFixed(1)} KB
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setResult(null);
                }}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "none",
                  borderRadius: "6px",
                  padding: "4px",
                  cursor: "pointer",
                  color: "#94a3b8",
                  transition: "color 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#ffffff"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#94a3b8"}
              >
                <X style={{ width: "16px", height: "16px" }} />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: "40px", marginBottom: "8px" }}>📤</div>
            <div style={{ fontSize: "14px", fontWeight: "500", color: "#e2e8f0" }}>
              Drop your PDF here
            </div>
            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
              or click to browse files
            </div>
          </div>
        )}
      </div>

      {/* Knowledge Type */}
      <div style={{ marginTop: "20px" }}>
        <label style={{
          display: "block",
          fontSize: "13px",
          fontWeight: "500",
          color: "#94a3b8",
          marginBottom: "6px"
        }}>
          Knowledge Type
        </label>
        <select
          value={knowledgeType}
          onChange={(e) => setKnowledgeType(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            color: "#e2e8f0",
            fontSize: "14px",
            outline: "none",
            transition: "border-color 0.2s",
            cursor: "pointer",
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = "#22c55e"}
          onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
        >
          <option style={{ background: "#1a1a2e" }}>Plant Care Guide</option>
          <option style={{ background: "#1a1a2e" }}>Plant Disease Guide</option>
          <option style={{ background: "#1a1a2e" }}>Fertilizer Guide</option>
          <option style={{ background: "#1a1a2e" }}>Watering Guide</option>
          <option style={{ background: "#1a1a2e" }}>Indoor Plants</option>
          <option style={{ background: "#1a1a2e" }}>Seasonal Tips</option>
        </select>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!isReady}
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "12px",
          background: isReady ? "#22c55e" : "rgba(255,255,255,0.05)",
          color: isReady ? "#0a0a0a" : "#64748b",
          border: "none",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: isReady ? "pointer" : "not-allowed",
          transition: "all 0.3s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
        onMouseEnter={(e) => {
          if (isReady) {
            e.currentTarget.style.background = "#16a34a";
          }
        }}
        onMouseLeave={(e) => {
          if (isReady) {
            e.currentTarget.style.background = "#22c55e";
          }
        }}
      >
        {loading ? (
          <>
            <Loader2 style={{ width: "18px", height: "18px", animation: "spin 1s linear infinite" }} />
            Analyzing PDF...
          </>
        ) : (
          <>
            <Upload style={{ width: "18px", height: "18px" }} />
            Upload & Build Knowledge
          </>
        )}
      </button>

      {/* Error */}
      {error && (
        <div style={{
          marginTop: "16px",
          padding: "12px 16px",
          background: "rgba(239,68,68,0.08)",
          border: "1px solid rgba(239,68,68,0.12)",
          borderRadius: "8px",
          fontSize: "13px",
          color: "#f87171",
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Success Result */}
      {result?.success && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: "16px",
            padding: "16px 20px",
            background: "rgba(34,197,94,0.06)",
            border: "1px solid rgba(34,197,94,0.1)",
            borderRadius: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CheckCircle style={{ color: "#22c55e", width: "20px", height: "20px" }} />
            <div>
              <div style={{ fontSize: "14px", fontWeight: "500", color: "#e2e8f0" }}>
                {result.message}
              </div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                Knowledge items stored: {result.totalKnowledgeItems || 0}
              </div>
            </div>
          </div>
          {result.answer && (
            <div style={{
              marginTop: "12px",
              padding: "12px 16px",
              background: "rgba(255,255,255,0.02)",
              borderRadius: "6px",
              fontSize: "13px",
              color: "#cbd5e1",
              maxHeight: "200px",
              overflow: "auto",
              whiteSpace: "pre-wrap",
              lineHeight: "1.6"
            }}>
              {result.answer}
            </div>
          )}
        </motion.div>
      )}

      {/* Add spin animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}