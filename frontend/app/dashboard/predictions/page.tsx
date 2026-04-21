"use client";

import { AlertTriangle, ArrowUpRight, BrainCircuit, Gauge, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const predictions = [
  { asset: "X-Ray Tube", location: "Radiology 2", probability: "92%", eta: "48 hours", severity: "Critical" },
  { asset: "Infusion Pump Motor", location: "ICU West", probability: "68%", eta: "5 days", severity: "Watch" },
  { asset: "Ventilation Pump", location: "Surgery Recovery", probability: "51%", eta: "7 days", severity: "Monitor" },
];

export default function PredictionsPage() {
  return (
    <div className="space-y-6 pb-10">
      <Card>
        <CardContent className="grid gap-6 p-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-3">
            <div className="eyebrow w-fit">AI prioritization</div>
            <h2 className="text-4xl font-semibold tracking-tight text-slate-950">Prediction signals translated into maintenance action.</h2>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              Instead of generic ML language, this page focuses on which assets need attention, how soon, and what action is recommended.
            </p>
          </div>
          <div className="rounded-[28px] bg-slate-950 p-6 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-teal-200/80">Model status</p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-3xl font-semibold">MediMind v4.2</p>
                <p className="mt-2 text-sm text-slate-300">Continuously evaluating telemetry and service history.</p>
              </div>
              <BrainCircuit className="h-10 w-10 text-teal-200" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>High-risk assets</CardTitle>
            <CardDescription>Ranked by failure probability and expected time to impact.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {predictions.map((item) => (
              <div key={`${item.asset}-${item.location}`} className="rounded-[26px] border border-border/80 bg-white/70 p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex gap-4">
                    <div className="rounded-2xl bg-red-50 p-3 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-950">{item.asset}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
                      <p className="mt-3 text-sm text-slate-700">
                        Failure probability <span className="font-semibold">{item.probability}</span> with an estimated impact window of{" "}
                        <span className="font-semibold">{item.eta}</span>.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="border-none bg-red-50 px-3 py-1 text-red-700">{item.severity}</Badge>
                    <ArrowUpRight className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended actions</CardTitle>
            <CardDescription>Decision support suggestions that help teams act faster.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-[24px] bg-emerald-50 p-5">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-emerald-700" />
                <p className="font-semibold text-slate-950">Reduce duty cycle on Ventilation Pump #4</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Model forecast suggests a 14% life extension with lower load during non-peak periods.
              </p>
            </div>
            <div className="rounded-[24px] bg-secondary/80 p-5">
              <div className="flex items-center gap-3">
                <Gauge className="h-5 w-5 text-primary" />
                <p className="font-semibold text-slate-950">Escalate MRI cooling diagnostics</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Sustained thermal anomalies and maintenance history indicate increasing repeat-failure risk.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
