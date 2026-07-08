import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Card } from "@/components/mobile/Card";
import { StatChip } from "@/components/mobile/StatChip";
import { AIBadge } from "@/components/mobile/AIBadge";
import { useEffect, useState } from "react";
import { getApiUrl } from "@/utils/api";
import { 
  Bell, Sparkles, Terminal, Code, Cpu, Award, Target, Calendar, BarChart2, MessageSquare, ChevronRight, Brain, Gamepad2
} from "lucide-react";

export const Route = createFileRoute("/home/")({ component: DevHubPage });

function DevHubPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Developer");
  const [profile, setProfile] = useState<any>({
    daily_coding_hours: "5.4 hrs",
    git_commits: "28 commits",
    skills_completed: "12 completed",
    weekly_challenges: "3 solved"
  });

  useEffect(() => {
    const demoName = localStorage.getItem('demo_name');
    if (demoName) setUserName(demoName);

    const userId = localStorage.getItem('demo_user_id') || 'demo-user-id';
    const loadProfile = async () => {
      try {
        const res = await fetch(getApiUrl(`/api/profiles/${userId}`));
        if (res.ok) {
          const data = await res.json();
          if (data && Object.keys(data).length > 0) {
            setProfile(data);
          }
        }
      } catch (err) {
        console.error("Failed to load profile metrics from backend:", err);
      }
    };
    loadProfile();
  }, []);

  return (
    <Screen noHeader bottomNav bgClass="bg-muted" contentClass="pb-6">
      <div className="px-5 pt-3">
        {/* Top Header Row */}
        <div className="flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-soft">
              <Terminal className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Welcome back</p>
              <h1 className="text-base font-black text-foreground">{userName}</h1>
            </div>
          </div>
          <Link to="/home/notifications" className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-card shadow-soft border border-border/10">
            <Bell className="h-4.5 w-4.5 text-foreground" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive animate-pulse" />
          </Link>
        </div>

        {/* Global Search Bar */}
        <Link to="/home/search" className="mt-4 flex h-11 items-center gap-3 rounded-2xl bg-card px-4 border border-border/10 shadow-soft">
          <Terminal className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Search codes, functions, questions...</span>
        </Link>

        {/* AI Recommendations banner */}
        <button
          onClick={() => navigate({ to: "/home/ai-recommend" })}
          className="mt-5 flex w-full items-center gap-4 rounded-3xl p-5 text-left text-white shadow-float"
          style={{ background: "var(--gradient-primary)" }}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <Sparkles className="h-5.5 w-5.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/90">Aura AI Partner</span>
              <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
            </div>
            <p className="text-sm font-black truncate">Get daily coding suggestions</p>
          </div>
          <ChevronRight className="h-5 w-5 text-white/80" />
        </button>

        {/* Quick Stats Chips */}
        <h2 className="mt-6 text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">Today's Metrics</h2>
        <div className="mt-3.5 grid grid-cols-2 gap-3 font-sans">
          <StatChip icon={<Code className="h-4.5 w-4.5" />} label="Coding Hours" value={profile.daily_coding_hours} />
          <StatChip icon={<Cpu className="h-4.5 w-4.5" />} label="Git Commits" value={profile.git_commits} trend="+12%" trendType="up" />
          <StatChip icon={<Award className="h-4.5 w-4.5" />} label="Skills Complete" value={profile.skills_completed} />
          <StatChip icon={<Target className="h-4.5 w-4.5" />} label="Solved Tasks" value={profile.weekly_challenges} trend="On track" trendType="neutral" />
        </div>

        {/* Flow Grid Menu Links */}
        <div className="mt-5 grid grid-cols-2 gap-3 font-sans">
          <ActionCard to="/home/assistant" icon={<MessageSquare className="h-4.5 w-4.5" />} title="AI Assistant" sub="Chat with DevAI mascot" badge />
          <ActionCard to="/home/insights" icon={<BarChart2 className="h-4.5 w-4.5" />} title="Analytics Insights" sub="Track commit progress" />
          <ActionCard to="/home/calendar" icon={<Calendar className="h-4.5 w-4.5" />} title="Sprint Planner" sub="Check developer schedule" />
          <ActionCard to="/learn/quiz" icon={<Brain className="h-4.5 w-4.5" />} title="AI Quiz Generator" sub="Assess specific topics" />
          <ActionCard to="/home/daily-learning" icon={<Sparkles className="h-4.5 w-4.5" />} title="Daily Learning" sub="View current lessons" />
          <ActionCard to="/learn/challenge" icon={<Gamepad2 className="h-4.5 w-4.5" />} title="Sandbox Puzzle" sub="Write syntax exercises" />
        </div>

        {/* Sub Flow Summary Section */}
        <Link to="/home/summary" className="mt-5 flex items-center justify-between rounded-2xl bg-card p-4.5 border border-border/10 shadow-soft">
          <div>
            <p className="text-sm font-bold text-foreground">Weekly Summary</p>
            <p className="text-xs text-muted-foreground">Review sprint coding highlights</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>

        <Link to="/home/history" className="mt-3 flex items-center justify-between rounded-2xl bg-card p-4.5 border border-border/10 shadow-soft">
          <div>
            <p className="text-sm font-bold text-foreground">Activity Log</p>
            <p className="text-xs text-muted-foreground">Past commits & review sessions</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
      </div>
    </Screen>
  );
}

function ActionCard({ to, icon, title, sub, badge }: { to: string; icon: React.ReactNode; title: string; sub: string; badge?: boolean }) {
  return (
    <Link to={to} className="relative rounded-2xl bg-card p-4 border border-border/10 shadow-soft select-none hover:shadow-md transition active:scale-[0.98]">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">{icon}</div>
      {badge && (
        <span className="absolute right-3.5 top-3.5">
          <AIBadge size="sm" text="Bot" />
        </span>
      )}
      <p className="mt-3.5 text-xs font-bold text-foreground leading-tight">{title}</p>
      <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
    </Link>
  );
}
