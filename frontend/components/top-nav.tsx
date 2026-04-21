import { Bell, Search, User } from "lucide-react";

export function TopNav() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-8">
      <div className="flex flex-1 items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search equipment, work orders..."
            className="h-9 w-full rounded-md border border-input bg-muted/50 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 hover:bg-accent">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </button>
        
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
          <User className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
