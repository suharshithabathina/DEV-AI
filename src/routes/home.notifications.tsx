import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { Bell, Sparkles, MessageSquare, Terminal } from "lucide-react";

export const Route = createFileRoute("/home/notifications")({ component: NotificationsPage });

function NotificationsPage() {
  const alerts = [
    {
      title: "Optimized Code Results Ready",
      detail: "Your uploaded main server function has been analyzed.",
      icon: Terminal,
      time: "2h ago"
    },
    {
      title: "Mock Interview Review Due",
      detail: "Check out suggestions from your last practice round.",
      icon: MessageSquare,
      time: "1d ago"
    },
    {
      title: "Daily Target Milestone Met",
      detail: "You solved 3 intermediate binary search trees puzzles!",
      icon: Sparkles,
      time: "2d ago"
    }
  ];

  return (
    <Screen title="Notifications">
      <div className="px-5 py-4 space-y-3">
        {alerts.map((alert, idx) => {
          const Icon = alert.icon;
          return (
            <Card key={idx} variant="elevated" className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h3 className="text-xs font-bold text-foreground truncate">{alert.title}</h3>
                  <span className="text-[9px] text-muted-foreground shrink-0">{alert.time}</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{alert.detail}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </Screen>
  );
}
