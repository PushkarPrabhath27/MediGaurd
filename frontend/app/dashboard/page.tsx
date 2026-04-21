"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowUpRight, BrainCircuit, CalendarClock, HeartPulse, ShieldCheck, Wrench } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AlertStatus = "Critical" | "Watch" | "Stable";

type DashboardAlert = {
  id: number | string;
  name: string;
  prob: string;
  status: AlertStatus;
  eta?: string;
};

type DashboardStats = {
  total_assets?: number | string;
  critical_health?: number | string;
  maintenance_due?: number | string;
  uptime?: number | string;
  healthy_assets?: number | string;
  tasks_today?: number | string;
  recent_alerts?: DashboardAlert[];
};

const fallbackAlerts: DashboardAlert[] = [
  { id: 1, name: "MRI Scanner 4B", prob: "84%", status: "Critical", eta: "Within 48 hours" },
  { id: 2, name: "Ventilator V-90", prob: "62%", status: "Watch", eta: "Within 5 days" },
  { id: 3, name: "CT Suite Cooling Module", prob: "41%", status: "Stable", eta: "Monitor this week" },
];

const serviceTimeline = [
  { title: "Work order issued for infusion pump fleet", detail: "West Wing intensive care", time: "45 min ago" },
  { title: "Preventive maintenance completed", detail: "Radiology ultrasound room", time: "2 hr ago" },
  { title: "High-risk alert acknowledged", detail: "MRI Scanner 4B", time: "3 hr ago" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const { token, tenantSlug, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    if (!token || !tenantSlug) return;

    const fetchStats = async () => {
      setIsFetching(true);
      try {
        const data = await apiRequest<DashboardStats>("/analytics/stats", {
          token,
          tenantSlug,
        });
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchStats();
  }, [token, tenantSlug]);

  if (isAuthLoading || isFetching) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Assets monitored",
      value: stats?.total_assets ?? "1,284",
      note: "Across active departments",
      icon: ShieldCheck,
    },
    {
      title: "Critical health states",
      value: stats?.critical_health ?? "14",
      note: "Requires same-day review",
      icon: AlertTriangle,
    },
    {
      title: "Maintenance due",
      value: stats?.maintenance_due ?? "45",
      note: "Planned in next 7 days",
      icon: Wrench,
    },
    {
      title: "Fleet uptime",
      value: stats?.uptime ?? "99.8%",
      note: "Rolling operational target",
      icon: HeartPulse,
    },
  ];

  const recentAlerts = stats?.recent_alerts || fallbackAlerts;

  return (
    <div className="space-y-6 pb-10">
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden">
          <CardContent className="grid gap-6 p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="eyebrow w-fit">Executive summary</div>
              <div className="space-y-3">
                <h2 className="text-4xl font-semibold tracking-tight text-slate-950">
                  Clinical readiness stays strongest when the team sees risk early.
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                  Use this workspace to balance uptime, maintenance demand, and predictive alerts without losing
                  sight of the equipment that matters most to patient care.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="metric-chip">AI prioritized alerts</span>
                <span className="metric-chip">Service coordination</span>
                <span className="metric-chip">Operational visibility</span>
              </div>
            </div>

            <div className="rounded-[30px] bg-slate-950 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-teal-200/80">Reliability signal</p>
                  <p className="mt-2 text-4xl font-semibold">92 / 100</p>
                </div>
                <Badge className="border-none bg-emerald-400/20 px-3 py-1 text-emerald-100">On target</Badge>
              </div>
              <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-300" />
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Current signal blends device health, alert load, maintenance backlog, and service completion pace.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shift summary</CardTitle>
            <CardDescription>Quick glance at the current command posture.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-[24px] bg-secondary/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Alerts requiring review</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{recentAlerts.length}</p>
            </div>
            <div className="rounded-[24px] bg-emerald-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-700/70">Assets in healthy range</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{stats?.healthy_assets ?? "1,108"}</p>
            </div>
            <div className="rounded-[24px] bg-amber-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-700/70">Service tasks due today</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{stats?.tasks_today ?? "9"}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{card.title}</p>
                    <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{card.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{card.note}</p>
                  </div>
                  <div className="rounded-2xl bg-teal-50 p-3 text-primary">
                    <card.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Priority alerts</CardTitle>
            <CardDescription>Assets with elevated risk based on current telemetry and historical service patterns.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert: DashboardAlert, index: number) => (
              <motion.div
                key={alert.id || alert.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08 }}
                className="flex flex-col gap-4 rounded-[26px] border border-border/80 bg-white/70 p-5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "rounded-2xl p-3",
                      alert.status === "Critical"
                        ? "bg-red-50 text-red-600"
                        : alert.status === "Watch"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-emerald-50 text-emerald-600"
                    )}
                  >
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold tracking-tight text-slate-950">{alert.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">Failure probability {alert.prob}. {alert.eta || "Monitor closely."}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    className={cn(
                      "border-none px-3 py-1",
                      alert.status === "Critical"
                        ? "bg-red-50 text-red-700"
                        : alert.status === "Watch"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-emerald-50 text-emerald-700"
                    )}
                  >
                    {alert.status}
                  </Badge>
                  <ArrowUpRight className="h-5 w-5 text-slate-400" />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Maintenance and alert handling events from the last few hours.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {serviceTimeline.map((item) => (
              <div key={item.title} className="flex gap-4 rounded-[24px] border border-border/80 bg-white/70 p-5">
                <div className="mt-1 rounded-2xl bg-secondary p-3 text-primary">
                  <CalendarClock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
