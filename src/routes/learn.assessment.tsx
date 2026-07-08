import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useState } from "react";
import { toast } from "sonner";
import { Target, Star } from "lucide-react";

export const Route = createFileRoute("/learn/assessment")({ component: AssessmentPage });

function AssessmentPage() {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === null) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Skill evaluation captured! Suggested intermediate track.");
      navigate({ to: "/learn/intermediate" });
    }, 900);
  };

  return (
    <Screen title="Skill Assessment">
      <div className="px-5 py-4 flex-1 flex flex-col justify-between h-[calc(100vh-120px)]">
        <div className="space-y-5 text-center select-none">
          <Target className="h-10 w-10 text-primary mx-auto mb-3" />
          <h2 className="text-sm font-bold text-foreground">Evaluate Coding Skills</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            How confident are you in managing asynchronous promise closures and thread pools in TypeScript?
          </p>

          <div className="flex justify-center gap-3 py-4">
            {[1, 2, 3, 4, 5].map((val) => {
              const active = rating !== null && val <= rating;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setRating(val)}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border transition cursor-pointer ${
                    active ? "border-primary bg-primary text-white" : "border-border/40 bg-card text-muted-foreground"
                  }`}
                >
                  <Star className={`h-4.5 w-4.5 ${active ? "fill-white" : ""}`} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4">
          <GradientButton onClick={handleSubmit} disabled={rating === null || loading}>
            {loading ? "Saving..." : "Submit Review"}
          </GradientButton>
        </div>
      </div>
    </Screen>
  );
}
