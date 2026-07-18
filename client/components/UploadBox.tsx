"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Upload, File, X, Loader2 } from "lucide-react";

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
    <Card className="w-full max-w-2xl border-0 shadow-xl shadow-emerald-900/5 bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-emerald-100/60">
        <CardTitle className="flex items-center gap-2 text-2xl text-emerald-900">
          <Upload className="h-6 w-6 text-emerald-600" />
          Upload Knowledge
        </CardTitle>
        <CardDescription className="text-emerald-600">
          Upload PDF guides, disease sheets, or care instructions.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
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
          className={`relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-all ${
            isDragging
              ? "border-emerald-500 bg-emerald-50/80"
              : file
              ? "border-emerald-300 bg-emerald-50/50"
              : "border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/30"
          }`}
          onClick={() => document.getElementById("file-input")?.click()}
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
            className="hidden"
          />

          {file ? (
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="rounded-full bg-emerald-100 p-3">
                <File className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-emerald-900">{file.name}</p>
                <p className="text-sm text-emerald-600">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setResult(null);
                }}
                className="rounded-full p-1 text-emerald-400 hover:bg-emerald-100 hover:text-emerald-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="h-10 w-10 text-emerald-400" />
              <p className="mt-2 text-sm font-medium text-emerald-800">Drop your PDF here</p>
              <p className="text-xs text-emerald-600">or click to browse files</p>
            </>
          )}
        </div>

        {/* Knowledge Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-emerald-800">Knowledge Type</label>
          <select
            value={knowledgeType}
            onChange={(e) => setKnowledgeType(e.target.value)}
            className="w-full rounded-xl border border-emerald-200 bg-white/50 px-4 py-3 text-sm text-emerald-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
          >
            <option>Plant Care Guide</option>
            <option>Plant Disease Guide</option>
            <option>Fertilizer Guide</option>
            <option>Watering Guide</option>
            <option>Indoor Plants</option>
            <option>Seasonal Tips</option>
          </select>
        </div>

        <Button disabled={!isReady} onClick={handleUpload} className="h-10 w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing PDF...
            </>
          ) : (
            "Upload & Build Knowledge"
          )}
        </Button>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            ⚠️ {error}
          </div>
        )}

        {result?.success && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 rounded-lg border border-emerald-200 bg-emerald-50/80 p-4"
          >
            <p className="font-semibold text-emerald-800">✅ {result.message}</p>
            <p className="text-sm text-emerald-700">
              Knowledge items stored: {result.totalKnowledgeItems || 0}
            </p>
            {result.answer && (
              <div className="max-h-64 overflow-auto rounded-md border border-emerald-100 bg-white p-3 text-sm whitespace-pre-wrap text-emerald-900">
                {result.answer}
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}