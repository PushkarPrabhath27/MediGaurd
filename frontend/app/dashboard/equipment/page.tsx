"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Search, Settings2, Zap } from "lucide-react";
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
    const search = query.trim().toLowerCase();
    if (!search) return equipment;
    return equipment.filter((item) =>
      [item.name, item.model, item.asset_tag, item.department, item.status]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search))
    );
  }, [equipment, query]);

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
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="premium">Add equipment</Button>
          </div>
        </CardContent>
      </Card>

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
                            Try a different search term or add devices once the backend inventory feed is seeded.
                          </p>
                        </div>
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
