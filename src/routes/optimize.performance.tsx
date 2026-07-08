import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { Zap, Clock, Cpu } from "lucide-react";

export const Route = createFileRoute("/optimize/performance")({ component: PerformancePage });

function PerformancePage() {
  return (
    <Screen title="Performance Profile">
      <div className="px-5 py-4 space-y-4">
        {/* Core metrics overview card */}
        <div className="bg-card border border-border/10 p-5 rounded-2xl shadow-soft flex flex-col items-center text-center select-none">
          <Zap className="h-10 w-10 text-primary animate-pulse mb-3" />
          <h2 className="text-base font-black">Latency Improved by 45%</h2>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Parallelizing array processes yields lower API fetch wait queues.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-card border border-border/10 rounded-xl shadow-soft">
            <div className="flex items-center gap-3">
              <Clock className="h-4.5 w-4.5 text-primary" />
              <div>
                <p className="text-xs font-bold text-foreground">Execution Latency</p>
                <p className="text-[10px] text-muted-foreground">Original vs refactored duration</p>
              </div>
            </div>
            <span className="text-xs font-black text-foreground">1.4s &rarr; 0.2s</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-card border border-border/10 rounded-xl shadow-soft">
            <div className="flex items-center gap-3">
              <Cpu className="h-4.5 w-4.5 text-secondary" />
              <div>
                <p className="text-xs font-bold text-foreground">Memory Consumption</p>
                <p className="text-[10px] text-muted-foreground">GC allocation rate benchmarks</p>
              </div>
            </div>
            <span className="text-xs font-black text-foreground">12MB &rarr; 4MB</span>
          </div>
        </div>
      </div>
    </Screen>
  );
}
