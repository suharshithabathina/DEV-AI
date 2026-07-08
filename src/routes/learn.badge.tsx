import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { Award, Star } from "lucide-react";

export const Route = createFileRoute("/learn/badge")({ component: BadgePage });

function BadgePage() {
  const badges = [
    { title: "CORS Master", date: "Jul 2026", desc: "Completed beginner network rules track" },
    { title: "Binary Explorer", date: "Jul 2026", desc: "Solved 3 intermediate binary search challenges" }
  ];

  return (
    <Screen title="Achieved Badges">
      <div className="px-5 py-4 space-y-4">
        {/* Core highlight visual */}
        <div className="bg-gradient-soft border border-primary/10 p-5 rounded-2xl text-center select-none">
          <Award className="h-10 w-10 text-primary mx-auto mb-2 animate-bounce" />
          <h2 className="text-sm font-bold text-foreground">Coding Certifications</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Collect points by completing challenges</p>
        </div>

        <div className="space-y-3">
          {badges.map((badge, idx) => (
            <Card key={idx} variant="elevated" className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Star className="h-5 w-5 fill-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center gap-2 mb-0.5">
                  <h3 className="text-xs font-bold text-foreground truncate">{badge.title}</h3>
                  <span className="text-[9px] text-muted-foreground">{badge.date}</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{badge.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Screen>
  );
}
