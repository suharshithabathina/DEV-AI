import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { useEffect, useState } from "react";
import { Terminal, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/optimize/compare")({ component: ComparePage });

function ComparePage() {
  const [original, setOriginal] = useState("");
  const [refactored, setRefactored] = useState("");

  useEffect(() => {
    const orig = localStorage.getItem("pending_code") || "";
    setOriginal(orig);

    const saved = localStorage.getItem("optimization_report");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.refactored) setRefactored(parsed.refactored);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <Screen title="Diff Comparison">
      <div className="px-5 py-4 space-y-4">
        {/* Original source snippet */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">Original Code</h3>
          <div className="rounded-xl bg-card border border-border/10 overflow-hidden text-[9px] font-mono leading-relaxed p-4 whitespace-pre overflow-x-auto text-destructive max-h-[160px]">
            {original || "// No code block parsed"}
          </div>
        </div>

        {/* Arrow trigger */}
        <div className="flex justify-center select-none py-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-primary">
            <ArrowRight className="h-4 w-4 rotate-90" />
          </div>
        </div>

        {/* Refactored source snippet */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">AI Optimized Code</h3>
          <div className="rounded-xl bg-card border border-border/10 overflow-hidden text-[9px] font-mono leading-relaxed p-4 whitespace-pre overflow-x-auto text-success max-h-[220px]">
            {refactored || "// No refactoring available"}
          </div>
        </div>
      </div>
    </Screen>
  );
}
