"use client";

import { Activity, BarChart3, LineChart, PieChart, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const departmentBreakdown = [
  { name: "Radiology", share: 34, assets: 438, incidents: 9, tone: "bg-teal-500" },
  { name: "Intensive care", share: 26, assets: 322, incidents: 6, tone: "bg-emerald-500" },
  { name: "Surgery", share: 18, assets: 214, incidents: 3, tone: "bg-cyan-500" },
  { name: "General wards", share: 22, assets: 310, incidents: 5, tone: "bg-slate-400" },
];

const reliabilityTrend = [
  { month: "Jan", score: 78, mtbf: 118 },
  { month: "Feb", score: 81, mtbf: 122 },
  { month: "Mar", score: 79, mtbf: 120 },
  { month: "Apr", score: 84, mtbf: 129 },
  { month: "May", score: 88, mtbf: 136 },
  { month: "Jun", score: 91, mtbf: 142 },
];

const categoryPerformance = [
  { label: "Imaging systems", uptime: "99.4%", workOrders: 18, direction: "up" },
  { label: "Critical care devices", uptime: "99.8%", workOrders: 11, direction: "up" },
  { label: "General ward assets", uptime: "98.9%", workOrders: 23, direction: "down" },
];

const executiveNotes = [
  "Radiology remains the most maintenance-intensive department and should stay under weekly review.",
  "Critical alert volume is trending down after the latest preventive maintenance cycle.",
  "Completion performance is strongest when work orders are grouped by department and shift window.",
];

export default function AnalyticsPage() {
  const maxMtbf = Math.max(...reliabilityTrend.map((item) => item.mtbf));
  const minMtbf = Math.min(...reliabilityTrend.map((item) => item.mtbf));
  const chartPoints = reliabilityTrend.map((item, index) => {
    const x = 24 + (index * (320 / (reliabilityTrend.length - 1)));
    const normalized = (item.mtbf - minMtbf) / Math.max(maxMtbf - minMtbf, 1);
    const y = 176 - normalized * 108;
    return { ...item, x, y };
  });
  const linePath = chartPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${chartPoints[chartPoints.length - 1]?.x ?? 344} 200 L ${chartPoints[0]?.x ?? 24} 200 Z`;

  return (
    <div className="space-y-6 pb-10">
      <Card>
        <CardContent className="grid gap-6 p-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-3">
            <div className="eyebrow w-fit">Performance reporting</div>
            <h2 className="text-4xl font-semibold tracking-tight text-slate-950">Operational analytics that actually read like a live command review.</h2>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              This page now emphasizes believable trend views, departmental distribution, and management-ready summaries
              so the analytics section feels active instead of placeholder-driven.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] bg-slate-950 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-teal-200/80">Mean time between failures</p>
              <p className="mt-3 text-3xl font-semibold">142 days</p>
              <p className="mt-2 text-sm text-slate-300">Up 8.4% versus previous quarter</p>
            </div>
            <div className="rounded-[24px] bg-emerald-50 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-700/80">Maintenance completion rate</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">94%</p>
              <p className="mt-2 text-sm text-slate-600">Same-day closure improving in imaging</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Reliability trend</CardTitle>
            <CardDescription>MTBF and operational health trend across the last six reporting periods.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="rounded-[28px] border border-border/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(235,245,240,0.75))] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Trend direction</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">Steady reliability gain</p>
                </div>
                <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                  <LineChart className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-8 flex h-56 items-end gap-4">
                <div className="w-full rounded-[24px] border border-white/80 bg-white/80 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                  <svg viewBox="0 0 360 220" className="h-full w-full" aria-label="Reliability trend chart" role="img">
                    <defs>
                      <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.24" />
                        <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.02" />
                      </linearGradient>
                      <linearGradient id="trendLine" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#0f766e" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>

                    {[40, 80, 120, 160, 200].map((y) => (
                      <line key={y} x1="18" y1={y} x2="344" y2={y} stroke="rgba(148,163,184,0.18)" strokeDasharray="4 6" />
                    ))}

                    <path d={areaPath} fill="url(#trendArea)" />
                    <path d={linePath} fill="none" stroke="url(#trendLine)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

                    {chartPoints.map((point) => (
                      <g key={point.month}>
                        <circle cx={point.x} cy={point.y} r="7" fill="#f8fafc" stroke="#0f766e" strokeWidth="4" />
                        <text x={point.x} y="214" textAnchor="middle" className="fill-slate-500 text-[10px] font-semibold tracking-[0.18em] uppercase">
                          {point.month}
                        </text>
                        <text x={point.x} y={point.y - 14} textAnchor="middle" className="fill-slate-900 text-[11px] font-semibold">
                          {point.mtbf}d
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {reliabilityTrend.slice(-3).map((item) => (
                  <div key={item.month} className="rounded-[18px] border border-white/80 bg-white/80 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.month}</p>
                    <p className="mt-2 text-lg font-semibold text-slate-950">Health {item.score}</p>
                    <p className="text-sm text-slate-600">MTBF {item.mtbf} days</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department distribution</CardTitle>
            <CardDescription>Installed base spread by service area with relative maintenance pressure.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 p-6">
            <div className="rounded-[28px] border border-border/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(235,245,240,0.72))] p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-center rounded-[26px] bg-white/80 p-6">
                  <div className="relative h-44 w-44 rounded-full bg-[conic-gradient(#0f766e_0_34%,#10b981_34%_60%,#06b6d4_60%_78%,#94a3b8_78%_100%)] shadow-[0_24px_40px_rgba(15,118,110,0.12)]">
                    <div className="absolute inset-[24%] rounded-full bg-[#f7fbf8] shadow-[inset_0_0_0_1px_rgba(203,213,225,0.35)]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <PieChart className="h-8 w-8 text-slate-700" />
                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">4 departments</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {departmentBreakdown.map((item) => (
                    <div key={item.name} className="rounded-[20px] border border-white/80 bg-white/80 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`h-3.5 w-3.5 rounded-full ${item.tone}`} />
                          <span className="text-sm font-semibold text-slate-950">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{item.share}%</span>
                      </div>
                      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200/80">
                        <div className={`h-full rounded-full ${item.tone}`} style={{ width: `${item.share}%` }} />
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        <span>{item.assets} assets</span>
                        <span>{item.incidents} incidents</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {categoryPerformance.map((item) => (
          <Card key={item.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-2xl bg-teal-50 p-3 text-primary">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${item.direction === "up" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                  {item.direction === "up" ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {item.direction === "up" ? "Improving" : "Needs review"}
                </div>
              </div>
              <p className="mt-5 text-xl font-semibold tracking-tight text-slate-950">{item.label}</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{item.uptime}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.workOrders} open or recent work orders in this category.</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Executive takeaways</CardTitle>
          <CardDescription>Short narrative points a hospital leader could actually read in a review meeting.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-3">
          {executiveNotes.map((note, index) => (
            <div key={note} className="rounded-[22px] border border-border/80 bg-white/70 px-5 py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-primary">
                0{index + 1}
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-700">{note}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        {[
          {
            title: "Alert trend",
            icon: Activity,
            text: "Critical alerts are trending lower week over week after preventive work execution.",
          },
          {
            title: "Service productivity",
            icon: BarChart3,
            text: "Completion throughput remains strong, with same-day handling improving in imaging.",
          },
          {
            title: "Reliability posture",
            icon: Activity,
            text: "Most departments remain within target, while radiology continues to warrant closer watch.",
          },
        ].map((item) => (
          <Card key={item.title}>
            <CardContent className="p-6">
              <div className="w-fit rounded-2xl bg-teal-50 p-3 text-primary">
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
