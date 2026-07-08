import { ReactNode } from "react";

// StatChip.tsx
interface StatChipProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: string;
  trendType?: "up" | "down" | "neutral";
}

export function StatChip({ label, value, icon, trend, trendType = "neutral" }: StatChipProps) {
  const trendColors = {
    up: "text-success bg-success/10",
    down: "text-destructive bg-destructive/10",
    neutral: "text-muted-foreground bg-muted"
  };

  return (
    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/45 border border-border/10">
      {icon && (
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-card text-primary shadow-[var(--shadow-soft)]">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground truncate">{label}</p>
        <p className="text-sm font-extrabold text-foreground truncate">{value}</p>
      </div>
      {trend && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${trendColors[trendType]}`}>
          {trend}
        </span>
      )}
    </div>
  );
}
