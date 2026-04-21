"use client";

import { CalendarDays, CheckCircle2, Clock3, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const workOrders = [
  { name: "Quarterly calibration", asset: "MRI Scanner 4B", date: "May 12, 2026", time: "09:00 AM", status: "Upcoming" },
  { name: "Battery replacement", asset: "Ventilator V-90", date: "May 12, 2026", time: "01:30 PM", status: "In progress" },
  { name: "Thermal inspection", asset: "CT Cooling Module", date: "May 13, 2026", time: "08:45 AM", status: "Scheduled" },
];

const summary = [
  { label: "In progress", value: "4", tone: "bg-amber-50 text-amber-700" },
  { label: "Completed this month", value: "28", tone: "bg-emerald-50 text-emerald-700" },
  { label: "Overdue", value: "2", tone: "bg-red-50 text-red-700" },
];

const workflowSteps = [
  "Review predicted failures and overdue preventive work.",
  "Assign engineers, confirm parts, and lock service windows.",
  "Close work with calibration proof and audit notes.",
];

export default function MaintenancePage() {
  return (
    <div className="space-y-6 pb-10">
      <Card>
        <CardContent className="grid gap-6 p-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <div className="eyebrow w-fit">Maintenance control</div>
            <h2 className="text-4xl font-semibold tracking-tight text-slate-950">Manage service operations without losing urgency.</h2>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              Prioritize work by operational impact, due date, and equipment risk so maintenance decisions stay aligned with clinical readiness.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {summary.map((item) => (
              <div key={item.label} className={`rounded-[24px] p-5 ${item.tone}`}>
                <p className="text-xs uppercase tracking-[0.2em] opacity-80">{item.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Current work queue</CardTitle>
            <CardDescription>Service tasks lined up for biomedical and field engineering teams.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {workOrders.map((item) => (
              <div key={`${item.name}-${item.asset}`} className="rounded-[26px] border border-border/80 bg-white/70 p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4">
                    <div className="rounded-2xl bg-teal-50 p-3 text-primary">
                      <Wrench className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-950">{item.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.asset}</p>
                      <div className="mt-3 flex flex-wrap gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock3 className="h-3.5 w-3.5" />
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className="w-fit border-none bg-secondary px-3 py-1 text-slate-700">{item.status}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Execution notes</CardTitle>
            <CardDescription>Checklist items helping teams close work orders cleanly.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "Verify calibration certificate upload before closing imaging work orders.",
              "Confirm parts availability for all next-day replacements.",
              "Escalate any repeated prediction-linked failures into a vendor review.",
            ].map((note) => (
              <div key={note} className="flex gap-4 rounded-[24px] border border-border/80 bg-white/70 p-5">
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-sm leading-7 text-slate-700">{note}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How this page is used</CardTitle>
          <CardDescription>Turn service demand into an actual operating workflow for the team.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <div key={step} className="rounded-[24px] border border-border/80 bg-white/70 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-primary">
                0{index + 1}
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-700">{step}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
