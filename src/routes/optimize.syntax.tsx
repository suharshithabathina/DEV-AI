import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { CheckCircle2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/optimize/syntax")({ component: SyntaxPage });

function SyntaxPage() {
  const warnings = [
    { rule: "no-explicit-any", message: "Parameter 'items' has implicit 'any' format definitions.", line: "Line 2" },
    { rule: "curly-braces", message: "Missing braces around if statement logic block.", line: "Line 5" }
  ];

  return (
    <Screen title="Syntax Diagnostics">
      <div className="px-5 py-4 space-y-4">
        {/* Safe summary layout */}
        <div className="bg-card border border-border/10 p-5 rounded-2xl shadow-soft flex items-center gap-3 select-none">
          <CheckCircle2 className="h-6 w-6 text-success shrink-0" />
          <div>
            <h2 className="text-xs font-bold text-foreground">Standard Style Score</h2>
            <p className="text-[10px] text-muted-foreground">ESLint rules check matching parameters</p>
          </div>
        </div>

        {/* Warning listings */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Style Violations</h3>
          {warnings.map((warn, idx) => (
            <Card key={idx} variant="elevated" className="flex items-start gap-3">
              <AlertCircle className="h-4.5 w-4.5 text-warning shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center gap-2 mb-0.5">
                  <span className="text-[9px] font-bold text-primary font-mono">{warn.rule}</span>
                  <span className="text-[8px] text-muted-foreground">{warn.line}</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{warn.message}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Screen>
  );
}
