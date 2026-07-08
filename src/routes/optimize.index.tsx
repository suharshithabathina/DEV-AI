import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useState } from "react";
import { toast } from "sonner";
import { getApiUrl } from "@/utils/api";
import { Cpu, Terminal, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/optimize/")({ component: OptimizeIndexPage });

function OptimizeIndexPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error("Please enter a block of source code to analyze");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(getApiUrl("/api/ai/optimize"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error("Optimization report request failed");
      }

      const report = await response.json();
      localStorage.setItem("pending_code", code);
      localStorage.setItem("optimization_report", JSON.stringify(report));
      toast.success("Code optimization completed!");
      navigate({ to: "/optimize/result" });
    } catch (err) {
      console.error(err);
      toast.error("Code review failed, using mock data...");
      
      const fallbackReport = {
        score: 74,
        metrics: {
          syntax: "Clean (No warnings)",
          performance: "Moderate execution speed",
          security: "Found unhandled promise rejection concerns"
        },
        bugs: [
          { title: "Unhandled Promise Rejection", description: "Direct async call inside loop lacks proper catch boundaries.", severity: "HIGH" }
        ],
        refactored: `// Optimized version\nexport async function processArray(arr: any[]) {\n  return Promise.all(\n    arr.map(async (item) => {\n      try {\n        return await processItem(item);\n      } catch (err) {\n        console.error(err);\n        return null;\n      }\n    })\n  );\n}`
      };
      localStorage.setItem("pending_code", code);
      localStorage.setItem("optimization_report", JSON.stringify(fallbackReport));
      navigate({ to: "/optimize/result" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen title="AI Code Reviewer" bottomNav noHeader>
      <div className="px-5 pt-4 pb-6 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Cpu className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Workspace Optimizer</p>
                <h1 className="text-base font-black text-foreground">Code Reviewer</h1>
              </div>
            </div>
          </div>

          <div className="bg-gradient-soft p-4 border border-primary/10 rounded-2xl">
            <p className="text-xs text-muted-foreground leading-relaxed flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-primary shrink-0" />
              <span>Paste your unoptimized or buggy function below to execute syntax validation and performance refactoring.</span>
            </p>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-4 flex-1 flex flex-col">
            <div className="flex-1 min-h-[220px] rounded-2xl bg-card border border-border/10 shadow-soft overflow-hidden flex flex-col">
              <div className="bg-muted/30 px-4 py-2 border-b border-border/10 flex items-center justify-between text-[10px] font-bold text-muted-foreground select-none">
                <span className="flex items-center gap-1.5">
                  <Terminal className="h-3 w-3" /> main.ts
                </span>
                <span>TypeScript</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Enter buggy or unoptimized code here...&#10;export async function processItems(items) {&#10;  for (let item of items) {&#10;    await execute(item);&#10;  }&#10;}"
                className="flex-1 w-full p-4 text-[11px] font-mono outline-none resize-none bg-transparent text-foreground"
                disabled={loading}
              />
            </div>

            <div className="pt-2">
              <GradientButton type="submit" disabled={loading || !code.trim()}>
                {loading ? "Analyzing..." : "Review Code"}
              </GradientButton>
            </div>
          </form>
        </div>

        {/* Feature links list */}
        <div className="mt-6 grid grid-cols-2 gap-3 select-none font-sans">
          <ActionLink to="/optimize/syntax" title="Syntax check" sub="Standard code styling" />
          <ActionLink to="/optimize/security" title="Security scan" sub="Key leaks & imports" />
          <ActionLink to="/optimize/compare" title="Diff comparison" sub="Before vs after" />
          <ActionLink to="/optimize/debug" title="Chat debugger" sub="Direct logic trace" />
        </div>
      </div>
    </Screen>
  );
}

function ActionLink({ to, title, sub }: { to: string; title: string; sub: string }) {
  return (
    <Link to={to} className="p-3.5 bg-card border border-border/10 rounded-xl hover:shadow-soft transition active:scale-[0.98]">
      <p className="text-xs font-bold text-foreground leading-tight">{title}</p>
      <p className="text-[9px] text-muted-foreground mt-0.5">{sub}</p>
    </Link>
  );
}
