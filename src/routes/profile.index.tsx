import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { User, Settings, Goal, BellRing, LogOut, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/profile/")({ component: ProfileIndexPage });

function ProfileIndexPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("Developer");
  const [email, setEmail] = useState("dev@example.com");

  useEffect(() => {
    const savedName = localStorage.getItem('demo_name');
    const savedEmail = localStorage.getItem('demo_email');
    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('demo_email');
    localStorage.removeItem('demo_name');
    toast.success("Logged out successfully");
    navigate({ to: "/login" });
  };

  return (
    <Screen noHeader bottomNav bgClass="bg-muted" contentClass="pb-6">
      <div className="px-5 pt-3 space-y-5">
        {/* Profile Card Header */}
        <div className="flex items-center gap-4 bg-card border border-border/10 p-5 rounded-2xl shadow-soft">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white font-black text-sm">
            {name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-bold text-foreground truncate">{name}</h2>
            <p className="text-[10px] text-muted-foreground truncate">{email}</p>
          </div>
        </div>

        {/* Action triggers list */}
        <div className="space-y-3">
          <Link to="/profile/details" className="block">
            <Card variant="elevated" className="flex items-center justify-between p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <User className="h-4.5 w-4.5 text-primary" />
                <span className="text-xs font-bold text-foreground">Developer Details</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Card>
          </Link>

          <Link to="/profile/goals" className="block">
            <Card variant="elevated" className="flex items-center justify-between p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <Goal className="h-4.5 w-4.5 text-primary" />
                <span className="text-xs font-bold text-foreground">Target Sprint Goals</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Card>
          </Link>

          <Link to="/profile/reminders" className="block">
            <Card variant="elevated" className="flex items-center justify-between p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <BellRing className="h-4.5 w-4.5 text-primary" />
                <span className="text-xs font-bold text-foreground">Alarms & Reminders</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Card>
          </Link>

          <Link to="/profile/settings" className="block">
            <Card variant="elevated" className="flex items-center justify-between p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <Settings className="h-4.5 w-4.5 text-primary" />
                <span className="text-xs font-bold text-foreground">System Settings</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Card>
          </Link>
        </div>

        {/* Logout trigger */}
        <div className="pt-2 select-none">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 h-12 w-full bg-destructive/10 text-destructive rounded-2xl text-xs font-bold border border-transparent hover:bg-destructive/15 transition cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </Screen>
  );
}
