import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Filter, MoreHorizontal } from "lucide-react";

const equipmentData = [
  { id: "EQ-1001", name: "MRI System", model: "Signa Creator", dept: "Radiology", health: 92, status: "Active" },
  { id: "EQ-1002", name: "Ventilator", model: "Puritan Bennett", dept: "ICU", health: 48, status: "Under Repair" },
  { id: "EQ-1003", name: "CT Scanner", model: "Revolution Maxima", dept: "Radiology", health: 76, status: "Active" },
  { id: "EQ-1004", name: "X-Ray Machine", model: "Optima XR240", dept: "Outpatient", health: 85, status: "Maintenance Due" },
  { id: "EQ-1005", name: "Infusion Pump", model: "Alaris System", dept: "General Ward", health: 32, status: "Critical" },
];

export default function EquipmentPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Equipment Registry</h1>
          <p className="text-muted-foreground">Manage and track your medical assets and their health status.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, serial number or asset tag..."
            className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className="border-b border-border bg-muted/30 text-xs font-semibold uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Equipment</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Health Score</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {equipmentData.map((item) => (
                <tr key={item.id} className="group hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.id} • {item.model}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{item.dept}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-24 rounded-full bg-secondary overflow-hidden">
                        <div 
                          className={cn("h-full", 
                            item.health > 80 ? "bg-emerald-500" : 
                            item.health > 50 ? "bg-amber-500" : "bg-destructive"
                          )} 
                          style={{ width: `${item.health}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{item.health}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      item.status === "Active" ? "success" : 
                      item.status === "Critical" ? "destructive" : "warning"
                    }>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(" ");
}
