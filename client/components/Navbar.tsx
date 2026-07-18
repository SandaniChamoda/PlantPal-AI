"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: "rgba(10,10,10,0.8)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "0 24px"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px"
      }}>
        <Link href="/" style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none"
        }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Leaf style={{ color: "#0a0a0a", width: "18px", height: "18px" }} />
          </div>
          <span style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "#ffffff"
          }}>
            PlantPal <span style={{ color: "#22c55e" }}>AI</span>
          </span>
        </Link>

        <div style={{
          display: "flex",
          gap: "4px",
          background: "rgba(255,255,255,0.03)",
          padding: "4px",
          borderRadius: "10px"
        }}>
          {[
            { href: "/", label: "Home" },
            { href: "/upload", label: "Knowledge" },
            { href: "/chat", label: "Chat" }
          ].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "6px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: isActive ? "#ffffff" : "#94a3b8",
                  background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.2s"
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}