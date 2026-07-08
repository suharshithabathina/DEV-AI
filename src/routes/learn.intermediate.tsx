import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { CheckCircle2, Play, FileText } from "lucide-react";

export const Route = createFileRoute("/learn/intermediate")({ component: IntermediateTrackPage });

function IntermediateTrackPage() {
  const topics = [
    { title: "Binary Search Trees traversal", type: "read", done: true },
    { title: "Implementing Memory Safety parameters", type: "read", done: false },
    { title: "Typing Declarations and Interfaces", type: "video", done: false }
  ];

  return (
    <Screen title="Intermediate Track">
      <div className="px-5 py-4 space-y-4">
        {topics.map((topic, idx) => (
          <Card key={idx} variant="elevated" className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-foreground">
                <FileText className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-foreground leading-tight">{topic.title}</h3>
                <p className="text-[9px] text-muted-foreground uppercase mt-0.5">{topic.type} lesson</p>
              </div>
            </div>
            {topic.done ? (
              <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
            ) : (
              <button className="text-[10px] font-bold text-primary px-3 py-1 bg-muted rounded-lg cursor-pointer">
                Start
              </button>
            )}
          </Card>
        ))}
      </div>
    </Screen>
  );
}
