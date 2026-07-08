import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";

export const Route = createFileRoute("/onboarding/3")({ component: OnboardingStep3 });

function OnboardingStep3() {
  const navigate = useNavigate();

  return (
    <Screen noHeader bgClass="bg-background" contentClass="flex flex-col items-center justify-between p-6 h-full text-center animate-fade-in">
      <div />

      {/* Mascot illustration */}
      <div className="flex flex-col items-center gap-6 animate-slide-in">
        <img
          src="/assets/mascot.png"
          alt="Mock Interviews"
          className="h-44 w-auto object-contain rounded-2xl"
        />

        <div className="space-y-3">
          <h2 className="text-2xl font-black text-foreground">Interactive Practice</h2>
          <p className="text-xs text-muted-foreground tracking-wider uppercase font-semibold text-primary">
            Step 3 of 3
          </p>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Train for interviews with real-time AI simulators. Receive instant grade scoring and customized suggestions to secure your target role.
          </p>
        </div>
      </div>

      {/* Footer navigation */}
      <div className="w-full space-y-4">
        {/* Step indicators */}
        <div className="flex justify-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-muted" />
          <span className="h-2 w-2 rounded-full bg-muted" />
          <span className="h-2 w-4 rounded-full bg-primary transition-all duration-300" />
        </div>

        <GradientButton onClick={() => navigate({ to: "/signup" })}>
          Get Started
        </GradientButton>
      </div>
    </Screen>
  );
}
