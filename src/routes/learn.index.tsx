import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { BookOpen, Brain, Gamepad2, Award, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/learn/")({ component: LearnIndexPage });

function LearnIndexPage() {
  return (
    <Screen noHeader bottomNav bgClass="bg-muted" contentClass="pb-6">
      <div className="px-5 pt-3 space-y-5">
        {/* Core title panel */}
        <div className="flex items-center gap-2 select-none">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Skills Academy</p>
            <h1 className="text-base font-black text-foreground">Learning Hub</h1>
          </div>
        </div>

        {/* Level course folders */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">Course Chapters</h2>
          <ChapterLink to="/learn/beginner" title="Beginner Track" desc="CORS policies, variables, syntax standard validations" progress="100% complete" />
          <ChapterLink to="/learn/intermediate" title="Intermediate Track" desc="Binary search trees, memory safety allocations, interfaces" progress="45% complete" />
          <ChapterLink to="/learn/advanced" title="Advanced Track" desc="Managing async locks, multithreading wait queues" progress="0% complete" />
        </div>

        {/* Action interactive hubs list */}
        <div className="grid grid-cols-2 gap-3 select-none">
          <Link to="/learn/quiz" className="p-4 bg-card border border-border/10 rounded-2xl shadow-soft hover:shadow-md transition active:scale-[0.98]">
            <Brain className="h-5 w-5 text-primary mb-2 animate-pulse" />
            <p className="text-xs font-bold text-foreground">AI Quiz Generator</p>
            <p className="text-[9px] text-muted-foreground mt-0.5">Generate dynamic topics with AI</p>
          </Link>

          <Link to="/learn/challenge" className="p-4 bg-card border border-border/10 rounded-2xl shadow-soft hover:shadow-md transition active:scale-[0.98]">
            <Gamepad2 className="h-5 w-5 text-secondary mb-2" />
            <p className="text-xs font-bold text-foreground">Sandbox Puzzle</p>
            <p className="text-[9px] text-muted-foreground mt-0.5">Write syntax exercises</p>
          </Link>
        </div>

        <Link to="/learn/badge" className="mt-2 flex items-center justify-between p-4 bg-card border border-border/10 rounded-2xl shadow-soft select-none">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs font-bold text-foreground">Achieved Badges</p>
              <p className="text-[10px] text-muted-foreground">View your skill certifications</p>
            </div>
          </div>
          <ChevronRight className="h-4.5 w-4.5 text-muted-foreground" />
        </Link>
      </div>
    </Screen>
  );
}

function ChapterLink({ to, title, desc, progress }: { to: string; title: string; desc: string; progress: string }) {
  return (
    <Link to={to} className="flex items-center justify-between p-4.5 bg-card border border-border/10 rounded-2xl shadow-soft select-none hover:shadow-md transition active:scale-[0.99]">
      <div className="flex-1 min-w-0 pr-3">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-xs font-bold text-foreground">{title}</h3>
          <span className="text-[8px] font-extrabold px-1.5 py-0.5 bg-primary-soft text-primary rounded">{progress}</span>
        </div>
        <p className="text-[10px] text-muted-foreground leading-relaxed truncate">{desc}</p>
      </div>
      <ChevronRight className="h-4.5 w-4.5 text-muted-foreground shrink-0" />
    </Link>
  );
}
