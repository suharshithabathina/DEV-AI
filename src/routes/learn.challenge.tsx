import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useState } from "react";
import { toast } from "sonner";
import { Terminal, Code, Cpu } from "lucide-react";

export const Route = createFileRoute("/learn/challenge")({ component: ChallengePage });

function ChallengePage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("All test cases passed! Scored +50 points.");
      navigate({ to: "/learn/badge" });
    }, 1000);
  };

  return (
    <Screen title="Sandbox Challenge">
      <div className="px-5 py-4 flex-1 flex flex-col justify-between h-[calc(100vh-120px)]">
        <div className="space-y-4">
          <div className="bg-gradient-soft p-4 border border-primary/10 rounded-2xl select-none">
            <h2 className="text-xs font-bold text-foreground">Write Binary Search</h2>
            <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
              Complete the function to search sorted numbers array in O(log n) time.
            </p>
          </div>

          <form onSubmit={handleTest} className="flex-1 flex flex-col space-y-4">
            <div className="flex-1 min-h-[220px] rounded-2xl bg-card border border-border/10 overflow-hidden flex flex-col shadow-soft">
              <div className="bg-muted/30 px-4 py-2 border-b border-border/10 flex items-center justify-between text-[10px] font-bold text-muted-foreground select-none">
                <span className="flex items-center gap-1.5">
                  <Terminal className="h-3 w-3" /> search.ts
                </span>
                <span>TypeScript</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="export function search(arr: number[], target: number): number {&#10;  // Write binary search algorithm logic here...&#10;}"
                className="flex-1 w-full p-4 text-[10px] font-mono outline-none resize-none bg-transparent text-foreground leading-relaxed"
                disabled={loading}
              />
            </div>

            <div className="pt-2 select-none">
              <GradientButton type="submit" disabled={loading || !code.trim()}>
                {loading ? "Running tests..." : "Run Test Cases"}
              </GradientButton>
            </div>
          </form>
        </div>
      </div>
    </Screen>
  );
}
