import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { GradientButton } from "@/components/mobile/GradientButton";
import { Play, FileText, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/learn/video")({ component: VideoPage });

function VideoPage() {
  return (
    <Screen title="Lesson Video">
      <div className="px-5 py-4 space-y-4">
        {/* Mock video player wrapper */}
        <div className="relative rounded-2xl aspect-video bg-slate-950 flex items-center justify-center overflow-hidden group shadow-lg select-none">
          <button
            onClick={() => toast.success("Playing tutorial lesson...")}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <Play className="h-5 w-5 fill-white" />
          </button>
          <div className="absolute bottom-3 left-4 text-[10px] text-white/80 font-bold bg-black/45 px-2 py-0.5 rounded">
            0:00 / 12:45
          </div>
        </div>

        <div className="space-y-2 select-none">
          <h2 className="text-sm font-bold text-foreground">Understanding CORS Rules</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Learn the core principles of Cross-Origin Resource Sharing, headers mapping, and port configurations.
          </p>
        </div>

        <div className="pt-2">
          <GradientButton onClick={() => toast.success("Module marked completed!")}>
            Mark Lesson Complete
          </GradientButton>
        </div>
      </div>
    </Screen>
  );
}
