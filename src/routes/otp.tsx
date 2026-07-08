import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useState } from "react";
import { toast } from "sonner";
import { Terminal, KeyRound } from "lucide-react";

export const Route = createFileRoute("/otp")({ component: OtpPage });

function OtpPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 4) {
      toast.error("Please enter a valid code verification format");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Identity verified successfully!");
      navigate({ to: "/reset" });
    }, 1000);
  };

  return (
    <Screen bgClass="bg-background" contentClass="p-6 flex flex-col h-full">
      <div className="space-y-6 my-auto w-full">
        <div className="flex flex-col items-center text-center gap-2 mb-2 select-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-soft">
            <Terminal className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-black text-foreground mt-2">Enter OTP</h2>
          <p className="text-xs text-muted-foreground">Type the 4-digit code sent to your inbox</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="relative flex items-center">
            <KeyRound className="absolute left-4 h-4.5 w-4.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Verification Code (e.g. 1234)"
              maxLength={6}
              required
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className="h-12 w-full pl-11 pr-4 bg-muted/40 rounded-2xl text-center text-lg tracking-widest font-black outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div className="pt-2">
            <GradientButton type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify Code"}
            </GradientButton>
          </div>
        </form>

        <div className="text-center text-xs text-muted-foreground">
          <button
            type="button"
            onClick={() => toast.success("New verification code dispatched!")}
            className="font-semibold text-primary hover:underline cursor-pointer bg-transparent border-none outline-none"
          >
            Resend OTP Code
          </button>
        </div>
      </div>
    </Screen>
  );
}
