import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";

export const Route = createFileRoute("/onboarding/1")({ component: OnboardingStep1 });

function OnboardingStep1() {
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

      {/* Hero illustration section */}
      <div className="flex flex-col items-center gap-6 animate-slide-in">
        <img
          src="/assets/hero.png"
          alt="AI Reviews"
          className="h-44 w-auto object-contain rounded-2xl shadow-soft"
        />

        <div className="space-y-3">
          <h2 className="text-2xl font-black text-foreground">AI Code Analysis</h2>
          <p className="text-xs text-muted-foreground tracking-wider uppercase font-semibold text-primary">
            Step 1 of 3
          </p>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Instantly upload and review source code files for deep performance blocks, hidden bugs, syntax problems, and security threats.
          </p>
        </div>
      </div>

      {/* Footer navigation */}
      <div className="w-full space-y-4">
        {/* Step indicator dots */}
        <div className="flex justify-center gap-1.5">
          <span className="h-2 w-4 rounded-full bg-primary transition-all duration-300" />
          <span className="h-2 w-2 rounded-full bg-muted" />
          <span className="h-2 w-2 rounded-full bg-muted" />
        </div>

        <GradientButton onClick={() => navigate({ to: "/onboarding/2" })}>
          Continue
        </GradientButton>
      </div>
    </Screen>
  );
}
