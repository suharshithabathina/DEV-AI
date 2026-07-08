import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { Terminal, Code, GitCommit } from "lucide-react";

export const Route = createFileRoute("/home/history")({ component: HistoryPage });

function HistoryPage() {
  const history = [
    { type: "commit", text: "refactor: optimize array allocations inside loop", time: "2h ago" },
    { type: "lesson", text: "Completed lesson on Managing Async Locks", time: "1d ago" },
    { type: "commit", text: "feat: add user parameter validations for auth flow", time: "2d ago" },
    { type: "lesson", text: "Completed lesson on Binary Search Trees", time: "3d ago" }
  ];

  return (
    <Screen title="Activity Log">
      <div className="px-5 py-4 space-y-3">
        {history.map((item, idx) => (
          <Card key={idx} variant="elevated" className="flex items-start gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
              {item.type === "commit" ? (
                <GitCommit className="h-4.5 w-4.5" />
              ) : (
                <Code className="h-4.5 w-4.5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="text-[9px] font-bold text-primary uppercase tracking-wider">{item.type}</span>
                <span className="text-[9px] text-muted-foreground">{item.time}</span>
              </div>
              <p className="text-xs font-bold text-foreground leading-tight">{item.text}</p>
            </div>
          </Card>
        ))}
      </div>
    </Screen>
  );
}
