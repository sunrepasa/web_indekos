

import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  trend?: number;
  trendLabel?: string;
  delay?: number;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = "var(--primary-light)",
  iconColor = "var(--primary)",
  trend,
  trendLabel,
  delay = 0,
}: StatCardProps) {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <div
      className="card animate-fade-in-up rounded-3xl p-5 flex flex-col gap-3 transition-all duration-300 cursor-default hover:-translate-y-[2px] hover:shadow-[var(--shadow-primary)] hover:border-[var(--primary-border)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon + Trend */}
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: iconBg }}
        >
          <Icon style={{ width: 20, height: 20, color: iconColor }} />
        </div>

        {trend !== undefined && (
          <div
            className="badge"
            style={{
              background: isPositive ? "var(--status-terisi-bg)" : "var(--status-maintenance-bg)",
              color: isPositive ? "var(--status-terisi)" : "var(--status-maintenance)",
              border: `1px solid ${isPositive ? "var(--status-terisi-border)" : "var(--status-maintenance-border)"}`,
            }}
          >
            <span>{isPositive ? "▲" : "▼"}</span>
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      {/* Value + Label */}
      <div>
        <p className="text-2xl font-black" style={{ color: "var(--text-main)", lineHeight: 1.2 }}>
          {value}
        </p>
        <p className="text-sm font-semibold mt-1" style={{ color: "var(--text-sub)" }}>
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
