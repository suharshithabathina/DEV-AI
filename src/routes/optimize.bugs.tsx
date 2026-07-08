import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { Bug, AlertCircle, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/optimize/bugs")({ component: BugsDetailsPage });

function BugsDetailsPage() {
  const issues = [
    { title: "Direct Async Execution", category: "Race Condition", desc: "Executing asynchronous promise requests sequentially inside a loops causes slow blocking behaviors. Replace with Promise.all execution wrappers.", severity: "HIGH" },
    { title: "Plain Database Secrets", category: "Credential Leak", desc: "Plaintext variables mapping credentials detected in variables config. Relocate targets to server env parameters.", severity: "CRITICAL" }
  ];

  return (
    <Screen title="Detected Bugs">
      <div className="px-5 py-4 space-y-4">
        {issues.map((issue, idx) => (
          <Card key={idx} variant="elevated" className="space-y-2">
            <div className="flex items-center justify-between border-b border-border/10 pb-2">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{issue.category}</span>
              <span className="text-[8px] font-extrabold px-2 py-0.5 bg-destructive/10 text-destructive rounded-full">{issue.severity}</span>
            </div>
            <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Bug className="h-4 w-4 text-destructive" /> {issue.title}
            </h3>
            <p className="text-[10px] text-muted-foreground leading-relaxed">{issue.desc}</p>
          </Card>
        ))}
      </div>
    </Screen>
  );
}
