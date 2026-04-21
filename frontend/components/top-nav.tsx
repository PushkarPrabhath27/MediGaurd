"use client";

import { Bell, Search, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": {
    title: "Operations overview",
    subtitle: "Track equipment reliability, service readiness, and AI-prioritized work.",
  },
  "/dashboard/equipment": {
    title: "Equipment inventory",
    subtitle: "Review the installed base, health scores, and operating state.",
  },
  "/dashboard/maintenance": {
    title: "Maintenance planning",
    subtitle: "Schedule work orders and monitor current execution status.",
  },
  "/dashboard/predictions": {
    title: "Predictive risk",
    subtitle: "Focus the team on assets with rising failure probability.",
  },
  "/dashboard/analytics": {
    title: "Analytics",
    subtitle: "Summarize reliability, uptime, and departmental performance.",
  },
};

export function TopNav() {
  const pathname = usePathname();
  const { tenantSlug } = useAuth();
  const content = pageTitles[pathname] || pageTitles["/dashboard"];

  return (
    <header className="glass sticky top-4 z-20 flex flex-col gap-4 rounded-[30px] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Workspace</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">{content.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{content.subtitle}</p>
      </div>

      <div className="flex flex-col gap-3 lg:min-w-[420px] lg:max-w-[520px] lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search asset, model, work order, or department" className="pl-11" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-border/80 bg-white/75 px-3 py-2 text-sm">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="font-medium text-slate-700">{tenantSlug || "system"}</span>
          </div>
          <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-border/80 bg-white/75 text-slate-700 transition hover:bg-white">
            <Bell className="h-5 w-5" />
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
