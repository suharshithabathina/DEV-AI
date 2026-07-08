import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";

export const Route = createFileRoute("/onboarding/2")({ component: OnboardingStep2 });

function OnboardingStep2() {
  const navigate = useNavigate();

  return (
    <Screen noHeader bgClass="bg-background" contentClass="flex flex-col items-center justify-between p-6 h-full text-center">
      {/* Top skip layout */}
      <div className="w-full flex justify-end">
        <Link
          to="/signup"
          className="text-xs font-semibold text-muted-foreground hover:text-foreground tracking-wide py-1 px-3 bg-muted/40 rounded-full transition cursor-pointer"
        >
          Skip
        </Link>
      </div>

      {/* Analytics illustration section */}
      <div className="flex flex-col items-center gap-6 animate-slide-in">
        <img
          src="/assets/analytics.png"
          alt="Productivity Analytics"
          className="h-44 w-auto object-contain rounded-2xl shadow-soft"
        />

        <div className="space-y-3">
          <h2 className="text-2xl font-black text-foreground">Track Metrics</h2>
          <p className="text-xs text-muted-foreground tracking-wider uppercase font-semibold text-primary">
            Step 2 of 3
          </p>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Analyze your learning speed, engineering goals, commit patterns, and skill milestones with beautiful visual graphs.
          </p>
        </div>
      </div>

      {/* Footer navigation */}
      <div className="w-full space-y-4">
        {/* Step indicator dots */}
        <div className="flex justify-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-muted" />
          <span className="h-2 w-4 rounded-full bg-primary transition-all duration-300" />
          <span className="h-2 w-2 rounded-full bg-muted" />
        </div>

        <GradientButton onClick={() => navigate({ to: "/onboarding/3" })}>
          Continue
        </GradientButton>
      </div>
    </Screen>
  );
}
