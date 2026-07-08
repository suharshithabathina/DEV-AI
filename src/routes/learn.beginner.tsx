import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { CheckCircle2, Video, FileText } from "lucide-react";

export const Route = createFileRoute("/learn/beginner")({ component: BeginnerTrackPage });

function BeginnerTrackPage() {
  const topics = [
    { title: "Standard Code Syntax Guidelines", type: "read", done: true },
    { title: "Understanding CORS Configurations", type: "video", done: true },
    { title: "Managing Variable Scopes", type: "read", done: true }
  ];

  return (
    <Screen title="Beginner Track">
      <div className="px-5 py-4 space-y-4">
        {topics.map((topic, idx) => (
          <Card key={idx} variant="elevated" className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {topic.type === "video" ? (
                <Link to="/learn/video" className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Video className="h-4.5 w-4.5" />
                </Link>
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-foreground">
                  <FileText className="h-4.5 w-4.5" />
                </div>
              )}
              <div>
                <h3 className="text-xs font-bold text-foreground leading-tight">{topic.title}</h3>
                <p className="text-[9px] text-muted-foreground uppercase mt-0.5">{topic.type} lesson</p>
              </div>
            </div>
            {topic.done && (
              <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
            )}
          </Card>
        ))}
      </div>
    </Screen>
  );
}
