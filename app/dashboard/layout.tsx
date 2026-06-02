import Sidebar from "@/components/sidebar/Sidebar";
import MobileNavbar from "@/components/sidebar/MobileNavbar";
import { Topbar } from "@/components/layout/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/50" style={{ background: "var(--bg)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen lg:ml-[280px] transition-all duration-300 pb-[72px] lg:pb-0">
        <Topbar />
        {children}
      </div>
      <MobileNavbar />
    </div>
  );
}
