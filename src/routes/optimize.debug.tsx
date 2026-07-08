import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useState } from "react";
import { Terminal, Send, Cpu, Bug } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/optimize/debug")({ component: DebuggerPage });

function DebuggerPage() {
  const [logs, setLogs] = useState<string[]>([
    "Initialize developer trace debug log...",
    "Syntax check completed. Found 0 warning outputs."
  ]);
  const [prompt, setPrompt] = useState("");

  const handleTrace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const query = prompt.trim();
    setPrompt("");

    setLogs((prev) => [...prev, `Trace Query: ${query}`]);
    
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "Tracing target parameters boundaries...",
        "No dynamic variables stack buffer overflows located. Variable definitions are healthy."
      ]);
      toast.success("Trace complete!");
    }, 800);
  };

  return (
    <Screen title="Interactive Debugger">
      <div className="px-5 py-4 flex-1 flex flex-col justify-between h-[calc(100vh-120px)]">
        <div className="space-y-4">
          <div className="rounded-2xl bg-card border border-border/10 p-4.5 shadow-soft flex items-center gap-3 select-none">
            <Bug className="h-5 w-5 text-primary" />
            <div>
              <h2 className="text-xs font-bold text-foreground">Active Variable Trace</h2>
              <p className="text-[10px] text-muted-foreground">Log parameter values through executions</p>
            </div>
          </div>

          {/* Trace outputs logger terminal */}
          <div className="rounded-2xl bg-slate-950 text-emerald-400 p-4 min-h-[220px] font-mono text-[9px] leading-relaxed shadow-lg overflow-y-auto space-y-1.5 select-text">
            {logs.map((log, idx) => (
              <div key={idx} className="whitespace-pre-wrap">
                <span className="text-slate-500 mr-2">&gt;</span> {log}
              </div>
            ))}
          </div>
        </div>

        {/* Input trace trigger */}
        <form onSubmit={handleTrace} className="flex gap-2 items-center bg-card border border-border p-1.5 rounded-2xl shadow-soft">
          <input
            type="text"
            placeholder="Trace parameter variable (e.g. userId)..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 bg-transparent px-3 py-2 text-xs outline-none text-foreground"
          />
          <button type="submit" className="h-9 w-9 flex items-center justify-center bg-primary text-white rounded-xl hover:brightness-105 transition cursor-pointer">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </Screen>
  );
}
