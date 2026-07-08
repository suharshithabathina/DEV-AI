import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useState } from "react";
import { toast } from "sonner";
import { Terminal, Mail } from "lucide-react";

export const Route = createFileRoute("/forgot")({ component: ForgotPage });

function ForgotPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("One-time password OTP code sent to your email!");
      navigate({ to: "/otp" });
    }, 1200);
  };

  return (
    <Screen bgClass="bg-background" contentClass="p-6 flex flex-col h-full animate-fade-in">
      <div className="space-y-6 my-auto w-full">
        <div className="flex flex-col items-center text-center gap-2 mb-2 select-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-soft">
            <Terminal className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-black text-foreground mt-2">Reset Password</h2>
          <p className="text-xs text-muted-foreground">Enter email to request reset details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex items-center">
            <Mail className="absolute left-4 h-4.5 w-4.5 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full pl-11 pr-4 bg-muted/40 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div className="pt-2">
            <GradientButton type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </GradientButton>
          </div>
        </form>

        <div className="text-center text-xs text-muted-foreground">
          <Link to="/login" className="font-semibold text-primary hover:underline cursor-pointer">
            Back to Log In
          </Link>
        </div>
      </div>
    </Screen>
  );
}
