"use client";

import { Activity, BarChart3, LineChart, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const departmentBreakdown = [
  { name: "Radiology", share: "34%" },
  { name: "Intensive care", share: "26%" },
  { name: "Surgery", share: "18%" },
  { name: "General wards", share: "22%" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 pb-10">
      <Card>
        <CardContent className="grid gap-6 p-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-3">
            <div className="eyebrow w-fit">Performance reporting</div>
            <h2 className="text-4xl font-semibold tracking-tight text-slate-950">Operational analytics that look presentation-ready.</h2>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              This section is structured like an executive reporting surface, even before richer charting gets connected to live backend metrics.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] bg-slate-950 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-teal-200/80">Mean time between failures</p>
              <p className="mt-3 text-3xl font-semibold">142 days</p>
            </div>
            <div className="rounded-[24px] bg-emerald-50 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-700/80">Maintenance completion rate</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">94%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Reliability trend</CardTitle>
            <CardDescription>Placeholder visual block ready for live MTBF and uptime charting.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex h-72 items-center justify-center rounded-[28px] border border-dashed border-border bg-secondary/60">
              <div className="text-center">
                <LineChart className="mx-auto h-12 w-12 text-primary" />
                <p className="mt-4 text-sm font-medium text-slate-700">Chart region prepared for real analytics integration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department distribution</CardTitle>
            <CardDescription>Installed base spread by service area.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="flex h-40 items-center justify-center rounded-[28px] bg-secondary/60">
              <PieChart className="h-12 w-12 text-primary" />
            </div>
            {departmentBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-[20px] border border-border/80 bg-white/70 px-4 py-3">
                <span className="text-sm font-medium text-slate-700">{item.name}</span>
                <span className="text-sm font-semibold text-slate-950">{item.share}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {[
          { title: "Alert trend", icon: Activity, text: "Critical alerts are trending lower week over week after preventive work execution." },
          { title: "Service productivity", icon: BarChart3, text: "Completion throughput remains strong, with same-day handling improving in imaging." },
          { title: "Reliability posture", icon: Activity, text: "Most departments remain within target, while radiology continues to warrant closer watch." },
        ].map((item) => (
          <Card key={item.title}>
            <CardContent className="p-6">
              <div className="rounded-2xl bg-teal-50 p-3 text-primary w-fit">
                <item.icon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-xl font-semibold tracking-tight text-slate-950">{item.title}</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
