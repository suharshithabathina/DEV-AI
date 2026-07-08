import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/mobile/Screen";
import { GradientButton } from "@/components/mobile/GradientButton";
import { useState } from "react";
import { toast } from "sonner";
import { Terminal, Lock, Mail } from "lucide-react";
import { getApiUrl } from "@/utils/api";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in email and password fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(getApiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem('demo_email', email);
      localStorage.setItem('demo_name', data.user.name);
      localStorage.setItem('demo_user_id', data.user.id);
      
      toast.success("Welcome back developer!");
      navigate({ to: "/welcome" });
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(err.message || "Invalid credentials or login service offline");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen noHeader bgClass="bg-background" contentClass="p-6 flex flex-col h-full">
      <div className="space-y-6 my-auto w-full">
        <div className="flex flex-col items-center text-center gap-2 mb-2 select-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-soft">
            <Terminal className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-black text-foreground mt-2">Log In</h2>
          <p className="text-xs text-muted-foreground">Sign back in to DevAI Partner</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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

          <div className="relative flex items-center">
            <Lock className="absolute left-4 h-4.5 w-4.5 text-muted-foreground" />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full pl-11 pr-4 bg-muted/40 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary border border-transparent focus:border-transparent text-foreground"
            />
          </div>

          <div className="flex items-center justify-between text-xs px-1 select-none">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4.5 w-4.5 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
              />
              <label htmlFor="remember-me" className="text-muted-foreground cursor-pointer select-none">
                Remember me
              </label>
            </div>
            <Link to="/forgot" className="font-semibold text-primary hover:underline cursor-pointer">
              Forgot Password?
            </Link>
          </div>

          <div className="pt-2">
            <GradientButton type="submit" disabled={loading}>
              {loading ? "Authenticating..." : "Log In"}
            </GradientButton>
          </div>
        </form>

        <div className="text-center text-xs text-muted-foreground">
          <span>Don't have an account? </span>
          <Link to="/signup" className="font-semibold text-primary hover:underline cursor-pointer">
            Sign Up
          </Link>
        </div>
      </div>
    </Screen>
  );
}
