import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/welcome")({ component: WelcomePage });

function WelcomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("Developer");

  useEffect(() => {
    const saved = localStorage.getItem('demo_name');
    if (saved) setName(saved);
  }, []);

  return (
    <Screen noHeader bgClass="bg-gradient-hero" contentClass="p-6 items-center justify-between flex flex-col h-full text-center">
      <div />

      <div className="flex flex-col items-center gap-6 animate-slide-in">
        <img
          src="/assets/mascot.png"
          alt="Welcome"
          className="h-44 w-auto object-contain rounded-2xl animate-pulse"
        />

        <div className="space-y-3">
          <h2 className="text-2xl font-black text-foreground">Welcome, {name}! 🎉</h2>
          <p className="text-xs text-muted-foreground tracking-wider uppercase font-semibold text-primary">
            Workspace Configuration Ready
          </p>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Your personal DevHub environment has been successfully prepared. Let's start tracking your sprint performance and coding challenges!
          </p>
        </div>
      </div>

      <div className="w-full pt-4">
        <GradientButton onClick={() => navigate({ to: "/home" })}>
          Enter DevHub
        </GradientButton>
      </div>
    </Screen>
  );
}
