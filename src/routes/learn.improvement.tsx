import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { HelpCircle, ChevronRight, BookOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/learn/improvement")({ component: ImprovementPage });

function ImprovementPage() {
  const suggestions = [
    { title: "Browser CORS Headers configuration", desc: "Understand access parameters and headers configurations." },
    { title: "Managing Async Locks queues", desc: "Analyze blocking conditions benchmarks." }
  ];

  return (
    <Screen title="Suggested Study Topics">
      <div className="px-5 py-4 space-y-4 select-none">
        <div className="bg-card border border-border/10 p-5 rounded-2xl shadow-soft">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Based on your quiz performance, we suggest dedicating 15 minutes to review these key topics.
          </p>
        </div>

        <div className="space-y-3">
          {suggestions.map((item, idx) => (
            <Link key={idx} to="/learn/beginner" className="block">
              <Card variant="elevated" className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <BookOpen className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground">{item.title}</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight className="h-4.5 w-4.5 text-muted-foreground shrink-0" />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Screen>
  );
}
