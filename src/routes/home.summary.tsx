import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { Award, Code, CheckCircle, Clock } from "lucide-react";

export const Route = createFileRoute("/home/summary")({ component: SummaryPage });

function SummaryPage() {
  return (
    <Screen title="Sprint Summary">
      <div className="px-5 py-4 space-y-4">
        {/* Core highlight card */}
        <div className="bg-gradient-primary p-6 rounded-2xl text-white shadow-float text-center">
          <Award className="h-10 w-10 mx-auto mb-3" />
          <h2 className="text-base font-black">Sprint Champion! 🏆</h2>
          <p className="text-xs text-white/90 mt-1 leading-relaxed">
            You completed 100% of your targeted weekly challenges and added 28 git commit integrations.
          </p>
        </div>

        {/* Milestone logs */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-card border border-border/10 rounded-2xl shadow-soft">
            <CheckCircle className="h-5 w-5 text-success shrink-0" />
            <div>
              <h3 className="text-xs font-bold text-foreground">Code CleanUp Completed</h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Refactored 4 high-risk unhandled promise rejections.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-card border border-border/10 rounded-2xl shadow-soft">
            <CheckCircle className="h-5 w-5 text-success shrink-0" />
            <div>
              <h3 className="text-xs font-bold text-foreground">Skills assessment done</h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Scored 94% on Advanced React Hook Structures.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-card border border-border/10 rounded-2xl shadow-soft">
            <Clock className="h-5 w-5 text-primary shrink-0" />
            <div>
              <h3 className="text-xs font-bold text-foreground">Mock Practice Review</h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                1 simulation mock interview session scheduled for tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}
