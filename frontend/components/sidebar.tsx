"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BrainCircuit, Box, ChevronRight, LayoutDashboard, LogOut, Settings, Users, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Equipment", href: "/dashboard/equipment", icon: Box },
  { name: "Maintenance", href: "/dashboard/maintenance", icon: Wrench },
  { name: "Predictions", href: "/dashboard/predictions", icon: BrainCircuit },
  { name: "Analytics", href: "/dashboard/analytics", icon: Activity },
];

const utilityItems = [
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout, user, tenantSlug } = useAuth();

  return (
    <aside className="hidden w-[290px] shrink-0 flex-col border-r border-white/50 bg-slate-950 px-5 py-5 text-slate-100 xl:flex">
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-base font-bold text-slate-950">
            M
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">MediGuard</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Asset intelligence</p>
          </div>
        </div>

        <div className="mt-6 rounded-[24px] bg-emerald-400/10 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/80">Active tenant</p>
          <p className="mt-2 text-xl font-semibold">{tenantSlug || "system"}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">Reliable view of equipment health, service load, and rising risks.</p>
        </div>
      </div>

      <nav className="mt-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition",
                isActive ? "bg-white text-slate-950 shadow-lg" : "bg-transparent text-slate-300 hover:bg-white/6 hover:text-white"
              )}
            >
              <span className="flex items-center gap-3">
                <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-slate-400")} />
                {item.name}
              </span>
              {isActive ? <ChevronRight className="h-4 w-4 text-slate-500" /> : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3">
        {utilityItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/6 hover:text-white"
          >
            <item.icon className="h-4 w-4 text-slate-400" />
            {item.name}
          </Link>
        ))}

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-sm font-semibold text-white">
              {user?.email?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{user?.email || "Admin user"}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{user?.role || "Engineer"}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/8"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
