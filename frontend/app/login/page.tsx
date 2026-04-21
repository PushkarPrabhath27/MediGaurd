"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, Loader2, LockKeyhole, Mail, ShieldCheck, Workflow } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type LoginResponse = {
  tokens: { access_token: string };
  user: {
    id: string;
    email: string;
    role: string;
    tenant_id: string;
  };
};

const assurancePoints = [
  "Tenant-aware access for each hospital group",
  "Operational dashboard for equipment, maintenance, and predictions",
  "Structured workflow for biomedical engineering teams",
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await apiRequest<LoginResponse>("/auth/login", {
        method: "POST",
        tenantSlug: slug,
        body: JSON.stringify({ email, password }),
      });
      login(data.tokens.access_token, data.user, slug);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid credentials or tenant slug");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="subtle-grid min-h-screen px-6 py-6 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="glass relative hidden overflow-hidden rounded-[36px] p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,118,110,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.86),rgba(240,246,243,0.96))]" />
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-base font-bold text-white">
                M
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight text-slate-950">MediGuard</p>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Clinical reliability</p>
              </div>
            </Link>

            <div className="mt-16 max-w-xl space-y-5">
              <p className="eyebrow w-fit">Secure workspace access</p>
              <h1 className="text-5xl font-semibold tracking-[-0.05em] text-slate-950">
                One professional control room for asset health and maintenance execution.
              </h1>
              <p className="text-lg leading-8 text-muted-foreground">
                Log in with your tenant slug to reach the operational dashboard for your hospital network.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid gap-4">
            {assurancePoints.map((point) => (
              <div key={point} className="flex items-start gap-4 rounded-[24px] border border-white/70 bg-white/70 p-5">
                <div className="rounded-2xl bg-teal-50 p-3 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <p className="text-sm leading-7 text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </section>

        <Card className="flex items-center justify-center rounded-[36px] p-2">
          <CardContent className="w-full max-w-md p-6 sm:p-8">
            <div className="mb-8 lg:hidden">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
                  M
                </div>
                <span className="text-lg font-semibold tracking-tight text-slate-950">MediGuard</span>
              </Link>
            </div>

            <div className="space-y-3">
              <p className="eyebrow w-fit">Sign in</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Access your hospital workspace</h2>
              <p className="text-sm leading-7 text-muted-foreground">
                Use the tenant slug and administrator credentials configured for your deployment.
              </p>
            </div>

            {error ? (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-start gap-3 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <span>{error}</span>
              </motion.div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Tenant slug
                </label>
                <div className="relative">
                  <Workflow className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="city-general"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="pl-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="admin@hospital.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11"
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="premium" className="mt-2 w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enter platform"}
                {!isLoading ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
              </Button>
            </form>

            <div className="mt-8 rounded-[24px] bg-secondary/70 p-4 text-sm leading-7 text-muted-foreground">
              Default path after sign-in: dashboard, equipment health, maintenance queue, predictions, and analytics.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
