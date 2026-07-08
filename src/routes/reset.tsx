import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useState } from "react";
import { toast } from "sonner";
import { Terminal, Lock } from "lucide-react";

export const Route = createFileRoute("/reset")({ component: ResetPage });

function ResetPage() {
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Password updated successfully!");
      navigate({ to: "/login" });
    }, 1100);
  };

  return (
    <Screen bgClass="bg-background" contentClass="p-6 flex flex-col h-full animate-fade-in">
      <div className="space-y-6 my-auto w-full">
        <div className="flex flex-col items-center text-center gap-2 mb-2 select-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-soft">
            <Terminal className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-black text-foreground mt-2">New Password</h2>
          <p className="text-xs text-muted-foreground">Type a secure password details below</p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <div className="relative flex items-center">
            <Lock className="absolute left-4 h-4.5 w-4.5 text-muted-foreground" />
            <input
              type="password"
              placeholder="New Password"
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="h-12 w-full pl-11 pr-4 bg-muted/40 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div className="relative flex items-center">
            <Lock className="absolute left-4 h-4.5 w-4.5 text-muted-foreground" />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="h-12 w-full pl-11 pr-4 bg-muted/40 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div className="pt-2">
            <GradientButton type="submit" disabled={loading}>
              {loading ? "Updating..." : "Save Password"}
            </GradientButton>
          </div>
        </form>
      </div>
    </Screen>
  );
}
