import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Info, Terminal } from "lucide-react";

export const Route = createFileRoute("/profile/settings/about")({ component: AboutPage });

function AboutPage() {
  return (
    <Screen title="About App">
      <div className="px-5 py-6 space-y-6 text-center select-none">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-soft">
            <Terminal className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-bold text-foreground mt-2">DevAI Partner</h2>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Version 1.0.0 (Build 842)</p>
        </div>

        <div className="space-y-3 leading-relaxed text-xs text-muted-foreground text-left border-t border-border/20 pt-4 max-w-xs mx-auto">
          <p>
            Developed by DevAI Automation Core teams. Licensed under MIT permissions standards.
          </p>
          <p>
            Powered by Google Gemini 2.5 Flash models and TanStack Start compilation wrappers.
          </p>
        </div>
      </div>
    </Screen>
  );
}
