"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

type AvatarWidgetProps = {
  className?: string;
};

const Avatar3D = dynamic(() => import("./Avatar3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[360px] w-full items-center justify-center rounded-2xl bg-emerald-50/50">
      <div className="text-emerald-600">Loading 3D Avatar...</div>
    </div>
  ),
});

export default function AvatarWidget({ className }: AvatarWidgetProps) {
  return <Avatar3D className={cn(className)} />;
}