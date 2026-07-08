import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "elevated" | "flat" | "glass" | "outline";
}

export function Card({ children, onClick, className = "", variant = "elevated" }: CardProps) {
  const base = "p-5 rounded-2xl transition duration-200";
  
  const variants = {
    elevated: "bg-card text-card-foreground shadow-card border border-border/10",
    flat: "bg-muted/40 text-foreground border border-transparent",
    glass: "bg-card/75 backdrop-blur-md text-foreground shadow-soft border border-border/30",
    outline: "bg-transparent border border-border text-foreground"
  };

  const clickable = onClick ? "cursor-pointer hover:translate-y-[-2px] active:scale-[0.99] hover:shadow-soft" : "";

  return (
    <div
      onClick={onClick}
      className={`${base} ${variants[variant]} ${clickable} ${className}`}
    >
      {children}
    </div>
  );
}
