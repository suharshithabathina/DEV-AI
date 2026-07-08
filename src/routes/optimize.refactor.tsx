import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { Code, HelpCircle, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/optimize/refactor")({ component: RefactorPage });

function RefactorPage() {
  const patterns = [
    { title: "Extract Async Helper", desc: "Isolate network logic into reusable helper wrappers." },
    { title: "Replace For-Of Loops", desc: "Use Promise.all array map conversions to execute parallel trace logs." },
    { title: "Define Type Parameters", desc: "Replace plain 'any' parameters variables with strict contract typings." }
  ];

  return (
    <Screen title="Refactor Options">
      <div className="px-5 py-4 space-y-3">
        {patterns.map((item, idx) => (
          <Card key={idx} variant="elevated" className="flex gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <RefreshCw className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-foreground">{item.title}</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </Screen>
  );
}
