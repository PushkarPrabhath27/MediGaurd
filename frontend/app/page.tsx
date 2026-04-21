"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const operatingMetrics = [
  { label: "equipment monitored", value: "12.4k" },
  { label: "avoidable failures caught", value: "91%" },
  { label: "maintenance coordination time", value: "-37%" },
];

const capabilityCards = [
  {
    icon: BrainCircuit,
    title: "Predictive risk scoring",
    description:
      "Surface likely failures days earlier with model-backed risk windows and next-step recommendations.",
  },
  {
    icon: Activity,
    title: "Operational command center",
    description:
      "Track fleet health, service backlog, and clinical readiness from one executive-grade dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Clinical reliability posture",
    description:
      "Support uptime targets with auditable maintenance workflows built for regulated hospital environments.",
  },
];

const executionSteps = [
  "Connect hospital sites, departments, and inventory feeds.",
  "Continuously score equipment health and flag elevated risk.",
  "Route service actions before patient-facing disruption occurs.",
];

export default function Home() {
  return (
    <div className="subtle-grid min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 lg:px-10">
        <header className="glass flex items-center justify-between rounded-[32px] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-base font-bold text-white">
              M
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight text-slate-950">MediGuard</p>
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Medical Asset Intelligence
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <Link href="#capabilities" className="transition hover:text-foreground">
              Capabilities
            </Link>
            <Link href="#workflow" className="transition hover:text-foreground">
              Workflow
            </Link>
            <Link href="#outcomes" className="transition hover:text-foreground">
              Outcomes
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
              Sign in
            </Link>
            <Link href="/dashboard">
              <Button variant="premium" className="px-5">
                Open platform
              </Button>
            </Link>
          </div>
        </header>

        <main className="flex-1 py-10">
          <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="eyebrow"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Enterprise monitoring for hospital operations
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="space-y-5"
              >
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-slate-950 md:text-7xl">
                  Keep critical equipment available before downtime becomes clinical risk.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                  MediGuard brings predictive maintenance, equipment visibility, and service execution into
                  one polished operating layer for biomedical and facilities teams.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <Link href="/login">
                  <Button variant="premium" size="lg" className="w-full sm:w-auto">
                    Launch workspace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href="#capabilities">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Review capabilities
                  </Button>
                </a>
              </motion.div>

              <div className="flex flex-wrap gap-3">
                <span className="metric-chip">Predictive models</span>
                <span className="metric-chip">Maintenance orchestration</span>
                <span className="metric-chip">Executive analytics</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="premium-card overflow-hidden rounded-[36px] p-6"
            >
              <div className="rounded-[28px] bg-slate-950 p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-teal-200/70">Live command view</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight">North Campus</h2>
                  </div>
                  <div className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                    Stable operations
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {operatingMetrics.map((metric) => (
                    <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                      <p className="text-3xl font-semibold">{metric.value}</p>
                      <p className="mt-2 text-sm text-slate-300">{metric.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-200">MRI Scanner 4B</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                        Bearing anomaly detected
                      </p>
                    </div>
                    <div className="rounded-full bg-amber-300/15 px-3 py-1 text-xs font-semibold text-amber-200">
                      Inspection in 36h
                    </div>
                  </div>

                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-300" />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
                    <span>Service readiness 72%</span>
                    <span>Failure probability 18%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="capabilities" className="pt-16">
            <div className="mb-6 flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Core capabilities</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                  A more executive, usable frontend for the whole reliability workflow.
                </h2>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {capabilityCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + index * 0.08 }}
                >
                  <Card className="h-full">
                    <CardContent className="flex h-full flex-col gap-6 p-7">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-primary">
                        <card.icon className="h-6 w-6" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">{card.title}</h3>
                        <p className="text-sm leading-7 text-muted-foreground">{card.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="workflow" className="grid gap-6 pt-16 lg:grid-cols-[0.9fr_1.1fr]">
            <Card>
              <CardContent className="space-y-6 p-8">
                <div className="eyebrow w-fit">Operational workflow</div>
                <h3 className="text-3xl font-semibold tracking-tight text-slate-950">
                  Purpose-built for clinical engineering teams.
                </h3>
                <div className="space-y-4">
                  {executionSteps.map((step, index) => (
                    <div key={step} className="flex items-start gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-primary">
                        0{index + 1}
                      </div>
                      <p className="pt-1 text-sm leading-7 text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card id="outcomes" className="overflow-hidden">
              <CardContent className="grid gap-6 p-8 md:grid-cols-2">
                <div className="rounded-[24px] bg-emerald-50 p-6">
                  <Clock3 className="h-7 w-7 text-emerald-700" />
                  <p className="mt-6 text-4xl font-semibold tracking-tight text-slate-950">6.3 hrs</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    average response time improvement after prioritizing maintenance from predicted risk.
                  </p>
                </div>
                <div className="rounded-[24px] bg-slate-950 p-6 text-white">
                  <Stethoscope className="h-7 w-7 text-teal-200" />
                  <p className="mt-6 text-4xl font-semibold tracking-tight">24/7</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    visibility across equipment fleets, service backlogs, and readiness thresholds.
                  </p>
                </div>
                <div className="rounded-[24px] border border-border/80 bg-white p-6 md:col-span-2">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-teal-50 p-3 text-primary">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-950">
                        Designed to feel credible in front of hospital leadership.
                      </p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        The frontend now focuses on clarity, hierarchy, and real operational decision-making
                        instead of generic startup visuals.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
