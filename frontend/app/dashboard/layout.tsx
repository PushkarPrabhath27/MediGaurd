import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="subtle-grid flex min-h-screen w-full">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-hidden px-4 py-4 lg:px-6">
        <TopNav />
        <main className="relative z-10 flex-1 overflow-y-auto px-1 py-6 lg:px-1">
          {children}
        </main>
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-64 w-64 rounded-full bg-emerald-400/10 blur-[110px]" />
      </div>
    </div>
  );
}
