import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { Code, BookOpen, Clock, CheckCircle } from "lucide-react";
import { GradientButton } from "@/components/mobile/GradientButton";

export const Route = createFileRoute("/home/daily-learning")({ component: DailyLearningPage });

function DailyLearningPage() {
  const lessons = [
    { title: "Binary Search Trees", level: "Intermediate", duration: "15 min", completed: true },
    { title: "Managing Async Locks", level: "Advanced", duration: "25 min", completed: false },
    { title: "CORS Setup Standards", level: "Beginner", duration: "10 min", completed: false }
  ];

  return (
    <Screen title="Daily Learning" bottomNav>
      <div className="px-5 py-4 space-y-5">
        <div className="p-5 bg-card border border-border/10 rounded-2xl shadow-soft">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Today's Milestone</h2>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Algorithmic Complexity</p>
              <p className="text-xs text-muted-foreground">Complete lessons on Big O notation</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {lessons.map((lesson, idx) => (
            <Card key={idx} variant="elevated" className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary-soft rounded-full">{lesson.level}</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {lesson.duration}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-foreground truncate">{lesson.title}</h3>
              </div>
              <div>
                {lesson.completed ? (
                  <CheckCircle className="h-6 w-6 text-success fill-success/10" />
                ) : (
                  <button className="text-xs font-bold text-primary px-3.5 py-1.5 bg-muted rounded-xl cursor-pointer">
                    Start
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="pt-2">
          <GradientButton>View Skill Assessment</GradientButton>
        </div>
      </div>
    </Screen>
  );
}
