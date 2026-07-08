import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useEffect, useState } from "react";
import { Sparkles, CheckCircle2, AlertTriangle, ArrowLeft, Terminal } from "lucide-react";

export const Route = createFileRoute("/optimize/result")({ component: ResultPage });

function ResultPage() {
  const navigate = useNavigate();
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("optimization_report");
    if (saved) {
      try {
        setReport(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  if (!report) {
    return (
      <Screen title="Analyzing Code">
        <div className="flex h-64 flex-col items-center justify-center gap-2">
          <p className="text-xs text-muted-foreground">Loading code review report details...</p>
        </div>
      </Screen>
    );
  }

  return (
    <Screen title="Optimizer Report">
      <div className="px-5 py-4 space-y-4">
        {/* Visual score display */}
        <div className="bg-card border border-border/10 p-5 rounded-2xl shadow-soft text-center select-none">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Overall Health Score</p>
          <div className="text-3xl font-black text-primary mt-1.5 mb-2">{report.score} / 100</div>
          <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
            <div className="bg-gradient-primary h-full rounded-full" style={{ width: `${report.score}%` }} />
          </div>
        </div>

        {/* Detailed warnings or bug listings */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">Bugs & Risks Found</h3>
          {report.bugs && report.bugs.map((bug: any, idx: number) => (
            <Card key={idx} variant="elevated" className="flex items-start gap-3">
              <AlertTriangle className={`h-5 w-5 shrink-0 ${bug.severity === 'HIGH' ? 'text-destructive' : 'text-warning'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-xs font-bold text-foreground truncate">{bug.title}</h4>
                  <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    bug.severity === 'HIGH' ? 'bg-destructive/10 text-destructive' : 'bg-warning/10 text-warning'
                  }`}>{bug.severity}</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{bug.description}</p>
              </div>
            </Card>
          ))}
          {(!report.bugs || report.bugs.length === 0) && (
            <div className="text-center py-6 border border-dashed border-muted rounded-2xl">
              <CheckCircle2 className="h-6 w-6 text-success mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Excellent! No bugs or syntax issues detected.</p>
            </div>
          )}
        </div>

        {/* Optimized Code Snippet output */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">Refactored Clean Code</h3>
          <div className="rounded-2xl bg-card border border-border/10 overflow-hidden flex flex-col shadow-soft">
            <div className="bg-muted/30 px-4 py-2 border-b border-border/10 flex items-center justify-between text-[10px] font-bold text-muted-foreground select-none">
              <span className="flex items-center gap-1.5">
                <Terminal className="h-3 w-3 text-primary" /> refactored.ts
              </span>
              <span className="text-primary uppercase tracking-widest font-black">AI Refactored</span>
            </div>
            <pre className="p-4 text-[10px] font-mono overflow-x-auto leading-relaxed whitespace-pre bg-transparent text-foreground">
              <code>{report.refactored}</code>
            </pre>
          </div>
        </div>

        <div className="pt-2 flex gap-3">
          <GradientButton variant="outline" fullWidth onClick={() => navigate({ to: "/optimize" })}>
            Review New File
          </GradientButton>
          <GradientButton fullWidth onClick={() => navigate({ to: "/optimize/compare" })}>
            Compare Diff
          </GradientButton>
        </div>
      </div>
    </Screen>
  );
}
