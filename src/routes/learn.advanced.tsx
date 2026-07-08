import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { Lock, FileText } from "lucide-react";

export const Route = createFileRoute("/learn/advanced")({ component: AdvancedTrackPage });

function AdvancedTrackPage() {
  const topics = [
    { title: "Managing Async Locks", type: "read", locked: true },
    { title: "Optimizing Thread Wait Pools", type: "video", locked: true }
  ];

  return (
    <Screen title="Advanced Track">
      <div className="px-5 py-4 space-y-4">
        {topics.map((topic, idx) => (
          <Card key={idx} variant="elevated" className="flex items-center justify-between gap-4 opacity-75">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <FileText className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-muted-foreground leading-tight">{topic.title}</h3>
                <p className="text-[9px] text-muted-foreground uppercase mt-0.5">{topic.type} lesson</p>
              </div>
            </div>
            <Lock className="h-4.5 w-4.5 text-muted-foreground shrink-0" />
          </Card>
        ))}
      </div>
    </Screen>
  );
}
