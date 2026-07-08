import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { AIBadge } from "@/components/mobile/AIBadge";
import { Sparkles, Terminal, Code, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/home/ai-recommend")({ component: RecommendationPage });

function RecommendationPage() {
  const recommendations = [
    {
      title: "Optimized Loop Execution",
      category: "Performance",
      detail: "Avoid array re-allocation inside heavy loops. Prefer static arrays or direct maps.",
      score: "Speed +25%"
    },
    {
      title: "Secure Env Injection",
      category: "Security",
      detail: "Detecting plain text database credentials. Migrate to runtime environment variables.",
      score: "Severity: HIGH"
    },
    {
      title: "Clean React Hooks Usage",
      category: "Syntax",
      detail: "Include missing callback variables inside your useEffect dependency arguments list.",
      score: "Recommended"
    }
  ];

  return (
    <Screen title="AI Advice Suggestions" bottomNav>
      <div className="px-5 py-4 space-y-4">
        <div className="bg-gradient-soft p-5 rounded-2xl border border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-bold text-foreground">Sprint Advice</h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Based on your recent git commits, Aura AI recommends focusing on async error handling and optimizing database query executions today.
          </p>
        </div>

        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <Card key={idx} variant="elevated">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{rec.category}</span>
                <span className="text-[10px] font-semibold text-muted-foreground px-2 py-0.5 bg-muted rounded-full">{rec.score}</span>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1">{rec.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{rec.detail}</p>
              <div className="flex items-center gap-1.5 text-xs text-primary font-bold">
                <span>View Suggestion Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Screen>
  );
}
