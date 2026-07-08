import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { Briefcase, FileText, MessageSquare, Award, Compass, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/career/")({ component: CareerIndexPage });

function CareerIndexPage() {
  return (
    <Screen noHeader bottomNav bgClass="bg-muted" contentClass="pb-6">
      <div className="px-5 pt-3 space-y-5">
        {/* Hub Header */}
        <div className="flex items-center gap-2 select-none">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Career Hub</p>
            <h1 className="text-base font-black text-foreground">Career Coach</h1>
          </div>
        </div>

        {/* Simulator Grid Menu */}
        <div className="grid grid-cols-2 gap-3 select-none">
          <Link to="/career/resume" className="p-4 bg-card border border-border/10 rounded-2xl shadow-soft hover:shadow-md transition active:scale-[0.98]">
            <FileText className="h-5 w-5 text-primary mb-2" />
            <p className="text-xs font-bold text-foreground">Resume Optimizer</p>
            <p className="text-[9px] text-muted-foreground mt-0.5">Optimize keywords for ATS</p>
          </Link>

          <Link to="/career/interview" className="p-4 bg-card border border-border/10 rounded-2xl shadow-soft hover:shadow-md transition active:scale-[0.98]">
            <MessageSquare className="h-5 w-5 text-secondary mb-2" />
            <p className="text-xs font-bold text-foreground">Mock Interviews</p>
            <p className="text-[9px] text-muted-foreground mt-0.5">Practice AI coding simulator</p>
          </Link>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">Career Suggestions</h2>
          
          <Link to="/career/skills" className="block">
            <Card variant="elevated" className="flex items-center justify-between p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Award className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">Career Growth Roadmap</h3>
                  <p className="text-[10px] text-muted-foreground">Target skills matching Senior Fullstack</p>
                </div>
              </div>
              <ChevronRight className="h-4.5 w-4.5 text-muted-foreground" />
            </Card>
          </Link>

          <Link to="/career/jobs" className="block">
            <Card variant="elevated" className="flex items-center justify-between p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary-soft text-secondary">
                  <Compass className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">Recommended Jobs</h3>
                  <p className="text-[10px] text-muted-foreground">Openings matching your developer profile</p>
                </div>
              </div>
              <ChevronRight className="h-4.5 w-4.5 text-muted-foreground" />
            </Card>
          </Link>
        </div>
      </div>
    </Screen>
  );
}
