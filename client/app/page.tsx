"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import AvatarWidget from "@/components/AvatarWidget";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Upload, MessageCircle, Leaf } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-4 py-1.5 text-sm font-medium text-emerald-800 border border-emerald-200/50">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              AI Product Prototype Challenge
            </div>
            
            <h1 className="mt-6 text-5xl font-bold tracking-tight text-emerald-950 sm:text-6xl">
              PlantPal AI
              <span className="block text-emerald-600">Your Intelligent Botanist</span>
            </h1>
            
            <p className="mt-6 text-lg text-emerald-700/80 max-w-xl leading-relaxed">
              Upload your plant guides and get instant, personalized advice from your 
              AI-powered virtual gardening assistant.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/upload"
                className="group inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-700 hover:shadow-emerald-600/40"
              >
                <Upload className="h-5 w-5" />
                Upload Knowledge
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-emerald-200 bg-white/80 px-6 py-3.5 font-semibold text-emerald-800 backdrop-blur-sm transition-all hover:bg-emerald-50 hover:border-emerald-300"
              >
                <MessageCircle className="h-5 w-5" />
                Start Chat
              </Link>
            </div>

            {/* Feature Tags */}
            <div className="mt-12 flex flex-wrap gap-3">
              {["🌱 Upload PDF Guides", "🧠 AI-Powered Answers", "⚡ Real-Time Chat", "📚 Custom Knowledge"].map((tag) => (
                <span key={tag} className="rounded-full bg-white/80 px-4 py-1.5 text-sm text-emerald-700 border border-emerald-200/50 backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl bg-gradient-to-br from-emerald-100/40 via-white to-emerald-50/40 p-8 shadow-2xl shadow-emerald-900/10 border border-emerald-200/50 backdrop-blur-sm">
              <div className="absolute -top-3 -right-3 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/30">
                LIVE
              </div>
              <AvatarWidget className="h-[400px] w-full" />
              
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-white/80 p-3 border border-emerald-100">
                  <div className="text-lg font-bold text-emerald-700">3D</div>
                  <div className="text-xs text-emerald-600">Avatar</div>
                </div>
                <div className="rounded-xl bg-white/80 p-3 border border-emerald-100">
                  <div className="text-lg font-bold text-emerald-700">AI</div>
                  <div className="text-xs text-emerald-600">Powered</div>
                </div>
                <div className="rounded-xl bg-white/80 p-3 border border-emerald-100">
                  <div className="text-lg font-bold text-emerald-700">RAG</div>
                  <div className="text-xs text-emerald-600">Knowledge</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid gap-6 sm:grid-cols-3"
        >
          {[
            { icon: "📄", title: "Upload PDFs", desc: "Plant guides, care sheets, any knowledge" },
            { icon: "🧠", title: "Smart Responses", desc: "Context-aware answers from your docs" },
            { icon: "💬", title: "Natural Chat", desc: "Conversational interface with memory" },
          ].map((feature) => (
            <div key={feature.title} className="rounded-2xl bg-white/70 p-6 border border-emerald-100/60 backdrop-blur-sm hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="text-3xl">{feature.icon}</div>
              <h3 className="mt-3 font-semibold text-emerald-900">{feature.title}</h3>
              <p className="mt-1 text-sm text-emerald-600/80">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}