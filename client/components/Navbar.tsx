"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Leaf, Upload, MessageCircle, Home } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/upload", label: "Knowledge", icon: Upload },
  { href: "/chat", label: "Chat", icon: MessageCircle },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-emerald-100/60 bg-white/85 px-6 py-3 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <div className="rounded-xl bg-emerald-600 p-1.5 shadow-lg shadow-emerald-600/20 transition group-hover:shadow-emerald-600/30">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-emerald-900">
            PlantPal <span className="text-emerald-600">AI</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 rounded-xl bg-emerald-50/50 p-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-emerald-900 shadow-sm"
                    : "text-emerald-700/70 hover:bg-white/50 hover:text-emerald-900"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 mx-auto h-0.5 w-8 rounded-full bg-emerald-600"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}