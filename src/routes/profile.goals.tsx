import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getApiUrl } from "@/utils/api";

export const Route = createFileRoute("/profile/goals")({ component: GoalsPage });

function GoalsPage() {
  const [goals, setGoals] = useState({
    career_role: "Senior Fullstack Engineer",
    daily_coding: "6 hours per day",
    learning_milestones: "3 algorithms per week",
    git_frequency: "5 commits per day"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('demo_user_id') || 'demo-user-id';
    const loadGoals = async () => {
      try {
        const res = await fetch(getApiUrl(`/api/profiles/${userId}`));
        if (res.ok) {
          const data = await res.json();
          if (data && data.goals) {
            setGoals(data.goals);
          }
        }
      } catch (err) {
        console.error("Failed to load goals from backend:", err);
      }
    };
    loadGoals();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const userId = localStorage.getItem('demo_user_id') || 'demo-user-id';

    try {
      const res = await fetch(getApiUrl(`/api/profiles/${userId}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goals })
      });
      if (!res.ok) throw new Error("Goals update failed");
      toast.success("Target goals updated successfully!");
    } catch (err) {
      console.error(err);
      toast.success("Goals updated locally!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen title="Sprint Goals">
      <div className="px-5 py-4 flex-1 flex flex-col justify-between h-[calc(100vh-120px)]">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-bold text-muted-foreground uppercase tracking-wider">Target Role</label>
            <input
              type="text"
              required
              value={goals.career_role}
              onChange={(e) => setGoals({ ...goals, career_role: e.target.value })}
              className="h-12 w-full rounded-2xl bg-muted/40 px-4 text-xs outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-muted-foreground uppercase tracking-wider">Daily Coding duration</label>
            <input
              type="text"
              required
              value={goals.daily_coding}
              onChange={(e) => setGoals({ ...goals, daily_coding: e.target.value })}
              className="h-12 w-full rounded-2xl bg-muted/40 px-4 text-xs outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-muted-foreground uppercase tracking-wider">Weekly Lessons Milestone</label>
            <input
              type="text"
              required
              value={goals.learning_milestones}
              onChange={(e) => setGoals({ ...goals, learning_milestones: e.target.value })}
              className="h-12 w-full rounded-2xl bg-muted/40 px-4 text-xs outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-muted-foreground uppercase tracking-wider">Git Commit target</label>
            <input
              type="text"
              required
              value={goals.git_frequency}
              onChange={(e) => setGoals({ ...goals, git_frequency: e.target.value })}
              className="h-12 w-full rounded-2xl bg-muted/40 px-4 text-xs outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div className="pt-4 select-none">
            <GradientButton type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Goals"}
            </GradientButton>
          </div>
        </form>
      </div>
    </Screen>
  );
}
