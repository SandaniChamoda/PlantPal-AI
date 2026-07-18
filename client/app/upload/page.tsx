import Navbar from "@/components/Navbar";
import UploadBox from "@/components/UploadBox";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/30">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-4 py-1.5 text-sm font-medium text-emerald-800 border border-emerald-200/50">
            📚 Knowledge Base
          </div>
          <h1 className="mt-4 text-4xl font-bold text-emerald-950 sm:text-5xl">
            Upload Plant Knowledge
          </h1>
          <p className="mt-3 mx-auto max-w-2xl text-lg text-emerald-700/80">
            Upload your plant care documents and turn them into actionable AI insights.
            Your assistant will use this knowledge to provide accurate, personalized answers.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <UploadBox />
        </div>

        {/* Quick Tips */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
          {[
            { icon: "📋", label: "Supported Formats", value: "PDF only" },
            { icon: "📚", label: "Knowledge Types", value: "Guides, FAQs, Sheets" },
            { icon: "🔍", label: "AI Analysis", value: "Automatic summarization" },
          ].map((tip) => (
            <div key={tip.label} className="rounded-xl bg-white/70 p-4 text-center border border-emerald-100/60">
              <div className="text-2xl">{tip.icon}</div>
              <div className="mt-1 text-sm font-medium text-emerald-800">{tip.label}</div>
              <div className="text-xs text-emerald-600">{tip.value}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}