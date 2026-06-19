import Sidebar from "@/components/sidebar/Sidebar";
import MobileNavbar from "@/components/sidebar/MobileNavbar";
import { Topbar } from "@/components/layout/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div 
      className="flex h-[100dvh] overflow-hidden p-0 lg:p-4 lg:pb-4 animate-fade-in"
      style={{ background: "var(--bg-muted)" }}
    >
      {/* ── MAIN APP WRAPPER ── */}
      <div 
        className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden relative shadow-sm lg:rounded-[var(--radius-xl)]"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        {/* Sidebar Container (Strict Width) */}
        <div 
          className="hidden lg:block w-[var(--sidebar-width)] flex-shrink-0"
          style={{ borderRight: "1px solid var(--border)" }}
        >
          <Sidebar />
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto relative pb-[76px] lg:pb-0">
          <Topbar />
          {children}
        </div>
      </div>
      
      <MobileNavbar />
    </div>
  );
}
