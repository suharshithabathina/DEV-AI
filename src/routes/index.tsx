import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { Sparkles, Terminal } from "lucide-react";

export const Route = createFileRoute("/")({ component: SplashPage });

function SplashPage() {
  return (
    <Screen noHeader bgClass="bg-gradient-hero" contentClass="flex flex-col items-center justify-between p-6 h-full text-center">
      <div />
      
      {/* Brand & Mascot illustration container */}
      <div className="flex flex-col items-center gap-6 animate-fade-in duration-700">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-float text-white">
          <Terminal className="h-8 w-8" />
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-primary rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <img
            src="/assets/mascot.png"
            alt="Mascot"
            className="relative h-44 w-44 object-contain animate-bounce"
            style={{ animationDuration: "3s" }}
          />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center justify-center gap-1.5">
            DevAI <Sparkles className="h-5 w-5 text-primary fill-primary/20" />
          </h1>
          <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Developer Productivity Partner
          </p>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs mx-auto">
            Code smarter, debug faster, and accelerate your engineering career with personalized AI insights.
          </p>
        </div>
      </div>

      {/* Tap to enter link */}
      <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
        <div className="flex justify-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
          <span className="h-2 w-2 rounded-full bg-primary/40" />
          <span className="h-2 w-2 rounded-full bg-primary/20" />
        </div>
        
        <Link
          to="/onboarding/1"
          className="block w-full text-center text-xs font-bold text-muted-foreground hover:text-foreground tracking-wide uppercase py-3 transition cursor-pointer"
        >
          Tap to start prototype
        </Link>
      </div>
    </Screen>
  );
}
