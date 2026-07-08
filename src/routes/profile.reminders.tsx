import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useState } from "react";
import { toast } from "sonner";
import { BellRing, Coffee, Clock } from "lucide-react";

export const Route = createFileRoute("/profile/reminders")({ component: RemindersPage });

function RemindersPage() {
  const [reminders, setReminders] = useState([
    { title: "Algorithmic Lesson", time: "9:00 AM", enabled: true, icon: Clock },
    { title: "Sprint Coding Session", time: "2:00 PM", enabled: true, icon: Clock },
    { title: "Hourly Coffee Break Alert", time: "Every 1 hour", enabled: false, icon: Coffee }
  ]);

  const toggle = (idx: number) => {
    const updated = reminders.map((r, i) => i === idx ? { ...r, enabled: !r.enabled } : r);
    setReminders(updated);
    toast.success(updated[idx].enabled ? "Reminder activated" : "Reminder disabled");
  };

  return (
    <Screen title="Sprint Reminders">
      <div className="px-5 py-4 flex-1 flex flex-col justify-between h-[calc(100vh-120px)] select-none">
        <div className="space-y-4">
          <div className="bg-card border border-border/10 p-5 rounded-2xl shadow-soft flex items-center gap-3">
            <BellRing className="h-5 w-5 text-primary" />
            <div>
              <h2 className="text-xs font-bold text-foreground">Reminders & Alerts</h2>
              <p className="text-[10px] text-muted-foreground">Receive push notification coding alarms</p>
            </div>
          </div>

          <div className="space-y-3">
            {reminders.map((rem, idx) => {
              const Icon = rem.icon;
              return (
                <Card key={idx} variant="elevated" onClick={() => toggle(idx)} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-foreground leading-tight">{rem.title}</h3>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{rem.time}</p>
                    </div>
                  </div>
                  <div className={`h-6 w-11 rounded-full p-0.5 transition ${rem.enabled ? "bg-primary" : "bg-muted"}`}>
                    <div className={`h-5 w-5 rounded-full bg-white transition shadow-[var(--shadow-soft)] ${
                      rem.enabled ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="pt-4">
          <GradientButton onClick={() => toast.success("Schedules successfully saved")}>
            Save Reminder Configuration
          </GradientButton>
        </div>
      </div>
    </Screen>
  );
}
