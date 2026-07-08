import { Sparkles } from "lucide-react";

interface AIBadgeProps {
  text?: string;
  size?: "sm" | "md";
}

export function AIBadge({ text = "AI Powered", size = "md" }: AIBadgeProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[8px] gap-0.5" : "px-2.5 py-1 text-[9px] gap-1";
  
  return (
    <span className={`inline-flex items-center font-extrabold rounded-full bg-primary-soft text-accent-foreground border border-primary/20 select-none uppercase tracking-wider ${sizeClasses}`}>
      <Sparkles className={size === "sm" ? "h-2 w-2 text-primary" : "h-2.5 w-2.5 text-primary"} />
      <span>{text}</span>
    </span>
  );
}
