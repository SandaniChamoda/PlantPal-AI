"use client";

import { useEffect, useState } from "react";
import Avatar3D from "./Avatar3D";
import { cn } from "@/lib/utils";

type AvatarWidgetProps = {
  className?: string;
  isSpeaking?: boolean;
};

export default function AvatarWidget({ className, isSpeaking = false }: AvatarWidgetProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[350px]">
        <div className="text-center animate-pulse">
          <div className="text-5xl mb-4">🌱</div>
          <p className="text-emerald-400/80 text-sm font-medium tracking-wide">Initializing Amaya...</p>
        </div>
      </div>
    );
  }

  return <Avatar3D className={cn(className)} isSpeaking={isSpeaking} />;
}