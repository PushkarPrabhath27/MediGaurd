import Link from "next/link";
import { 
  LayoutDashboard, 
  Database, 
  Wrench, 
  AlertCircle, 
  BarChart3, 
  Settings,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Equipment", href: "/dashboard/equipment", icon: Database },
  { name: "Work Orders", href: "/dashboard/work-orders", icon: Wrench },
  { name: "Alerts", href: "/dashboard/alerts", icon: AlertCircle },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-muted/30">
      <div className="flex h-16 items-center px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold tracking-tight">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span>MediGuard</span>
        </Link>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              "text-muted-foreground"
            )}
          >
            <item.icon className="mr-3 h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <Link
          href="/dashboard/settings"
          className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <Settings className="mr-3 h-4 w-4" />
          Settings
        </Link>
      </div>
    </div>
  );
}
