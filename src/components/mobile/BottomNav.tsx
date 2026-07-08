import { Link, useLocation } from "@tanstack/react-router";
import { Terminal, Cpu, BookOpen, Briefcase, User } from "lucide-react";

const tabs = [
  { to: "/home", label: "DevHub", Icon: Terminal },
  { to: "/optimize", label: "Optimize", Icon: Cpu },
  { to: "/learn", label: "Learn", Icon: BookOpen },
  { to: "/career", label: "Career", Icon: Briefcase },
  { to: "/profile", label: "Profile", Icon: User },
] as const;

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between border-t border-border/40 bg-background/95 backdrop-blur-md px-4 py-2 sticky bottom-0 z-20 select-none pb-safe">
      {tabs.map(({ to, label, Icon }) => {
        const active = location.pathname === to || location.pathname.startsWith(to + "/");
        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center justify-center flex-1 py-1 gap-1 text-[10px] font-bold transition-colors ${
              active ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
