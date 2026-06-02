import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  trend?: number; // positive = up, negative = down
  trendLabel?: string;
  delay?: number;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = "#d1fae5",
  iconColor = "#10b981",
  trend,
  trendLabel,
  delay = 0,
}: StatCardProps) {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <div
      className="animate-fade-in-up rounded-3xl p-5 flex flex-col gap-3"
      style={{
        background: "var(--surface)",
        boxShadow: "var(--shadow-card)",
        animationDelay: `${delay}ms`,
        border: "1px solid transparent",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-primary)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLElement).style.border = "1px solid var(--primary-light)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.border = "1px solid transparent";
      }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: iconBg }}
        >
          <Icon style={{ width: 20, height: 20, color: iconColor }} />
        </div>

        {trend !== undefined && (
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{
              background: isPositive ? "#d1fae5" : "#fee2e2",
              color: isPositive ? "#059669" : "#dc2626",
            }}
          >
            <span>{isPositive ? "▲" : "▼"}</span>
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-2xl font-black" style={{ color: "var(--text-main)", lineHeight: 1.2 }}>
          {value}
        </p>
        <p className="text-sm font-semibold mt-1" style={{ color: "var(--text-main)" }}>
          {title}
        </p>
        {(subtitle || trendLabel) && (
          <p className="text-xs mt-0.5" style={{ color: "var(--text-xmuted)" }}>
            {trendLabel || subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
