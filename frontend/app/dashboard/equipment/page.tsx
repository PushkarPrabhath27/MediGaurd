"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ClipboardList, Download, Search, Settings2, ShieldCheck, Upload, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type EquipmentItem = {
  id?: string;
  name?: string;
  model?: string;
  asset_tag?: string;
  department?: string;
  status?: string;
  latest_health_score?: number;
};

const demoEquipment: EquipmentItem[] = [
  {
    id: "eq-mri-4b",
    name: "MRI Scanner 4B",
    model: "Siemens Magnetom Sola",
    asset_tag: "RAD-MRI-004",
    department: "Radiology",
    status: "Critical",
    latest_health_score: 46,
  },
  {
    id: "eq-vent-90",
    name: "Ventilator V-90",
    model: "Philips Respironics V90",
    asset_tag: "ICU-VNT-012",
    department: "Intensive Care",
    status: "Maintenance",
    latest_health_score: 68,
  },
  {
    id: "eq-us-22",
    name: "Ultrasound Suite 2",
    model: "GE Venue Fit",
    asset_tag: "RAD-US-022",
    department: "Radiology",
    status: "Operational",
    latest_health_score: 91,
  },
  {
    id: "eq-inf-31",
    name: "Infusion Pump Cluster A",
    model: "Baxter Sigma Spectrum",
    asset_tag: "WARD-INF-031",
    department: "General Wards",
    status: "Operational",
    latest_health_score: 87,
  },
];

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [query, setQuery] = useState("");
  const { token, tenantSlug, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    if (!token || !tenantSlug) return;

    const fetchEquipment = async () => {
      setIsFetching(true);
      try {
        const data = await apiRequest<EquipmentItem[]>("/equipment", {
          token,
          tenantSlug,
        });
        setEquipment(data);
      } catch (err) {
        console.error("Failed to fetch equipment", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchEquipment();
  }, [token, tenantSlug]);

  const filteredEquipment = useMemo(() => {
    const source = equipment.length > 0 ? equipment : demoEquipment;
    const search = query.trim().toLowerCase();
    if (!search) return source;
    return source.filter((item) =>
      [item.name, item.model, item.asset_tag, item.department, item.status]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search))
    );
  }, [equipment, query]);

  const inventorySummary = useMemo(() => {
    const source = equipment.length > 0 ? equipment : demoEquipment;
    const critical = source.filter((item) => item.status === "Critical").length;
    const maintenance = source.filter((item) => item.status === "Maintenance").length;
    const healthy = source.filter((item) => (item.latest_health_score ?? 0) >= 80).length;
    return {
      total: source.length,
      critical,
      maintenance,
      healthy,
      isDemo: equipment.length === 0,
    };
  }, [equipment]);

  return (
    <div className="space-y-6 pb-10">
      <Card>
        <CardContent className="flex flex-col gap-5 p-8 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-3">
            <div className="eyebrow w-fit">Inventory management</div>
            <h2 className="text-4xl font-semibold tracking-tight text-slate-950">Clinical equipment registry</h2>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              Review equipment health, deployment context, and service state from one clean table optimized for operations.
            </p>
            {inventorySummary.isDemo ? (
              <div className="flex w-fit items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800">
                <ShieldCheck className="h-4 w-4" />
                Demo records are shown until live inventory is available.
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="premium">Register device</Button>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
            {[
              { label: "Tracked assets", value: inventorySummary.total, tone: "bg-secondary/70 text-slate-950" },
              { label: "Critical assets", value: inventorySummary.critical, tone: "bg-red-50 text-red-700" },
              { label: "In service queue", value: inventorySummary.maintenance, tone: "bg-amber-50 text-amber-700" },
              { label: "Healthy assets", value: inventorySummary.healthy, tone: "bg-emerald-50 text-emerald-700" },
            ].map((item) => (
              <div key={item.label} className={`rounded-[24px] p-5 ${item.tone}`}>
                <p className="text-xs uppercase tracking-[0.2em] opacity-80">{item.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">{item.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-lg font-semibold text-slate-950">What you should do on this page</p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                  This screen is the starting point for onboarding hospital devices, checking health by department,
                  and deciding which assets need maintenance attention first.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: Upload,
                  title: "Import inventory",
                  text: "Bring in devices from an asset register or ERP export.",
                },
                {
                  icon: ClipboardList,
                  title: "Validate metadata",
                  text: "Confirm department, model, asset tag, and service interval.",
                },
                {
                  icon: Zap,
                  title: "Monitor health",
                  text: "Use scores and status to prioritize service work.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[22px] border border-border/80 bg-white/70 p-5">
                  <div className="w-fit rounded-2xl bg-teal-50 p-3 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-base font-semibold text-slate-950">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by asset name, tag, model, department, or status"
              className="pl-11"
            />
          </div>
          <Button variant="outline">
            <Settings2 className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-secondary/70">
                <tr className="text-left">
                  {["Asset", "Department", "Health", "Status", "Model"].map((heading) => (
                    <th key={heading} className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70">
                {isAuthLoading || isFetching ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td colSpan={5} className="px-6 py-6">
                        <div className="h-16 animate-pulse rounded-[20px] bg-secondary/70" />
                      </td>
                    </tr>
                  ))
                ) : filteredEquipment.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="mx-auto max-w-md space-y-4">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[24px] bg-secondary text-primary">
                          <Zap className="h-7 w-7" />
                        </div>
                        <div>
                          <p className="text-xl font-semibold text-slate-950">No equipment matched</p>
                          <p className="mt-2 text-sm leading-7 text-muted-foreground">
                            Try a different search term, or register a new device to expand your inventory coverage.
                          </p>
                        </div>
                        <Button variant="premium" className="mt-2">
                          Register first device
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEquipment.map((item, index) => {
                    const score = item.latest_health_score ?? 90;
                    return (
                      <motion.tr
                        key={item.id ?? `${item.name}-${index}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="bg-white/50"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-primary">
                              <Zap className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-950">{item.name}</p>
                              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                                {item.asset_tag || String(item.id || "").slice(0, 8) || "Unassigned"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-700">{item.department || "General"}</td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="h-2.5 w-28 overflow-hidden rounded-full bg-secondary">
                              <div
                                className={cn(
                                  "h-full rounded-full",
                                  score > 80 ? "bg-emerald-500" : score > 50 ? "bg-amber-500" : "bg-red-500"
                                )}
                                style={{ width: `${score}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-slate-950">{score}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <Badge
                            className={cn(
                              "border-none px-3 py-1",
                              item.status === "Critical"
                                ? "bg-red-50 text-red-700"
                                : item.status === "Maintenance"
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-emerald-50 text-emerald-700"
                            )}
                          >
                            {item.status || "Operational"}
                          </Badge>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-700">{item.model || "Unknown model"}</td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
