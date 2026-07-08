import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { BarChart, TrendingUp, Calendar, Clock } from "lucide-react";

export const Route = createFileRoute("/home/insights")({ component: InsightsPage });

function InsightsPage() {
  return (
    <Screen title="Analytics Insights" bottomNav>
      <div className="px-5 py-4 space-y-4">
        {/* Analytics illustration banner */}
        <Card variant="flat" className="bg-gradient-soft border border-primary/5 flex flex-col items-center p-5 text-center">
          <img
            src="/assets/analytics.png"
            alt="Analytics"
            className="h-32 object-contain mb-3"
          />
          <h3 className="text-sm font-bold text-foreground">Weekly Commit Velocity</h3>
          <p className="text-xs text-muted-foreground mt-1">Your sprint velocity is 15% faster than last week!</p>
        </Card>

        {/* Detailed performance breakdowns */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-card border border-border/10 rounded-2xl shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <TrendingUp className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Sprint Completion Rate</p>
                <p className="text-[10px] text-muted-foreground">92% of target goals complete</p>
              </div>
            </div>
            <span className="text-xs font-black text-foreground">92%</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-card border border-border/10 rounded-2xl shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-soft text-secondary">
                <Clock className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Active Focus Duration</p>
                <p className="text-[10px] text-muted-foreground">Average block session</p>
              </div>
            </div>
            <span className="text-xs font-black text-foreground">42m</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-card border border-border/10 rounded-2xl shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Calendar className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Daily Commit Cadence</p>
                <p className="text-[10px] text-muted-foreground">Average checks solved</p>
              </div>
            </div>
            <span className="text-xs font-black text-foreground">4.5 / day</span>
          </div>
        </div>
      </div>
    </Screen>
  );
}
