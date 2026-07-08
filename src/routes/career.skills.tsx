import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { Award, CheckCircle2, Circle, ChevronRight, TrendingUp, Cpu, Compass } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/career/skills")({ component: SkillsPage });

interface RoadmapStep {
  role: string;
  salary: string;
  milestone: string;
  skills: { name: string; done: boolean }[];
  active: boolean;
}

function SkillsPage() {
  const [stages, setStages] = useState<RoadmapStep[]>([
    {
      role: "Associate Frontend Developer",
      salary: "$70k - $90k",
      milestone: "Completed",
      active: false,
      skills: [
        { name: "CORS parameters, API endpoints integration", done: true },
        { name: "CSS Flexbox/Grid visual interfaces configurations", done: true }
      ]
    },
    {
      role: "Mid-level Software Engineer",
      salary: "$100k - $125k",
      milestone: "Active target stage",
      active: true,
      skills: [
        { name: "Parallel Promise validations with Promise.all", done: true },
        { name: "ATS keywords resume optimizer patterns", done: false },
        { name: "Simple local memory storage cache configurations", done: false }
      ]
    },
    {
      role: "Senior Engineering Partner",
      salary: "$140k - $170k",
      milestone: "Future target stage",
      active: false,
      skills: [
        { name: "Managing multithreading async locks queues", done: false },
        { name: "High-scale systems caching design", done: false }
      ]
    }
  ]);

  const toggleSkill = (stageIdx: number, skillIdx: number) => {
    const updated = [...stages];
    const skill = updated[stageIdx].skills[skillIdx];
    skill.done = !skill.done;
    setStages(updated);
    toast.success(skill.done ? `Completed: ${skill.name}` : `Marked pending: ${skill.name}`);
  };

  return (
    <Screen title="Career Growth Roadmap">
      <div className="px-5 py-4 space-y-5 select-none">
        <div className="bg-gradient-soft p-5 rounded-2xl border border-primary/10 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary shadow-soft">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-foreground">Career Growth Path</h2>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
              Complete stages milestones to unlock higher engineering roles recommendations.
            </p>
          </div>
        </div>

        {/* Roadmap stages timeline */}
        <div className="space-y-5 relative pl-4 border-l-2 border-border/60 ml-2">
          {stages.map((stage, sIdx) => (
            <div key={sIdx} className="relative space-y-2">
              {/* Bullet circle timeline indicator */}
              <span className={`absolute -left-[23px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                stage.active ? "bg-primary border-primary animate-pulse" : stage.milestone === "Completed" ? "bg-success border-success" : "bg-card border-border"
              }`} />

              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-xs font-bold ${stage.active ? "text-primary font-black" : "text-foreground"}`}>{stage.role}</h3>
                  <p className="text-[9px] text-muted-foreground">{stage.salary} · {stage.milestone}</p>
                </div>
              </div>

              {/* Action skill items */}
              <div className="space-y-2.5">
                {stage.skills.map((skill, kIdx) => (
                  <Card
                    key={kIdx}
                    variant={stage.active ? "elevated" : "flat"}
                    onClick={() => toggleSkill(sIdx, kIdx)}
                    className="flex items-center justify-between p-3.5 gap-4 shadow-soft"
                  >
                    <span className="text-[10px] text-foreground leading-snug">{skill.name}</span>
                    <div>
                      {skill.done ? (
                        <CheckCircle2 className="h-4.5 w-4.5 text-success shrink-0" />
                      ) : (
                        <Circle className="h-4.5 w-4.5 text-muted-foreground shrink-0" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

