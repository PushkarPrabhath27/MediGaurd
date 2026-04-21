import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingDown, 
  TrendingUp 
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Overview</h1>
        <p className="text-muted-foreground">Real-time health monitoring and failure predictions across all departments.</p>
      </div>

      {/* KPI Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Assets" 
          value="1,284" 
          change="+12" 
          trend="up" 
          icon={Activity} 
        />
        <StatCard 
          title="Critical Health" 
          value="14" 
          change="-2" 
          trend="down" 
          icon={AlertTriangle} 
          variant="destructive"
        />
        <StatCard 
          title="Maintenance Due" 
          value="45" 
          change="+8" 
          trend="up" 
          icon={Clock} 
          variant="warning"
        />
        <StatCard 
          title="Uptime (SLA)" 
          value="99.8%" 
          change="+0.1%" 
          trend="up" 
          icon={CheckCircle2} 
          variant="success"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Critical Equipment Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">MRI Scanner - Unit 4B</p>
                    <p className="text-xs text-muted-foreground">Failure probability: 84% within 7 days</p>
                  </div>
                  <Badge variant="destructive">Critical</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div className="space-y-1">
                    <p className="text-sm">Preventive Maintenance completed for <span className="font-medium">Ventilator V-90</span></p>
                    <p className="text-xs text-muted-foreground">2 hours ago • Technician: Sarah Chen</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, trend, icon: Icon, variant = "default" }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn("h-4 w-4", 
          variant === "destructive" ? "text-destructive" : 
          variant === "warning" ? "text-warning" : 
          variant === "success" ? "text-emerald-500" : "text-muted-foreground"
        )} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="flex items-center pt-1 text-xs text-muted-foreground">
          {trend === "up" ? <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" /> : <TrendingDown className="mr-1 h-3 w-3 text-destructive" />}
          <span className={cn("mr-1 font-medium", trend === "up" ? "text-emerald-500" : "text-destructive")}>{change}</span>
          from last month
        </p>
      </CardContent>
    </Card>
  );
}

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(" ");
}
