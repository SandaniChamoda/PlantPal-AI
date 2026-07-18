"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

type AvatarWidgetProps = {
  className?: string;
};

// Lazy load the 3D avatar
const Avatar3D = dynamic(
  () => import("./Avatar3D"),
  { 
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center" style={{ background: "transparent" }}>
        <div className="text-center animate-pulse">
          <div className="text-6xl mb-3">🤖</div>
          <p className="text-emerald-400/70 text-sm">Loading AI Assistant...</p>
        </div>
      </div>
    )
  }
);

export default function AvatarWidget({ className }: AvatarWidgetProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("flex h-full w-full items-center justify-center", className)}>
        <div className="text-center">
          <div className="text-6xl mb-3">🤖</div>
          <p className="text-emerald-400/70 text-sm">Loading AI Assistant...</p>
        </div>
      </div>
    );
  }

  return <Avatar3D className={cn(className)} />;
}