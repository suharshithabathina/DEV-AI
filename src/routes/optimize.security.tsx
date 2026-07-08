import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { ShieldCheck, ShieldAlert, Key } from "lucide-react";

export const Route = createFileRoute("/optimize/security")({ component: SecurityPage });

function SecurityPage() {
  const alerts = [
    { title: "Hardcoded API Keys", risk: "Plain credentials in main code block", severity: "CRITICAL", icon: Key }
  ];

  return (
    <Screen title="Security Scan">
      <div className="px-5 py-4 space-y-4">
        {/* Visual shield badge */}
        <div className="bg-card border border-border/10 p-5 rounded-2xl shadow-soft text-center select-none">
          <ShieldAlert className="h-10 w-10 text-destructive mx-auto mb-3" />
          <h2 className="text-base font-black text-foreground">1 Threat Located</h2>
          <p className="text-xs text-muted-foreground mt-1">Review credential variables configurations</p>
        </div>

        {/* Scan reports detailed listing */}
        <div className="space-y-3">
          {alerts.map((item, idx) => (
            <Card key={idx} variant="elevated" className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <item.icon className="h-4.5 w-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h3 className="text-xs font-bold text-foreground truncate">{item.title}</h3>
                  <span className="text-[8px] font-extrabold px-1.5 py-0.5 bg-destructive/10 text-destructive rounded-full">{item.severity}</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{item.risk}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Screen>
  );
}
