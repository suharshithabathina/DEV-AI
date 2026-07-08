import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useState, useEffect } from "react";
import { Terminal, Save } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/optimize/editor")({ component: EditorPage });

function EditorPage() {
  const [code, setCode] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("pending_code") || "";
    setCode(raw);
  }, []);

  const handleSave = () => {
    localStorage.setItem("pending_code", code);
    toast.success("Source file saved successfully");
  };

  return (
    <Screen title="Visual Code Editor">
      <div className="px-5 py-4 flex-1 flex flex-col justify-between h-[calc(100vh-120px)]">
        <div className="flex-1 rounded-2xl bg-card border border-border/10 overflow-hidden flex flex-col shadow-soft">
          <div className="bg-muted/30 px-4 py-2 border-b border-border/10 flex items-center justify-between text-[10px] font-bold text-muted-foreground select-none">
            <span className="flex items-center gap-1.5">
              <Terminal className="h-3 w-3" /> main.ts
            </span>
            <span>Edit mode</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full p-4 text-[10px] font-mono outline-none resize-none bg-transparent text-foreground leading-relaxed"
          />
        </div>

        <div className="pt-4 select-none">
          <GradientButton onClick={handleSave}>
            <Save className="h-4 w-4" /> Save Changes
          </GradientButton>
        </div>
      </div>
    </Screen>
  );
}
