import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  fullWidth?: boolean;
}

export function GradientButton({
  children,
  variant = "primary",
  fullWidth = true,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle = "h-12 px-6 rounded-2xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-gradient-primary text-white shadow-float shadow-primary/10 hover:brightness-105",
    secondary: "bg-secondary text-white shadow-soft hover:brightness-105",
    outline: "bg-transparent border border-border text-foreground hover:bg-muted/30",
    ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20",
    destructive: "bg-destructive text-white hover:bg-destructive/90 shadow-soft shadow-destructive/10"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? "w-full" : "w-auto"} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
